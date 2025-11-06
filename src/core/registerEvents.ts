import { config } from "@core/config";

import { registerPageView } from "@events/pageView";
import { registerViewItemList } from "@events/viewItemList";
import { registerViewItem } from "@events/viewItem";
import { registerAddToCart } from "@events/addToCart";
import { registerViewCart } from "@events/viewCart";
import { registerBeginCheckout } from "@events/beginCheckout";
import { registerAddShippingInfo } from "@events/addShippingInfo";
import { registerAddPaymentInfo } from "@events/addPaymentInfo";
import { registerPurchase } from "@events/purchase";

export function registerEvents() {
  if (config.push.pageView) {
    registerPageView();
  }

  if (config.push.viewItemList) {
    registerViewItemList();
  }

  if (config.push.viewItem) {
    registerViewItem();
  }

  if (config.push.addToCart) {
    registerAddToCart();
  }

  if (config.push.viewCart) {
    registerViewCart();
  }

  if (config.push.beginCheckout) {
    registerBeginCheckout();
  }

  if (config.push.addShippingInfo) {
    registerAddShippingInfo();
  }

  if (config.push.addPaymentInfo) {
    registerAddPaymentInfo();
  }

  if (config.push.purchase) {
    registerPurchase();
  }
}
