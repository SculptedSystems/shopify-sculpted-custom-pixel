import { getEnvBoolean, getEnvString } from "@utils/env";

export const config = {
  pixel: {
    loglevel: getEnvString(__PIXEL_LOGLEVEL__),
  },

  shopify: {
    storeName: init.data.shop.name,
    useSku: getEnvBoolean(__SHOPIFY_USESKU__),
  },

  gtm: {
    id: getEnvString(__GTM_ID__),
    event: {
      prefix: getEnvString(__GTM_EVENT_PREFIX__),
      postfix: getEnvString(__GTM_EVENT_POSTFIX__),
    },
  },

  stape: {
    enable: getEnvBoolean(__STAPE_ENABLE__),
    gtm: {
      id: getEnvString(__STAPE_GTM_ID__),
    },
    container: {
      id: getEnvString(__STAPE_CONTAINER_ID__),
      domain: getEnvString(__STAPE_CONTAINER_DOMAIN__),
    },
  },

  platform: {
    shopify: getEnvBoolean(__PLATFORM_SHOPIFY__),
    google: getEnvBoolean(__PLATFORM_GOOGLE__),
    meta: getEnvBoolean(__PLATFORM_META__),
    tiktok: getEnvBoolean(__PLATFORM_TIKTOK__),
  },

  event: {
    visitorConsentCollected: getEnvBoolean(__EVENT_VISITORCONSENTCOLLECTED__),
    pageViewed: getEnvBoolean(__EVENT_PAGEVIEWED__),
    formSubmitted: getEnvBoolean(__EVENT_FORMSUBMITTED__),
    searchSubmitted: getEnvBoolean(__EVENT_SEARCHSUBMITTED__),
    productViewed: getEnvBoolean(__EVENT_PRODUCTVIEWED__),
    productAddedToCart: getEnvBoolean(__EVENT_PRODUCTADDEDTOCART__),
    checkoutStarted: getEnvBoolean(__EVENT_CHECKOUTSTARTED__),
    checkoutContactInfoSubmitted: getEnvBoolean(
      __EVENT_CHECKOUTCONTACTINFOSUBMITTED__,
    ),
    checkoutAddressInfoSubmitted: getEnvBoolean(
      __EVENT_CHECKOUTADDRESSINFOSUBMITTED__,
    ),
    checkoutShippingInfoSubmitted: getEnvBoolean(
      __EVENT_CHECKOUTSHIPPINGINFOSUBMITTED__,
    ),
    paymentInfoSubmitted: getEnvBoolean(__EVENT_PAYMENTINFOSUBMITTED__),
    checkoutCompleted: getEnvBoolean(__EVENT_CHECKOUTCOMPLETED__),
  },
} as const;
