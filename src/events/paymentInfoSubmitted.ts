// https://shopify.dev/docs/api/web-pixels-api/standard-events/payment_info_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsPaymentInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import { getGoogleItemsFromShopifyCheckoutLineItems } from "@helpers/items";
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

function handlePaymentInfoSubmitted(
  event: PixelEventsPaymentInfoSubmitted,
): void {
  const message: DataLayerMessage = { event: "shopify_payment_info_submitted" };

  prepareGooglePaymentInfoSubmitted(event, message);

  dataLayerPush(message);
}

export function registerPaymentInfoSubmitted(): void {
  analytics.subscribe(
    "payment_info_submitted",
    buildEventHandler(handlePaymentInfoSubmitted),
  );
}
