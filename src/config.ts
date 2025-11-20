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
    id: "GTM-????????",
  },

  platform: {
    google: true,
    meta: true,
    tiktok: true,
  },
} as const;
