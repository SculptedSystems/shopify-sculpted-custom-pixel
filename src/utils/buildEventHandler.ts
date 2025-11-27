import {
  AnalyticsEvent,
  AnalyticsEventHandler,
  DataLayerMessage,
  ServiceHandlers,
} from "@models";

import { config } from "@config";

import { getDataLayerEventMessage } from "@helpers/dataLayer";

import { dataLayerPush } from "@utils/dataLayer";
import { logger } from "@utils/logger";
import { stringifyObject } from "@utils/stringify";

function prepareShopifyEvent(event: AnalyticsEvent): DataLayerMessage {
  return {
    event: event.name,
    event_id: event.id,
    data: event.data,
  };
}

function eventHandler<T extends AnalyticsEvent>(
  event: T,
  eventName: string,
  serviceHandlers: ServiceHandlers<T>,
): void {
  const message = getDataLayerEventMessage(
    `${config.gtm.event.prefix}${eventName}${config.gtm.event.postfix}`,
    event.id,
  );

  if (config.platform.google) {
    if (serviceHandlers.google?.dataHandler) {
      message.data.google = serviceHandlers.google.dataHandler(event);
    }
    if (serviceHandlers.google?.userHandler) {
      message.user.google = serviceHandlers.google.userHandler(event);
    }
  }

  if (config.platform.meta) {
    if (serviceHandlers.meta?.dataHandler) {
      message.data.meta = serviceHandlers.meta.dataHandler(event);
    }
    if (serviceHandlers.meta?.userHandler) {
      message.user.meta = serviceHandlers.meta.userHandler(event);
    }
  }

  if (config.platform.tiktok) {
    if (serviceHandlers.tiktok?.dataHandler) {
      message.data.tiktok = serviceHandlers.tiktok.dataHandler(event);
    }
    if (serviceHandlers.tiktok?.userHandler) {
      message.user.tiktok = serviceHandlers.tiktok.userHandler(event);
    }
  }

  if (config.platform.shopify) {
    message.data.shopify = prepareShopifyEvent(event);
  }

  message.page_location = init.context.document.location.href;
  message.page_referrer = init.context.document.referrer;
  message.page_title = init.context.document.title;

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
