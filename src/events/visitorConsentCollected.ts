// https://shopify.dev/docs/api/web-pixels-api/pixel-privacy#customer-privacy-api

import { CustomerPrivacyPayload } from "@shopify/web-pixels-extension";

import { config } from "@config";

import { dataLayerPush } from "@utils/dataLayer";
import { getUniqueID } from "@utils/uniqueId";

import { getDataLayerEventMessage } from "@helpers/dataLayer";

export function registerVisitorConsentCollected(): void {
  const event = "visitorConsentCollected";

  api.customerPrivacy.subscribe(event, (event: CustomerPrivacyPayload) => {
    const eventName = `${config.gtm.event.prefix}visitor_consent_collected${config.gtm.event.postfix}`;
    const eventId = getUniqueID();

    const message = getDataLayerEventMessage(eventName, eventId);

    message.consent = {
      analytics: event.customerPrivacy.analyticsProcessingAllowed,
      marketing: event.customerPrivacy.marketingAllowed,
      preferences: event.customerPrivacy.preferencesProcessingAllowed,
      sale_of_data: event.customerPrivacy.saleOfDataAllowed,
    };

    dataLayerPush(message);
  });
}
