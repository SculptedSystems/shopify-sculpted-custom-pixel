import { config } from "@config";

import { registerVisitorConsentCollected } from "@events/visitorConsentCollected";
import { registerPageViewed } from "@events/pageViewed";
import { registerFormSubmitted } from "@events/formSubmitted";
import { registerSearchSubmitted } from "@events/searchSubmitted";
import { registerProductViewed } from "@events/productViewed";
import { registerProductAddedToCart } from "@events/productAddedToCart";
import { registerCheckoutStarted } from "@events/checkoutStarted";
import { registerCheckoutContactInfoSubmitted } from "@events/checkoutContactInfoSubmitted";
import { registerCheckoutShippingInfoSubmitted } from "@events/checkoutShippingInfoSubmitted";
import { registerCheckoutAddressInfoSubmitted } from "@events/checkoutAddressInfoSubmitted";
import { registerPaymentInfoSubmitted } from "@events/paymentInfoSubmitted";
import { registerCheckoutCompleted } from "@events/checkoutCompleted";

export function registerEvents(): void {
  if (config.event.visitorConsentCollected) {
    registerVisitorConsentCollected();
  }
  if (config.event.pageViewed) {
    registerPageViewed();
  }
  if (config.event.formSubmitted) {
    registerFormSubmitted();
  }
  if (config.event.searchSubmitted) {
    registerSearchSubmitted();
  }
  if (config.event.productViewed) {
    registerProductViewed();
  }
  if (config.event.productAddedToCart) {
    registerProductAddedToCart();
  }
  if (config.event.checkoutStarted) {
    registerCheckoutStarted();
  }
  if (config.event.checkoutContactInfoSubmitted) {
    registerCheckoutContactInfoSubmitted();
  }
  if (config.event.checkoutShippingInfoSubmitted) {
    registerCheckoutShippingInfoSubmitted();
  }
  if (config.event.checkoutAddressInfoSubmitted) {
    registerCheckoutAddressInfoSubmitted();
  }
  if (config.event.paymentInfoSubmitted) {
    registerPaymentInfoSubmitted();
  }
  if (config.event.checkoutCompleted) {
    registerCheckoutCompleted();
  }
}
