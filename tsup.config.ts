import { defineConfig } from "tsup";
import dotenv from "dotenv";

dotenv.config();

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
  define: {
    "process.env.GTM_ID": JSON.stringify(process.env.GTM_ID),
    "process.env.STAPE_CONTAINER_ID": JSON.stringify(
      process.env.STAPE_CONTAINER_ID,
    ),
    "process.env.STAPE_CONTAINER_URL": JSON.stringify(
      process.env.STAPE_CONTAINER_URL,
    ),
  },
  banner: {
    js: `// Shopify Custom GTM Pixel for Customer Events
// Compiled on ${new Date().toISOString()}`,
  },
});
