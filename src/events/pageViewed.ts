// https://shopify.dev/docs/api/web-pixels-api/standard-events/page_viewed

import { DataLayerMessage } from "@models";
import { PixelEventsPageViewed } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function prepareGooglePageViewed(
  event: PixelEventsPageViewed,
  message: DataLayerMessage,
): void {
  if (!config.platform.google) {
    return;
  }

  const eventContext = event.context?.document;

  // parameter: page_location
  const page_location = eventContext?.location?.href;

  // parameter: page_referrer
  const page_referrer = eventContext?.referrer;

  // parameter: page_title
  const page_title = eventContext?.title;

  message.google = {
    event: "page_view",
    page_location: page_location,
    page_referrer: page_referrer,
    page_title: page_title,
  };
}

function handlePageViewed(event: PixelEventsPageViewed): void {
  const message: DataLayerMessage = { event: "shopify_page_viewed" };

  prepareGooglePageViewed(event, message);

  dataLayerPush(message);
}

export function registerPageViewed(): void {
  analytics.subscribe("page_viewed", buildEventHandler(handlePageViewed));
}
