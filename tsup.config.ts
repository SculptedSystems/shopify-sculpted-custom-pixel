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
  banner: {
    js: `
/*
//
// Sculpted Customer Events Custom Web Pixel
// v${process.env.npm_package_version}
// Compiled @ ${new Date().toISOString()}
//
*/`,
  },
  define: {
    // Pixel //
    /* */
    "process.env.PIXEL_LOGLEVEL": JSON.stringify(process.env.PIXEL_LOGLEVEL),

    // Shopify //

    "process.env.SHOPIFY_USESKU": JSON.stringify(process.env.SHOPIFY_USESKU),

    // GTM //

    "process.env.GTM_ID": JSON.stringify(process.env.GTM_ID),

    // Stape //

    "process.env.STAPE_ENABLE": JSON.stringify(process.env.STAPE_ENABLE),

    "process.env.STAPE_GTM_ID": JSON.stringify(process.env.STAPE_GTM_ID),

    "process.env.STAPE_CONTAINER_ID": JSON.stringify(
      process.env.STAPE_CONTAINER_ID,
    ),
    "process.env.STAPE_CONTAINER_DOMAIN": JSON.stringify(
      process.env.STAPE_CONTAINER_DOMAIN,
    ),

    // Platform //

    "process.env.PLATFORM_SHOPIFY": JSON.stringify(
      process.env.PLATFORM_SHOPIFY,
    ),
    "process.env.PLATFORM_GOOGLE": JSON.stringify(process.env.PLATFORM_GOOGLE),
    "process.env.PLATFORM_META": JSON.stringify(process.env.PLATFORM_META),
    "process.env.PLATFORM_TIKTOK": JSON.stringify(process.env.PLATFORM_TIKTOK),

    // Events //

    "process.env.EVENT_PAGEVIEWED": JSON.stringify(
      process.env.EVENT_PAGEVIEWED,
    ),

    "process.env.EVENT_FORMSUBMITTED": JSON.stringify(
      process.env.EVENT_FORMSUBMITTED,
    ),

    "process.env.EVENT_SEARCHSUBMITTED": JSON.stringify(
      process.env.EVENT_SEARCHSUBMITTED,
    ),
    "process.env.EVENT_PRODUCTVIEWED": JSON.stringify(
      process.env.EVENT_PRODUCTVIEWED,
    ),
    "process.env.EVENT_PRODUCTADDEDTOCART": JSON.stringify(
      process.env.EVENT_PRODUCTADDEDTOCART,
    ),

    "process.env.EVENT_CHECKOUTSTARTED": JSON.stringify(
      process.env.EVENT_CHECKOUTSTARTED,
    ),

    "process.env.EVENT_CHECKOUTCONTACTINFOSUBMITTED": JSON.stringify(
      process.env.EVENT_CHECKOUTCONTACTINFOSUBMITTED,
    ),
    "process.env.EVENT_CHECKOUTADDRESSINFOSUBMITTED": JSON.stringify(
      process.env.EVENT_CHECKOUTADDRESSINFOSUBMITTED,
    ),
    "process.env.EVENT_CHECKOUTSHIPPINGINFOSUBMITTED": JSON.stringify(
      process.env.EVENT_CHECKOUTSHIPPINGINFOSUBMITTED,
    ),
    "process.env.EVENT_PAYMENTINFOSUBMITTED": JSON.stringify(
      process.env.EVENT_PAYMENTINFOSUBMITTED,
    ),

    "process.env.EVENT_CHECKOUTCOMPLETED": JSON.stringify(
      process.env.EVENT_CHECKOUTCOMPLETED,
    ),
  },
});
