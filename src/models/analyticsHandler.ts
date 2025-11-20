import type { AnalyticsEvent, DataLayerMessage } from "@models";
import { userData } from "./userData";

/**
 * A handler function for analytics events.
 *
 * Generic over `T` to support specific event payloads
 * (e.g. PaymentInfoSubmittedEvent extends AnalyticsEvent).
 */
export type AnalyticsEventHandler<T extends AnalyticsEvent = AnalyticsEvent> = (
  event: T,
) => void | Promise<void>;

interface ServiceHandler<T extends AnalyticsEvent = AnalyticsEvent> {
  dataHandler?: (event: T) => DataLayerMessage;
  userHandler?: (event: T) => userData;
}

export interface ServiceHandlers<T extends AnalyticsEvent = AnalyticsEvent> {
  google?: ServiceHandler<T>;
  meta?: ServiceHandler<T>;
  tiktok?: ServiceHandler<T>;
}
