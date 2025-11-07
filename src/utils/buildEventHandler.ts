import { logger } from "./logger";
import { stringifyObject } from "./stringify";
import { AnalyticsEvent } from "@models/shopify";
import { AnalyticsEventHandler } from "@models/utils";

export function buildEventHandler<T extends AnalyticsEvent>(
  handler: AnalyticsEventHandler<T>,
) {
  return (event: AnalyticsEvent) => {
    logger.debug(stringifyObject(event));
    handler(event as T);
  };
}
