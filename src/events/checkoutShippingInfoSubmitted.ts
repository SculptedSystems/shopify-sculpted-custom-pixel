// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_shipping_info_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsPaymentInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

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

  // parameter: user_data
  const user_data = getGoogleUserDataFromCheckoutEvents(event);

  return {
    event: "add_shipping_info",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      shipping_tier: shipping_tier,
      items: items,
    },
    user_data: user_data,
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

  // parameter: user_data
  const user_data = getMetaUserDataFromCheckoutEvents(event);

  return {
    event: "AddShippingInfo",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    value: value,
    user_data: user_data,
  };
}

function prepareTikTokCheckoutShippingInfoSubmitted(
  event: PixelEventsPaymentInfoSubmitted,
): DataLayerMessage {
  // parameter: user_data
  const user_data = getTikTokUserDataFromCheckoutEvents(event);

  return {
    event: "AddShippingInfo",
    user_data: user_data,
  };
}

function handleCheckoutShippingInfoSubmitted(
  event: PixelEventsPaymentInfoSubmitted,
): void {
  const message = getDataLayerEventMessage(
    "shopify_checkout_shipping_info_submitted",
  );

  if (config.platform.google) {
    message.data.google = prepareGoogleCheckoutShippingInfoSubmitted(event);
  }

  if (config.platform.meta) {
    message.data.meta = prepareMetaCheckoutShippingInfoSubmitted(event);
  }

  if (config.platform.tiktok) {
    message.data.tiktok = prepareTikTokCheckoutShippingInfoSubmitted(event);
  }

  dataLayerPush(message);
}

export function registerCheckoutShippingInfoSubmitted(): void {
  analytics.subscribe(
    "checkout_shipping_info_submitted",
    buildEventHandler(handleCheckoutShippingInfoSubmitted),
  );
}
