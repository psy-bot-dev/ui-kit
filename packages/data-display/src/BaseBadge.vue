<template>
  <span
    class="base-badge"
    :class="[
      `base-badge--${variant}`,
      `base-badge--${size}`,
      {
        'base-badge--dot': dot,
        'base-badge--count': count !== undefined && !dot,
      },
    ]"
  >
    <template v-if="dot" />
    <template v-else-if="count !== undefined">
      {{ displayCount }}
    </template>
    <template v-else>
      <slot />
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "neutral";
type BadgeSize = "sm" | "md";

interface Props {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  count?: number;
  max?: number;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  dot: false,
  count: undefined,
  max: 99,
});

const displayCount = computed(() => {
  if (props.count === undefined) return "";
  return props.count > props.max ? `${props.max}+` : String(props.count);
});
</script>

<style scoped lang="scss">
.base-badge {
  --badge-bg: var(--theme-accent);
  --badge-text: #fff;
  --badge-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);

  .dark & {
    --badge-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-weight: 600;
  white-space: nowrap;
  border-radius: 999px;
  line-height: 1;
  letter-spacing: 0.02em;
  box-shadow: var(--badge-shadow);
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease;

  &--sm {
    font-size: 11px;
    padding: 2px 6px;
    min-height: 18px;
  }

  &--md {
    font-size: 12px;
    padding: 3px 8px;
    min-height: 22px;
  }

  &--primary {
    --badge-bg: var(--theme-accent);
    --badge-text: #fff;
  }

  &--secondary {
    --badge-bg: rgba(var(--theme-accent-rgb), 0.15);
    --badge-text: var(--theme-accent);
  }

  &--success {
    --badge-bg: var(--color-success-500);
    --badge-text: #fff;
  }

  &--warning {
    --badge-bg: var(--color-warning-500);
    --badge-text: #fff;
  }

  &--error {
    --badge-bg: var(--color-error-500);
    --badge-text: #fff;
  }

  &--neutral {
    --badge-bg: rgba(var(--theme-border-rgb), 0.2);
    --badge-text: var(--theme-text-secondary);
  }

  background: var(--badge-bg);
  color: var(--badge-text);

  &--dot {
    width: 8px;
    height: 8px;
    min-height: 0;
    padding: 0;
  }

  &--count {
    min-width: 20px;
    font-variant-numeric: tabular-nums;

    &.base-badge--sm {
      min-width: 18px;
      min-height: 18px;
      padding: 0 5px;
      aspect-ratio: 1;
      width: auto;
    }
  }
}
</style>
