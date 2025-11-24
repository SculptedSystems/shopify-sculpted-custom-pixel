// ============================
// Configure Options
// ============================

export const config = {
  pixel: {
    loglevel: "warn",
  },

  shopify: {
    storeName: init.data.shop.name,
    useSku: true,
  },

  gtm: {
    id: process.env["GTM_ID"] ?? "GTM-XXXXXXXX",
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
    shopify: true,
    google: true,
    meta: true,
    tiktok: true,
  },
} as const;
