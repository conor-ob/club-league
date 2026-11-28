// .mts because this package stays CommonJS for Next, and tsconfig's "node"
// moduleResolution can't resolve tsdown's types from a .ts config
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  platform: "node",
  format: "esm",
  deps: {
    // Workspace packages export TypeScript source, and Node won't strip types
    // inside node_modules, so bundle them along with their dependencies. The
    // server's own npm dependencies (next, express, @apollo/*) stay external
    alwaysBundle: [/^@club-league\//],
    onlyBundle: false,
  },
});
