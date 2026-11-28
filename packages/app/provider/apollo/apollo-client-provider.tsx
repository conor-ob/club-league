import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { ApolloProvider } from "@apollo/client/react";
import { config } from "@club-league/config";
import { useMemo } from "react";
import { Observable } from "rxjs";

type ApolloProviderProps = {
  children: React.ReactNode;
};

export function ApolloClientProvider({ children }: ApolloProviderProps) {
  const httpLink = new HttpLink({ uri: config.graphqlUri });

  const delayLink = (delay = 1000) =>
    new ApolloLink((operation, forward) => {
      return new Observable((observer) => {
        const subscription = forward(operation).subscribe({
          next: (value) => {
            setTimeout(() => observer.next(value), delay);
          },
          error: (error) => {
            setTimeout(() => observer.error(error), delay);
          },
        });
        return () => {
          if (subscription) subscription.unsubscribe();
        };
      });
    });

  const errorLink = new ErrorLink(({ error, operation }) => {
    if (CombinedGraphQLErrors.is(error)) {
      error.errors.forEach(({ message }) => {
        console.log(
          `[GraphQL error]: ${JSON.stringify(
            {
              operation: operation.operationName,
              message: message,
            },
            null,
            2,
          )}`,
        );
      });
    } else {
      console.log(
        `[Network error]: ${JSON.stringify(
          {
            operation: operation.operationName,
            error: {
              name: error.name,
              message: error.message,
              cause: error instanceof Error ? error.cause : undefined,
            },
          },
          null,
          2,
        )}`,
      );
    }
  });

  const apolloLink =
    process.env.NODE_ENV === "production"
      ? ApolloLink.from([errorLink, httpLink])
      : ApolloLink.from([delayLink(500), errorLink, httpLink]);

  const client = useMemo(
    () =>
      new ApolloClient({
        link: apolloLink,
        cache: new InMemoryCache(),
      }),
    [],
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
