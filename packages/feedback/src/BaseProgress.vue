<template>
  <div
    class="base-progress"
    :class="[
      `base-progress--${size}`,
      `base-progress--${color}`,
      { 'base-progress--indeterminate': value === undefined },
    ]"
  >
    <div v-if="label || showValue" class="base-progress__header">
      <span v-if="label" :id="labelId" class="base-progress__label">{{
        label
      }}</span>
      <span
        v-if="showValue && value !== undefined"
        class="base-progress__value"
      >
        {{ Math.round(clampedValue) }}%
      </span>
    </div>

    <div
      class="base-progress__track"
      role="progressbar"
      :aria-valuenow="
        value !== undefined ? Math.round(clampedValue) : undefined
      "
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-labelledby="label ? labelId : undefined"
      :aria-label="!label && props.ariaLabel ? props.ariaLabel : undefined"
    >
      <div class="base-progress__bar" :style="barStyle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useId, computed } from "vue";

type ProgressSize = "sm" | "md";
type ProgressColor = "accent" | "success" | "warning" | "error";

interface Props {
  value?: number;
  size?: ProgressSize;
  color?: ProgressColor;
  label?: string;
  ariaLabel?: string;
  showValue?: boolean;
}

const labelId = useId();

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  size: "md",
  color: "accent",
  label: undefined,
  ariaLabel: undefined,
  showValue: false,
});

const clampedValue = computed(() =>
  Math.min(100, Math.max(0, props.value ?? 0)),
);

const barStyle = computed(() => {
  if (props.value === undefined) return {};
  return { width: `${clampedValue.value}%` };
});
</script>

<style scoped lang="scss">
.base-progress {
  --progress-color: var(--theme-accent);
  --progress-color-rgb: var(--theme-accent-rgb);

  @apply flex flex-col gap-1.5;
  font-family: var(--font-sans);

  &--accent {
    --progress-color: var(--theme-accent);
    --progress-color-rgb: var(--theme-accent-rgb);
  }

  &--success {
    --progress-color: var(--color-success-500);
    --progress-color-rgb: 16, 185, 129;
  }

  &--warning {
    --progress-color: var(--color-warning-500);
    --progress-color-rgb: 245, 158, 11;
  }

  &--error {
    --progress-color: var(--color-error-500);
    --progress-color-rgb: 239, 68, 68;
  }

  &__header {
    @apply flex items-center justify-between;
    font-size: 13px;
  }

  &__label {
    color: var(--theme-text-secondary);
  }

  &__value {
    color: var(--theme-text-muted);
    font-variant-numeric: tabular-nums;
  }

  &__track {
    width: 100%;
    border-radius: 999px;
    background: rgba(var(--theme-border-rgb), 0.15);
    overflow: hidden;

    .base-progress--sm & {
      height: 4px;
    }

    .base-progress--md & {
      height: 8px;
    }
  }

  &__bar {
    height: 100%;
    border-radius: 999px;
    background: var(--progress-color);
    transition: width 0.3s ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    .base-progress--indeterminate & {
      width: 40%;
      animation: progress-indeterminate 1.5s ease-in-out infinite;

      @media (prefers-reduced-motion: reduce) {
        width: 50%;
        animation: none;
      }
    }
  }
}

@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(350%);
  }
}
</style>
