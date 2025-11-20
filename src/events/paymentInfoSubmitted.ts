// https://shopify.dev/docs/api/web-pixels-api/standard-events/payment_info_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsPaymentInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

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

function prepareGooglePaymentInfoSubmitted(
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

  // parameter: payment_type
  const payment_type =
    checkout.transactions?.[0]?.paymentMethod.type || undefined;

  // parameter: items
  const items = getGoogleItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  // parameter: user_data
  const user_data = getGoogleUserDataFromCheckoutEvents(event);

  return {
    event: "add_payment_info",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      payment_type: payment_type,
      items: items,
    },
    user_data: user_data,
  };
}

function prepareMetaPaymentInfoSubmitted(
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
    event: "AddPaymentInfo",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    value: value,
    user_data: user_data,
  };
}

function prepareTikTokPaymentInfoSubmitted(
  event: PixelEventsPaymentInfoSubmitted,
): DataLayerMessage {
  // parameter: user_data
  const user_data = getTikTokUserDataFromCheckoutEvents(event);

  return {
    event: "AddPaymentInfo",
    user_data: user_data,
  };
}

export function registerPaymentInfoSubmitted(): void {
  const event = "payment_info_submitted";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: prepareGooglePaymentInfoSubmitted,
      meta: prepareMetaPaymentInfoSubmitted,
      tiktok: prepareTikTokPaymentInfoSubmitted,
    }),
  );
}
