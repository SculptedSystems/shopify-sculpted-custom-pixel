// https://shopify.dev/docs/api/web-pixels-api/dom-events/form_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsFormSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { buildEventHandler } from "@utils/buildEventHandler";

import {
  getGoogleUserDataFromFormSubmittedEvents,
  getMetaUserDataFromFormSubmittedEvents,
  getTikTokUserDataFromFormSubmittedEvents,
} from "@helpers/userData";

function prepareGoogleFormSubmitted(
  event: PixelEventsFormSubmitted,
): DataLayerMessage {
  const eventData = event.data;

  // parameter: form_id
  const form_id = eventData.element.id;

  return {
    event: "form_submit",
    form_id: form_id,
  };
}

function prepareMetaFormSubmitted(
  event: PixelEventsFormSubmitted,
): DataLayerMessage {
  const eventData = event.data;

  // parameter: form_id
  const form_id = eventData.element.id;

  return {
    event: "FormSubmit",
    form_id: form_id,
  };
}

function prepareTikTokFormSubmitted(
  event: PixelEventsFormSubmitted,
): DataLayerMessage {
  const eventData = event.data;

  // parameter: form_id
  const form_id = eventData.element.id;

  return {
    event: "FormSubmit",
    form_id: form_id,
  };
}

export function registerFormSubmitted(): void {
  const event = "form_submitted";
  window.analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: {
        dataHandler: prepareGoogleFormSubmitted,
        userHandler: getGoogleUserDataFromFormSubmittedEvents,
      },
      meta: {
        dataHandler: prepareMetaFormSubmitted,
        userHandler: getMetaUserDataFromFormSubmittedEvents,
      },
      tiktok: {
        dataHandler: prepareTikTokFormSubmitted,
        userHandler: getTikTokUserDataFromFormSubmittedEvents,
      },
    }),
  );
}
