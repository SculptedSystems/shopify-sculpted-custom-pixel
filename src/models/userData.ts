import {
  GoogleUserData,
  MetaUserData,
  ShopifyUserData,
  TikTokUserData,
} from "@models";

export type UserData =
  | ShopifyUserData
  | GoogleUserData
  | MetaUserData
  | TikTokUserData;
