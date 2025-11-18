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
} as const;
