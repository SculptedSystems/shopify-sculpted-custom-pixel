export function isCheckout(): boolean {
  const path = init.context.document.location.pathname;

  return path.startsWith("/checkouts/");
}
