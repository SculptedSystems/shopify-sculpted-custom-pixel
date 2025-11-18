import {
  GoogleItem,
  MetaContent,
  PartialCheckoutLineItem,
  PartialCheckoutLineItemWithFinalLinePrice,
} from "@models";
import {
  CheckoutLineItem,
  ProductVariant,
} from "@sculptedsystems/shopify-web-pixels-api-types";

import { config } from "@config";

import {
  getLineItemCouponFromDiscountAllocations,
  getLineItemDiscountFromDiscountAllocations,
} from "@helpers/discount";

import { logger } from "@utils/logger";
import { stringifyObject } from "@utils/stringify";

export function getItemIdFromShopifyProductVariant(
  productVariant: ProductVariant,
): string | null {
  const productId = productVariant.id;
  const productSku = productVariant.sku;
  const item_id = config.shopify.useSku ? productSku : productId;

  return item_id;
}

export function getGoogleItemsFromShopifyCheckoutLineItems(
  lineItems: PartialCheckoutLineItem[],
): GoogleItem[] {
  const items: GoogleItem[] = [];

  lineItems.forEach((item, index_: number) => {
    if (!item.variant) {
      logger.debug(`item ${stringifyObject(item)} has no variant`);
      return;
    }
    // parameter: item_id
    const item_id = getItemIdFromShopifyProductVariant(item.variant);
    if (!item_id) {
      logger.debug(
        `item ${stringifyObject(item)} has neither variant.id nor variant.sku`,
      );
      return;
    }

    // parameter: item_name
    const item_name = item.variant.product.title;

    // parameter: affiliation
    const affiliation = config.shopify.storeName;

    // parameter: coupon
    const coupon = getLineItemCouponFromDiscountAllocations(
      item.discountAllocations,
    );

    // parameter: discount
    const discount = getLineItemDiscountFromDiscountAllocations(
      item.discountAllocations,
    );

    // parameter: index
    const index = index_;

    // parameter: item_brand
    const item_brand = item.variant.product.vendor;

    // parameter: item_category
    const productType = item.variant.product.type;
    const item_category = productType === "" ? null : productType;

    // parameter: item_variant
    const item_variant = item.variant.title;

    // parameter: price
    const price = item.variant.price.amount;

    // parameter: quantity
    const quantity = item.quantity;

    items.push({
      item_id: item_id,
      item_name: item_name,

      affiliation: affiliation,

      coupon: coupon,
      discount: discount,

      index: index,

      item_brand: item_brand,

      item_category: item_category,
      item_category2: null,
      item_category3: null,
      item_category4: null,
      item_category5: null,

      item_list_id: null,
      item_list_name: null,

      item_variant: item_variant,

      location_id: null,

      price: price,
      quantity: quantity,
    });
  });

  return items;
}

export function addFinalLinePriceToPartialLineItems(
  partialLineItems: PartialCheckoutLineItem[],
): PartialCheckoutLineItem[] {
  const lineItems: PartialCheckoutLineItemWithFinalLinePrice[] = [];

  partialLineItems.forEach((obj) => {
    lineItems.push({
      variant: obj.variant,
      finalLinePrice: obj.variant?.price || null,
      quantity: obj.quantity,
      discountAllocations: obj.discountAllocations,
    });
  });

  return lineItems;
}

export function getMetaContentIdsFromShopifyCheckoutLineItems(
  lineItems: CheckoutLineItem[],
): string[] {
  const ids: string[] = [];

  lineItems.forEach((item) => {
    if (!item.variant) {
      return;
    }

    const id = getItemIdFromShopifyProductVariant(item.variant);
    if (!id) {
      logger.debug(
        `item ${stringifyObject(item)} has neither variant.id nor variant.sku`,
      );
      return;
    }

    ids.push(id);
  });

  return ids;
}

export function getMetaContentsFromShopifyCheckoutLineItems(
  lineItems: CheckoutLineItem[],
): MetaContent[] {
  const contents: MetaContent[] = [];

  lineItems.forEach((item) => {
    if (!item.variant) {
      logger.debug(`item ${stringifyObject(item)} has no variant`);
      return;
    }

    // parameter: item_id
    const id = getItemIdFromShopifyProductVariant(item.variant);
    if (!id) {
      logger.debug(
        `item ${stringifyObject(item)} has neither variant.id nor variant.sku`,
      );
      return;
    }

    // parameter: quantity
    const quantity = item.quantity;

    contents.push({
      id: id,
      quantity: quantity,
    });
  });

  return contents;
}

export function getMetaNumItemsFromShopifyCheckoutLineItems(
  lineItems: CheckoutLineItem[],
): number {
  let quantity = 0;

  lineItems.forEach((item) => {
    quantity += item.quantity;
  });

  return quantity;
}
