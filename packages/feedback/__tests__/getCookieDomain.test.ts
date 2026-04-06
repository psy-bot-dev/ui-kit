import { describe, expect, it } from "vitest";
import { getCookieDomain } from "../src/utils/getCookieDomain";

describe("getCookieDomain", () => {
  it("returns .nearbyto.me for https://nearbyto.me", () => {
    expect(getCookieDomain("https://nearbyto.me")).toBe(".nearbyto.me");
  });

  it("returns .nearbyto.me for https://app.nearbyto.me", () => {
    expect(getCookieDomain("https://app.nearbyto.me")).toBe(".nearbyto.me");
  });

  it("returns undefined for localhost", () => {
    expect(getCookieDomain("http://localhost:3000")).toBeUndefined();
  });

  it("returns undefined for 127.0.0.1", () => {
    expect(getCookieDomain("http://127.0.0.1:3000")).toBeUndefined();
  });

  it("returns undefined for invalid URL", () => {
    expect(getCookieDomain("not-a-url")).toBeUndefined();
  });

  it("returns undefined for single-part hostname", () => {
    expect(getCookieDomain("http://localhost")).toBeUndefined();
  });
});
