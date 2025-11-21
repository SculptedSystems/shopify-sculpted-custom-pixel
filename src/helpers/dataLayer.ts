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
  };
}
