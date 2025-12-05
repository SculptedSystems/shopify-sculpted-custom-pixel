// https://shopify.dev/docs/api/web-pixels-api/pixel-privacy#customer-privacy-api

import { CustomerPrivacyPayload } from "@shopify/web-pixels-extension";

import { config } from "@config";

import { dataLayerPush } from "@utils/dataLayer";
import { isCheckout } from "@utils/isCheckout";

import { getDataLayerEventMessage } from "@helpers/dataLayer";
import {
  getGoogleUserDataFromCustomer,
  getMetaUserDataFromCustomer,
  getShopifyUserDataFromCustomer,
  getTikTokUserDataFromCustomer,
} from "@helpers/userData";

export function registerVisitorConsentCollected(): void {
  const eventName = `${config.gtm.event.prefix}visitor_consent_collected${config.gtm.event.postfix}`;
  const message = getDataLayerEventMessage(eventName);

  // Attach User Data

  if (config.platform.google) {
    message.user.google = getGoogleUserDataFromCustomer();
  }

  if (config.platform.meta) {
    message.user.meta = getMetaUserDataFromCustomer();
  }

  if (config.platform.tiktok) {
    message.user.tiktok = getTikTokUserDataFromCustomer();
  }

  if (config.platform.shopify) {
    message.user.shopify = getShopifyUserDataFromCustomer();
  }

  // Push Events on Registration?

  if (config.consent.pushInit.frontend && !isCheckout()) {
    dataLayerPush(message);
  }

  if (config.consent.pushInit.checkout && isCheckout()) {
    dataLayerPush(message);
  }

  // Subscribe to Shopify's Event Bus

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
