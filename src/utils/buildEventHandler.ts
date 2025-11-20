import {
  AnalyticsEvent,
  AnalyticsEventHandler,
  ServiceHandlers,
} from "@models";

import { config } from "@config";

import { getDataLayerEventMessage } from "@helpers/dataLayer";

import { dataLayerPush } from "@utils/dataLayer";
import { logger } from "@utils/logger";
import { stringifyObject } from "@utils/stringify";

function eventHandler<T extends AnalyticsEvent>(
  event: T,
  eventName: string,
  serviceHandlers: ServiceHandlers<T>,
): void {
  const message = getDataLayerEventMessage(`shopify_${eventName}`);

  if (config.platform.google && serviceHandlers.google) {
    message.data.google = serviceHandlers.google(event);
  }

  if (config.platform.meta && serviceHandlers.meta) {
    message.data.meta = serviceHandlers.meta(event);
  }

  if (config.platform.tiktok && serviceHandlers.tiktok) {
    message.data.tiktok = serviceHandlers.tiktok(event);
  }

  dataLayerPush(message);
}

export function buildEventHandler<T extends AnalyticsEvent>(
  eventName: string,
  serviceHandlers: ServiceHandlers<T>,
): AnalyticsEventHandler {
  return (event: AnalyticsEvent) => {
    logger.debug(`Event Data -> ${stringifyObject(event)}`);
    eventHandler(event as T, eventName, serviceHandlers);
  };
}
