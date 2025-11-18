// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#begin_checkout
// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_started

import { DataLayerMessage } from "@models";
import { PixelEventsCheckoutStarted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import { createGA4ItemsFromShopifyCheckoutLineItems } from "@helpers/items";
import { getCustomer } from "@helpers/customer";
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function prepareGoogleCheckoutStarted(
  event: PixelEventsCheckoutStarted,
  message: DataLayerMessage,
): void {
  if (!config.platform.google) {
    return;
  }

  const eventData = event.data;
  const checkout = eventData.checkout;

  // parameter: currency
  const currency = checkout.subtotalPrice?.currencyCode || undefined;

  // parameter: value
  const value = checkout.subtotalPrice?.amount || undefined;

  // parameter: coupon
  const coupon = getWholeCartCouponFromDiscountApplications(
    checkout.discountApplications,
  );

  // parameter: items
  const items = createGA4ItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  message.google = {
    user_data: getCustomer(),
    event: "begin_checkout",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      items: items,
    },
  };
}

function handleCheckoutStarted(event: PixelEventsCheckoutStarted): void {
  const message: DataLayerMessage = { event: "shopify_checkout_started" };

  prepareGoogleCheckoutStarted(event, message);

  dataLayerPush(message);
}

export function registerCheckoutStarted(): void {
  analytics.subscribe(
    "checkout_started",
    buildEventHandler(handleCheckoutStarted),
  );
}
