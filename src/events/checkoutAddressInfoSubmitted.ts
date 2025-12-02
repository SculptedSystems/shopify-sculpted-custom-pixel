// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_address_info_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsCheckoutAddressInfoSubmitted } from "@shopify/web-pixels-extension";

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

  return {
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

  return {
    event: "AddAddressInfo",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    value: value,
  };
}

function prepareTikTokCheckoutAddressInfoSubmitted(
  _event: PixelEventsCheckoutAddressInfoSubmitted,
): DataLayerMessage {
  return {
    event: "AddAddressInfo",
  };
}

export function registerCheckoutAddressInfoSubmitted(): void {
  const event = "checkout_address_info_submitted";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: {
        dataHandler: prepareGoogleCheckoutAddressInfoSubmitted,
        userHandler: getGoogleUserDataFromCheckoutEvents,
      },
      meta: {
        dataHandler: prepareMetaCheckoutAddressInfoSubmitted,
        userHandler: getMetaUserDataFromCheckoutEvents,
      },
      tiktok: {
        dataHandler: prepareTikTokCheckoutAddressInfoSubmitted,
        userHandler: getTikTokUserDataFromCheckoutEvents,
      },
    }),
  );
}
