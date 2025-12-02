// ================================================
//   Global Declarations
// ================================================
import { Analytics, Browser, Init } from "@shopify/web-pixels-extension";

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
    dataLayer: DataLayer;
  }
}

export {};
