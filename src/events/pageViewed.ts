// https://support.google.com/analytics/answer/9216061#page_view
// https://shopify.dev/docs/api/web-pixels-api/standard-events/page_viewed

import { PixelEventsPageViewed } from "@sculptedsystems/shopify-web-pixels-api-types";

import { getCustomer } from "@helpers/customer";

import { buildEventHandler } from "@utils/buildEventHandler";
import { dataLayerPush } from "@utils/dataLayer";

function handlePageViewed(event: PixelEventsPageViewed): void {
  const eventContext = event.context?.document;

  // parameter: page_location
  const page_location = eventContext?.location?.href;

  // parameter: page_referrer
  const page_referrer = eventContext?.referrer;

  // parameter: page_title
  const page_title = eventContext?.title;

  dataLayerPush({
    user_data: getCustomer(),
    event: "page_view",
    page_location: page_location,
    page_referrer: page_referrer,
    page_title: page_title,
  });
}

export function registerPageViewed(): void {
  analytics.subscribe("page_viewed", buildEventHandler(handlePageViewed));
}
