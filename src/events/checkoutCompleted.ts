// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed

import { DataLayerMessage } from "@models";
import { PixelEventsCheckoutCompleted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { buildEventHandler } from "@utils/buildEventHandler";

import {
  getContentIdsFromShopifyCheckoutLineItems,
  getGoogleItemsFromShopifyCheckoutLineItems,
  getMetaContentsFromShopifyCheckoutLineItems,
  getNumItemsFromShopifyCheckoutLineItems,
} from "@helpers/items";
import {
  getGoogleUserDataFromCheckoutEvents,
  getMetaUserDataFromCheckoutEvents,
  getTikTokUserDataFromCheckoutEvents,
} from "@helpers/userData";
import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";

function prepareGoogleCheckoutCompleted(
  event: PixelEventsCheckoutCompleted,
): DataLayerMessage {
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

  // parameter: user_data
  const user_data = getGoogleUserDataFromCheckoutEvents(event);

  return {
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
    user_data: user_data,
  };
}

function prepareMetaCheckoutCompleted(
  event: PixelEventsCheckoutCompleted,
): DataLayerMessage {
  const eventData = event.data;
  const checkout = eventData.checkout;

  // parameter: content_ids
  const content_ids = getContentIdsFromShopifyCheckoutLineItems(
    checkout.lineItems,
  );

  // parameter: content_type
  const content_type = "product";

  // parameter: contents
  const contents = getMetaContentsFromShopifyCheckoutLineItems(
    checkout.lineItems,
  );

  // parameter: currency
  const currency = checkout.subtotalPrice?.currencyCode;

  // parameter: num_items
  const num_items = getNumItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  // parameter: value
  const value = checkout.subtotalPrice?.amount || 0;

  // parameter: user_data
  const user_data = getMetaUserDataFromCheckoutEvents(event);

  return {
    event: "Purchase",
    content_ids: content_ids,
    content_type: content_type,
    contents: contents,
    currency: currency,
    num_items: num_items,
    value: value,
    user_data: user_data,
  };
}

function prepareTikTokCheckoutCompleted(
  event: PixelEventsCheckoutCompleted,
): DataLayerMessage {
  const eventData = event.data;
  const checkout = eventData.checkout;

  // parameter: content_type
  const content_type = "product";

  // parameter: quantity
  const quantity = getNumItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  // parameter: description
  const description = "Completed Purchase";

  // parameter: content_ids
  const content_ids = getContentIdsFromShopifyCheckoutLineItems(
    checkout.lineItems,
  );

  // parameter: currency
  const currency = checkout.subtotalPrice?.currencyCode;

  // parameter: value
  const value = checkout.subtotalPrice?.amount || 0;

  // parameter: user_data
  const user_data = getTikTokUserDataFromCheckoutEvents(event);

  return {
    event: "Purchase",
    content_type: content_type,
    quantity: quantity,
    description: description,
    content_ids: content_ids,
    currency: currency,
    value: value,
    user_data: user_data,
  };
}

export function registerCheckoutCompleted(): void {
  const event = "checkout_completed";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: prepareGoogleCheckoutCompleted,
      meta: prepareMetaCheckoutCompleted,
      tiktok: prepareTikTokCheckoutCompleted,
    }),
  );
}
