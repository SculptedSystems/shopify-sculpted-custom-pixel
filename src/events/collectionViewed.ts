// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_item_list
// https://shopify.dev/docs/api/web-pixels-api/standard-events/collection_viewed

import { PartialCheckoutLineItem, DataLayerMessage } from "@models";
import { PixelEventsCollectionViewed } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import { addFinalLinePriceToPartialLineItems } from "@helpers/items";
import { createGA4ItemsFromShopifyCheckoutLineItems } from "@helpers/items";
import { getCustomer } from "@helpers/customer";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function prepareGoogleCollectionViewed(
  event: PixelEventsCollectionViewed,
  message: DataLayerMessage,
): void {
  if (!config.platform.google) {
    return;
  }

  const eventData = event.data;
  const productVariants = eventData.collection.productVariants;

  // parameter: currency
  const currency = productVariants[0]?.price.currencyCode || null;

  // parameter: item_list_id
  const item_list_id = eventData.collection.id;

  // parameter: item_list_name
  const item_list_name = eventData.collection.title;

  // parameter: items
  const partialCheckoutLineItems: PartialCheckoutLineItem[] = [];
  productVariants.forEach((productVariant) => {
    partialCheckoutLineItems.push({
      discountAllocations: [],
      quantity: 1,
      variant: productVariant,
    });
  });

  const lineItems = addFinalLinePriceToPartialLineItems(
    partialCheckoutLineItems,
  );
  const items = createGA4ItemsFromShopifyCheckoutLineItems(lineItems);

  message.google = {
    user_data: getCustomer(),
    event: "view_item_list",
    ecommerce: {
      currency: currency,
      item_list_id: item_list_id,
      item_list_name: item_list_name,
      items: items,
    },
  };
}

function handleCollectionViewed(event: PixelEventsCollectionViewed): void {
  const message: DataLayerMessage = { event: "shopify_collection_viewed" };

  prepareGoogleCollectionViewed(event, message);

  dataLayerPush(message);
}

export function registerCollectionViewed(): void {
  analytics.subscribe(
    "collection_viewed",
    buildEventHandler(handleCollectionViewed),
  );
}
