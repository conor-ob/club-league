import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  build: {
    rolldownOptions: {
      // The start script and Dockerfile run dist/index.mjs. The package isn't
      // "type": "module", so the ESM output needs the .mjs extension.
      output: { entryFileNames: "[name].mjs" },
    },
  },
  server: {
    port: process.env.NODE_ENV === "production" ? 8080 : 3000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/index.ts",
      // vite-plugin-node 8 defaults to cjs; keep the ESM output 3.x produced
      outputFormat: "esm",
    }),
  ],
  optimizeDeps: {
    exclude: ["next"],
  },
});
