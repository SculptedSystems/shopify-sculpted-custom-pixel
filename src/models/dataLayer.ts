// ================================================
//   Local Type Definitions
// ================================================

export interface DataLayerMessage {
  event: string;
  [key: string]: unknown;
}

export type DataLayer = DataLayerMessage[];

interface DataLayerConsent {
  analytics_processing: boolean;
  marketing: boolean;
  preferences_processing: boolean;
  sale_of_data: boolean;
}

interface DataLayerServices {
  google?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  tiktok?: Record<string, unknown>;
}

export interface DataLayerEventMessage extends DataLayerMessage {
  consent: DataLayerConsent;
  data: DataLayerServices;
  user: DataLayerServices;
}
