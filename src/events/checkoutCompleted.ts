// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#purchase
// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed

import { DataLayerMessage } from "@models";
import { PixelEventsCheckoutCompleted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import { getGoogleItemsFromShopifyCheckoutLineItems } from "@helpers/items";
import { getCustomer } from "@helpers/customer";
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function prepareGoogleCheckoutCompleted(
  event: PixelEventsCheckoutCompleted,
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

  // parameter: customer_type
  const firstOrder = checkout.order?.customer?.isFirstOrder ?? true;
  const customer_type = firstOrder ? "new" : "returning";

  // parameter: transaction_id
  const transaction_id = event.id;

  // parameter: coupon
  const coupon = getWholeCartCouponFromDiscountApplications(
    checkout.discountApplications,
  );

  // parameter: shipping
  const shipping = checkout.shippingLine?.price?.amount || 0;

  // parameter: tax
  const tax = checkout.totalTax.amount || 0;

  // parameter: payment_type
  const payment_type = checkout.transactions[0]?.paymentMethod.type || null;

  // parameter: payment_gateway
  const payment_gateway = checkout.transactions[0]?.gateway || null;

  // parameter: items
  const items = getGoogleItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  message.google = {
    user_data: getCustomer(),
    event: "purchase",
    ecommerce: {
      currency: currency,
      value: value,
      customer_type: customer_type,
      transaction_id: transaction_id,
      coupon: coupon,
      shipping: shipping,
      tax: tax,
      payment_type: payment_type,
      payment_gateway: payment_gateway,
      items: items,
    },
  };
}

function handleCheckoutCompleted(event: PixelEventsCheckoutCompleted): void {
  const message: DataLayerMessage = { event: "shopify_checkout_completed" };

  prepareGoogleCheckoutCompleted(event, message);

  dataLayerPush(message);
}

export function registerCheckoutCompleted(): void {
  analytics.subscribe(
    "checkout_completed",
    buildEventHandler(handleCheckoutCompleted),
  );
}
