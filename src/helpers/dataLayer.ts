import { DataLayerEventMessage } from "@models";

export function getDataLayerEventMessage(
  eventName: string,
  eventId: string,
): DataLayerEventMessage {
  return {
    event: eventName,
    event_id: eventId,
    consent: {
      analytics: window.initContext.customerPrivacy.analyticsProcessingAllowed,
      marketing: window.initContext.customerPrivacy.marketingAllowed,
      preferences:
        window.initContext.customerPrivacy.preferencesProcessingAllowed,
      sale_of_data: window.initContext.customerPrivacy.saleOfDataAllowed,
    },
    data: {},
    user: {},
  };
}
