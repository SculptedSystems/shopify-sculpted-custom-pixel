import { defineConfig } from "tsup";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config({ node_env: process.env.NODE_ENV });

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["iife"],
  outExtension: () => ({ js: ".js" }),
  outDir: "dist",
  target: "es2020",
  minify: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  platform: "browser",
  banner: {
    js: `// Shopify Custom GTM Pixel for Customer Events
// Compiled on ${new Date().toISOString()}
// Environment: ${process.env.NODE_ENV}`,
  },
  define: Object.fromEntries(
    Object.entries(process.env).map(([key, value]) => [
      `process.env.${key}`,
      JSON.stringify(value),
    ]),
  ),
});
