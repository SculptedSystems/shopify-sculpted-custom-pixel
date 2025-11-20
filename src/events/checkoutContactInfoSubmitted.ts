// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_contact_info_submitted

import { PixelEventsCheckoutContactInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";
import { DataLayerMessage } from "@models";

import { buildEventHandler } from "@utils/buildEventHandler";

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
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

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

export function registerCheckoutContactInfoSubmitted(): void {
  const event = "checkout_contact_info_submitted";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: prepareGoogleCheckoutContactInfoSubmitted,
      meta: prepareMetaCheckoutContactInfoSubmitted,
      tiktok: prepareTikTokCheckoutContactInfoSubmitted,
    }),
  );
}
