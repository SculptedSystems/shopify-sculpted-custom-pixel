import { CustomerPrivacy, DataLayerEventMessage } from "@models";

export function getDataLayerEventMessage(
  eventName: string,
  customerPrivacy: CustomerPrivacy | undefined = undefined,
): DataLayerEventMessage {
  // consent
  let consent;
  if (customerPrivacy) {
    consent = {
      analytics: customerPrivacy.analyticsProcessingAllowed,
      marketing: customerPrivacy.marketingAllowed,
      preferences: customerPrivacy.preferencesProcessingAllowed,
      sale_of_data: customerPrivacy.saleOfDataAllowed,
    };
  } else {
    consent = {
      analytics: init.customerPrivacy.analyticsProcessingAllowed,
      marketing: init.customerPrivacy.marketingAllowed,
      preferences: init.customerPrivacy.preferencesProcessingAllowed,
      sale_of_data: init.customerPrivacy.saleOfDataAllowed,
    };
  }

  // page info
  const page_location = init.context.document.location.href;
  const page_referrer = init.context.document.referrer;
  const page_title = init.context.document.title;

  return {
    event: eventName,
    consent: consent,
    data: {},
    user: {},
    page_location: page_location,
    page_referrer: page_referrer,
    page_title: page_title,
  };
}
