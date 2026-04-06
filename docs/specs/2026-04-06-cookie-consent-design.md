# Cookie Consent — UI Kit Integration

**Date:** 2026-04-06
**Package:** `@psy-bot-dev/feedback`
**Consumers:** psybot (app.nearbyto.me), site (nearbyto.me)
**Status:** Draft

---

## Problem

Cookie consent functionality is duplicated across two projects (psybot and site) with diverging implementations: different component names, different i18n key formats, different GTM integration patterns, and duplicated `getCookieDomain` utility. Legal pages exist as raw `.md` in psybot (not rendered) and as Nuxt Content pages in site.

## Decision

Extract cookie consent into a single reusable solution in the `@psy-bot-dev/feedback` package. Legal pages stay on site (nearbyto.me) — psybot links to them via `legalBaseUrl` in runtimeConfig.

---

## Scope

### What moves to UI Kit

| Artifact | Description |
|----------|-------------|
| `CookieConsentBanner.vue` | GDPR banner with preferences panel |
| `useCookieConsent` composable | Cookie state, consent lifecycle, reopen mechanism |
| `getCookieDomain` utility | Derives `.nearbyto.me` from base URL |

### What stays in consumers

| Artifact | Where | Description |
|----------|-------|-------------|
| i18n translations | psybot `.ts`, site `.json` | Same keys `cookies \| *`, different file formats |
| GTM/analytics init | Each project | Passed as callback to composable |
| Legal pages | site only | Rendered via Nuxt Content at `/legal/*` |
| Legal links | Both | `legalBaseUrl` runtimeConfig → links point to site |

---

## Architecture

### Component: `CookieConsentBanner`

Lives in `packages/feedback/src/CookieConsentBanner.vue`.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cookiePolicyUrl` | `string` | `""` | URL to cookie policy page (on site) |

No text props — component calls `useI18n()` with standardized keys.

**Two states:**

1. **Banner** — fixed bottom, slide-up transition. Text + 3 buttons: "Essential Only", "Preferences", "Accept All"
2. **Preferences panel** — replaces banner content. Essential (always on badge) + Analytics (toggle switch) + Save button

**Styling:**
- CSS variables from `@psy-bot-dev/tokens` for theming
- Scoped SCSS + Tailwind utilities (consistent with other feedback components)
- Dark mode support via existing token system
- z-index: 60
- Mobile responsive (buttons stack vertically)

**Accessibility:**
- `role="dialog"` + `aria-label`
- `role="switch"` + `aria-checked` on analytics toggle
- Slide-up/down transition

### Composable: `useCookieConsent`

Lives in `packages/feedback/src/useCookieConsent.ts`.

**Dependencies:**
- `vue` (ref, computed, watch, onMounted)
- `getCookieDomain` (internal utility)
- Expects Nuxt's `useCookie`, `useState`, `useRuntimeConfig` to be available globally (Nuxt auto-imports)

**Cookie contract (shared between app and site):**

| Field | Value |
|-------|-------|
| Name | `cookie_consent` |
| Domain | `.nearbyto.me` (prod) / `undefined` (localhost) |
| Max-Age | 365 days |
| SameSite | Lax |
| Secure | true in production |
| Format | `{ essential: true, analytics: boolean }` |

**Interface:**

```typescript
interface CookiePreferences {
  essential: true
  analytics: boolean
}

interface CookieConsentOptions {
  onAnalyticsGranted?: () => void  // callback when analytics consent given
}

function useCookieConsent(options?: CookieConsentOptions): {
  showBanner: Ref<boolean>
  showPreferences: Ref<boolean>
  preferences: Ref<CookiePreferences | null>
  analyticsEnabled: ComputedRef<boolean>
  hasConsent: ComputedRef<boolean>
  acceptAll: () => void
  essentialOnly: () => void
  openPreferences: () => void
  savePreferences: (analytics: boolean) => void
  reopenBanner: () => void
}
```

**Behavior:**
1. On mount: read cookie. If null → `showBanner = true`. If `analytics: true` → call `onAnalyticsGranted`
2. `acceptAll()` — save `{ essential: true, analytics: true }`, call `onAnalyticsGranted`, hide banner
3. `essentialOnly()` — save `{ essential: true, analytics: false }`, hide banner
4. `savePreferences(analytics)` — generic save based on toggle state
5. `reopenBanner()` — re-display banner (triggered via `useState('cookieConsentOpen')` from sidebar/footer)

**GTM integration pattern:**
The composable does NOT know about GTM. Consumer passes `onAnalyticsGranted` callback:

```typescript
// In psybot (plugin or layout)
const { $initGTM } = useNuxtApp()
useCookieConsent({
  onAnalyticsGranted: () => $initGTM?.()
})

// In site (layout)
import { initGTM } from '~/utils/analytics'
useCookieConsent({
  onAnalyticsGranted: () => initGTM(config.public.gtmId)
})
```

### Utility: `getCookieDomain`

Lives in `packages/feedback/src/utils/getCookieDomain.ts`. Exported from package index.

```typescript
function getCookieDomain(baseUrl: string): string | undefined
```

- `https://nearbyto.me` → `.nearbyto.me`
- `https://app.nearbyto.me` → `.nearbyto.me`
- `http://localhost:3000` → `undefined`
- Invalid URL → `undefined`

Site already has this with tests — port them to `packages/feedback/__tests__/getCookieDomain.test.ts`.

---

## i18n Contract

Both projects use the same keys. Component calls `t('cookies | banner')`, etc.

### Required keys

| Key | EN value |
|-----|----------|
| `cookies \| banner` | We use cookies to ensure the site works properly and to improve your experience. You can manage your preferences at any time. |
| `cookies \| acceptAll` | Accept All |
| `cookies \| essentialOnly` | Essential Only |
| `cookies \| preferences` | Preferences |
| `cookies \| preferencesTitle` | Cookie Preferences |
| `cookies \| preferencesDescription` | Choose which cookies you allow. Essential cookies are required for the site to function and cannot be turned off. |
| `cookies \| essentialTitle` | Essential Cookies |
| `cookies \| essentialDescription` | These cookies are necessary for the site to work. They enable core features like authentication and security. |
| `cookies \| alwaysActive` | Always active |
| `cookies \| analyticsTitle` | Analytics Cookies |
| `cookies \| analyticsDescription` | These cookies help us understand how you use the site so we can improve your experience. |
| `cookies \| save` | Save Preferences |
| `cookies \| settings` | Cookie Settings |
| `cookies \| privacyLink` | Cookie Policy |
| `cookies \| ariaLabel` | Cookie consent |
| `cookies \| close` | Close |

**Locales:** en, ru, ky, kz, be — all 5 must have these keys.

### Migration

- **psybot**: already uses `cookies | *` keys — no changes needed
- **site**: rename from `ui.cookie.*` → `cookies | *` in all 5 JSON locale files

---

## Legal Links

### Config

Both projects add to `runtimeConfig.public`:

```typescript
legalBaseUrl: process.env.NUXT_PUBLIC_LEGAL_BASE_URL || 'https://nearbyto.me'
```

### Usage in components

Legal links in AuthForm, Sidebar, Footer construct URLs:

```typescript
const config = useRuntimeConfig()
const legalBase = config.public.legalBaseUrl

// Links:
// `${legalBase}/legal/terms-of-service`
// `${legalBase}/legal/privacy-policy`
// `${legalBase}/legal/cookie-policy`
```

Cookie consent banner receives `cookiePolicyUrl` prop (constructed by consumer from config).

### psybot cleanup

Remove `public/legal/*.md` files — no longer needed since links go to site.

---

## Package Changes

### `packages/feedback/`

New files:
```
src/
  CookieConsentBanner.vue
  useCookieConsent.ts
  utils/
    getCookieDomain.ts
__tests__/
  getCookieDomain.test.ts
  useCookieConsent.test.ts
```

Update `src/index.ts` — export new component, composable, and utility.

### Peer dependencies

Add to `packages/feedback/package.json`:

```json
"peerDependencies": {
  "vue": ">=3.5.0",
  "@psy-bot-dev/tokens": "workspace:*"
}
```

No new peer deps needed — component uses only Vue + existing tokens.

### Nuxt compatibility

The composable uses `useCookie`, `useState`, `useRuntimeConfig` — these are Nuxt auto-imports. The package does NOT depend on Nuxt directly; it assumes these globals exist at runtime. This is consistent with how other `@psy-bot-dev/*` packages work (they assume Vue globals).

---

## Consumer Integration

### psybot (app.nearbyto.me)

1. Install updated `@psy-bot-dev/feedback`
2. Replace `components/ui/CookieConsentBanner.vue` with UI Kit component
3. Remove `composables/useCookieConsent.ts`
4. Remove `getCookieDomain()` from `nuxt.config.ts` (use from package)
5. Remove `public/legal/*.md`
6. Add `NUXT_PUBLIC_LEGAL_BASE_URL` to env configs
7. Update legal links in `AuthForm.vue` and `Sidebar.vue` to use `legalBaseUrl`
8. i18n keys — already `cookies | *`, no migration needed

### site (nearbyto.me)

1. Install updated `@psy-bot-dev/feedback`
2. Replace `components/ui/CookieConsent.vue` with UI Kit component
3. Remove `composables/useCookieConsent.ts`
4. Remove `utils/cookieDomain.ts` and its test (moved to package)
5. Migrate i18n keys from `ui.cookie.*` → `cookies | *` in all 5 JSON locales
6. Legal pages stay as-is (`content/legal/*.md` + `pages/legal/[slug].vue`)
7. Add `NUXT_PUBLIC_LEGAL_BASE_URL=https://nearbyto.me` to env (self-referencing)

---

## Testing

### In UI Kit (`packages/feedback/__tests__/`)

- `getCookieDomain.test.ts` — port from site with same cases
- `useCookieConsent.test.ts` — mock `useCookie`, `useState`, test consent lifecycle (accept, reject, preferences, reopen)

### In consumers

- Verify banner renders and interacts correctly
- Verify cookie is set with correct domain
- Verify GTM loads only after analytics consent
- Verify legal links point to site

---

## Rollout Order

1. **UI Kit**: implement in `@psy-bot-dev/feedback`, publish new version
2. **site**: migrate (simpler — already has most pieces, just swap imports + rename i18n keys)
3. **psybot**: migrate (remove local files, update imports, add env config, update legal links)
