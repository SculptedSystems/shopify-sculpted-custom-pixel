import {
  CheckoutLineItem,
  DiscountAllocation,
  MoneyV2,
} from "@sculptedsystems/shopify-web-pixels-api-types";

export type PartialCheckoutLineItem = Pick<
  CheckoutLineItem,
  "quantity" | "variant"
>;

export interface PartialCheckoutLineItemWithDiscountAllocations
  extends PartialCheckoutLineItem {
  discountAllocations: DiscountAllocation[];
}

export interface PartialCheckoutLineItemWithFinalLinePrice
  extends PartialCheckoutLineItemWithDiscountAllocations {
  finalLinePrice: MoneyV2 | null;
}
