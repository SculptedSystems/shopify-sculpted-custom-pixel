// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_contact_info_submitted

import { PixelEventsCheckoutContactInfoSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { createGA4ItemsFromShopifyCheckoutLineItems } from "@helpers/items";
import { getCustomer } from "@helpers/customer";
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function handleCheckoutContactInfoSubmitted(
  event: PixelEventsCheckoutContactInfoSubmitted,
): void {
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
  const items = createGA4ItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  dataLayerPush({
    user_data: getCustomer(),
    event: "add_contact_info",
    ecommerce: {
      currency: currency,
      value: value,
      coupon: coupon,
      shipping_tier: shipping_tier,
      items: items,
    },
  });
}

export function registerCheckoutContactInfoSubmitted(): void {
  analytics.subscribe(
    "checkout_contact_info_submitted",
    buildEventHandler(handleCheckoutContactInfoSubmitted),
  );
}
