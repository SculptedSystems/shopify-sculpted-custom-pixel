// https://shopify.dev/docs/api/web-pixels-api/standard-events/product_added_to_cart

import {
  DataLayerMessage,
  PartialCheckoutLineItemWithDiscountAllocations,
} from "@models";
import { PixelEventsProductAddedToCart } from "@sculptedsystems/shopify-web-pixels-api-types";

import { buildEventHandler } from "@utils/buildEventHandler";
import { logger } from "@utils/logger";

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

function prepareGoogleProductAddedToCart(
  event: PixelEventsProductAddedToCart,
): DataLayerMessage {
  const eventData = event.data;
  const cartLine = eventData.cartLine;

  if (!cartLine) {
    logger.debug("cartLine is null. Not pushing event.");
    return { event: "" };
  }

  // parameter: currency
  const currency = cartLine.cost.totalAmount.currencyCode;

  // parameter: value
  const value = cartLine.cost.totalAmount.amount;

  // parameter: items
  const productVariant = cartLine.merchandise;
  const quantity = cartLine?.quantity || 0;
  const partialCheckoutLineItems: PartialCheckoutLineItemWithDiscountAllocations[] =
    [
      {
        discountAllocations: [],
        quantity: quantity,
        variant: productVariant,
      },
    ];
  const lineItems = addFinalLinePriceToPartialLineItemsWithDiscountAllocations(
    partialCheckoutLineItems,
  );
  const items = getGoogleItemsFromShopifyCheckoutLineItems(lineItems);

  return {
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
): DataLayerMessage {
  const eventData = event.data;
  const cartLine = eventData.cartLine;

  if (!cartLine) {
    logger.debug("cartLine is null. Not pushing event.");
    return { event: "" };
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

  return {
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
): DataLayerMessage {
  const eventData = event.data;
  const cartLine = eventData.cartLine;

  if (!cartLine) {
    logger.debug("cartLine is null. Not pushing event.");
    return { event: "" };
  }

  // parameter: content_type
  const content_type = "product";

  // parameter: quantity
  const quantity = cartLine.quantity;

  // parameter: description
  const description = cartLine.merchandise.product.title;

  // parameter: content_ids
  const content_id = getItemIdFromShopifyProductVariant(cartLine.merchandise);
  const content_ids = [content_id];

  // parameter: currency
  const currency = cartLine.cost.totalAmount.currencyCode;

  // parameter: value
  const value = cartLine.cost.totalAmount.amount;

  // parameter: contents
  const contents = [
    {
      content_id: content_id,
      price: value,
      quantity: quantity,
    },
  ];

  return {
    event: "AddToCart",
    content_type: content_type,
    quantity: quantity,
    description: description,
    content_ids: content_ids,
    currency: currency,
    value: value,
    contents: contents,
  };
}

export function registerProductAddedToCart(): void {
  const event = "product_added_to_cart";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: {
        dataHandler: prepareGoogleProductAddedToCart,
        userHandler: getGoogleUserDataFromGenericEvent,
      },
      meta: {
        dataHandler: prepareMetaProductAddedToCart,
        userHandler: getMetaUserDataFromGenericEvent,
      },
      tiktok: {
        dataHandler: prepareTikTokProductAddedToCart,
        userHandler: getTikTokUserDataFromGenericEvent,
      },
    }),
  );
}
