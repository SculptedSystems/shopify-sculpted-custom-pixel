// ================================================
//   Local Type Definitions
// ================================================

export interface DataLayerMessage {
  event: string;
  [key: string]: unknown;
}

export type DataLayer = DataLayerMessage[];

interface DataLayerConsent {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  sale_of_data: boolean;
}

interface DataLayerServices {
  shopify?: Record<string, unknown>;
  google?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  tiktok?: Record<string, unknown>;
}

export interface DataLayerEventMessage extends DataLayerMessage {
  consent: DataLayerConsent;
  data: DataLayerServices;
  user: DataLayerServices;
  page_location: string;
  page_referrer: string;
  page_title: string;
}
