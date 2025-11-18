// https://support.google.com/analytics/answer/9216061#form_submit
// https://shopify.dev/docs/api/web-pixels-api/dom-events/form_submitted

import { PixelEventsFormSubmitted } from "@sculptedsystems/shopify-web-pixels-api-types";

import { getCustomer } from "@helpers/customer";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function handleFormSubmitted(event: PixelEventsFormSubmitted): void {
  const eventData = event.data;

  // parameter: form_id
  const form_id = eventData.element.id;

  dataLayerPush({
    user_data: getCustomer(),
    event: "form_submit",
    form_id: form_id,
  });
}

export function registerFormSubmitted(): void {
  analytics.subscribe("form_submitted", buildEventHandler(handleFormSubmitted));
}
