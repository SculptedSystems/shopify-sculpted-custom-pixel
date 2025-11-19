// https://shopify.dev/docs/api/web-pixels-api/dom-events/form_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsFormSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import {
  getGoogleUserDataFromFormSubmittedEvents,
  getMetaUserDataFromFormSubmittedEvents,
  getTikTokUserDataFromFormSubmittedEvents,
} from "@helpers/userData";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function prepareGoogleFormSubmitted(
  event: PixelEventsFormSubmitted,
  message: DataLayerMessage,
): void {
  if (!config.platform.google) {
    return;
  }

  const eventData = event.data;

  // parameter: form_id
  const form_id = eventData.element.id;

  // parameter: user_data
  const user_data = getGoogleUserDataFromFormSubmittedEvents(event);

  message.google = {
    event: "form_submit",
    form_id: form_id,
    user_data: user_data,
  };
}

function prepareMetaFormSubmitted(
  event: PixelEventsFormSubmitted,
  message: DataLayerMessage,
): void {
  if (!config.platform.meta) {
    return;
  }

  const eventData = event.data;

  // parameter: form_id
  const form_id = eventData.element.id;

  // parameter: user_data
  const user_data = getMetaUserDataFromFormSubmittedEvents(event);

  message.meta = {
    event: "FormSubmit",
    form_id: form_id,
    user_data: user_data,
  };
}

function prepareTikTokFormSubmitted(
  event: PixelEventsFormSubmitted,
  message: DataLayerMessage,
): void {
  if (!config.platform.tiktok) {
    return;
  }

  const eventData = event.data;

  // parameter: form_id
  const form_id = eventData.element.id;

  // parameter: user_data
  const user_data = getTikTokUserDataFromFormSubmittedEvents(event);

  message.tiktok = {
    event: "FormSubmit",
    form_id: form_id,
    user_data: user_data,
  };
}

function handleFormSubmitted(event: PixelEventsFormSubmitted): void {
  const message: DataLayerMessage = { event: "shopify_form_submitted" };

  prepareGoogleFormSubmitted(event, message);
  prepareMetaFormSubmitted(event, message);
  prepareTikTokFormSubmitted(event, message);

  dataLayerPush(message);
}

export function registerFormSubmitted(): void {
  analytics.subscribe("form_submitted", buildEventHandler(handleFormSubmitted));
}
