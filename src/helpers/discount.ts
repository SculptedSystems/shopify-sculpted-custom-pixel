export function getCouponFromDiscountApplications(
  discountApplications,
  appliesToWholeCart: boolean,
) {
  const discountCodeApplications = discountApplications?.filter(
    (dApp) => dApp.type === "DISCOUNT_CODE",
  );

  let filteredApplications;
  if (appliesToWholeCart) {
    filteredApplications = discountCodeApplications.filter(
      (dApp) => dApp.targetSelection === "ALL",
    ); // discount for all lines
  } else {
    filteredApplications = discountCodeApplications.filter((dApp) =>
      ["ENTITLED", "EXPLICIT"].includes(dApp.targetSelection),
    ); // discount for some lines
  }

  return (
    filteredApplications
      .map((dApp) => dApp.title) // get the codes
      .sort((a: string, b: string) => a.localeCompare(b)) // sort alphabetically
      .join(",") || // comma separated string
    undefined
  );
}

export function getCouponFromDiscountAllocations(
  discountAllocations,
  appliesToWholeCart: boolean,
) {
  const discountApplications = discountAllocations?.map(
    (dAllo) => dAllo.discountApplication,
  );

  return getCouponFromDiscountApplications(
    discountApplications,
    appliesToWholeCart,
  );
}
