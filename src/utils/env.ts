export function getEnvString(val: string): string {
  return val;
}

export function getEnvBoolean(val: string): boolean {
  return val.toLowerCase() === "true";
}
