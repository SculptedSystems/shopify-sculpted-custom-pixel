/**
 * GA4 - item
 * Source: https://developers.google.com/analytics/devguides/collection/ga4/reference/events
 */

export interface GoogleItem {
  item_id: string;
  item_name: string;

  affiliation: string | null;

  coupon: string | null;
  discount: number | null;

  index: number | null;

  item_brand: string | null;

  item_category: string | null;
  item_category2: string | null;
  item_category3: string | null;
  item_category4: string | null;
  item_category5: string | null;

  item_list_id: string | null;
  item_list_name: string | null;

  item_variant: string | null;

  location_id: string | null;

  price: number | null;
  quantity: number | null;
}

/**
 * Google - user_data
 * Source: https://support.google.com/google-ads/answer/13262500?sjid=16791331635979733383-NA#zippy=%2Cidentify-and-define-your-enhanced-conversions-variables
 */

export interface GoogleUserData extends Record<string, unknown> {
  /**
   * User email address.
   * Example: "jdoe@example.com"
   */
  email?: string;

  /**
   * SHA-256 hashed user email address.
   * Example:
   * "a8af8341993604f29cd4e0e5a5a4b5d48c575436c38b28abbfd7d481f345d5db"
   */
  sha256_email_address?: string;

  /**
   * User phone number in E.164 format (11–15 digits, "+" prefix, no spaces or symbols).
   * Example: "+11231234567"
   */
  phone_number?: string;

  /**
   * SHA-256 hashed user phone number.
   * Example:
   * "e9d3eef677f9a3b19820f92696be53d646ac4cea500e5f8fd08b00bc6ac773b1"
   */
  sha256_phone_number?: string;

  /**
   * User postal address details.
   */
  address?: {
    /**
     * User country (ISO 3166-1 alpha-2 code).
     * Example: "UK"
     */
    country: string;

    /**
     * User first name.
     * Example: "John"
     */
    first_name?: string;

    /**
     * SHA-256 hashed user first name.
     * Example:
     * "96d9632f363564cc3032521409cf22a852f2032eec099ed5967c0d000cec607a"
     */
    sha256_first_name?: string;

    /**
     * User last name.
     * Example: "Doe"
     */
    last_name?: string;

    /**
     * SHA-256 hashed user last name.
     * Example:
     * "799ef92a11af918e3fb741df42934f3b568ed2d93ac1df74f1b8d41a27932a6f"
     */
    sha256_last_name?: string;

    /**
     * User street address.
     * Example: "123 New Rd"
     */
    street?: string;

    /**
     * User city.
     * Example: "Southampton"
     */
    city?: string;

    /**
     * User region, state, or province.
     * Example: "Hampshire"
     */
    region?: string;

    /**
     * User postal or ZIP code.
     * Example: "SO99 9XX"
     */
    postal_code?: string;
  };
}
