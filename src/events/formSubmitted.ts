// https://support.google.com/analytics/answer/9216061#form_submit
// https://shopify.dev/docs/api/web-pixels-api/dom-events/form_submitted

import { DataLayerMessage } from "@models";
import { PixelEventsFormSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import { getCustomer } from "@helpers/customer";

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

  message.google = {
    user_data: getCustomer(),
    event: "form_submit",
    form_id: form_id,
  };
}

function handleFormSubmitted(event: PixelEventsFormSubmitted): void {
  const message: DataLayerMessage = { event: "shopify_form_submitted" };

  prepareGoogleFormSubmitted(event, message);

  dataLayerPush(message);
}

export function registerFormSubmitted(): void {
  analytics.subscribe("form_submitted", buildEventHandler(handleFormSubmitted));
}
