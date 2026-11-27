import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { config } from "@club-league/config";
import { useMemo } from "react";

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

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
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
    }

    if (networkError) {
      console.log(
        `[Network error]: ${JSON.stringify(
          {
            operation: operation.operationName,
            error: {
              name: networkError.name,
              message: networkError.message,
              cause: networkError.cause,
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
