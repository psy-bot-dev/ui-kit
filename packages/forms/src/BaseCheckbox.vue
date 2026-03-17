<template>
  <label class="base-checkbox" :class="{ 'base-checkbox--disabled': disabled }">
    <input
      type="checkbox"
      class="base-checkbox__input"
      :checked="modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :name="name"
      :value="value"
      :aria-checked="indeterminate ? 'mixed' : modelValue"
      :aria-describedby="ariaDescribedBy"
      @change="onToggle"
    />
    <span
      class="base-checkbox__box"
      :class="{
        'base-checkbox__box--checked': modelValue,
        'base-checkbox__box--indeterminate': indeterminate,
      }"
    >
      <svg
        v-if="modelValue && !indeterminate"
        class="base-checkbox__check"
        aria-hidden="true"
        viewBox="0 0 12 10"
        fill="none"
      >
        <path
          d="M1 5L4.5 8.5L11 1.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-else-if="indeterminate"
        class="base-checkbox__check"
        viewBox="0 0 12 2"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 1H11"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>
    <span v-if="label || $slots.default" class="base-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { formGroupErrorIdKey, formGroupHintIdKey } from "@psy-bot-dev/tokens";

interface Props {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  name?: string;
  value?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: "",
  disabled: false,
  indeterminate: false,
  name: undefined,
  value: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const formGroupErrorId = inject(formGroupErrorIdKey);
const formGroupHintId = inject(formGroupHintIdKey);
const ariaDescribedBy = computed(() => {
  const ids = [formGroupErrorId?.value, formGroupHintId?.value].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
});

function onToggle(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
}
</script>

<style scoped lang="scss">
.base-checkbox {
  --checkbox-border: rgba(var(--theme-border-rgb), 0.4);
  --checkbox-bg: transparent;
  --checkbox-checked-bg: var(--theme-accent);
  --checkbox-checked-border: var(--theme-accent);
  --checkbox-check-color: #fff;
  --checkbox-focus-shadow: rgba(var(--theme-accent-rgb), 0.12);
  --checkbox-label-color: var(--theme-text);

  .dark & {
    --checkbox-border: rgba(var(--theme-border-rgb), 0.3);
    --checkbox-focus-shadow: rgba(var(--theme-accent-rgb), 0.2);
  }

  @apply inline-flex cursor-pointer items-center gap-2;

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__input {
    @apply sr-only;

    &:focus-visible + .base-checkbox__box {
      box-shadow: 0 0 0 3px var(--checkbox-focus-shadow);
    }
  }

  &__box {
    @apply relative flex flex-shrink-0 items-center justify-center;
    width: 18px;
    height: 18px;
    border: 2px solid var(--checkbox-border);
    border-radius: var(--radius-small, 8px);
    background: var(--checkbox-bg);
    transition: all 0.2s ease;

    &--checked,
    &--indeterminate {
      background: var(--checkbox-checked-bg);
      border-color: var(--checkbox-checked-border);
    }
  }

  &__check {
    width: 12px;
    height: 12px;
    color: var(--checkbox-check-color);
  }

  &__label {
    @apply text-sm;
    color: var(--checkbox-label-color);
    user-select: none;
  }

  @media (hover: hover) {
    &:hover:not(.base-checkbox--disabled) .base-checkbox__box {
      border-color: var(--checkbox-checked-bg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .base-checkbox__box {
      transition: none;
    }
  }
}
</style>
