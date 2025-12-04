export const config = {
  pixel: {
    loglevel: process.env["PIXEL_LOGLEVEL"],
  },

  shopify: {
    storeName: init.data.shop.name,
    useSku: process.env["SHOPIFY_USESKU"]?.toLowerCase() === "true",
  },

  gtm: {
    id: process.env["GTM_ID"] ?? "GTM-XXXXXXXX",
    event: {
      prefix: process.env["GTM_EVENT_PREFIX"],
      postfix: process.env["GTM_EVENT_POSTFIX"],
    },
  },

  stape: {
    enable: process.env["STAPE_ENABLE"]?.toLowerCase() === "true",
    gtm: {
      id: process.env["STAPE_GTM_ID"] ?? "XXXXXXXXX",
    },
    container: {
      id: process.env["STAPE_CONTAINER_ID"],
      domain: process.env["STAPE_CONTAINER_DOMAIN"],
    },
  },

  platform: {
    shopify: process.env["PLATFORM_SHOPIFY"]?.toLowerCase() === "true",
    google: process.env["PLATFORM_GOOGLE"]?.toLowerCase() === "true",
    meta: process.env["PLATFORM_META"]?.toLowerCase() === "true",
    tiktok: process.env["PLATFORM_TIKTOK"]?.toLowerCase() === "true",
  },

  event: {
    visitorConsentCollected:
      process.env["EVENT_VISITORCONSENTCOLLECTED"]?.toLowerCase() === "true",
    pageViewed: process.env["EVENT_PAGEVIEWED"]?.toLowerCase() === "true",
    formSubmitted: process.env["EVENT_FORMSUBMITTED"]?.toLowerCase() === "true",
    searchSubmitted:
      process.env["EVENT_SEARCHSUBMITTED"]?.toLowerCase() === "true",
    productViewed: process.env["EVENT_PRODUCTVIEWED"]?.toLowerCase() === "true",
    productAddedToCart:
      process.env["EVENT_PRODUCTADDEDTOCART"]?.toLowerCase() === "true",
    checkoutStarted:
      process.env["EVENT_CHECKOUTSTARTED"]?.toLowerCase() === "true",
    checkoutContactInfoSubmitted:
      process.env["EVENT_CHECKOUTCONTACTINFOSUBMITTED"]?.toLowerCase() ===
      "true",
    checkoutAddressInfoSubmitted:
      process.env["EVENT_CHECKOUTADDRESSINFOSUBMITTED"]?.toLowerCase() ===
      "true",
    checkoutShippingInfoSubmitted:
      process.env["EVENT_CHECKOUTSHIPPINGINFOSUBMITTED"]?.toLowerCase() ===
      "true",
    paymentInfoSubmitted:
      process.env["EVENT_PAYMENTINFOSUBMITTED"]?.toLowerCase() === "true",
    checkoutCompleted:
      process.env["EVENT_CHECKOUTCOMPLETED"]?.toLowerCase() === "true",
  },
} as const;
