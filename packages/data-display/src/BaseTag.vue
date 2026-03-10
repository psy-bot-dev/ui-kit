<template>
  <span class="base-tag" :class="[`base-tag--${variant}`, `base-tag--${size}`]">
    <span v-if="$slots.icon" class="base-tag__icon">
      <slot name="icon" />
    </span>
    <span class="base-tag__text">
      <slot />
    </span>
    <button
      v-if="closable"
      class="base-tag__close"
      type="button"
      aria-label="Remove tag"
      @click="emit('close')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
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
  </span>
</template>

<script setup lang="ts">
type TagVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "neutral";
type TagSize = "sm" | "md";

interface Props {
  variant?: TagVariant;
  size?: TagSize;
  closable?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  closable: false,
});

const emit = defineEmits<{
  close: [];
}>();
</script>

<style scoped lang="scss">
.base-tag {
  --tag-color: var(--theme-accent);
  --tag-color-rgb: var(--theme-accent-rgb);

  @apply inline-flex items-center gap-1.5;
  font-family: var(--font-sans);
  font-weight: 500;
  border-radius: var(--radius-element, 12px);
  white-space: nowrap;
  transition: opacity 0.15s ease;

  &--sm {
    padding: 2px 8px;
    font-size: 12px;
  }

  &--md {
    padding: 4px 10px;
    font-size: 13px;
  }

  &--primary {
    --tag-color: var(--theme-accent);
    --tag-color-rgb: var(--theme-accent-rgb);
  }

  &--secondary {
    --tag-color: var(--theme-text-secondary);
    --tag-color-rgb: var(--theme-border-rgb);
  }

  &--success {
    --tag-color: var(--color-success-500);
    --tag-color-rgb: 16, 185, 129;
  }

  &--warning {
    --tag-color: var(--color-warning-500);
    --tag-color-rgb: 245, 158, 11;
  }

  &--error {
    --tag-color: var(--color-error-500);
    --tag-color-rgb: 239, 68, 68;
  }

  &--neutral {
    --tag-color: var(--theme-text-muted);
    --tag-color-rgb: var(--theme-border-rgb);
  }

  background: rgba(var(--tag-color-rgb), 0.1);
  border: 1px solid rgba(var(--tag-color-rgb), 0.2);
  color: var(--tag-color);

  .dark & {
    background: rgba(var(--tag-color-rgb), 0.12);
    border-color: rgba(var(--tag-color-rgb), 0.18);
  }

  &__icon {
    @apply flex-shrink-0;
  }

  &__text {
    line-height: 1.4;
  }

  &__close {
    @apply flex shrink-0 items-center justify-center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: transparent;
    border: none;
    padding: 0;
    color: inherit;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.15s ease;

    @media (hover: hover) {
      &:hover {
        opacity: 1;
        background: rgba(var(--tag-color-rgb), 0.15);
      }
    }
  }
}
</style>
