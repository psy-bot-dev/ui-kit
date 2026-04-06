/**
 * Type shims for Nuxt auto-imports used by cookie consent.
 * At runtime these are provided by Nuxt — this file only satisfies the type checker
 * during library build (consumers get real types from their own Nuxt project).
 */

import type { Ref } from "vue";

interface CookieOptions<T> {
  domain?: string;
  maxAge?: number;
  sameSite?: "lax" | "strict" | "none";
  secure?: boolean;
  default?: () => T;
}

interface RuntimeConfig {
  public: Record<string, unknown>;
}

interface I18n {
  t: (key: string) => string;
}

declare global {
  function useRuntimeConfig(): RuntimeConfig;
  function useCookie<T>(
    name: string,
    options?: CookieOptions<T>,
  ): Ref<T>;
  function useState<T>(
    key: string,
    init: () => T,
  ): Ref<T>;
  function useI18n(): I18n;

  interface ImportMeta {
    env?: {
      PROD?: boolean;
      DEV?: boolean;
    };
  }
}

export {};
