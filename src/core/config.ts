// ============================
// Configure Options
// ============================

export const config = {
  pixel: {
    name: process.env["PIXEL_NAME"],
    logging: process.env["PIXEL_LOGGING"],
  },

  shopify: {
    storeName: process.env["SHOPIFY_STORE_NAME"],
    useSku: process.env["SHOPIFY_USE_SKU"],
  },
  gtm: {
    id: process.env["GTM_ID"],
  },
  push: {
    pageView: process.env["PUSH_PAGE_VIEW"],
    viewItemList: process.env["PUSH_VIEW_ITEM_LIST"],
    viewItem: process.env["PUSH_VIEW_ITEM"],
    addToCart: process.env["PUSH_ADD_TO_CART"],
    viewCart: process.env["PUSH_VIEW_CART"],
    beginCheckout: process.env["PUSH_BEGIN_CHECKOUT"],
    addShippingInfo: process.env["PUSH_ADD_SHIPPING_INFO"],
    addPaymentInfo: process.env["PUSH_ADD_PAYMENT_INFO"],
    purchase: process.env["PUSH_PURCHASE"],
  },
} as const;
