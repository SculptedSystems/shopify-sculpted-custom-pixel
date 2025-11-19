// https://shopify.dev/docs/api/web-pixels-api/standard-events/payment_info_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsPaymentInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import {
  getContentIdsFromShopifyCheckoutLineItems,
  getGoogleItemsFromShopifyCheckoutLineItems,
  getMetaContentsFromShopifyCheckoutLineItems,
} from "@helpers/items";
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function prepareGooglePaymentInfoSubmitted(
  event: PixelEventsPaymentInfoSubmitted,
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

  // parameter: payment_type
  const payment_type =
    checkout.transactions?.[0]?.paymentMethod.type || undefined;

  // parameter: items
  const items = getGoogleItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  message.google = {
    event: "add_payment_info",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      payment_type: payment_type,
      items: items,
    },
  };
}

function prepareMetaPaymentInfoSubmitted(
  event: PixelEventsPaymentInfoSubmitted,
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
    event: "AddPaymentInfo",
    content_ids: content_ids,
    contents: contents,
    currency: currency,
    value: value,
  };
}

function prepareTikTokPaymentInfoSubmitted(message: DataLayerMessage): void {
  if (!config.platform.tiktok) {
    return;
  }

  message.tiktok = {
    event: "AddPaymentInfo",
  };
}

function handlePaymentInfoSubmitted(
  event: PixelEventsPaymentInfoSubmitted,
): void {
  const message: DataLayerMessage = { event: "shopify_payment_info_submitted" };

  prepareGooglePaymentInfoSubmitted(event, message);
  prepareMetaPaymentInfoSubmitted(event, message);
  prepareTikTokPaymentInfoSubmitted(message);

  dataLayerPush(message);
}

export function registerPaymentInfoSubmitted(): void {
  analytics.subscribe(
    "payment_info_submitted",
    buildEventHandler(handlePaymentInfoSubmitted),
  );
}
