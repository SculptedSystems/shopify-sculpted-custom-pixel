// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_address_info_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsCheckoutAddressInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import { getGoogleItemsFromShopifyCheckoutLineItems } from "@helpers/items";
import { getCustomer } from "@helpers/customer";
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function prepareGoogleCheckoutAddressInfoSubmitted(
  event: PixelEventsCheckoutAddressInfoSubmitted,
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
    event: "add_address_info",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      shipping_tier: shipping_tier,
      items: items,
    },
  };
}

function handleCheckoutAddressInfoSubmitted(
  event: PixelEventsCheckoutAddressInfoSubmitted,
): void {
  const message: DataLayerMessage = {
    event: "shopify_checkout_address_info_submitted",
  };

  prepareGoogleCheckoutAddressInfoSubmitted(event, message);

  dataLayerPush(message);
}

export function registerCheckoutAddressInfoSubmitted(): void {
  analytics.subscribe(
    "checkout_address_info_submitted",
    buildEventHandler(handleCheckoutAddressInfoSubmitted),
  );
}
