// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_contact_info_submitted

import { PixelEventsCheckoutContactInfoSubmitted } from "@shopify/web-pixels-extension";
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

  return {
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
    event: "AddContactInfo",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    value: value,
  };
}

function prepareTikTokCheckoutContactInfoSubmitted(
  _event: PixelEventsCheckoutContactInfoSubmitted,
): DataLayerMessage {
  return {
    event: "AddContactInfo",
  };
}

export function registerCheckoutContactInfoSubmitted(): void {
  const event = "checkout_contact_info_submitted";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: {
        dataHandler: prepareGoogleCheckoutContactInfoSubmitted,
        userHandler: getGoogleUserDataFromCheckoutEvents,
      },
      meta: {
        dataHandler: prepareMetaCheckoutContactInfoSubmitted,
        userHandler: getMetaUserDataFromCheckoutEvents,
      },
      tiktok: {
        dataHandler: prepareTikTokCheckoutContactInfoSubmitted,
        userHandler: getTikTokUserDataFromCheckoutEvents,
      },
    }),
  );
}
