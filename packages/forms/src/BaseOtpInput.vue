<template>
  <div class="base-otp" :class="{ 'base-otp--disabled': disabled }">
    <div class="base-otp__inputs">
      <input
        v-for="(_, index) in length"
        :key="index"
        ref="inputRefs"
        type="text"
        inputmode="numeric"
        maxlength="1"
        class="base-otp__input"
        :class="{
          'base-otp__input--filled': digits[index],
          'base-otp__input--error': !!error,
          'base-otp__input--focused': focusedIndex === index,
        }"
        :value="digits[index] || ''"
        :disabled="disabled"
        :autocomplete="index === 0 ? 'one-time-code' : 'off'"
        :aria-label="
          ariaLabelFormat
            .replace('{index}', String(index + 1))
            .replace('{length}', String(length))
        "
        @input="onInput(index, $event)"
        @keydown="onKeydown(index, $event)"
        @focus="onFocus(index)"
        @blur="onBlur"
        @paste="onPaste($event)"
      />
    </div>
    <p v-if="error" class="base-otp__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from "vue";

interface Props {
  modelValue?: string;
  length?: number;
  disabled?: boolean;
  error?: string;
  autoFocus?: boolean;
  ariaLabelFormat?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  length: 6,
  disabled: false,
  error: "",
  autoFocus: false,
  ariaLabelFormat: "Digit {index} of {length}",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  complete: [value: string];
}>();

const inputRefs = ref<HTMLInputElement[]>([]);
const focusedIndex = ref<number>(-1);

const digits = computed(() => {
  return props.modelValue.split("").slice(0, props.length);
});

function paddedDigits(base: string[] = digits.value): string[] {
  const result = [...base];
  while (result.length < props.length) {
    result.push("");
  }
  return result;
}

function updateValue(newDigits: string[]) {
  const value = newDigits.join("").slice(0, props.length);
  emit("update:modelValue", value);
  if (value.length === props.length) {
    emit("complete", value);
  }
}

function onInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  const char = target.value.replace(/\D/g, "").slice(-1);

  if (!char) {
    target.value = "";
    return;
  }

  target.value = char;

  const newDigits = paddedDigits();
  newDigits[index] = char;
  updateValue(newDigits);

  if (index < props.length - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus();
    });
  }
}

function onKeydown(index: number, event: KeyboardEvent) {
  if (event.key === "Backspace") {
    const newDigits = paddedDigits();

    if (newDigits[index]) {
      newDigits[index] = "";
      updateValue(newDigits);
    } else if (index > 0) {
      newDigits[index - 1] = "";
      updateValue(newDigits);
      nextTick(() => {
        inputRefs.value[index - 1]?.focus();
      });
    }
    event.preventDefault();
  } else if (event.key === "ArrowLeft" && index > 0) {
    inputRefs.value[index - 1]?.focus();
  } else if (event.key === "ArrowRight" && index < props.length - 1) {
    inputRefs.value[index + 1]?.focus();
  }
}

function onPaste(event: ClipboardEvent) {
  event.preventDefault();
  const pasted = (event.clipboardData?.getData("text") || "")
    .replace(/\D/g, "")
    .slice(0, props.length);

  if (!pasted) return;

  const newDigits = paddedDigits(pasted.split(""));
  updateValue(newDigits);

  nextTick(() => {
    const focusIndex = Math.min(pasted.length, props.length - 1);
    inputRefs.value[focusIndex]?.focus();
  });
}

function onFocus(index: number) {
  focusedIndex.value = index;
}

function onBlur() {
  focusedIndex.value = -1;
}

onMounted(() => {
  if (props.autoFocus) {
    nextTick(() => {
      inputRefs.value[0]?.focus();
    });
  }
});
</script>

<style scoped lang="scss">
.base-otp {
  --otp-bg: rgba(var(--theme-input-bg), 1);
  --otp-border: rgba(var(--theme-border-rgb), 0.3);
  --otp-text: var(--theme-text);
  --otp-focus-border: var(--theme-accent);
  --otp-focus-shadow: rgba(var(--theme-accent-rgb), 0.1);
  --otp-error: var(--theme-error);
  --otp-error-shadow: rgba(var(--theme-error-rgb), 0.1);
  --otp-filled-border: rgba(var(--theme-accent-rgb), 0.3);

  .dark & {
    --otp-border: rgba(var(--theme-border-rgb), 0.2);
    --otp-focus-shadow: rgba(var(--theme-accent-rgb), 0.15);
    --otp-error-shadow: rgba(var(--theme-error-rgb), 0.15);
    --otp-filled-border: rgba(var(--theme-accent-rgb), 0.4);
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__inputs {
    @apply flex gap-2;
  }

  &__input {
    @apply text-center text-lg font-semibold;
    font-family: monospace;
    width: 44px;
    height: 52px;
    background: var(--otp-bg);
    border: 1.5px solid var(--otp-border);
    border-radius: var(--radius-small, 8px);
    color: var(--otp-text);
    outline: none;
    transition: all 0.2s ease;

    &::placeholder {
      color: transparent;
    }

    &--filled {
      border-color: var(--otp-filled-border);
    }

    &--focused {
      border-color: var(--otp-focus-border);
      box-shadow: 0 0 0 3px var(--otp-focus-shadow);
    }

    &--error {
      border-color: var(--otp-error);

      &.base-otp__input--focused {
        border-color: var(--otp-error);
        box-shadow: 0 0 0 3px var(--otp-error-shadow);
      }
    }
  }

  &__error {
    @apply mt-2 text-sm font-medium;
    color: var(--otp-error);
  }

  @media (prefers-reduced-motion: reduce) {
    &__input {
      transition: none;
    }
  }
}
</style>
