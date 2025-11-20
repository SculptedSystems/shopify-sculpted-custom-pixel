// https://shopify.dev/docs/api/web-pixels-api/standard-events/page_viewed

import { DataLayerMessage } from "@models";
import { PixelEventsPageViewed } from "@sculptedsystems/shopify-web-pixels-api-types";

import { buildEventHandler } from "@utils/buildEventHandler";

import {
  getGoogleUserDataFromGenericEvent,
  getMetaUserDataFromGenericEvent,
  getTikTokUserDataFromGenericEvent,
} from "@helpers/userData";

function prepareGooglePageViewed(
  event: PixelEventsPageViewed,
): DataLayerMessage {
  const eventContext = event.context?.document;

  // parameter: page_location
  const page_location = eventContext?.location?.href;

  // parameter: page_referrer
  const page_referrer = eventContext?.referrer;

  // parameter: page_title
  const page_title = eventContext?.title;

  // parameter: user_data
  const user_data = getGoogleUserDataFromGenericEvent();

  return {
    event: "page_view",
    page_location: page_location,
    page_referrer: page_referrer,
    page_title: page_title,
    user_data: user_data,
  };
}

function prepareMetaPageViewed(event: PixelEventsPageViewed): DataLayerMessage {
  // parameter: user_data
  const user_data = getMetaUserDataFromGenericEvent(event);

  return {
    event: "PageView",
    user_data: user_data,
  };
}

function prepareTikTokPageViewed(
  event: PixelEventsPageViewed,
): DataLayerMessage {
  // parameter: user_data
  const user_data = getTikTokUserDataFromGenericEvent(event);

  return {
    event: "PageView",
    user_data: user_data,
  };
}

export function registerPageViewed(): void {
  const event = "page_viewed";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: prepareGooglePageViewed,
      meta: prepareMetaPageViewed,
      tiktok: prepareTikTokPageViewed,
    }),
  );
}
