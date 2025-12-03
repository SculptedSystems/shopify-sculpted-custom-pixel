// ============================
// Initialize Tracking
// ============================

import { config } from "@config";
import { isCheckout } from "@utils/isCheckout";
import { logger } from "@utils/logger";

export function initializeGTM(): void {
  // Skip initialize on non-checkout pages
  if (!isCheckout()) {
    return;
  }

  // Initialize Data Layer
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  (function (
    w: Window,
    d: Document,
    s: string,
    l: keyof Window,
    i: string,
  ): void {
    // Initialize GTM event
    w.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });

    // Grab the first <script> tag
    const firstScript = d.getElementsByTagName(s)[0];
    if (!firstScript?.parentNode) {
      logger.warn("No script tag found to insert before.");
      return;
    }

    // Create and insert the GTM script
    const gtmScript = d.createElement(s) as HTMLScriptElement;
    const dl = l !== "dataLayer" ? `&l=${l}` : "";

    gtmScript.async = true;

    // Use Stape?
    if (config.stape.enable) {
      gtmScript.src =
        `https://${config.stape.container.domain}/${config.stape.container.id}.js?` +
        i;
    } else {
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
    }

    firstScript.parentNode.insertBefore(gtmScript, firstScript);
  })(
    window,
    document,
    "script",
    "dataLayer",
    config.stape.enable ? config.stape.gtm.id : config.gtm.id,
  );
}
