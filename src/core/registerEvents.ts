import { config } from "@config";

import { registerAddPaymentInfo } from "@events/addPaymentInfo";
import { registerAddShippingInfo } from "@events/addShippingInfo";
import { registerAddToCart } from "@events/addToCart";
import { registerBeginCheckout } from "@events/beginCheckout";
import { registerPageView } from "@events/pageView";
import { registerPurchase } from "@events/purchase";
import { registerSearch } from "@events/search";
import { registerViewCart } from "@events/viewCart";
import { registerViewItem } from "@events/viewItem";
import { registerViewItemList } from "@events/viewItemList";

export function registerEvents(): void {
  if (config.gtm.track.pageView) {
    registerPageView();
  }

  if (config.gtm.track.search) {
    registerSearch();
  }

  if (config.gtm.track.viewItemList) {
    registerViewItemList();
  }

  if (config.gtm.track.viewItem) {
    registerViewItem();
  }

  if (config.gtm.track.addToCart) {
    registerAddToCart();
  }

  if (config.gtm.track.viewCart) {
    registerViewCart();
  }

  if (config.gtm.track.beginCheckout) {
    registerBeginCheckout();
  }

  if (config.gtm.track.addShippingInfo) {
    registerAddShippingInfo();
  }

  if (config.gtm.track.addPaymentInfo) {
    registerAddPaymentInfo();
  }

  if (config.gtm.track.purchase) {
    registerPurchase();
  }
}
