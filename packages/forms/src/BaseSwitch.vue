<template>
  <label
    class="base-switch"
    :class="[
      `base-switch--${size}`,
      {
        'base-switch--disabled': disabled,
        'base-switch--label-left': labelPosition === 'left',
      },
    ]"
  >
    <input
      type="checkbox"
      class="base-switch__input"
      :checked="modelValue"
      :disabled="disabled"
      role="switch"
      :aria-checked="modelValue"
      @change="onToggle"
    />
    <span
      v-if="labelPosition === 'left' && (label || $slots.default)"
      class="base-switch__label"
    >
      <slot>{{ label }}</slot>
    </span>
    <span
      class="base-switch__track"
      :class="{ 'base-switch__track--on': modelValue }"
    >
      <span class="base-switch__thumb" />
    </span>
    <span
      v-if="labelPosition === 'right' && (label || $slots.default)"
      class="base-switch__label"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md";
  labelPosition?: "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: "",
  disabled: false,
  size: "md",
  labelPosition: "right",
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

function onToggle() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<style scoped lang="scss">
.base-switch {
  --switch-track-off: rgba(var(--theme-border-rgb), 0.35);
  --switch-track-on: var(--theme-accent);
  --switch-thumb: #fff;
  --switch-focus-shadow: rgba(var(--theme-accent-rgb), 0.12);
  --switch-label-color: var(--theme-text);

  .dark & {
    --switch-track-off: rgba(var(--theme-border-rgb), 0.25);
    --switch-focus-shadow: rgba(var(--theme-accent-rgb), 0.2);
  }

  @apply inline-flex cursor-pointer items-center gap-3;
  min-height: 44px;

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__input {
    @apply sr-only;

    &:focus-visible + .base-switch__label + .base-switch__track,
    &:focus-visible + .base-switch__track {
      box-shadow: 0 0 0 3px var(--switch-focus-shadow);
    }
  }

  &__track {
    position: relative;
    flex-shrink: 0;
    border-radius: 9999px;
    background: var(--switch-track-off);
    transition: background 0.2s ease;

    .base-switch--md & {
      width: 44px;
      height: 24px;
    }

    .base-switch--sm & {
      width: 32px;
      height: 18px;
    }

    &--on {
      background: var(--switch-track-on);
    }
  }

  &__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 50%;
    background: var(--switch-thumb);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease;

    .base-switch--md & {
      width: 20px;
      height: 20px;
    }

    .base-switch--sm & {
      width: 14px;
      height: 14px;
    }

    .base-switch--md .base-switch__track--on & {
      transform: translateX(20px);
    }

    .base-switch--sm .base-switch__track--on & {
      transform: translateX(14px);
    }
  }

  &__label {
    @apply text-sm;
    color: var(--switch-label-color);
    user-select: none;
  }

  @media (hover: hover) {
    &:hover:not(.base-switch--disabled) .base-switch__track {
      filter: brightness(0.95);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .base-switch__track,
    .base-switch__thumb {
      transition: none;
    }
  }
}
</style>
