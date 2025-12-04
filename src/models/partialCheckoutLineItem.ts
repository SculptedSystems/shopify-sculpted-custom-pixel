import {
  CheckoutLineItem,
  DiscountAllocation,
  MoneyV2,
} from "@shopify/web-pixels-extension";

export type PartialCheckoutLineItem = Pick<
  CheckoutLineItem,
  "quantity" | "variant"
>;

export interface PartialCheckoutLineItemWithDiscountAllocations extends PartialCheckoutLineItem {
  discountAllocations: DiscountAllocation[];
}

export interface PartialCheckoutLineItemWithFinalLinePrice extends PartialCheckoutLineItemWithDiscountAllocations {
  finalLinePrice: MoneyV2 | null;
}
