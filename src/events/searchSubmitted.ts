// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#search
// https://shopify.dev/docs/api/web-pixels-api/standard-events/search_submitted

import { PixelEventsSearchSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { getCustomer } from "@helpers/customer";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function handleSearchSubmitted(event: PixelEventsSearchSubmitted): void {
  const eventData = event.data;

  // parameter: search_term
  const search_term = eventData.searchResult.query;

  dataLayerPush({
    user_data: getCustomer(),
    event: "search",
    search_term: search_term,
  });
}

export function registerSearchSubmitted(): void {
  analytics.subscribe(
    "search_submitted",
    buildEventHandler(handleSearchSubmitted),
  );
}
