// ================================================
//   Local Type Definitions
// ================================================

export interface DataLayerMessage {
  event: string;
  google?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  tiktok?: Record<string, unknown>;
  [key: string]: unknown;
}

export type DataLayer = DataLayerMessage[];
