// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_address_info_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsCheckoutAddressInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

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

function prepareGoogleCheckoutAddressInfoSubmitted(
  event: PixelEventsCheckoutAddressInfoSubmitted,
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
    event: "add_address_info",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      items: items,
    },
    user_data: user_data,
  };
}

function prepareMetaCheckoutAddressInfoSubmitted(
  event: PixelEventsCheckoutAddressInfoSubmitted,
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
    event: "AddAddressInfo",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    value: value,
    user_data: user_data,
  };
}

function prepareTikTokCheckoutAddressInfoSubmitted(
  event: PixelEventsCheckoutAddressInfoSubmitted,
): DataLayerMessage {
  // parameter: user_data
  const user_data = getTikTokUserDataFromCheckoutEvents(event);

  return {
    event: "AddAddressInfo",
    user_data: user_data,
  };
}

export function registerCheckoutAddressInfoSubmitted(): void {
  const event = "checkout_address_info_submitted";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: prepareGoogleCheckoutAddressInfoSubmitted,
      meta: prepareMetaCheckoutAddressInfoSubmitted,
      tiktok: prepareTikTokCheckoutAddressInfoSubmitted,
    }),
  );
}
