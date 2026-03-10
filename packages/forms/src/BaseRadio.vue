<template>
  <label class="base-radio" :class="{ 'base-radio--disabled': disabled }">
    <input
      type="radio"
      class="base-radio__input"
      :checked="modelValue === value"
      :disabled="disabled"
      :name="name"
      :value="value"
      :aria-describedby="ariaDescribedBy"
      @change="onSelect"
    />
    <span
      class="base-radio__circle"
      :class="{ 'base-radio__circle--selected': modelValue === value }"
    >
      <span
        v-if="modelValue === value"
        class="base-radio__dot"
        aria-hidden="true"
      />
    </span>
    <span v-if="label || $slots.default" class="base-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { formGroupErrorIdKey, formGroupHintIdKey } from "@nearby/tokens";

interface Props {
  modelValue?: string;
  value: string;
  label?: string;
  disabled?: boolean;
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  disabled: false,
  name: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const formGroupErrorId = inject(formGroupErrorIdKey);
const formGroupHintId = inject(formGroupHintIdKey);
const ariaDescribedBy = computed(() => {
  const ids = [formGroupErrorId?.value, formGroupHintId?.value].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
});

function onSelect() {
  emit("update:modelValue", props.value);
}
</script>

<style scoped lang="scss">
.base-radio {
  --radio-border: rgba(var(--theme-border-rgb), 0.4);
  --radio-bg: transparent;
  --radio-selected-border: var(--theme-accent);
  --radio-dot-bg: var(--theme-accent);
  --radio-focus-shadow: rgba(var(--theme-accent-rgb), 0.12);
  --radio-label-color: var(--theme-text);

  .dark & {
    --radio-border: rgba(var(--theme-border-rgb), 0.3);
    --radio-focus-shadow: rgba(var(--theme-accent-rgb), 0.2);
  }

  @apply inline-flex cursor-pointer items-center gap-2;

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__input {
    @apply sr-only;

    &:focus-visible + .base-radio__circle {
      box-shadow: 0 0 0 3px var(--radio-focus-shadow);
    }
  }

  &__circle {
    @apply relative flex flex-shrink-0 items-center justify-center;
    width: 18px;
    height: 18px;
    border: 2px solid var(--radio-border);
    border-radius: 50%;
    background: var(--radio-bg);
    transition: all 0.2s ease;

    &--selected {
      border-color: var(--radio-selected-border);
    }
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--radio-dot-bg);
    transition: transform 0.15s ease;
  }

  &__label {
    @apply text-sm;
    color: var(--radio-label-color);
    user-select: none;
  }

  @media (hover: hover) {
    &:hover:not(.base-radio--disabled) .base-radio__circle {
      border-color: var(--radio-selected-border);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .base-radio__circle,
    .base-radio__dot {
      transition: none;
    }
  }
}
</style>
