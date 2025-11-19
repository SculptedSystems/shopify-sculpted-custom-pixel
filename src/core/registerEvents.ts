import { registerCheckoutCompleted } from "@events/checkoutCompleted";
import { registerCheckoutShippingInfoSubmitted } from "@events/checkoutShippingInfoSubmitted";
import { registerCheckoutStarted } from "@events/checkoutStarted";
import { registerFormSubmitted } from "@events/formSubmitted";
import { registerPageViewed } from "@events/pageViewed";
import { registerPaymentInfoSubmitted } from "@events/paymentInfoSubmitted";
import { registerProductAddedToCart } from "@events/productAddedToCart";
import { registerProductViewed } from "@events/productViewed";
import { registerSearchSubmitted } from "@events/searchSubmitted";

export function registerEvents(): void {
  registerCheckoutCompleted();
  registerCheckoutShippingInfoSubmitted();
  registerCheckoutStarted();
  registerFormSubmitted();
  registerPageViewed();
  registerPaymentInfoSubmitted();
  registerProductAddedToCart();
  registerProductViewed();
  registerSearchSubmitted();
}
