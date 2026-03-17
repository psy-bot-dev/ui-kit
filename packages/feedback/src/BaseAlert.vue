<template>
  <div
    v-if="isVisible"
    class="base-alert"
    :class="[`base-alert--${type}`, `base-alert--${variant}`]"
    :role="type === 'error' || type === 'warning' ? 'alert' : 'status'"
    :aria-live="type === 'error' || type === 'warning' ? 'assertive' : 'polite'"
  >
    <span class="base-alert__icon">
      <slot name="icon">
        <span class="base-alert__icon-default" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </span>
      </slot>
    </span>

    <div class="base-alert__body">
      <span v-if="title" class="base-alert__title">{{ title }}</span>
      <span class="base-alert__message">
        <slot />
      </span>
    </div>

    <span v-if="$slots.action" class="base-alert__action">
      <slot name="action" />
    </span>

    <button
      v-if="closable"
      class="base-alert__close"
      type="button"
      :aria-label="closeAriaLabel"
      @click="handleClose"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

type AlertType = "info" | "success" | "warning" | "error";
type AlertVariant = "filled" | "outlined" | "soft";

interface Props {
  type?: AlertType;
  title?: string;
  closable?: boolean;
  icon?: string;
  variant?: AlertVariant;
  modelValue?: boolean;
  closeAriaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  title: undefined,
  closable: false,
  icon: undefined,
  variant: "soft",
  modelValue: undefined,
  closeAriaLabel: "Close",
});

const emit = defineEmits<{
  close: [];
  "update:modelValue": [value: boolean];
}>();

const internalVisible = ref(true);

const isVisible = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalVisible.value,
);

function handleClose() {
  if (props.modelValue !== undefined) {
    emit("update:modelValue", false);
  } else {
    internalVisible.value = false;
  }
  emit("close");
}
</script>

<style scoped lang="scss">
.base-alert {
  --alert-color: var(--color-info-500);
  --alert-color-rgb: 59, 130, 246;

  @apply flex items-start gap-3;
  padding: 12px 16px;
  border-radius: var(--radius-small, 8px);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.5;
  transition: opacity 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &--info {
    --alert-color: var(--color-info-500);
    --alert-color-rgb: 59, 130, 246;
  }

  &--success {
    --alert-color: var(--color-success-500);
    --alert-color-rgb: 16, 185, 129;
  }

  &--warning {
    --alert-color: var(--color-warning-500);
    --alert-color-rgb: 245, 158, 11;
  }

  &--error {
    --alert-color: var(--color-error-500);
    --alert-color-rgb: 239, 68, 68;
  }

  &--soft {
    background: rgba(var(--alert-color-rgb), 0.08);
    color: var(--alert-color);

    .dark & {
      background: rgba(var(--alert-color-rgb), 0.12);
    }
  }

  &--filled {
    background: var(--alert-color);
    color: #fff;

    .base-alert__title,
    .base-alert__message {
      color: #fff;
    }

    .base-alert__close {
      color: rgba(255, 255, 255, 0.8);

      @media (hover: hover) {
        &:hover {
          color: #fff;
        }
      }
    }
  }

  &--outlined {
    background: transparent;
    color: var(--alert-color);
    border: 1px solid rgba(var(--alert-color-rgb), 0.4);

    .dark & {
      border-color: rgba(var(--alert-color-rgb), 0.3);
    }
  }

  &__icon {
    @apply flex shrink-0 items-center;
    color: inherit;
    margin-top: 1px;
  }

  &__icon-default {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__body {
    @apply min-w-0 flex flex-1 flex-col gap-0.5;
  }

  &__title {
    font-weight: 600;
    color: inherit;
  }

  &__message {
    color: inherit;
    opacity: 0.9;
  }

  &__action {
    @apply flex shrink-0 items-center;
    margin-left: auto;
  }

  &__close {
    @apply flex shrink-0 items-center justify-center;
    width: 24px;
    height: 24px;
    border-radius: var(--radius-small, 8px);
    color: inherit;
    opacity: 0.7;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
    transition: opacity 0.15s ease;

    @media (hover: hover) {
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
