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
    id: process.env["GTM_ID"] || "GTM-XXXXXXXX",
    stape: {
      container: {
        id: process.env["STAPE_CONTAINER_ID"],
        url: process.env["STAPE_CONTAINER_URL"],
      },
    },
  },

  platform: {
    shopify: true,
    google: true,
    meta: true,
    tiktok: true,
  },
} as const;
