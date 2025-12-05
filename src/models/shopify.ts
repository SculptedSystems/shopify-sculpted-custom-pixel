import { CustomerPrivacyData } from "@sculptedsystems/shopify-web-pixels-api-types";
import type {
  PixelEventsPageViewed,
  PixelEventsCartViewed,
  PixelEventsCheckoutAddressInfoSubmitted,
  PixelEventsCheckoutCompleted,
  PixelEventsCheckoutContactInfoSubmitted,
  PixelEventsCheckoutShippingInfoSubmitted,
  PixelEventsCheckoutStarted,
  PixelEventsCollectionViewed,
  PixelEventsFormSubmitted,
  PixelEventsInputBlurred,
  PixelEventsInputChanged,
  PixelEventsInputFocused,
  PixelEventsPaymentInfoSubmitted,
  PixelEventsProductAddedToCart,
  PixelEventsProductRemovedFromCart,
  PixelEventsProductViewed,
  PixelEventsSearchSubmitted,
  PixelEventsUiExtensionErrored,
  PixelEventsAlertDisplayed,
  PixelEventsAdvancedDomAvailable,
  PixelEventsAdvancedDomChanged,
  PixelEventsAdvancedDomClipboard,
  PixelEventsAdvancedDomFormSubmitted,
  PixelEventsAdvancedDomInputBlurred,
  PixelEventsAdvancedDomInputChanged,
  PixelEventsAdvancedDomInputFocused,
  PixelEventsAdvancedDomScrolled,
  PixelEventsAdvancedDomSelectionChanged,
  PixelEventsAdvancedDomWindowResized,
} from "@shopify/web-pixels-extension";

/**
 * Shopify Web Pixels API - User Data
 */

export interface ShopifyUserData extends Record<string, unknown> {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  ordersCount?: number;
}

/**
 * Shopify Web Pixels API - Customer Privacy
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-api/customerprivacy
 */

export interface CustomerPrivacy extends Record<string, unknown> {
  analyticsProcessingAllowed: boolean;
  marketingAllowed: boolean;
  preferencesProcessingAllowed: boolean;
  saleOfDataAllowed: boolean;
}

export interface PixelEventsVisitorConsentCollected
  extends Partial<AnalyticsEvent> {
  id?: string;
  event?: string;
  data?: Record<string, unknown>;
  customerPrivacy: CustomerPrivacyData;
}

/**
 * Shopify Web Pixels API - Analytics
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-api/analytics
 */

export type AnalyticsEvent =
  | PixelEventsPageViewed
  | PixelEventsCartViewed
  | PixelEventsCheckoutAddressInfoSubmitted
  | PixelEventsCheckoutCompleted
  | PixelEventsCheckoutContactInfoSubmitted
  | PixelEventsCheckoutShippingInfoSubmitted
  | PixelEventsCheckoutStarted
  | PixelEventsCollectionViewed
  | PixelEventsFormSubmitted
  | PixelEventsInputBlurred
  | PixelEventsInputChanged
  | PixelEventsInputFocused
  | PixelEventsPaymentInfoSubmitted
  | PixelEventsProductAddedToCart
  | PixelEventsProductRemovedFromCart
  | PixelEventsProductViewed
  | PixelEventsSearchSubmitted
  | PixelEventsUiExtensionErrored
  | PixelEventsAlertDisplayed
  | PixelEventsAdvancedDomAvailable
  | PixelEventsAdvancedDomChanged
  | PixelEventsAdvancedDomClipboard
  | PixelEventsAdvancedDomFormSubmitted
  | PixelEventsAdvancedDomInputBlurred
  | PixelEventsAdvancedDomInputChanged
  | PixelEventsAdvancedDomInputFocused
  | PixelEventsAdvancedDomScrolled
  | PixelEventsAdvancedDomSelectionChanged
  | PixelEventsAdvancedDomWindowResized;

export interface Analytics {
  subscribe(
    eventName: string,
    event_callback: (event: AnalyticsEvent) => void,
  ): Promise<void>;
}
