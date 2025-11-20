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

  // parameter: user_data
  const user_data = getGoogleUserDataFromGenericEvent();

  return {
    event: "add_to_cart",
    ecommerce: {
      currency: currency,
      value: value,
      items: items,
    },
    user_data: user_data,
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

  // parameter: user_data
  const user_data = getMetaUserDataFromGenericEvent(event);

  return {
    event: "AddToCart",
    content_ids: content_ids,
    content_type: content_type,
    contents: contents,
    currency: currency,
    value: value,
    user_data: user_data,
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
  const content_ids = [
    getItemIdFromShopifyProductVariant(cartLine.merchandise),
  ];

  // parameter: currency
  const currency = cartLine.cost.totalAmount.currencyCode;

  // parameter: value
  const value = cartLine.cost.totalAmount.amount;

  // parameter: user_data
  const user_data = getTikTokUserDataFromGenericEvent(event);

  return {
    event: "AddToCart",
    content_type: content_type,
    quantity: quantity,
    description: description,
    content_ids: content_ids,
    currency: currency,
    value: value,
    user_data: user_data,
  };
}

export function registerProductAddedToCart(): void {
  const event = "product_added_to_cart";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: prepareGoogleProductAddedToCart,
      meta: prepareMetaProductAddedToCart,
      tiktok: prepareTikTokProductAddedToCart,
    }),
  );
}
