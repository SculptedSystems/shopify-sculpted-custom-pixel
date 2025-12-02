// https://shopify.dev/docs/api/web-pixels-api/standard-events/search_submitted

import { DataLayerMessage, PartialCheckoutLineItem } from "@models";
import { PixelEventsSearchSubmitted } from "@shopify/web-pixels-extension";

import { buildEventHandler } from "@utils/buildEventHandler";

import { getContentIdsFromShopifyCheckoutLineItems } from "@helpers/items";
import {
  getGoogleUserDataFromGenericEvent,
  getMetaUserDataFromGenericEvent,
  getTikTokUserDataFromGenericEvent,
} from "@helpers/userData";

function prepareGoogleSearchSubmitted(
  event: PixelEventsSearchSubmitted,
): DataLayerMessage {
  const eventData = event.data;

  // parameter: search_term
  const search_term = eventData.searchResult.query;

  return {
    event: "search",
    search_term: search_term,
  };
}

function prepareMetaSearchSubmitted(
  event: PixelEventsSearchSubmitted,
): DataLayerMessage {
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

  return {
    event: "Search",
    content_ids: content_ids,
    content_type: content_type,
    search_term: search_string,
  };
}

function prepareTikTokSearchSubmitted(
  event: PixelEventsSearchSubmitted,
): DataLayerMessage {
  const eventData = event.data;

  // parameter: search_term
  const search_term = eventData.searchResult.query;

  return {
    event: "Search",
    search_term: search_term,
  };
}

export function registerSearchSubmitted(): void {
  const event = "search_submitted";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: {
        dataHandler: prepareGoogleSearchSubmitted,
        userHandler: getGoogleUserDataFromGenericEvent,
      },
      meta: {
        dataHandler: prepareMetaSearchSubmitted,
        userHandler: getMetaUserDataFromGenericEvent,
      },
      tiktok: {
        dataHandler: prepareTikTokSearchSubmitted,
        userHandler: getTikTokUserDataFromGenericEvent,
      },
    }),
  );
}
