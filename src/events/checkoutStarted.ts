// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_started

import { DataLayerMessage } from "@models";
import { PixelEventsCheckoutStarted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { buildEventHandler } from "@utils/buildEventHandler";

import {
  getGoogleItemsFromShopifyCheckoutLineItems,
  getContentIdsFromShopifyCheckoutLineItems,
  getMetaContentsFromShopifyCheckoutLineItems,
  getNumItemsFromShopifyCheckoutLineItems,
} from "@helpers/items";
import {
  getGoogleUserDataFromCheckoutEvents,
  getMetaUserDataFromCheckoutEvents,
  getTikTokUserDataFromCheckoutEvents,
} from "@helpers/userData";
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

function prepareGoogleCheckoutStarted(
  event: PixelEventsCheckoutStarted,
): DataLayerMessage {
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
  const items = getGoogleItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  return {
    event: "begin_checkout",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      items: items,
    },
  };
}

function prepareMetaCheckoutStarted(
  event: PixelEventsCheckoutStarted,
): DataLayerMessage {
  const eventData = event.data;
  const checkout = eventData.checkout;

  // parameter: content_ids
  const content_ids = getContentIdsFromShopifyCheckoutLineItems(
    checkout.lineItems,
  );

  // parameter: contents
  const contents = getMetaContentsFromShopifyCheckoutLineItems(
    checkout.lineItems,
  );

  // parameter: currency
  const currency = checkout.subtotalPrice?.currencyCode;

  // parameter: num_items
  const num_items = getNumItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  // parameter: value
  const value = checkout.subtotalPrice?.amount;

  return {
    event: "InitiateCheckout",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    num_items: num_items,
    value: value,
  };
}

function prepareTikTokCheckoutStarted(
  _event: PixelEventsCheckoutStarted,
): DataLayerMessage {
  return {
    event: "InitiateCheckout",
  };
}

export function registerCheckoutStarted(): void {
  const event = "checkout_started";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: {
        dataHandler: prepareGoogleCheckoutStarted,
        userHandler: getGoogleUserDataFromCheckoutEvents,
      },
      meta: {
        dataHandler: prepareMetaCheckoutStarted,
        userHandler: getMetaUserDataFromCheckoutEvents,
      },
      tiktok: {
        dataHandler: prepareTikTokCheckoutStarted,
        userHandler: getTikTokUserDataFromCheckoutEvents,
      },
    }),
  );
}
