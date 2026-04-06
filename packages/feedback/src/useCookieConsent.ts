import { ref, computed, watch } from "vue";
import { getCookieDomain } from "./utils/getCookieDomain";

export interface CookiePreferences {
  essential: true;
  analytics: boolean;
}

export interface CookieConsentOptions {
  onAnalyticsGranted?: () => void;
}

const COOKIE_NAME = "cookie_consent";
const MAX_AGE = 365 * 24 * 60 * 60;

export function useCookieConsent(options?: CookieConsentOptions) {
  const config = useRuntimeConfig();
  const domain =
    (config.public.cookieDomain as string | undefined) ??
    getCookieDomain((config.public.baseUrl as string) ?? "");

  const consentCookie = useCookie<CookiePreferences | null>(COOKIE_NAME, {
    domain,
    maxAge: MAX_AGE,
    sameSite: "lax" as const,
    secure: import.meta.env?.PROD ?? false,
    default: () => null,
  });

  const showBanner = ref(consentCookie.value === null);
  const showPreferences = ref(false);

  const analyticsEnabled = computed(
    () => consentCookie.value?.analytics === true,
  );
  const hasConsent = computed(() => consentCookie.value !== null);

  function save(analytics: boolean) {
    consentCookie.value = { essential: true, analytics };
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

  // Support reopen from sidebar/footer via shared state
  const cookieConsentOpen = useState("cookieConsentOpen", () => false);
  watch(cookieConsentOpen, (open) => {
    if (open) {
      reopenBanner();
      cookieConsentOpen.value = false;
    }
  });

  // On init: if consent already granted with analytics, fire callback
  if (consentCookie.value?.analytics === true) {
    options?.onAnalyticsGranted?.();
  }

  return {
    showBanner,
    showPreferences,
    analyticsEnabled,
    hasConsent,
    acceptAll,
    essentialOnly,
    savePreferences,
    openPreferences,
    reopenBanner,
  };
}
