// https://shopify.dev/docs/api/web-pixels-api/dom-events/form_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsFormSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import {
  getGoogleUserDataFromFormSubmittedEvents,
  getMetaUserDataFromFormSubmittedEvents,
  getTikTokUserDataFromFormSubmittedEvents,
} from "@helpers/userData";
import { getDataLayerEventMessage } from "@helpers/dataLayer";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

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

function handleFormSubmitted(event: PixelEventsFormSubmitted): void {
  const message = getDataLayerEventMessage("shopify_form_submitted");
  if (config.platform.google) {
    message.data.google = prepareGoogleFormSubmitted(event);
  }

  if (config.platform.meta) {
    message.data.meta = prepareMetaFormSubmitted(event);
  }

  if (config.platform.tiktok) {
    message.data.tiktok = prepareTikTokFormSubmitted(event);
  }

  dataLayerPush(message);
}

export function registerFormSubmitted(): void {
  analytics.subscribe("form_submitted", buildEventHandler(handleFormSubmitted));
}
