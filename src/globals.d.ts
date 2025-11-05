// ================================================
//   Global Declarations for Shopify Pixel Runtime
// ================================================

declare const analytics: {
  subscribe: (eventName: string, handler: (event: any) => void) => void;
};

declare const init: {
  data: {
    shop: {
      name: string;
    };
  };
};

declare global {
  interface Window {
    dataLayer: any[];
  }
}
