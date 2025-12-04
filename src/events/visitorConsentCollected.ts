// https://shopify.dev/docs/api/web-pixels-api/pixel-privacy#customer-privacy-api

import { CustomerPrivacyPayload } from "@shopify/web-pixels-extension";

import { config } from "@config";

import { dataLayerPush } from "@utils/dataLayer";
import { getUniqueID } from "@utils/uniqueId";

import { getDataLayerEventMessage } from "@helpers/dataLayer";
import { isCheckout } from "@utils/isCheckout";

export function registerVisitorConsentCollected(): void {
  const eventName = `${config.gtm.event.prefix}visitor_consent_collected${config.gtm.event.postfix}`;
  const eventId = getUniqueID();
  const message = getDataLayerEventMessage(eventName, eventId);

  if (isCheckout()) {
    // Shopify doesn't emit "visitorConsentCollected" on checkout pages
    // so we are pushing this event manually as a work-around
    dataLayerPush(message);
    return;
  }

  const event = "visitorConsentCollected";
  api.customerPrivacy.subscribe(event, (event: CustomerPrivacyPayload) => {
    message.consent = {
      analytics: event.customerPrivacy.analyticsProcessingAllowed,
      marketing: event.customerPrivacy.marketingAllowed,
      preferences: event.customerPrivacy.preferencesProcessingAllowed,
      sale_of_data: event.customerPrivacy.saleOfDataAllowed,
    };

    dataLayerPush(message);
  });
}
