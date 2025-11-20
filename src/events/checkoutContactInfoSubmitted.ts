// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_contact_info_submitted

import { PixelEventsCheckoutContactInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";
import { DataLayerMessage } from "@models";

import { config } from "@config";

import {
  getContentIdsFromShopifyCheckoutLineItems,
  getGoogleItemsFromShopifyCheckoutLineItems,
  getMetaContentsFromShopifyCheckoutLineItems,
} from "@helpers/items";
import {
  getGoogleUserDataFromCheckoutEvents,
  getMetaUserDataFromCheckoutEvents,
  getTikTokUserDataFromCheckoutEvents,
} from "@helpers/userData";
import { getDataLayerEventMessage } from "@helpers/dataLayer";
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function prepareGoogleCheckoutContactInfoSubmitted(
  event: PixelEventsCheckoutContactInfoSubmitted,
): DataLayerMessage {
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

  // parameter: user_data
  const user_data = getGoogleUserDataFromCheckoutEvents(event);

  return {
    event: "add_contact_info",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      items: items,
    },
    user_data: user_data,
  };
}

function prepareMetaCheckoutContactInfoSubmitted(
  event: PixelEventsCheckoutContactInfoSubmitted,
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

  // parameter: value
  const value = checkout.subtotalPrice?.amount;

  // parameter: user_data
  const user_data = getMetaUserDataFromCheckoutEvents(event);

  return {
    event: "AddContactInfo",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    value: value,
    user_data: user_data,
  };
}

function prepareTikTokCheckoutContactInfoSubmitted(
  event: PixelEventsCheckoutContactInfoSubmitted,
): DataLayerMessage {
  // parameter: user_data
  const user_data = getTikTokUserDataFromCheckoutEvents(event);

  return {
    event: "AddContactInfo",
    user_data: user_data,
  };
}

function handleCheckoutContactInfoSubmitted(
  event: PixelEventsCheckoutContactInfoSubmitted,
): void {
  const message = getDataLayerEventMessage(
    "shopify_checkout_contact_info_submitted",
  );

  if (config.platform.google) {
    message.data.google = prepareGoogleCheckoutContactInfoSubmitted(event);
  }

  if (config.platform.meta) {
    message.data.meta = prepareMetaCheckoutContactInfoSubmitted(event);
  }

  if (config.platform.tiktok) {
    message.data.tiktok = prepareTikTokCheckoutContactInfoSubmitted(event);
  }

  dataLayerPush(message);
}

export function registerCheckoutContactInfoSubmitted(): void {
  analytics.subscribe(
    "checkout_contact_info_submitted",
    buildEventHandler(handleCheckoutContactInfoSubmitted),
  );
}
