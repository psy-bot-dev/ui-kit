import { ref, computed, watch, onMounted } from "vue";

export interface CookiePreferences {
  essential: true;
  analytics: boolean;
}

export interface CookieConsentOptions {
  cookieDomain?: string;
  onAnalyticsGranted?: () => void;
}

export const COOKIE_CONSENT_NAME = "cookie_consent";
export const COOKIE_CONSENT_MAX_AGE = 365 * 24 * 60 * 60;

// Module-level reopen flag — shared across all instances
const _reopenFlag = ref(false);

/** Trigger reopen from anywhere (sidebar, footer, etc.) */
export function reopenCookieConsent() {
  _reopenFlag.value = true;
}

function readCookie(name: string): CookiePreferences | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name}=([^;]*)`),
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function writeCookie(
  name: string,
  value: CookiePreferences,
  opts: { domain?: string; maxAge: number },
) {
  let cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; path=/; max-age=${opts.maxAge}; samesite=lax`;
  if (opts.domain) cookie += `; domain=${opts.domain}`;
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    cookie += "; secure";
  }
  document.cookie = cookie;
}

function resolveEffectiveDomain(
  configDomain: string | undefined,
): string | undefined {
  if (typeof window === "undefined") return configDomain;
  const host = window.location.hostname;
  if (host === "localhost" || host.startsWith("127.")) return undefined;
  return configDomain;
}

export function useCookieConsent(options?: CookieConsentOptions) {
  const effectiveDomain = resolveEffectiveDomain(options?.cookieDomain);
  const showBanner = ref(false);
  const showPreferences = ref(false);
  const preferences = ref<CookiePreferences | null>(null);

  const analyticsEnabled = computed(
    () => preferences.value?.analytics === true,
  );
  const hasConsent = computed(() => preferences.value !== null);

  onMounted(() => {
    preferences.value = readCookie(COOKIE_CONSENT_NAME);
    if (preferences.value === null) {
      showBanner.value = true;
    } else if (preferences.value.analytics) {
      options?.onAnalyticsGranted?.();
    }
  });

  function save(analytics: boolean) {
    const prefs: CookiePreferences = { essential: true, analytics };
    preferences.value = prefs;
    writeCookie(COOKIE_CONSENT_NAME, prefs, {
      domain: effectiveDomain,
      maxAge: COOKIE_CONSENT_MAX_AGE,
    });
    showBanner.value = false;
    showPreferences.value = false;
    if (analytics) {
      options?.onAnalyticsGranted?.();
    }
  }

  function acceptAll() {
    save(true);
  }

  function essentialOnly() {
    save(false);
  }

  function savePreferences(analytics: boolean) {
    save(analytics);
  }

  function openPreferences() {
    showPreferences.value = true;
  }

  function reopenBanner() {
    showBanner.value = true;
    showPreferences.value = false;
  }

  // Watch module-level reopen flag
  watch(_reopenFlag, (open) => {
    if (open) {
      reopenBanner();
      _reopenFlag.value = false;
    }
  });

  return {
    showBanner,
    showPreferences,
    preferences,
    analyticsEnabled,
    hasConsent,
    acceptAll,
    essentialOnly,
    savePreferences,
    openPreferences,
    reopenBanner,
  };
}
