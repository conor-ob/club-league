import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schema/**/schema.graphql",
  generates: {
    "../../apps/server/src/generated/schema.graphql": {
      plugins: ["schema-ast"],
    },
    "../../apps/server/src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../context/ServerContext#ServerContext",
      },
    },
    "../app/generated/": {
      documents: ["../app/**/*.{ts,tsx}", "!**/node_modules/**"],
      preset: "client",
      presetConfig: {
        persistedDocuments: true,
      },
      config: {
        // client-preset 5+ emits enums as string unions by default; the app
        // compares against enum members (GcStatus.Completed, ...)
        enumType: "native",
      },
    },
  },
};

export default config;
