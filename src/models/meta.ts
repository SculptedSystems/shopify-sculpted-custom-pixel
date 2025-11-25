/**
 * Meta - content
 * Source: https://developers.facebook.com/docs/meta-pixel/reference/
 */

export interface MetaContent {
  id: string;
  quantity: number;
}

/**
 * Meta - user_data
 * Source: https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching
 */

export interface MetaUserData extends Record<string, unknown> {
  /**
   * Email — unhashed (lowercase) or SHA-256 hashed.
   * Example: "jsmith@example.com" or
   * "6e3913852f512d76acff15d1e402c7502a5bbe6101745a7120a2a4833ebd2350"
   */
  em?: string;

  /**
   * First name — lowercase letters only.
   * Example: "john"
   */
  fn?: string;

  /**
   * Last name — lowercase letters only.
   * Example: "smith"
   */
  ln?: string;

  /**
   * Phone number — digits only, including country and area code.
   * Example: "16505554444"
   */
  ph?: string;

  /**
   * External ID — unique ID such as loyalty ID, user ID, or external cookie ID.
   * Example: "a@example.com"
   */
  external_id?: string;

  /**
   * Gender — single lowercase letter ("f" or "m"). If unknown, leave blank.
   * Example: "f"
   */
  ge?: string;

  /**
   * Birthdate — digits only in YYYYMMDD format.
   * Example: "19910526" (May 26, 1991)
   */
  db?: string;

  /**
   * City — lowercase with all spaces removed.
   * Example: "menlopark"
   */
  ct?: string;

  /**
   * State or province — lowercase two-letter code.
   * Example: "ca"
   */
  st?: string;

  /**
   * ZIP or postal code.
   * Example: "94025"
   */
  zp?: string;

  /**
   * Country — lowercase two-letter country code.
   * Example: "us"
   */
  country?: string;
}
