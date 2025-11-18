// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_started

import { DataLayerMessage } from "@models";
import { PixelEventsCheckoutStarted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import {
  createGA4ItemsFromShopifyCheckoutLineItems,
  getMetaContentIdsFromShopifyCheckoutLineItems,
  getMetaContentsFromShopifyCheckoutLineItems,
  getMetaNumItemsFromShopifyCheckoutLineItems,
} from "@helpers/items";
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
  message: DataLayerMessage,
): void {
  if (!config.platform.meta) {
    return;
  }

  const eventData = event.data;
  const checkout = eventData.checkout;

  // parameter: content_ids
  const content_ids = getMetaContentIdsFromShopifyCheckoutLineItems(
    checkout.lineItems,
  );

  // parameter: contents
  const contents = getMetaContentsFromShopifyCheckoutLineItems(
    checkout.lineItems,
  );

  // parameter: currency
  const currency = checkout.subtotalPrice?.currencyCode;

  // parameter: num_items
  const num_items = getMetaNumItemsFromShopifyCheckoutLineItems(
    checkout.lineItems,
  );

  // parameter: value
  const value = checkout.subtotalPrice?.amount;

  message.meta = {
    event: "InitiateCheckout",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    num_items: num_items,
    value: value,
  };
}

function prepareTikTokCheckoutStarted(message: DataLayerMessage): void {
  if (!config.platform.tiktok) {
    return;
  }

  message.tiktok = {
    event: "InitiateCheckout",
  };
}

function handleCheckoutStarted(event: PixelEventsCheckoutStarted): void {
  const message: DataLayerMessage = { event: "shopify_checkout_started" };

  prepareGoogleCheckoutStarted(event, message);
  prepareMetaCheckoutStarted(event, message);
  prepareTikTokCheckoutStarted(message);

  dataLayerPush(message);
}

export function registerCheckoutStarted(): void {
  analytics.subscribe(
    "checkout_started",
    buildEventHandler(handleCheckoutStarted),
  );
}
