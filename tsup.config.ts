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
// Sculpted Custom Pixel
// v${process.env.npm_package_version}
// Compiled @ ${new Date().toISOString()}
//
*/`,
  },
  define: {
    // Pixel //

    __PIXEL_LOGLEVEL__: JSON.stringify(process.env.PIXEL_LOGLEVEL),

    // Shopify //

    __SHOPIFY_USESKU__: JSON.stringify(process.env.SHOPIFY_USESKU),

    // GTM //

    __GTM_ID__: JSON.stringify(process.env.GTM_ID),

    __GTM_EVENT_PREFIX__: JSON.stringify(process.env.GTM_EVENT_PREFIX),
    __GTM_EVENT_POSTFIX__: JSON.stringify(process.env.GTM_EVENT_POSTFIX),

    // Stape //

    __STAPE_ENABLE__: JSON.stringify(process.env.STAPE_ENABLE),

    __STAPE_GTM_ID__: JSON.stringify(process.env.STAPE_GTM_ID),

    __STAPE_CONTAINER_ID__: JSON.stringify(process.env.STAPE_CONTAINER_ID),
    __STAPE_CONTAINER_DOMAIN__: JSON.stringify(
      process.env.STAPE_CONTAINER_DOMAIN,
    ),

    // Consent //

    __CONSENT_PUSHINIT_FRONTEND__: JSON.stringify(
      process.env.CONSENT_PUSHINIT_FRONTEND,
    ),
    __CONSENT_PUSHINIT_CHECKOUT__: JSON.stringify(
      process.env.CONSENT_PUSHINIT_CHECKOUT,
    ),

    // Platform //

    __PLATFORM_SHOPIFY__: JSON.stringify(process.env.PLATFORM_SHOPIFY),
    __PLATFORM_GOOGLE__: JSON.stringify(process.env.PLATFORM_GOOGLE),
    __PLATFORM_META__: JSON.stringify(process.env.PLATFORM_META),
    __PLATFORM_TIKTOK__: JSON.stringify(process.env.PLATFORM_TIKTOK),

    // Events //

    __EVENT_VISITORCONSENTCOLLECTED__: JSON.stringify(
      process.env.EVENT_VISITORCONSENTCOLLECTED,
    ),
    __EVENT_PAGEVIEWED__: JSON.stringify(process.env.EVENT_PAGEVIEWED),
    __EVENT_FORMSUBMITTED__: JSON.stringify(process.env.EVENT_FORMSUBMITTED),
    __EVENT_SEARCHSUBMITTED__: JSON.stringify(
      process.env.EVENT_SEARCHSUBMITTED,
    ),
    __EVENT_PRODUCTVIEWED__: JSON.stringify(process.env.EVENT_PRODUCTVIEWED),
    __EVENT_PRODUCTADDEDTOCART__: JSON.stringify(
      process.env.EVENT_PRODUCTADDEDTOCART,
    ),
    __EVENT_CHECKOUTSTARTED__: JSON.stringify(
      process.env.EVENT_CHECKOUTSTARTED,
    ),
    __EVENT_CHECKOUTCONTACTINFOSUBMITTED__: JSON.stringify(
      process.env.EVENT_CHECKOUTCONTACTINFOSUBMITTED,
    ),
    __EVENT_CHECKOUTADDRESSINFOSUBMITTED__: JSON.stringify(
      process.env.EVENT_CHECKOUTADDRESSINFOSUBMITTED,
    ),
    __EVENT_CHECKOUTSHIPPINGINFOSUBMITTED__: JSON.stringify(
      process.env.EVENT_CHECKOUTSHIPPINGINFOSUBMITTED,
    ),
    __EVENT_PAYMENTINFOSUBMITTED__: JSON.stringify(
      process.env.EVENT_PAYMENTINFOSUBMITTED,
    ),
    __EVENT_CHECKOUTCOMPLETED__: JSON.stringify(
      process.env.EVENT_CHECKOUTCOMPLETED,
    ),
  },
});
