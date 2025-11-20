// https://shopify.dev/docs/api/web-pixels-api/standard-events/search_submitted

import { DataLayerMessage, PartialCheckoutLineItem } from "@models";
import { PixelEventsSearchSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import {
  getGoogleUserDataFromGenericEvent,
  getMetaUserDataFromGenericEvent,
  getTikTokUserDataFromGenericEvent,
} from "@helpers/userData";
import { getDataLayerEventMessage } from "@helpers/dataLayer";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";
import { getContentIdsFromShopifyCheckoutLineItems } from "@helpers/items";

function prepareGoogleSearchSubmitted(
  event: PixelEventsSearchSubmitted,
): DataLayerMessage {
  const eventData = event.data;

  // parameter: search_term
  const search_term = eventData.searchResult.query;

  // parameter: user_data
  const user_data = getGoogleUserDataFromGenericEvent();

  return {
    event: "search",
    search_term: search_term,
    user_data: user_data,
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

  // parameter: user_data
  const user_data = getMetaUserDataFromGenericEvent(event);

  return {
    event: "Search",
    content_ids: content_ids,
    content_type: content_type,
    search_term: search_string,
    user_data: user_data,
  };
}

function prepareTikTokSearchSubmitted(
  event: PixelEventsSearchSubmitted,
): DataLayerMessage {
  const eventData = event.data;

  // parameter: search_term
  const search_term = eventData.searchResult.query;

  // parameter: user_data
  const user_data = getTikTokUserDataFromGenericEvent();

  return {
    event: "Search",
    search_term: search_term,
    user_data: user_data,
  };
}

function handleSearchSubmitted(event: PixelEventsSearchSubmitted): void {
  const message = getDataLayerEventMessage("shopify_search_submitted");

  if (config.platform.google) {
    message.data.google = prepareGoogleSearchSubmitted(event);
  }

  if (config.platform.meta) {
    message.data.meta = prepareMetaSearchSubmitted(event);
  }

  if (config.platform.tiktok) {
    message.data.tiktok = prepareTikTokSearchSubmitted(event);
  }

  dataLayerPush(message);
}

export function registerSearchSubmitted(): void {
  analytics.subscribe(
    "search_submitted",
    buildEventHandler(handleSearchSubmitted),
  );
}
