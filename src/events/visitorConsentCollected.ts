// https://shopify.dev/docs/api/web-pixels-api/pixel-privacy#customer-privacy-api

import { PixelEventsVisitorConsentCollected } from "@models";

import { config } from "@config";

import { dataLayerPush } from "@utils/dataLayer";
import { isCheckout } from "@utils/isCheckout";
import { buildEventHandler } from "@utils/buildEventHandler";

import { getDataLayerEventMessage } from "@helpers/dataLayer";

import {
  prepareGooglePageViewed,
  prepareMetaPageViewed,
  prepareTikTokPageViewed,
} from "@events/pageViewed";

import {
  getGoogleUserDataFromGenericEvent,
  getMetaUserDataFromGenericEvent,
  getTikTokUserDataFromGenericEvent,
} from "@helpers/userData";

export function registerVisitorConsentCollected(): void {
  const eventName = `${config.gtm.event.prefix}visitor_consent_collected${config.gtm.event.postfix}`;
  const message = getDataLayerEventMessage(eventName);

  if (isCheckout()) {
    // Shopify doesn't emit "visitorConsentCollected" on checkout pages
    // so we are pushing this event manually on registration as a work-around
    dataLayerPush(message);
    return;
  }

  const event = "visitorConsentCollected";
  api.customerPrivacy.subscribe(
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
    event.customerPrivacy,
  );
}
