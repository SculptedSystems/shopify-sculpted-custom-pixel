// https://shopify.dev/docs/api/web-pixels-api/standard-events/product_added_to_cart

import { PartialCheckoutLineItem, DataLayerMessage } from "@models";
import { PixelEventsProductAddedToCart } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import {
  addFinalLinePriceToPartialLineItems,
  getGoogleItemsFromShopifyCheckoutLineItems,
  getItemIdFromShopifyProductVariant,
} from "@helpers/items";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";
import { logger } from "@utils/logger";

function prepareGoogleProductAddedToCart(
  event: PixelEventsProductAddedToCart,
  message: DataLayerMessage,
): void {
  if (!config.platform.google) {
    return;
  }

  const eventData = event.data;
  const cartLine = eventData.cartLine;

  if (!cartLine) {
    logger.debug("cartLine is null. Not pushing event.");
    return;
  }

  // parameter: currency
  const currency = cartLine.cost.totalAmount.currencyCode;

  // parameter: value
  const value = cartLine.cost.totalAmount.amount;

  // parameter: items
  const productVariant = cartLine.merchandise;
  const quantity = cartLine?.quantity || 0;
  const partialCheckoutLineItems: PartialCheckoutLineItem[] = [
    {
      discountAllocations: [],
      quantity: quantity,
      variant: productVariant,
    },
  ];
  const lineItems = addFinalLinePriceToPartialLineItems(
    partialCheckoutLineItems,
  );
  const items = getGoogleItemsFromShopifyCheckoutLineItems(lineItems);

  message.google = {
    event: "add_to_cart",
    ecommerce: {
      currency: currency,
      value: value,
      items: items,
    },
  };
}

function prepareMetaProductAddedToCart(
  event: PixelEventsProductAddedToCart,
  message: DataLayerMessage,
): void {
  if (!config.platform.meta) {
    return;
  }

  const eventData = event.data;
  const cartLine = eventData.cartLine;

  if (!cartLine) {
    logger.debug("cartLine is null. Not pushing event.");
    return;
  }

  const item_id = getItemIdFromShopifyProductVariant(cartLine.merchandise);

  // paramater: content_ids
  const content_ids = [item_id];

  // paramater: content_type
  const content_type = "product";

  // paramater: contents
  const contents = [
    {
      id: item_id,
      quantity: cartLine.quantity,
    },
  ];

  // paramater: currency
  const currency = cartLine.cost.totalAmount.currencyCode;

  // paramater: value
  const value = cartLine.cost.totalAmount.amount;

  message.meta = {
    event: "AddToCart",
    content_ids: content_ids,
    content_type: content_type,
    contents: contents,
    currency: currency,
    value: value,
  };
}

function prepareTikTokProductAddedToCart(
  event: PixelEventsProductAddedToCart,
  message: DataLayerMessage,
): void {
  if (!config.platform.tiktok) {
    return;
  }

  const eventData = event.data;
  const cartLine = eventData.cartLine;

  if (!cartLine) {
    logger.debug("cartLine is null. Not pushing event.");
    return;
  }

  // parameter: content_type
  const content_type = "product";

  // parameter: quantity
  const quantity = cartLine.quantity;

  // parameter: description
  const description = cartLine.merchandise.product.title;

  // parameter: content_ids
  const content_ids = [
    getItemIdFromShopifyProductVariant(cartLine.merchandise),
  ];

  // parameter: currency
  const currency = cartLine.cost.totalAmount.currencyCode;

  // parameter: value
  const value = cartLine.cost.totalAmount.amount;

  message.tiktok = {
    event: "AddToCart",
    content_type: content_type,
    quantity: quantity,
    description: description,
    content_ids: content_ids,
    currency: currency,
    value: value,
  };
}

function handleProductAddedToCart(event: PixelEventsProductAddedToCart): void {
  const message: DataLayerMessage = { event: "shopify_product_added_to_cart" };

  prepareGoogleProductAddedToCart(event, message);
  prepareMetaProductAddedToCart(event, message);
  prepareTikTokProductAddedToCart(event, message);

  dataLayerPush(message);
}

export function registerProductAddedToCart(): void {
  analytics.subscribe(
    "product_added_to_cart",
    buildEventHandler(handleProductAddedToCart),
  );
}
