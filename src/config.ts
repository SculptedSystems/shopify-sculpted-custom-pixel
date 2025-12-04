import { getEnvBoolean, getEnvString } from "@utils/env";

export const config = {
  pixel: {
    loglevel: getEnvString("PIXEL_LOGLEVEL"),
  },

  shopify: {
    storeName: init.data.shop.name,
    useSku: getEnvBoolean("SHOPIFY_USESKU"),
  },

  gtm: {
    id: getEnvString("GTM_ID", "GTM-XXXXXXXX"),
    event: {
      prefix: getEnvString("GTM_EVENT_PREFIX"),
      postfix: getEnvString("GTM_EVENT_POSTFIX"),
    },
  },

  stape: {
    enable: getEnvBoolean("STAPE_ENABLE"),
    gtm: {
      id: getEnvString("STAPE_GTM_ID", "XXXXXXXXX"),
    },
    container: {
      id: getEnvString("STAPE_CONTAINER_ID"),
      domain: getEnvString("STAPE_CONTAINER_DOMAIN"),
    },
  },

  platform: {
    shopify: getEnvBoolean("PLATFORM_SHOPIFY"),
    google: getEnvBoolean("PLATFORM_GOOGLE"),
    meta: getEnvBoolean("PLATFORM_META"),
    tiktok: getEnvBoolean("PLATFORM_TIKTOK"),
  },

  event: {
    visitorConsentCollected: getEnvBoolean("EVENT_VISITORCONSENTCOLLECTED"),
    pageViewed: getEnvBoolean("EVENT_PAGEVIEWED"),
    formSubmitted: getEnvBoolean("EVENT_FORMSUBMITTED"),
    searchSubmitted: getEnvBoolean("EVENT_SEARCHSUBMITTED"),
    productViewed: getEnvBoolean("EVENT_PRODUCTVIEWED"),
    productAddedToCart: getEnvBoolean("EVENT_PRODUCTADDEDTOCART"),
    checkoutStarted: getEnvBoolean("EVENT_CHECKOUTSTARTED"),
    checkoutContactInfoSubmitted: getEnvBoolean(
      "EVENT_CHECKOUTCONTACTINFOSUBMITTED",
    ),
    checkoutAddressInfoSubmitted: getEnvBoolean(
      "EVENT_CHECKOUTADDRESSINFOSUBMITTED",
    ),
    checkoutShippingInfoSubmitted: getEnvBoolean(
      "EVENT_CHECKOUTSHIPPINGINFOSUBMITTED",
    ),
    paymentInfoSubmitted: getEnvBoolean("EVENT_PAYMENTINFOSUBMITTED"),
    checkoutCompleted: getEnvBoolean("EVENT_CHECKOUTCOMPLETED"),
  },
} as const;
