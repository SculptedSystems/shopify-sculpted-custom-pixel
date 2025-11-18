// https://shopify.dev/docs/api/web-pixels-api/standard-events/search_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsSearchSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

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

function handleSearchSubmitted(event: PixelEventsSearchSubmitted): void {
  const message: DataLayerMessage = { event: "shopify_search_submitted" };

  prepareGoogleSearchSubmitted(event, message);

  dataLayerPush(message);
}

export function registerSearchSubmitted(): void {
  analytics.subscribe(
    "search_submitted",
    buildEventHandler(handleSearchSubmitted),
  );
}
