// ================================================
//   Local Type Definitions
// ================================================

export interface DataLayerMessage {
  event: string;
  [key: string]: unknown;
}

export type DataLayer = DataLayerMessage[];

interface DataLayerData {
  google?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  tiktok?: Record<string, unknown>;
}

interface DataLayerConsent {
  analytics_processing: boolean;
  marketing: boolean;
  preferences_processing: boolean;
  sale_of_data: boolean;
}

export interface DataLayerEventMessage extends DataLayerMessage {
  data: DataLayerData;
  consent: DataLayerConsent;
}
