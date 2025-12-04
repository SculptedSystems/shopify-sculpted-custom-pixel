export function getEnvString(varName: string, fallback = ""): string {
  return process.env[varName] ?? fallback;
}

export function getEnvBoolean(varName: string): boolean {
  return process.env[varName]?.toLowerCase() === "true";
}
