// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_cart
// https://shopify.dev/docs/api/web-pixels-api/standard-events/cart_viewed

import { PixelEventsCartViewed } from "@sculptedsystems/shopify-web-pixels-api-types";
import { PartialCheckoutLineItem } from "@models";

import { addFinalLinePriceToPartialLineItems } from "@helpers/items";
import { createGA4ItemsFromShopifyCheckoutLineItems } from "@helpers/items";
import { getCustomer } from "@helpers/customer";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function handleCartViewed(event: PixelEventsCartViewed): void {
  const eventData = event.data;
  const cart = eventData.cart;

  if (!cart) {
    return;
  }

  // parameter: currency
  const currency = cart.cost.totalAmount.currencyCode;

  // parameter: value
  const value = cart.cost.totalAmount.amount;

  // parameter: items
  const partialLineItems: PartialCheckoutLineItem[] = [];
  cart.lines.forEach((line) => {
    partialLineItems.push({
      discountAllocations: [],
      quantity: line.quantity,
      variant: line.merchandise,
    });
  });

  const lineItems = addFinalLinePriceToPartialLineItems(partialLineItems);
  const items = createGA4ItemsFromShopifyCheckoutLineItems(lineItems);

  dataLayerPush({
    user_data: getCustomer(),
    event: "view_cart",
    ecommerce: {
      currency: currency,
      value: value,
      items: items,
    },
  });
}

export function registerCartViewed(): void {
  analytics.subscribe("cart_viewed", buildEventHandler(handleCartViewed));
}
