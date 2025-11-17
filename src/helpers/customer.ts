import { Customer } from "@sculptedsystems/shopify-web-pixels-api-types";

export function getCustomer(): Customer | undefined {
  const customer = init.data.customer;

  if (customer) {
    return customer;
  } else {
    return undefined;
  }
}
