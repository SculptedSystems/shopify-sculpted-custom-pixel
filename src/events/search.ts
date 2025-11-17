// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#search
// https://shopify.dev/docs/api/web-pixels-api/standard-events/search_submitted

import { PixelEventsSearchSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { dataLayerPush } from "@helpers/dataLayer";
import { getCustomer } from "@helpers/customer";

import { buildEventHandler } from "@utils/buildEventHandler";

function handleSearch(event: PixelEventsSearchSubmitted): void {
  const eventData = event.data;

  // parameter: search_term
  const search_term = eventData.searchResult.query;

  dataLayerPush({
    customer: getCustomer(),
    event: "search",
    search_term: search_term,
  });
}

export function registerSearch(): void {
  analytics.subscribe("search_submitted", buildEventHandler(handleSearch));
}
