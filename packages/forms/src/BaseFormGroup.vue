<template>
  <div class="base-form-group">
    <label
      v-if="label || $slots.label"
      :for="htmlFor"
      :class="[
        'base-form-group__label',
        required && 'base-form-group__label--required',
      ]"
    >
      <slot name="label">{{ label }}</slot>
    </label>
    <slot />
    <p
      v-if="error || $slots.error"
      :id="errorId"
      class="base-form-group__error"
      role="alert"
    >
      <slot name="error">{{ error }}</slot>
    </p>
    <p v-else-if="hint" :id="hintId" class="base-form-group__hint">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useId, computed, provide } from "vue";
import { formGroupErrorIdKey, formGroupHintIdKey } from "@psy-bot-dev/tokens";

interface Props {
  label?: string;
  for?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  for: undefined,
  error: "",
  hint: "",
  required: false,
});

const groupBaseId = useId();
const htmlFor = computed(() => props.for);
const errorId = computed(() =>
  props.for ? `${props.for}-error` : `${groupBaseId}-error`,
);
const hintId = computed(() =>
  props.for ? `${props.for}-hint` : `${groupBaseId}-hint`,
);

provide(formGroupErrorIdKey, errorId);
provide(formGroupHintIdKey, hintId);
</script>

<style scoped lang="scss">
.base-form-group {
  --form-label: var(--theme-text);
  --form-hint: var(--theme-text-muted);
  --form-error: var(--theme-error);

  @apply mb-4;

  &__label {
    @apply mb-1.5 block text-sm font-medium;
    color: var(--form-label);

    &--required::after {
      content: " *";
      color: var(--form-error);
    }
  }

  &__hint {
    @apply mt-1.5 text-sm;
    color: var(--form-hint);
  }

  &__error {
    @apply mt-1.5 text-sm font-medium;
    color: var(--form-error);
  }
}
</style>
