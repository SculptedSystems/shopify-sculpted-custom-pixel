// ============================
// Configure Options
// ============================

export const config = {
  pixel: {
    loglevel: "debug",
  },

  shopify: {
    storeName: init.data.shop.name,
    useSku: true,
  },

  gtm: {
    id: "GTM-TLM894NG",

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
