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

  return {
    event: "page_view",
    page_location: page_location,
    page_referrer: page_referrer,
    page_title: page_title,
  };
}

function prepareMetaPageViewed(
  _event: PixelEventsPageViewed,
): DataLayerMessage {
  return {
    event: "PageView",
  };
}

function prepareTikTokPageViewed(
  _event: PixelEventsPageViewed,
): DataLayerMessage {
  return {
    event: "PageView",
  };
}

export function registerPageViewed(): void {
  const event = "page_viewed";
  window.analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: {
        dataHandler: prepareGooglePageViewed,
        userHandler: getGoogleUserDataFromGenericEvent,
      },
      meta: {
        dataHandler: prepareMetaPageViewed,
        userHandler: getMetaUserDataFromGenericEvent,
      },
      tiktok: {
        dataHandler: prepareTikTokPageViewed,
        userHandler: getTikTokUserDataFromGenericEvent,
      },
    }),
  );
}
