// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed

import { DataLayerMessage } from "@models";
import { PixelEventsCheckoutCompleted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

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

  // parameter: user_data
  const user_data = getGoogleUserDataFromCheckoutEvents(event);

  message.google = {
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

  message.meta = {
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
  message: DataLayerMessage,
): void {
  if (!config.platform.tiktok) {
    return;
  }

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

  message.tiktok = {
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

function handleCheckoutCompleted(event: PixelEventsCheckoutCompleted): void {
  const message: DataLayerMessage = { event: "shopify_checkout_completed" };

  prepareGoogleCheckoutCompleted(event, message);
  prepareMetaCheckoutCompleted(event, message);
  prepareTikTokCheckoutCompleted(event, message);

  dataLayerPush(message);
}

export function registerCheckoutCompleted(): void {
  analytics.subscribe(
    "checkout_completed",
    buildEventHandler(handleCheckoutCompleted),
  );
}
