import { Analytics, Browser, Init } from "@shopify/web-pixels-extension";

import { DataLayer } from "@models";

declare global {
  ////////////////////////////////
  // Shopify Web Pixels Runtime //
  ////////////////////////////////

  const api;
  const analytics: Analytics;
  const browser: Browser;
  const init: Init;

  ////////////////////////////////
  // Google Tag Manager Runtime //
  ////////////////////////////////

  interface Window {
    dataLayer: DataLayer;
  }

  /////////
  // Env //
  /////////

  // Pixel //

  const __PIXEL_LOGLEVEL__;

  // Shopify //

  const __SHOPIFY_USESKU__;

  // GTM //

  const __GTM_ID__;

  const __GTM_EVENT_PREFIX__;
  const __GTM_EVENT_POSTFIX__;

  // Stape //

  const __STAPE_ENABLE__;

  const __STAPE_GTM_ID__;

  const __STAPE_CONTAINER_ID__;
  const __STAPE_CONTAINER_DOMAIN__;

  // Platform //

  const __PLATFORM_SHOPIFY__;
  const __PLATFORM_GOOGLE__;
  const __PLATFORM_META__;
  const __PLATFORM_TIKTOK__;

  // Events //

  const __EVENT_VISITORCONSENTCOLLECTED__;
  const __EVENT_PAGEVIEWED__;
  const __EVENT_FORMSUBMITTED__;
  const __EVENT_SEARCHSUBMITTED__;
  const __EVENT_PRODUCTVIEWED__;
  const __EVENT_PRODUCTADDEDTOCART__;
  const __EVENT_CHECKOUTSTARTED__;
  const __EVENT_CHECKOUTCONTACTINFOSUBMITTED__;
  const __EVENT_CHECKOUTADDRESSINFOSUBMITTED__;
  const __EVENT_CHECKOUTSHIPPINGINFOSUBMITTED__;
  const __EVENT_PAYMENTINFOSUBMITTED__;
  const __EVENT_CHECKOUTCOMPLETED__;
}

export {};
