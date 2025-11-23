/**
 * TikTok - content
 * Source: https://ads.tiktok.com/help/article/about-parameters?lang=en
 */

export interface TikTokContent {
  content_id: string;
  price: number;
  quantity: number;
}

/**
 * TikTok - user_data
 * Source: https://business-api.tiktok.com/portal/docs?rid=5ipocbxyw8v&id=1739585700402178
 */

export interface TikTokUserData extends Record<string, unknown> {
  email?: string;
  phone_number?: string;
  external_id?: string;
}
