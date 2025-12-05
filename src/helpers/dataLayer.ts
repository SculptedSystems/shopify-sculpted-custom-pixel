import { DataLayerEventMessage } from "@models";

export function getDataLayerEventMessage(
  eventName: string,
): DataLayerEventMessage {
  return {
    event: eventName,
    consent: {
      analytics: init.customerPrivacy.analyticsProcessingAllowed,
      marketing: init.customerPrivacy.marketingAllowed,
      preferences: init.customerPrivacy.preferencesProcessingAllowed,
      sale_of_data: init.customerPrivacy.saleOfDataAllowed,
    },
    data: {},
    user: {},
    page_location: init.context.document.location.href,
    page_referrer: init.context.document.referrer,
    page_title: init.context.document.title,
  };
}
