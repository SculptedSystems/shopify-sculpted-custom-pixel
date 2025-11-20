// https://shopify.dev/docs/api/web-pixels-api/standard-events/product_viewed

import {
  PartialCheckoutLineItemWithDiscountAllocations,
  DataLayerMessage,
} from "@models";
import { PixelEventsProductViewed } from "@sculptedsystems/shopify-web-pixels-api-types";

import { buildEventHandler } from "@utils/buildEventHandler";

import {
  addFinalLinePriceToPartialLineItemsWithDiscountAllocations,
  getGoogleItemsFromShopifyCheckoutLineItems,
  getItemIdFromShopifyProductVariant,
} from "@helpers/items";
import {
  getGoogleUserDataFromGenericEvent,
  getMetaUserDataFromGenericEvent,
  getTikTokUserDataFromGenericEvent,
} from "@helpers/userData";

function prepareGoogleProductViewed(
  event: PixelEventsProductViewed,
): DataLayerMessage {
  const eventData = event.data;
  const productVariant = eventData.productVariant;

  // parameter: currency
  const currency = productVariant.price.currencyCode;

  // parameter: value
  const value = productVariant.price.amount;

  // parameter: items
  const partialLineItems: PartialCheckoutLineItemWithDiscountAllocations[] = [
    {
      discountAllocations: [],
      quantity: 1,
      variant: productVariant,
    },
  ];
  const lineItems =
    addFinalLinePriceToPartialLineItemsWithDiscountAllocations(
      partialLineItems,
    );
  const items = getGoogleItemsFromShopifyCheckoutLineItems(lineItems);

  // parameter: user_data
  const user_data = getGoogleUserDataFromGenericEvent();

  return {
    event: "view_item",
    ecommerce: {
      currency: currency,
      value: value,
      items: items,
    },
    user_data: user_data,
  };
}

function prepareMetaProductViewed(
  event: PixelEventsProductViewed,
): DataLayerMessage {
  const eventData = event.data;
  const productVariant = eventData.productVariant;

  const item_id = getItemIdFromShopifyProductVariant(productVariant);

  // paramaeter: content_ids
  const content_ids = [item_id];

  // paramaeter: content_type
  const content_type = "product";

  // paramaeter: contents
  const contents = [
    {
      id: item_id,
      quantity: 1,
    },
  ];

  // parameter: currency
  const currency = productVariant.price.currencyCode;

  // parameter: value
  const value = productVariant.price.amount;

  // parameter: user_data
  const user_data = getMetaUserDataFromGenericEvent(event);

  return {
    event: "ViewContent",
    content_ids: content_ids,
    content_type: content_type,
    contents: contents,
    currency: currency,
    value: value,
    user_data: user_data,
  };
}

function prepareTikTokProductViewed(
  event: PixelEventsProductViewed,
): DataLayerMessage {
  const eventData = event.data;
  const productVariant = eventData.productVariant;

  // paramaeter: content_type
  const content_type = "product";

  // parameter: quantity
  const quantity = 1;

  // parameter: description
  const description = productVariant.product.title;

  // paramaeter: content_ids
  const content_ids = [getItemIdFromShopifyProductVariant(productVariant)];

  // parameter: currency
  const currency = productVariant.price.currencyCode;

  // parameter: value
  const value = productVariant.price.amount;

  // parameter: user_data
  const user_data = getTikTokUserDataFromGenericEvent(event);

  return {
    event: "ViewContent",
    content_type: content_type,
    quantity: quantity,
    description: description,
    content_ids: content_ids,
    currency: currency,
    value: value,
    user_data: user_data,
  };
}

export function registerProductViewed(): void {
  const event = "product_viewed";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: prepareGoogleProductViewed,
      meta: prepareMetaProductViewed,
      tiktok: prepareTikTokProductViewed,
    }),
  );
}
