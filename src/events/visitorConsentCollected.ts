// https://shopify.dev/docs/api/web-pixels-api/pixel-privacy#customer-privacy-api

import { CustomerPrivacyPayload } from "@shopify/web-pixels-extension";

import { config } from "@config";
import { dataLayerPush } from "@utils/dataLayer";
import { getDataLayerEventMessage } from "@helpers/dataLayer";

export function registerVisitorConsentCollected(): void {
  const event = "visitorConsentCollected";
  customerPrivacy.subscribe(event, (_event: CustomerPrivacyPayload) => {
    const eventName = `${config.gtm.event.prefix}visitor_consent_collected${config.gtm.event.postfix}`;

    const message = getDataLayerEventMessage(eventName, undefined);

    dataLayerPush(message);
  });
}
