<template>
  <div class="base-slider" :class="{ 'base-slider--disabled': disabled }">
    <div v-if="label || showValue" class="base-slider__header">
      <label v-if="label" :for="inputId" class="base-slider__label">{{
        label
      }}</label>
      <span v-if="showValue" class="base-slider__value">
        <slot name="value" :value="modelValue">{{ modelValue }}</slot>
      </span>
    </div>
    <input
      :id="inputId"
      type="range"
      class="base-slider__input"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :style="trackStyle"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="modelValue"
      :aria-label="label || undefined"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { useId, computed } from "vue";

interface Props {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showValue: false,
  label: "",
});

const inputId = useId();

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100;
});

const trackStyle = computed(() => ({
  "--slider-fill": `${percentage.value}%`,
}));

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", Number(target.value));
}
</script>

<style scoped lang="scss">
.base-slider {
  --slider-track-bg: rgba(var(--theme-border-rgb), 0.25);
  --slider-track-fill-bg: var(--theme-accent);
  --slider-thumb-bg: var(--theme-accent);
  --slider-thumb-shadow: rgba(var(--theme-accent-rgb), 0.2);
  --slider-label-color: var(--theme-text);
  --slider-value-color: var(--theme-text-secondary);

  .dark & {
    --slider-track-bg: rgba(var(--theme-border-rgb), 0.2);
    --slider-thumb-shadow: rgba(var(--theme-accent-rgb), 0.3);
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__header {
    @apply mb-2 flex items-center justify-between;
  }

  &__label {
    @apply text-sm font-medium;
    color: var(--slider-label-color);
  }

  &__value {
    @apply text-sm tabular-nums;
    color: var(--slider-value-color);
  }

  &__input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(
      to right,
      var(--slider-track-fill-bg) 0%,
      var(--slider-track-fill-bg) var(--slider-fill),
      var(--slider-track-bg) var(--slider-fill),
      var(--slider-track-bg) 100%
    );
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--slider-thumb-bg);
      box-shadow: 0 2px 6px var(--slider-thumb-shadow);
      border: 2px solid #fff;
      cursor: pointer;
      transition: transform 0.15s ease;
    }

    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--slider-thumb-bg);
      box-shadow: 0 2px 6px var(--slider-thumb-shadow);
      border: 2px solid #fff;
      cursor: pointer;
      transition: transform 0.15s ease;
    }

    @media (hover: hover) {
      &:hover:not(:disabled)::-webkit-slider-thumb {
        transform: scale(1.15);
      }

      &:hover:not(:disabled)::-moz-range-thumb {
        transform: scale(1.15);
      }
    }

    &:focus-visible::-webkit-slider-thumb {
      box-shadow:
        0 2px 6px var(--slider-thumb-shadow),
        0 0 0 3px rgba(var(--theme-accent-rgb), 0.12);
    }

    &:focus-visible::-moz-range-thumb {
      box-shadow:
        0 2px 6px var(--slider-thumb-shadow),
        0 0 0 3px rgba(var(--theme-accent-rgb), 0.12);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &__input {
      &::-webkit-slider-thumb {
        transition: none;
      }

      &::-moz-range-thumb {
        transition: none;
      }
    }
  }
}
</style>
