<template>
  <div class="base-textarea">
    <label v-if="label" :for="id" class="base-textarea__label">{{
      label
    }}</label>
    <textarea
      :id="id"
      ref="textareaRef"
      class="base-textarea__field"
      :class="{
        'base-textarea__field--error': !!error,
        'base-textarea__field--readonly': readonly,
        'base-textarea__field--auto-resize': autoResize,
      }"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :aria-describedby="ariaDescribedBy"
      @input="onInput"
    />
    <p v-if="error" class="base-textarea__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import {
  useId,
  computed,
  inject,
  ref,
  nextTick,
  watch,
  onMounted,
} from "vue";
import { formGroupErrorIdKey, formGroupHintIdKey } from "@psy-bot-dev/tokens";

interface Props {
  modelValue?: string;
  label?: string;
  id?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  rows?: number;
  maxRows?: number;
  autoResize?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  id: undefined,
  placeholder: "",
  error: "",
  disabled: false,
  readonly: false,
  rows: 3,
  maxRows: 8,
  autoResize: true,
});

const fallbackId = useId();
const id = computed(() => props.id ?? fallbackId);
const formGroupErrorId = inject(formGroupErrorIdKey);
const formGroupHintId = inject(formGroupHintIdKey);
const ariaDescribedBy = computed(() => {
  const ids = [formGroupErrorId?.value, formGroupHintId?.value].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);

function resize() {
  if (!props.autoResize || !textareaRef.value) return;

  const el = textareaRef.value;
  el.style.height = "auto";

  const style = getComputedStyle(el);
  const lineHeight = parseFloat(style.lineHeight) || 20;
  const paddingTop = parseFloat(style.paddingTop) || 0;
  const paddingBottom = parseFloat(style.paddingBottom) || 0;
  const maxHeight = props.maxRows * lineHeight + paddingTop + paddingBottom;
  const newHeight = Math.min(el.scrollHeight, maxHeight);

  el.style.height = `${newHeight}px`;
}

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
  nextTick(resize);
}

watch(
  () => props.modelValue,
  () => {
    nextTick(resize);
  },
);

onMounted(() => {
  nextTick(resize);
});
</script>

<style scoped lang="scss">
.base-textarea {
  --textarea-bg: rgba(var(--theme-input-bg), 1);
  --textarea-border: rgba(var(--theme-border-rgb), 0.3);
  --textarea-text: var(--theme-text);
  --textarea-placeholder: var(--theme-text-muted);
  --textarea-focus: var(--theme-accent);
  --textarea-focus-shadow: rgba(var(--theme-accent-rgb), 0.1);
  --textarea-error: var(--theme-error);
  --textarea-error-shadow: rgba(var(--theme-error-rgb), 0.1);

  .dark & {
    --textarea-border: rgba(var(--theme-border-rgb), 0.2);
    --textarea-focus-shadow: rgba(var(--theme-accent-rgb), 0.15);
    --textarea-error-shadow: rgba(var(--theme-error-rgb), 0.15);
  }

  &__label {
    @apply mb-1.5 block text-sm font-medium;
    color: var(--textarea-text);
  }

  &__field {
    @apply w-full rounded-lg border px-4 py-3 text-base transition-all duration-200 focus:outline-none;
    font-family: var(--font-sans);
    background: var(--textarea-bg);
    border-color: var(--textarea-border);
    color: var(--textarea-text);
    resize: vertical;

    &::placeholder {
      color: var(--textarea-placeholder);
      font-weight: 400;
    }

    &:focus {
      border-color: var(--textarea-focus);
      box-shadow: 0 0 0 3px var(--textarea-focus-shadow);
    }

    &--error {
      border-color: var(--textarea-error);

      &:focus {
        border-color: var(--textarea-error);
        box-shadow: 0 0 0 3px var(--textarea-error-shadow);
      }
    }

    &--auto-resize {
      resize: none;
    }

    &--readonly {
      background: rgba(var(--theme-border-rgb), 0.08);
      color: var(--textarea-placeholder);
      cursor: not-allowed;
      resize: none;

      &:focus {
        border-color: var(--textarea-border);
        box-shadow: none;
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      resize: none;
    }
  }

  &__error {
    @apply mt-1.5 text-sm font-medium;
    color: var(--textarea-error);
  }

  @media (prefers-reduced-motion: reduce) {
    &__field {
      transition: none;
    }
  }
}
</style>
