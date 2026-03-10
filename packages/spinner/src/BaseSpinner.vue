<template>
  <span
    class="base-spinner"
    :class="[`base-spinner--${size}`, `base-spinner--${color}`]"
    role="status"
    :aria-label="label || undefined"
  />
</template>

<script setup lang="ts">
type SpinnerSize = "sm" | "md" | "lg";
type SpinnerColor = "current" | "white" | "accent";

interface Props {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
}

withDefaults(defineProps<Props>(), {
  size: "md",
  color: "current",
  label: "",
});
</script>

<style scoped lang="scss">
.base-spinner {
  --spinner-color: currentColor;

  display: inline-block;
  border: 2px solid var(--spinner-color);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  &--sm {
    width: 14px;
    height: 14px;
  }

  &--md {
    width: 18px;
    height: 18px;
  }

  &--lg {
    width: 24px;
    height: 24px;
  }

  &--current {
    --spinner-color: currentColor;
  }

  &--white {
    --spinner-color: #fff;
  }

  &--accent {
    --spinner-color: var(--theme-accent);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .base-spinner {
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.4;
    }
  }
}
</style>
