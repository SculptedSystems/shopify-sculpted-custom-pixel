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

export function registerEvents(): void {
  if (config.events.checkoutAddressInfoSubmitted) {
    registerCheckoutAddressInfoSubmitted();
  }
  if (config.events.checkoutCompleted) {
    registerCheckoutCompleted();
  }
  if (config.events.checkoutContactInfoSubmitted) {
    registerCheckoutContactInfoSubmitted();
  }
  if (config.events.checkoutShippingInfoSubmitted) {
    registerCheckoutShippingInfoSubmitted();
  }
  if (config.events.checkoutStarted) {
    registerCheckoutStarted();
  }
  if (config.events.formSubmitted) {
    registerFormSubmitted();
  }
  if (config.events.pageViewed) {
    registerPageViewed();
  }
  if (config.events.paymentInfoSubmitted) {
    registerPaymentInfoSubmitted();
  }
  if (config.events.productAddedToCart) {
    registerProductAddedToCart();
  }
  if (config.events.productViewed) {
    registerProductViewed();
  }
  if (config.events.searchSubmitted) {
    registerSearchSubmitted();
  }
}
