<template>
  <button
    class="base-button"
    :class="[
      `base-button--${variant}`,
      `base-button--${size}`,
      {
        'base-button--loading': loading,
        'base-button--block': block,
      },
    ]"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :type="type"
    @click="emit('click', $event)"
  >
    <BaseSpinner
      v-if="loading"
      class="base-button__spinner"
      :size="spinnerSize"
      :color="spinnerColor"
    />
    <span class="base-button__content">
      <span v-if="$slots.icon" class="base-button__icon">
        <slot name="icon" />
      </span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BaseSpinner } from "@psy-bot-dev/spinner";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface Props {
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  loading: false,
  block: false,
});

const spinnerColor = computed(() =>
  props.variant === "primary" || props.variant === "danger"
    ? "white"
    : "accent",
);

const spinnerSize = computed(() => (props.size === "lg" ? "md" : "sm"));

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<style scoped lang="scss">
.base-button {
  --btn-primary-bg: var(--theme-accent);
  --btn-primary-hover: var(--theme-accent-hover);
  --btn-primary-text: #fff;
  --btn-secondary-bg: rgba(var(--theme-accent-rgb), 0.1);
  --btn-secondary-hover: rgba(var(--theme-accent-rgb), 0.15);
  --btn-secondary-text: var(--theme-accent);
  --btn-danger-bg: var(--theme-error-light);
  --btn-danger-hover: var(--theme-error);
  --btn-danger-text: #fff;
  --btn-ghost-hover: rgba(0, 0, 0, 0.05);
  --btn-ghost-text: var(--theme-text-secondary);
  --btn-outline-bg: rgba(var(--theme-card-bg), 0.5);
  --btn-outline-border: rgba(var(--theme-border-rgb), 0.12);
  --btn-outline-text: var(--theme-text-secondary);
  --btn-outline-hover-text: var(--theme-accent);
  --btn-outline-hover-bg: rgba(var(--theme-accent-rgb), 0.08);

  .dark & {
    --btn-danger-text: var(--theme-text);
    --btn-ghost-hover: rgba(255, 255, 255, 0.1);
    --btn-outline-bg: rgba(30, 50, 45, 0.4);
    --btn-outline-hover-bg: rgba(var(--theme-accent-rgb), 0.1);
  }

  @apply inline-flex items-center justify-center gap-2 font-medium;
  font-family: var(--font-sans);
  border-radius: var(--radius-element, 12px);
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--block {
    @apply w-full;
  }

  &--sm {
    @apply px-3 py-1.5 text-sm;
  }

  &--md {
    @apply px-4 py-2.5 text-sm;
  }

  &--lg {
    @apply px-6 py-4 text-base font-semibold;
    min-height: 56px;
  }

  &--primary {
    background: var(--btn-primary-bg);
    color: var(--btn-primary-text);
    box-shadow: 0 4px 15px rgba(var(--theme-accent-rgb), 0.3);

    .dark & {
      box-shadow: 0 4px 15px rgba(var(--theme-accent-rgb), 0.2);
    }

    @media (hover: hover) {
      &:hover:not(:disabled) {
        background: var(--btn-primary-hover);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(var(--theme-accent-rgb), 0.4);

        .dark & {
          box-shadow: 0 6px 20px rgba(var(--theme-accent-rgb), 0.3);
        }
      }
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--secondary {
    background: var(--btn-secondary-bg);
    color: var(--btn-secondary-text);

    @media (hover: hover) {
      &:hover:not(:disabled) {
        background: var(--btn-secondary-hover);
      }
    }
  }

  &--danger {
    background: var(--btn-danger-bg);
    color: var(--btn-danger-text);

    @media (hover: hover) {
      &:hover:not(:disabled) {
        background: var(--btn-danger-hover);
      }
    }
  }

  &--ghost {
    background: transparent;
    color: var(--btn-ghost-text);

    @media (hover: hover) {
      &:hover:not(:disabled) {
        background: var(--btn-ghost-hover);
      }
    }
  }

  &--outline {
    background: var(--btn-outline-bg);
    color: var(--btn-outline-text);
    border: 1px solid var(--btn-outline-border);
    backdrop-filter: blur(10px);

    @media (hover: hover) {
      &:hover:not(:disabled) {
        color: var(--btn-outline-hover-text);
        background: var(--btn-outline-hover-bg);
        border-color: var(--btn-outline-hover-text);
        transform: translateY(-1px);
      }
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--loading {
    position: relative;
    pointer-events: none;
  }

  &__content {
    @apply inline-flex items-center gap-2;
    transition: opacity 0.15s ease;

    .base-button--loading & {
      visibility: hidden;
    }
  }

  &__icon {
    @apply flex-shrink-0 flex items-center justify-center;

    :deep(svg) {
      width: 16px;
      height: 16px;
    }
  }

  &__spinner {
    position: absolute;
    inset: 0;
    margin: auto;
  }
}
</style>
