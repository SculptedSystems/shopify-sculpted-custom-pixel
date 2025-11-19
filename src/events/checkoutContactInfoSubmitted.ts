// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_contact_info_submitted

import { PixelEventsCheckoutContactInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";
import { DataLayerMessage } from "@models";

import { config } from "@config";

import {
  getContentIdsFromShopifyCheckoutLineItems,
  getGoogleItemsFromShopifyCheckoutLineItems,
  getMetaContentsFromShopifyCheckoutLineItems,
} from "@helpers/items";
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function prepareGoogleCheckoutContactInfoSubmitted(
  event: PixelEventsCheckoutContactInfoSubmitted,
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
    event: "add_contact_info",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      items: items,
    },
  };
}

function prepareMetaCheckoutContactInfoSubmitted(
  event: PixelEventsCheckoutContactInfoSubmitted,
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
    event: "AddContactInfo",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    value: value,
  };
}

function prepareTikTokCheckoutContactInfoSubmitted(
  message: DataLayerMessage,
): void {
  if (!config.platform.tiktok) {
    return;
  }

  message.tiktok = {
    event: "AddContactInfo",
  };
}

function handleCheckoutContactInfoSubmitted(
  event: PixelEventsCheckoutContactInfoSubmitted,
): void {
  const message: DataLayerMessage = {
    event: "shopify_checkout_contact_info_submitted",
  };

  prepareGoogleCheckoutContactInfoSubmitted(event, message);
  prepareMetaCheckoutContactInfoSubmitted(event, message);
  prepareTikTokCheckoutContactInfoSubmitted(message);

  dataLayerPush(message);
}

export function registerCheckoutContactInfoSubmitted(): void {
  analytics.subscribe(
    "checkout_contact_info_submitted",
    buildEventHandler(handleCheckoutContactInfoSubmitted),
  );
}
