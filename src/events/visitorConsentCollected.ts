// https://shopify.dev/docs/api/web-pixels-api/pixel-privacy#customer-privacy-api

import { CustomerPrivacyPayload } from "@shopify/web-pixels-extension";

import { config } from "@config";

import { dataLayerPush } from "@utils/dataLayer";

import { getDataLayerEventMessage } from "@helpers/dataLayer";
import { isCheckout } from "@utils/isCheckout";

export function registerVisitorConsentCollected(): void {
  const eventName = `${config.gtm.event.prefix}visitor_consent_collected${config.gtm.event.postfix}`;
  const message = getDataLayerEventMessage(eventName);

  if (config.consent.pushInit.frontend && !isCheckout()) {
    dataLayerPush(message);
  }

  if (config.consent.pushInit.checkout && isCheckout()) {
    dataLayerPush(message);
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
