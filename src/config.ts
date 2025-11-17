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

    track: {
      pageView: true,
      formSubmit: true,
      search: true,
      viewItemList: true,
      viewItem: true,
      addToCart: true,
      viewCart: true,
      beginCheckout: true,
      addShippingInfo: true,
      addPaymentInfo: true,
      purchase: true,
    },
  },
} as const;
