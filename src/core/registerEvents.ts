import { config } from "@config";

import { registerCheckoutAddressInfoSubmitted } from "@events/checkoutAddressInfoSubmitted";
import { registerCheckoutCompleted } from "@events/checkoutCompleted";
import { registerCheckoutContactInfoSubmitted } from "@events/checkoutContactInfoSubmitted";
import { registerCheckoutShippingInfoSubmitted } from "@events/checkoutShippingInfoSubmitted";
import { registerCheckoutStarted } from "@events/checkoutStarted";
import { registerFormSubmitted } from "@events/formSubmitted";
import { registerPageViewed } from "@events/pageViewed";
import { registerPaymentInfoSubmitted } from "@events/paymentInfoSubmitted";
import { registerProductAddedToCart } from "@events/productAddedToCart";
import { registerProductViewed } from "@events/productViewed";
import { registerSearchSubmitted } from "@events/searchSubmitted";
import { registerVisitorConsentCollected } from "@events/visitorConsentCollected";

export function registerEvents(): void {
  if (config.event.visitorConsentCollected) {
    registerVisitorConsentCollected();
  }
  if (config.event.checkoutAddressInfoSubmitted) {
    registerCheckoutAddressInfoSubmitted();
  }
  if (config.event.checkoutCompleted) {
    registerCheckoutCompleted();
  }
  if (config.event.checkoutContactInfoSubmitted) {
    registerCheckoutContactInfoSubmitted();
  }
  if (config.event.checkoutShippingInfoSubmitted) {
    registerCheckoutShippingInfoSubmitted();
  }
  if (config.event.checkoutStarted) {
    registerCheckoutStarted();
  }
  if (config.event.formSubmitted) {
    registerFormSubmitted();
  }
  if (config.event.pageViewed) {
    registerPageViewed();
  }
  if (config.event.paymentInfoSubmitted) {
    registerPaymentInfoSubmitted();
  }
  if (config.event.productAddedToCart) {
    registerProductAddedToCart();
  }
  if (config.event.productViewed) {
    registerProductViewed();
  }
  if (config.event.searchSubmitted) {
    registerSearchSubmitted();
  }
}
