<template>
  <div :class="[!isExistsMessage && 'mb-4']">
    <label
      :for="inputId"
      :class="[
        'base-input__label',
        isExistsError && 'base-input__label--error',
      ]"
    >
      {{ props.label }}
    </label>
    <input
      :id="inputId"
      v-model="computedModel"
      :type="props.type"
      :class="[
        'base-input__field',
        isExistsError && 'base-input__field--error',
        props.readonly && 'base-input__field--readonly',
      ]"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :inputmode="props.inputmode"
      :autocomplete="props.autocomplete"
      :aria-describedby="ariaDescribedBy"
    />
    <p v-if="message" class="base-input__message">
      {{ message }}
    </p>
    <p v-if="error" class="base-input__error">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, useId } from "vue";
import { formGroupErrorIdKey, formGroupHintIdKey } from "@psy-bot-dev/tokens";

interface Props {
  modelValue?: string;
  label?: string;
  type?: string;
  id?: string | undefined;
  placeholder?: string;
  message?: string;
  error?: string;
  errorState?: boolean;
  readonly?: boolean;
  inputmode?:
    | "text"
    | "search"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  type: "text",
  id: undefined,
  placeholder: "",
  message: "",
  error: "",
  errorState: false,
  readonly: false,
  inputmode: undefined,
  autocomplete: undefined,
});
const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const fallbackId = useId();
const inputId = computed(() => props.id ?? fallbackId);

const computedModel = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});

const isExistsMessage = computed(() => !!props.error || !!props.message);
const isExistsError = computed(() => !!props.error || props.errorState);

const formGroupErrorId = inject(formGroupErrorIdKey);
const formGroupHintId = inject(formGroupHintIdKey);
const ariaDescribedBy = computed(() => {
  const ids = [formGroupErrorId?.value, formGroupHintId?.value].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
});
</script>

<style scoped lang="scss">
.base-input {
  --input-bg: rgba(var(--theme-input-bg), 1);
  --input-border: rgba(var(--theme-border-rgb), 0.3);
  --input-text: var(--theme-text);
  --input-placeholder: var(--theme-text-muted);
  --input-label: var(--theme-text);
  --input-focus: var(--theme-accent);
  --input-focus-shadow: rgba(var(--theme-accent-rgb), 0.1);
  --input-error: var(--theme-error);
  --input-error-shadow: rgba(var(--theme-error-rgb), 0.1);
  --input-readonly-bg: rgba(var(--theme-card-bg), 0.5);
  --input-readonly-text: var(--theme-text-muted);
  --input-message: var(--theme-text-secondary);

  .dark & {
    --input-bg: rgba(var(--theme-input-bg), 1);
    --input-border: rgba(var(--theme-border-rgb), 0.2);
    --input-focus-shadow: rgba(var(--theme-accent-rgb), 0.15);
    --input-error-shadow: rgba(var(--theme-error-rgb), 0.15);
  }

  &__label {
    @apply mb-1.5 block text-sm font-medium;
    color: var(--input-label);

    &--error {
      color: var(--input-error);
    }
  }

  &__field {
    @apply w-full rounded-lg border px-4 py-3 text-base transition-all duration-200 focus:outline-none;
    background: var(--input-bg);
    border-color: var(--input-border);
    color: var(--input-text);

    &::placeholder {
      color: var(--input-placeholder);
      font-weight: 400;
    }

    &:focus {
      border-color: var(--input-focus);
      box-shadow: 0 0 0 3px var(--input-focus-shadow);
    }

    &--error {
      border-color: var(--input-error);

      &:focus {
        border-color: var(--input-error);
        box-shadow: 0 0 0 3px var(--input-error-shadow);
      }
    }

    &--readonly {
      background: var(--input-readonly-bg);
      color: var(--input-readonly-text);
      cursor: not-allowed;

      &:focus {
        border-color: var(--input-border);
        box-shadow: none;
      }
    }
  }

  &__message {
    @apply mt-1.5 text-sm;
    color: var(--input-message);
  }

  &__error {
    @apply mt-1.5 text-sm font-medium;
    color: var(--input-error);
  }
}
</style>
