// https://shopify.dev/docs/api/web-pixels-api/standard-events/search_submitted

import { DataLayerMessage, PartialCheckoutLineItem } from "@models";
import { PixelEventsSearchSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";
import {
  getContentIdsFromShopifyCheckoutLineItems,
  getMetaContentsFromShopifyCheckoutLineItems,
} from "@helpers/items";

function prepareGoogleSearchSubmitted(
  event: PixelEventsSearchSubmitted,
  message: DataLayerMessage,
): void {
  if (!config.platform.google) {
    return;
  }

  const eventData = event.data;

  // parameter: search_term
  const search_term = eventData.searchResult.query;

  message.google = {
    event: "search",
    search_term: search_term,
  };
}

function prepareMetaSearchSubmitted(
  event: PixelEventsSearchSubmitted,
  message: DataLayerMessage,
): void {
  if (!config.platform.meta) {
    return;
  }

  const eventData = event.data;
  const searchResult = eventData.searchResult;

  const partialCheckoutLineItems: PartialCheckoutLineItem[] = [];

  searchResult.productVariants.forEach((variant) => {
    partialCheckoutLineItems.push({
      quantity: 1,
      variant: variant,
    });
  });

  // parameter: content_ids
  const content_ids = getContentIdsFromShopifyCheckoutLineItems(
    partialCheckoutLineItems,
  );

  // parameter: content_type
  const content_type = "product";

  // parameter: search_term
  const search_string = searchResult.query;

  message.meta = {
    event: "Search",
    content_ids: content_ids,
    content_type: content_type,
    search_term: search_string,
  };
}

function prepareTikTokSearchSubmitted(
  event: PixelEventsSearchSubmitted,
  message: DataLayerMessage,
): void {
  if (!config.platform.tiktok) {
    return;
  }

  const eventData = event.data;

  // parameter: search_term
  const search_term = eventData.searchResult.query;

  message.tiktok = {
    event: "Search",
    search_term: search_term,
  };
}

function handleSearchSubmitted(event: PixelEventsSearchSubmitted): void {
  const message: DataLayerMessage = { event: "shopify_search_submitted" };

  prepareGoogleSearchSubmitted(event, message);
  prepareMetaSearchSubmitted(event, message);
  prepareTikTokSearchSubmitted(event, message);

  dataLayerPush(message);
}

export function registerSearchSubmitted(): void {
  analytics.subscribe(
    "search_submitted",
    buildEventHandler(handleSearchSubmitted),
  );
}
