import {
  AnalyticsEvent,
  GoogleUserData,
  MetaUserData,
  TikTokUserData,
} from "@models";
import {
  Checkout,
  Customer,
  PixelEventsCheckoutAddressInfoSubmitted,
  PixelEventsCheckoutCompleted,
  PixelEventsCheckoutContactInfoSubmitted,
  PixelEventsCheckoutShippingInfoSubmitted,
  PixelEventsCheckoutStarted,
  PixelEventsFormSubmitted,
  PixelEventsPaymentInfoSubmitted,
} from "@sculptedsystems/shopify-web-pixels-api-types";

/**
 * Format Parsed User Data
 */

// Google

function prepareGoogleEmail(email: string): string {
  return email.toLowerCase();
}

function prepareGooglePhoneNumber(phone_number: string): string {
  return phone_number;
}

function prepareGoogleNameField(field: string): string {
  return field;
}

function prepareGoogleAddressField(field: string): string {
  return field;
}

// Meta

function prepareMetaEmail(email: string): string {
  return email.toLowerCase();
}

function prepareMetaNameField(field: string): string {
  return field.toLowerCase();
}

function prepareMetaPhoneNumber(phone_number: string): string {
  return phone_number.replace("+", "");
}

function prepareMetaAddressfield(address: string): string {
  return address.replace(" ", "").toLowerCase();
}

function prepareMetaZip(zip: string): string {
  return zip;
}

// TikTok

function prepareTikTokEmail(email: string): string {
  return email.toLowerCase();
}

function prepareTikTokPhoneNumber(phone_number: string): string {
  return phone_number;
}

/**
 * Parse User Data Helpers
 */

// Client ID

function getClientId(event: AnalyticsEvent): string {
  return event.clientId;
}

export function getMetaUserDataFromClientId(
  event: AnalyticsEvent,
): MetaUserData {
  return {
    external_id: getClientId(event),
  };
}

// Customer

function getCustomer(): Customer | null {
  return init.data.customer;
}

export function getGoogleUserDataFromCustomer(): GoogleUserData {
  const data: Partial<GoogleUserData> = {};
  const customer = getCustomer();

  if (customer?.email) {
    data.email = prepareGoogleEmail(customer.email);
  }

  if (customer?.phone) {
    data.phone_number = prepareGooglePhoneNumber(customer.phone);
  }

  return Object.keys(data).length > 0 ? data : {};
}

export function getMetaUserDataFromCustomer(): MetaUserData {
  const data: Partial<MetaUserData> = {};
  const customer = getCustomer();

  if (customer?.email) {
    data.em = prepareMetaEmail(customer.email);
  }

  if (customer?.firstName) {
    data.fn = prepareMetaNameField(customer.firstName);
  }

  if (customer?.lastName) {
    data.ln = prepareMetaNameField(customer.lastName);
  }

  if (customer?.phone) {
    data.ph = prepareMetaPhoneNumber(customer.phone);
  }

  if (customer?.id) {
    data.external_id = customer.id;
  }

  return Object.keys(data).length > 0 ? data : {};
}

export function getTikTokUserDataFromCustomer(): TikTokUserData {
  const data: Partial<TikTokUserData> = {};
  const customer = getCustomer();

  if (customer?.email) {
    data.email = prepareTikTokEmail(customer.email);
  }

  if (customer?.phone) {
    data.phone_number = prepareTikTokPhoneNumber(customer.phone);
  }

  return Object.keys(data).length > 0 ? data : {};
}

/**
 * Get User Data from Generic Events
 */

export function getGoogleUserDataFromGenericEvent(): GoogleUserData {
  return getGoogleUserDataFromCustomer();
}

export function getMetaUserDataFromGenericEvent(
  event: AnalyticsEvent,
): MetaUserData {
  const customerUserData = getMetaUserDataFromCustomer();

  if (customerUserData) {
    return customerUserData;
  }

  const data = getMetaUserDataFromClientId(event);

  return data;
}

export function getTikTokUserDataFromGenericEvent(
  _event: AnalyticsEvent,
): TikTokUserData {
  return getTikTokUserDataFromCustomer();
}

/**
 * Get User Data from Form Submitted Events
 */

function findFirstEmail(event: PixelEventsFormSubmitted): string | null {
  const elements = event.data.element.elements;

  return elements.find((el) => el.type === "email")?.value ?? null;
}

function findFirstPhoneNumber(event: PixelEventsFormSubmitted): string | null {
  const elements = event.data.element.elements;

  return elements.find((el) => el.type === "tel")?.value ?? null;
}

export function getGoogleUserDataFromFormSubmittedEvents(
  event: PixelEventsFormSubmitted,
): GoogleUserData {
  const customerUserData = getGoogleUserDataFromCustomer();

  if (customerUserData) {
    return customerUserData;
  }

  const data: Partial<GoogleUserData> = {};

  const firstEmail = findFirstEmail(event);
  if (firstEmail) {
    data.email = prepareGoogleEmail(firstEmail);
  }

  const firstPhone = findFirstPhoneNumber(event);
  if (firstPhone) {
    data.phone_number = prepareGooglePhoneNumber(firstPhone);
  }

  return Object.keys(data).length > 0 ? data : {};
}

export function getMetaUserDataFromFormSubmittedEvents(
  event: PixelEventsFormSubmitted,
): MetaUserData {
  const customerUserData = getMetaUserDataFromCustomer();

  if (customerUserData) {
    return customerUserData;
  }

  const data = getMetaUserDataFromClientId(event);

  const firstEmail = findFirstEmail(event);
  if (firstEmail) {
    data.em = prepareMetaEmail(firstEmail);
  }

  const firstPhone = findFirstPhoneNumber(event);
  if (firstPhone) {
    data.ph = prepareMetaPhoneNumber(firstPhone);
  }

  return Object.keys(data).length > 0 ? data : {};
}

export function getTikTokUserDataFromFormSubmittedEvents(
  event: PixelEventsFormSubmitted,
): TikTokUserData {
  const customerUserData = getTikTokUserDataFromCustomer();

  if (customerUserData) {
    return customerUserData;
  }

  const data: Partial<TikTokUserData> = {};

  const firstEmail = findFirstEmail(event);
  if (firstEmail) {
    data.email = prepareTikTokEmail(firstEmail);
  }

  const firstPhone = findFirstPhoneNumber(event);
  if (firstPhone) {
    data.phone_number = prepareTikTokPhoneNumber(firstPhone);
  }

  return Object.keys(data).length > 0 ? data : {};
}

/**
 * Get User Data from Checkout Events
 */

function getEmailFromShopifyCheckout(checkout: Checkout): string | null {
  return checkout.email;
}

function getPhoneFromShopifyCheckout(checkout: Checkout): string | null {
  const phone = checkout.phone;
  if (phone) {
    return phone;
  }

  const billingPhone = checkout.billingAddress?.phone;
  if (billingPhone) {
    return billingPhone;
  }

  const shippingPhone = checkout.shippingAddress?.phone;
  if (shippingPhone) {
    return shippingPhone;
  }

  return null;
}

function getFirstNameFromShopifyCheckout(checkout: Checkout): string | null {
  const billingFirstName = checkout.billingAddress?.firstName;
  if (billingFirstName) {
    return billingFirstName;
  }

  const shippingFirstName = checkout.shippingAddress?.firstName;
  if (shippingFirstName) {
    return shippingFirstName;
  }

  return null;
}

function getLastNameFromShopifyCheckout(checkout: Checkout): string | null {
  const billingLastName = checkout.billingAddress?.lastName;
  if (billingLastName) {
    return billingLastName;
  }

  const shippingLastName = checkout.shippingAddress?.lastName;
  if (shippingLastName) {
    return shippingLastName;
  }

  return null;
}

function getAddress1FromShopifyCheckout(checkout: Checkout): string | null {
  const billingAddress = checkout.billingAddress?.address1;
  if (billingAddress) {
    return billingAddress;
  }

  const shippingAddress = checkout.shippingAddress?.address1;
  if (shippingAddress) {
    return shippingAddress;
  }

  return null;
}

function getCityFromShopifyCheckout(checkout: Checkout): string | null {
  const billingCity = checkout.billingAddress?.city;
  if (billingCity) {
    return billingCity;
  }

  const shippingCity = checkout.shippingAddress?.city;
  if (shippingCity) {
    return shippingCity;
  }

  return null;
}

function getCountryCodeFromShopifyCheckout(checkout: Checkout): string | null {
  const billingCountryCode = checkout.billingAddress?.countryCode;
  if (billingCountryCode) {
    return billingCountryCode;
  }

  const shippingCountryCode = checkout.shippingAddress?.countryCode;
  if (shippingCountryCode) {
    return shippingCountryCode;
  }

  return null;
}

function getProvinceFromShopifyCheckout(checkout: Checkout): string | null {
  const billingProvince = checkout.billingAddress?.province;
  if (billingProvince) {
    return billingProvince;
  }

  const shippingProvince = checkout.shippingAddress?.province;
  if (shippingProvince) {
    return shippingProvince;
  }

  return null;
}

function getProvinceCodeFromShopifyCheckout(checkout: Checkout): string | null {
  const billingProvinceCode = checkout.billingAddress?.provinceCode;
  if (billingProvinceCode) {
    return billingProvinceCode;
  }

  const shippingProvinceCode = checkout.shippingAddress?.provinceCode;
  if (shippingProvinceCode) {
    return shippingProvinceCode;
  }

  return null;
}

function getZipFromShopifyCheckout(checkout: Checkout): string | null {
  const billingZip = checkout.billingAddress?.zip;
  if (billingZip) {
    return billingZip;
  }

  const shippingZip = checkout.shippingAddress?.zip;
  if (shippingZip) {
    return shippingZip;
  }

  return null;
}

export function getGoogleUserDataFromCheckoutEvents(
  event:
    | PixelEventsCheckoutStarted
    | PixelEventsCheckoutContactInfoSubmitted
    | PixelEventsCheckoutAddressInfoSubmitted
    | PixelEventsCheckoutShippingInfoSubmitted
    | PixelEventsPaymentInfoSubmitted
    | PixelEventsCheckoutCompleted,
): GoogleUserData {
  const customerUserData = getGoogleUserDataFromCustomer();

  if (customerUserData) {
    return customerUserData;
  }

  const data: Partial<GoogleUserData> = {};
  const checkout = event.data.checkout;

  const email = getEmailFromShopifyCheckout(checkout);
  if (email) {
    data.email = prepareGoogleEmail(email);
  }

  const phone = getPhoneFromShopifyCheckout(checkout);
  if (phone) {
    data.phone_number = prepareGooglePhoneNumber(phone);
  }

  const country = getCountryCodeFromShopifyCheckout(checkout);
  if (!country) {
    return data;
  }

  data.address = { country: prepareGoogleAddressField(country) };

  const firstName = getFirstNameFromShopifyCheckout(checkout);
  if (firstName) {
    data.address.first_name = prepareGoogleNameField(firstName);
  }

  const lastName = getLastNameFromShopifyCheckout(checkout);
  if (lastName) {
    data.address.last_name = prepareGoogleNameField(lastName);
  }

  const city = getCityFromShopifyCheckout(checkout);
  if (city) {
    data.address.city = prepareGoogleAddressField(city);
  }

  const street = getAddress1FromShopifyCheckout(checkout);
  if (street) {
    data.address.street = prepareGoogleAddressField(street);
  }

  const region = getProvinceFromShopifyCheckout(checkout);
  if (region) {
    data.address.region = prepareGoogleAddressField(region);
  }

  const postal_code = getZipFromShopifyCheckout(checkout);
  if (postal_code) {
    data.address.postal_code = prepareGoogleAddressField(postal_code);
  }

  return data;
}

export function getMetaUserDataFromCheckoutEvents(
  event:
    | PixelEventsCheckoutStarted
    | PixelEventsCheckoutContactInfoSubmitted
    | PixelEventsCheckoutAddressInfoSubmitted
    | PixelEventsCheckoutShippingInfoSubmitted
    | PixelEventsPaymentInfoSubmitted
    | PixelEventsCheckoutCompleted,
): MetaUserData {
  const customerUserData = getMetaUserDataFromCustomer();

  if (customerUserData) {
    return customerUserData;
  }

  const data = getMetaUserDataFromClientId(event);
  const checkout = event.data.checkout;

  const email = getEmailFromShopifyCheckout(checkout);
  if (email) {
    data.em = prepareMetaEmail(email);
  }

  const firstName = getFirstNameFromShopifyCheckout(checkout);
  if (firstName) {
    data.fn = prepareMetaNameField(firstName);
  }

  const lastName = getLastNameFromShopifyCheckout(checkout);
  if (lastName) {
    data.ln = prepareMetaNameField(lastName);
  }

  const phone = getPhoneFromShopifyCheckout(checkout);
  if (phone) {
    data.ph = prepareMetaPhoneNumber(phone);
  }

  const city = getCityFromShopifyCheckout(checkout);
  if (city) {
    data.ct = prepareMetaAddressfield(city);
  }

  const provinceCode = getProvinceCodeFromShopifyCheckout(checkout);
  if (provinceCode) {
    data.st = prepareMetaAddressfield(provinceCode);
  }

  const zip = getZipFromShopifyCheckout(checkout);
  if (zip) {
    data.zp = prepareMetaZip(zip);
  }

  const countryCode = getCountryCodeFromShopifyCheckout(checkout);
  if (countryCode) {
    data.country = prepareMetaAddressfield(countryCode);
  }

  return data;
}

export function getTikTokUserDataFromCheckoutEvents(
  event:
    | PixelEventsCheckoutStarted
    | PixelEventsCheckoutContactInfoSubmitted
    | PixelEventsCheckoutAddressInfoSubmitted
    | PixelEventsCheckoutShippingInfoSubmitted
    | PixelEventsPaymentInfoSubmitted
    | PixelEventsCheckoutCompleted,
): TikTokUserData {
  const customerUserData = getTikTokUserDataFromCustomer();

  if (customerUserData) {
    return customerUserData;
  }

  const data: Partial<GoogleUserData> = {};
  const checkout = event.data.checkout;

  const email = getEmailFromShopifyCheckout(checkout);
  if (email) {
    data.email = prepareTikTokEmail(email);
  }

  const phone = getPhoneFromShopifyCheckout(checkout);
  if (phone) {
    data.phone_number = prepareTikTokPhoneNumber(phone);
  }

  return data;
}
