# Cookie Consent UI Kit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract cookie consent from psybot and site into `@psy-bot-dev/feedback` package as a shared, reusable solution.

**Architecture:** Three new files in feedback package — `getCookieDomain` utility, `useCookieConsent` composable (Nuxt-dependent via auto-imports), `CookieConsentBanner` Vue component (BEM + SCSS + Tailwind, theming via CSS vars from tokens). Composable accepts `onAnalyticsGranted` callback to decouple from GTM. Both consumers adopt the package and drop local implementations.

**Tech Stack:** Vue 3, TypeScript, SCSS, Tailwind 3.4, Vitest, @psy-bot-dev/tokens CSS variables

---

## File Map

### New files (packages/feedback/)

| File | Responsibility |
|------|---------------|
| `src/utils/getCookieDomain.ts` | Derive parent domain from URL |
| `src/useCookieConsent.ts` | Cookie state, consent lifecycle, reopen |
| `src/CookieConsentBanner.vue` | Banner + preferences panel UI |
| `__tests__/getCookieDomain.test.ts` | Unit tests for domain utility |
| `__tests__/useCookieConsent.test.ts` | Unit tests for composable |

### Modified files (packages/feedback/)

| File | Change |
|------|--------|
| `src/index.ts` | Add exports for new artifacts |

### Consumer migration (NOT in this plan — separate PRs)

- psybot: remove local `CookieConsentBanner.vue`, `useCookieConsent.ts`, `public/legal/*`
- site: remove local `CookieConsent.vue`, `useCookieConsent.ts`, `utils/cookieDomain.ts`, migrate i18n keys

---

## Task 1: getCookieDomain utility

**Files:**
- Create: `packages/feedback/src/utils/getCookieDomain.ts`
- Create: `packages/feedback/__tests__/getCookieDomain.test.ts`

- [ ] **Step 1: Write tests**

```typescript
// packages/feedback/__tests__/getCookieDomain.test.ts
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
```

- [ ] **Step 2: Run tests — expect FAIL**

Run: `cd /Users/marsel/Projects/Educational/nearby-ui && npx vitest run packages/feedback/__tests__/getCookieDomain.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement utility**

```typescript
// packages/feedback/src/utils/getCookieDomain.ts
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
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `cd /Users/marsel/Projects/Educational/nearby-ui && npx vitest run packages/feedback/__tests__/getCookieDomain.test.ts`
Expected: 6 tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/feedback/src/utils/getCookieDomain.ts packages/feedback/__tests__/getCookieDomain.test.ts
git commit -m "feat(feedback): add getCookieDomain utility with tests"
```

---

## Task 2: useCookieConsent composable

**Files:**
- Create: `packages/feedback/src/useCookieConsent.ts`

- [ ] **Step 1: Implement composable**

```typescript
// packages/feedback/src/useCookieConsent.ts
import { ref, computed, watch } from "vue";
import { getCookieDomain } from "./utils/getCookieDomain";

interface CookiePreferences {
  essential: true;
  analytics: boolean;
}

export interface CookieConsentOptions {
  onAnalyticsGranted?: () => void;
}

const COOKIE_NAME = "cookie_consent";
const MAX_AGE = 365 * 24 * 60 * 60;

export type { CookiePreferences };

export function useCookieConsent(options?: CookieConsentOptions) {
  const config = useRuntimeConfig();
  const domain = (config.public.cookieDomain as string | undefined)
    ?? getCookieDomain(config.public.baseUrl as string ?? "");

  const consentCookie = useCookie<CookiePreferences | null>(COOKIE_NAME, {
    domain,
    maxAge: MAX_AGE,
    sameSite: "lax" as const,
    secure: import.meta.env?.PROD ?? false,
    default: () => null,
  });

  const showBanner = ref(consentCookie.value === null);
  const showPreferences = ref(false);

  const analyticsEnabled = computed(() => consentCookie.value?.analytics === true);
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
```

- [ ] **Step 2: Commit**

```bash
git add packages/feedback/src/useCookieConsent.ts
git commit -m "feat(feedback): add useCookieConsent composable"
```

---

## Task 3: CookieConsentBanner component

**Files:**
- Create: `packages/feedback/src/CookieConsentBanner.vue`

- [ ] **Step 1: Create component**

Port from psybot's `CookieConsentBanner.vue` — same BEM structure, SCSS, CSS variables. Remove `<Icon>` dependency (use inline SVG for close button, matching pattern in BaseModal). Remove Nuxt auto-import of `ref` — add explicit `import { ref } from "vue"`. Keep `useI18n` as Nuxt auto-import (same as `useCookie`).

Key changes from psybot version:
- Add `cookiePolicyUrl` prop (string, default `""`)
- Import `useCookieConsent` from relative path
- Accept `onAnalyticsGranted` prop to pass through to composable
- Replace `<Icon name="lucide:x">` with inline SVG (consistent with BaseModal pattern)

- [ ] **Step 2: Commit**

```bash
git add packages/feedback/src/CookieConsentBanner.vue
git commit -m "feat(feedback): add CookieConsentBanner component"
```

---

## Task 4: Export from package index

**Files:**
- Modify: `packages/feedback/src/index.ts`

- [ ] **Step 1: Add exports**

Append to `packages/feedback/src/index.ts`:

```typescript
export { default as CookieConsentBanner } from "./CookieConsentBanner.vue";
export { useCookieConsent } from "./useCookieConsent";
export type { CookieConsentOptions, CookiePreferences } from "./useCookieConsent";
export { getCookieDomain } from "./utils/getCookieDomain";
```

- [ ] **Step 2: Build package**

Run: `cd /Users/marsel/Projects/Educational/nearby-ui && pnpm --filter @psy-bot-dev/feedback build`
Expected: Build succeeds, `dist/` contains new exports

- [ ] **Step 3: Typecheck**

Run: `cd /Users/marsel/Projects/Educational/nearby-ui && pnpm --filter @psy-bot-dev/feedback typecheck`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add packages/feedback/src/index.ts
git commit -m "feat(feedback): export cookie consent from package index"
```

---

## Task 5: Symlink to consumers and verify

- [ ] **Step 1: Build all packages**

Run: `cd /Users/marsel/Projects/Educational/nearby-ui && pnpm build`

- [ ] **Step 2: Link feedback package to psybot**

Run: `cd /Users/marsel/Projects/Educational/psybot && pnpm link /Users/marsel/Projects/Educational/nearby-ui/packages/feedback`

- [ ] **Step 3: Link feedback package to site**

Run: `cd /Users/marsel/Projects/Educational/site && pnpm link /Users/marsel/Projects/Educational/nearby-ui/packages/feedback`

- [ ] **Step 4: Start psybot dev server**

Run: `cd /Users/marsel/Projects/Educational/psybot && pnpm dev`

- [ ] **Step 5: Start site dev server**

Run: `cd /Users/marsel/Projects/Educational/site && pnpm dev`

- [ ] **Step 6: Verify component renders in both projects**
