export function getUniqueID(): string {
  const uuid = crypto.randomUUID();
  return `sc-${uuid}`;
}
