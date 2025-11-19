// https://shopify.dev/docs/api/web-pixels-api/standard-events/page_viewed

import { DataLayerMessage } from "@models";
import { PixelEventsPageViewed } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import {
  getGoogleUserDataFromGenericEvent,
  getMetaUserDataFromGenericEvent,
  getTikTokUserDataFromGenericEvent,
} from "@helpers/userData";

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

  // parameter: user_data
  const user_data = getGoogleUserDataFromGenericEvent();

  message.google = {
    event: "page_view",
    page_location: page_location,
    page_referrer: page_referrer,
    page_title: page_title,
    user_data: user_data,
  };
}

function prepareMetaPageViewed(
  event: PixelEventsPageViewed,
  message: DataLayerMessage,
): void {
  if (!config.platform.meta) {
    return;
  }

  // parameter: user_data
  const user_data = getMetaUserDataFromGenericEvent(event);

  message.meta = {
    event: "PageView",
    user_data: user_data,
  };
}

function prepareTikTokPageViewed(message: DataLayerMessage): void {
  if (!config.platform.tiktok) {
    return;
  }

  // parameter: user_data
  const user_data = getTikTokUserDataFromGenericEvent();

  message.tiktok = {
    event: "PageView",
    user_data: user_data,
  };
}

function handlePageViewed(event: PixelEventsPageViewed): void {
  const message: DataLayerMessage = { event: "shopify_page_viewed" };

  prepareGooglePageViewed(event, message);
  prepareMetaPageViewed(event, message);
  prepareTikTokPageViewed(message);

  dataLayerPush(message);
}

export function registerPageViewed(): void {
  analytics.subscribe("page_viewed", buildEventHandler(handlePageViewed));
}
