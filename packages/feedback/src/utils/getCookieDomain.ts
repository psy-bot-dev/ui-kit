export function getCookieDomain(baseUrl: string): string | undefined {
  try {
    const hostname = new URL(baseUrl).hostname;
    if (hostname === "localhost" || hostname.startsWith("127.")) return undefined;
    const parts = hostname.split(".");
    return parts.length >= 2 ? `.${parts.slice(-2).join(".")}` : undefined;
  } catch {
    return undefined;
  }
}
