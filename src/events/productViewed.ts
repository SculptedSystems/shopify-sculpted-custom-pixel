// https://shopify.dev/docs/api/web-pixels-api/standard-events/product_viewed

import {
  PartialCheckoutLineItemWithDiscountAllocations,
  DataLayerMessage,
} from "@models";
import { PixelEventsProductViewed } from "@shopify/web-pixels-extension";

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

  return {
    event: "view_item",
    ecommerce: {
      currency: currency,
      value: value,
      items: items,
    },
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

  return {
    event: "ViewContent",
    content_ids: content_ids,
    content_type: content_type,
    contents: contents,
    currency: currency,
    value: value,
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
  const item_id = getItemIdFromShopifyProductVariant(productVariant);
  const content_ids = [item_id];

  // parameter: currency
  const currency = productVariant.price.currencyCode;

  // parameter: value
  const value = productVariant.price.amount;

  // paramaeter: contents
  const contents = [
    {
      content_id: item_id,
      price: value,
      quantity: quantity,
    },
  ];

  return {
    event: "ViewContent",
    content_type: content_type,
    quantity: quantity,
    description: description,
    content_ids: content_ids,
    currency: currency,
    value: value,
    contents: contents,
  };
}

export function registerProductViewed(): void {
  const event = "product_viewed";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: {
        dataHandler: prepareGoogleProductViewed,
        userHandler: getGoogleUserDataFromGenericEvent,
      },
      meta: {
        dataHandler: prepareMetaProductViewed,
        userHandler: getMetaUserDataFromGenericEvent,
      },
      tiktok: {
        dataHandler: prepareTikTokProductViewed,
        userHandler: getTikTokUserDataFromGenericEvent,
      },
    }),
  );
}
