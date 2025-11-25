// ================================================
//   Global Declarations
// ================================================
import {
  Analytics,
  Browser,
  Init,
} from "@sculptedsystems/shopify-web-pixels-api-types";

import { DataLayer } from "@models";

declare global {
  // ============================
  // Shopify Web Pixels Runtime
  // ============================

  const analytics: Analytics;
  const browser: Browser;
  const init: Init;

  // ============================
  // Google Tag Manager Runtime
  // ============================

  interface Window {
    analytics: Analytics;
    browser: Browser;
    initContext: Init;
    dataLayer: DataLayer;
  }
}

export {};
