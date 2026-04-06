<template>
  <Transition name="cookie-slide">
    <div
      v-if="showBanner"
      class="cookie-banner"
      role="dialog"
      :aria-label="t('cookies | preferencesTitle')"
    >
      <!-- Banner state -->
      <div v-if="!showPreferences" class="cookie-banner__body">
        <p class="cookie-banner__text">
          {{ t("cookies | banner") }}
          <a
            v-if="cookiePolicyUrl"
            :href="cookiePolicyUrl"
            target="_blank"
            rel="noopener"
            class="cookie-banner__link"
          >
            {{ t("cookies | privacyLink") }}
          </a>
        </p>
        <div class="cookie-banner__actions">
          <button class="cookie-banner__btn-secondary" @click="essentialOnly">
            {{ t("cookies | essentialOnly") }}
          </button>
          <button class="cookie-banner__btn-secondary" @click="openPreferences">
            {{ t("cookies | preferences") }}
          </button>
          <button class="cookie-banner__btn-primary" @click="acceptAll">
            {{ t("cookies | acceptAll") }}
          </button>
        </div>
      </div>

      <!-- Preferences state -->
      <div v-else class="cookie-banner__preferences">
        <div class="cookie-banner__pref-header">
          <h3 class="cookie-banner__pref-title">
            {{ t("cookies | preferencesTitle") }}
          </h3>
          <button
            class="cookie-banner__close"
            :aria-label="t('cookies | close')"
            @click="essentialOnly"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <p class="cookie-banner__pref-description">
          {{ t("cookies | preferencesDescription") }}
        </p>

        <!-- Essential cookies -->
        <div class="cookie-banner__category">
          <div class="cookie-banner__category-header">
            <span class="cookie-banner__category-title">
              {{ t("cookies | essentialTitle") }}
            </span>
            <span class="cookie-banner__badge">
              {{ t("cookies | alwaysActive") }}
            </span>
          </div>
          <p class="cookie-banner__category-description">
            {{ t("cookies | essentialDescription") }}
          </p>
        </div>

        <!-- Analytics cookies -->
        <div class="cookie-banner__category">
          <div class="cookie-banner__category-header">
            <span class="cookie-banner__category-title">
              {{ t("cookies | analyticsTitle") }}
            </span>
            <button
              role="switch"
              :aria-checked="analyticsToggle"
              class="cookie-banner__toggle"
              :class="{ 'cookie-banner__toggle--on': analyticsToggle }"
              @click="analyticsToggle = !analyticsToggle"
            >
              <span class="cookie-banner__toggle-thumb" />
            </button>
          </div>
          <p class="cookie-banner__category-description">
            {{ t("cookies | analyticsDescription") }}
          </p>
        </div>

        <button
          class="cookie-banner__btn-primary cookie-banner__btn-save"
          @click="handleSavePreferences"
        >
          {{ t("cookies | save") }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCookieConsent } from "./useCookieConsent";
import type { CookieConsentOptions } from "./useCookieConsent";

interface Props {
  cookiePolicyUrl?: string;
  onAnalyticsGranted?: CookieConsentOptions["onAnalyticsGranted"];
}

const props = withDefaults(defineProps<Props>(), {
  cookiePolicyUrl: "",
  onAnalyticsGranted: undefined,
});

const { t } = useI18n();
const {
  showBanner,
  showPreferences,
  acceptAll,
  essentialOnly,
  savePreferences,
  openPreferences,
} = useCookieConsent({ onAnalyticsGranted: props.onAnalyticsGranted });

const analyticsToggle = ref(false);

function handleSavePreferences() {
  savePreferences(analyticsToggle.value);
}
</script>

<style scoped lang="scss">
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition:
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.35s ease;
}

.cookie-slide-enter-from,
.cookie-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.cookie-banner {
  --cb-bg: rgba(var(--theme-card-bg), 0.95);
  --cb-border: rgba(var(--theme-border-rgb), 0.2);
  --cb-text: var(--theme-text);
  --cb-text-muted: var(--theme-text-secondary);
  --cb-accent: var(--theme-accent);
  --cb-accent-rgb: var(--theme-accent-rgb);

  .dark & {
    --cb-bg: rgba(var(--theme-card-bg), 0.97);
    --cb-border: rgba(var(--theme-border-rgb), 0.25);
  }

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 60;
  padding: 16px;
  pointer-events: none;

  @media (min-width: 769px) {
    padding: 24px;
    display: flex;
    justify-content: center;
  }

  &__body,
  &__preferences {
    pointer-events: auto;
    background: var(--cb-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--cb-border);
    border-radius: var(--radius-card);
    padding: 20px;
    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.1);

    .dark & {
      box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.3);
    }

    @media (min-width: 769px) {
      max-width: 560px;
      width: 100%;
      padding: 24px;
    }
  }

  &__text {
    @apply text-sm leading-relaxed mb-4;
    font-family: var(--font-sans);
    color: var(--cb-text-muted);
  }

  &__link {
    color: var(--cb-accent);
    text-decoration: underline;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  &__actions {
    @apply flex flex-col gap-2;

    @media (min-width: 769px) {
      @apply flex-row justify-end;
    }
  }

  &__btn-primary {
    @apply px-5 py-2.5 text-sm font-medium rounded-lg;
    font-family: var(--font-sans);
    background: var(--cb-accent);
    color: white;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 0.8;
    }
  }

  &__btn-secondary {
    @apply px-5 py-2.5 text-sm font-medium rounded-lg;
    font-family: var(--font-sans);
    background: transparent;
    color: var(--cb-text-muted);
    border: 1px solid var(--cb-border);
    transition: all 0.2s ease;

    &:hover {
      color: var(--cb-text);
      border-color: var(--cb-accent);
    }

    &:active {
      background: rgba(var(--cb-accent-rgb), 0.08);
    }
  }

  &__btn-save {
    @apply w-full mt-4;
  }

  &__preferences {
    display: flex;
    flex-direction: column;
  }

  &__pref-header {
    @apply flex items-center justify-between mb-2;
  }

  &__pref-title {
    @apply text-base font-semibold;
    font-family: var(--font-sans);
    color: var(--cb-text);
  }

  &__close {
    @apply p-2 rounded-lg;
    color: var(--cb-text-muted);
    transition: color 0.2s ease;

    &:hover {
      color: var(--cb-text);
    }
  }

  &__pref-description {
    @apply text-sm leading-relaxed mb-4;
    font-family: var(--font-sans);
    color: var(--cb-text-muted);
  }

  &__category {
    @apply py-3;
    border-top: 1px solid var(--cb-border);
  }

  &__category-header {
    @apply flex items-center justify-between mb-1;
  }

  &__category-title {
    @apply text-sm font-medium;
    font-family: var(--font-sans);
    color: var(--cb-text);
  }

  &__category-description {
    @apply text-xs leading-relaxed;
    font-family: var(--font-sans);
    color: var(--cb-text-muted);
  }

  &__badge {
    @apply text-xs px-2 py-0.5 rounded-full;
    font-family: var(--font-sans);
    background: rgba(var(--cb-accent-rgb), 0.12);
    color: var(--cb-accent);
  }

  &__toggle {
    @apply relative inline-flex items-center shrink-0;
    width: 44px;
    height: 24px;
    border-radius: 12px;
    background: var(--cb-border);
    transition: background 0.2s ease;
    cursor: pointer;

    &--on {
      background: var(--cb-accent);
    }
  }

  &__toggle-thumb {
    @apply block rounded-full;
    width: 18px;
    height: 18px;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    transform: translateX(3px);
    transition: transform 0.2s ease;

    .cookie-banner__toggle--on & {
      transform: translateX(23px);
    }
  }
}
</style>
