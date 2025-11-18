// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_shipping_info
// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_shipping_info_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsPaymentInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import { getGoogleItemsFromShopifyCheckoutLineItems } from "@helpers/items";
import { getCustomer } from "@helpers/customer";
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function prepareGoogleCheckoutShippingInfoSubmitted(
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

  // parameter: shipping_tier
  const shipping_tier =
    checkout.delivery?.selectedDeliveryOptions?.[0]?.title || undefined;

  // parameter: items
  const items = getGoogleItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  message.google = {
    user_data: getCustomer(),
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

function handleCheckoutShippingInfoSubmitted(
  event: PixelEventsPaymentInfoSubmitted,
): void {
  const message: DataLayerMessage = {
    event: "shopify_checkout_shipping_info_submitted",
  };

  prepareGoogleCheckoutShippingInfoSubmitted(event, message);

  dataLayerPush(message);
}

export function registerCheckoutShippingInfoSubmitted(): void {
  analytics.subscribe(
    "checkout_shipping_info_submitted",
    buildEventHandler(handleCheckoutShippingInfoSubmitted),
  );
}
