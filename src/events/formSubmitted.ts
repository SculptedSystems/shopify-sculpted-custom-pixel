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

  // parameter: user_data
  const user_data = getGoogleUserDataFromFormSubmittedEvents(event);

  return {
    event: "form_submit",
    form_id: form_id,
    user_data: user_data,
  };
}

function prepareMetaFormSubmitted(
  event: PixelEventsFormSubmitted,
): DataLayerMessage {
  const eventData = event.data;

  // parameter: form_id
  const form_id = eventData.element.id;

  // parameter: user_data
  const user_data = getMetaUserDataFromFormSubmittedEvents(event);

  return {
    event: "FormSubmit",
    form_id: form_id,
    user_data: user_data,
  };
}

function prepareTikTokFormSubmitted(
  event: PixelEventsFormSubmitted,
): DataLayerMessage {
  const eventData = event.data;

  // parameter: form_id
  const form_id = eventData.element.id;

  // parameter: user_data
  const user_data = getTikTokUserDataFromFormSubmittedEvents(event);

  return {
    event: "FormSubmit",
    form_id: form_id,
    user_data: user_data,
  };
}

export function registerFormSubmitted(): void {
  const event = "form_submitted";
  analytics.subscribe(
    event,
    buildEventHandler(event, {
      google: prepareGoogleFormSubmitted,
      meta: prepareMetaFormSubmitted,
      tiktok: prepareTikTokFormSubmitted,
    }),
  );
}
