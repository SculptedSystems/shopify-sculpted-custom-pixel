import type { AnalyticsEvent, DataLayerMessage } from "@models";

/**
 * A handler function for analytics events.
 *
 * Generic over `T` to support specific event payloads
 * (e.g. PaymentInfoSubmittedEvent extends AnalyticsEvent).
 */
export type AnalyticsEventHandler<T extends AnalyticsEvent = AnalyticsEvent> = (
  event: T,
) => void | Promise<void>;

export interface ServiceHandlers<T extends AnalyticsEvent = AnalyticsEvent> {
  google?: (event: T) => DataLayerMessage;
  meta?: (event: T) => DataLayerMessage;
  tiktok?: (event: T) => DataLayerMessage;
}
