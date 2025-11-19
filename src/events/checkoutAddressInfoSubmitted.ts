// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_address_info_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsCheckoutAddressInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import {
  getContentIdsFromShopifyCheckoutLineItems,
  getGoogleItemsFromShopifyCheckoutLineItems,
  getMetaContentsFromShopifyCheckoutLineItems,
} from "@helpers/items";
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function prepareGoogleCheckoutAddressInfoSubmitted(
  event: PixelEventsCheckoutAddressInfoSubmitted,
  message: DataLayerMessage,
): void {
  if (!config.platform.google) {
    return;
  }

  const eventData = event.data;
  const checkout = eventData.checkout;

  // parameter: currency
  const currency = checkout.subtotalPrice?.currencyCode;

  // parameter: value
  const value = checkout.subtotalPrice?.amount || 0;

  // parameter: coupon
  const coupon = getWholeCartCouponFromDiscountApplications(
    checkout.discountApplications,
  );

  // parameter: items
  const items = getGoogleItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  message.google = {
    event: "add_address_info",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      items: items,
    },
  };
}

function prepareMetaCheckoutAddressInfoSubmitted(
  event: PixelEventsCheckoutAddressInfoSubmitted,
  message: DataLayerMessage,
): void {
  if (!config.platform.meta) {
    return;
  }

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

  // parameter: value
  const value = checkout.subtotalPrice?.amount;

  message.meta = {
    event: "AddAddressInfo",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    value: value,
  };
}

function prepareTikTokCheckoutAddressInfoSubmitted(
  message: DataLayerMessage,
): void {
  if (!config.platform.tiktok) {
    return;
  }

  message.tiktok = {
    event: "AddAddressInfo",
  };
}

function handleCheckoutAddressInfoSubmitted(
  event: PixelEventsCheckoutAddressInfoSubmitted,
): void {
  const message: DataLayerMessage = {
    event: "shopify_checkout_address_info_submitted",
  };

  prepareGoogleCheckoutAddressInfoSubmitted(event, message);
  prepareMetaCheckoutAddressInfoSubmitted(event, message);
  prepareTikTokCheckoutAddressInfoSubmitted(message);

  dataLayerPush(message);
}

export function registerCheckoutAddressInfoSubmitted(): void {
  analytics.subscribe(
    "checkout_address_info_submitted",
    buildEventHandler(handleCheckoutAddressInfoSubmitted),
  );
}
