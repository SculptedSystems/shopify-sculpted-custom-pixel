// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_shipping_info_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsPaymentInfoSubmitted } from "@shopify/web-pixels-extension";

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

function prepareGoogleCheckoutShippingInfoSubmitted(
  event: PixelEventsPaymentInfoSubmitted,
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

  // parameter: shipping_tier
  const shipping_tier =
    checkout.delivery?.selectedDeliveryOptions?.[0]?.title || undefined;

  // parameter: items
  const items = getGoogleItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  return {
    event: "add_shipping_info",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      shipping_tier: shipping_tier,
      items: items,
    },
  };
}

function prepareMetaCheckoutShippingInfoSubmitted(
  event: PixelEventsPaymentInfoSubmitted,
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
    event: "AddShippingInfo",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    value: value,
  };
}

function prepareTikTokCheckoutShippingInfoSubmitted(
  _event: PixelEventsPaymentInfoSubmitted,
): DataLayerMessage {
  return {
    event: "AddShippingInfo",
  };
}

export function registerCheckoutShippingInfoSubmitted(): void {
  const event = "checkout_shipping_info_submitted";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: {
        dataHandler: prepareGoogleCheckoutShippingInfoSubmitted,
        userHandler: getGoogleUserDataFromCheckoutEvents,
      },
      meta: {
        dataHandler: prepareMetaCheckoutShippingInfoSubmitted,
        userHandler: getMetaUserDataFromCheckoutEvents,
      },
      tiktok: {
        dataHandler: prepareTikTokCheckoutShippingInfoSubmitted,
        userHandler: getTikTokUserDataFromCheckoutEvents,
      },
    }),
  );
}
