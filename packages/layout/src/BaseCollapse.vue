<template>
  <div
    class="base-collapse"
    :class="{
      'base-collapse--open': isOpen,
      'base-collapse--disabled': disabled,
    }"
  >
    <button
      :id="headerId"
      class="base-collapse__header"
      type="button"
      :disabled="disabled"
      :aria-expanded="isOpen"
      :aria-controls="contentId"
      @click="toggle"
    >
      <span class="base-collapse__trigger">
        <slot name="title">{{ title }}</slot>
      </span>
      <span
        class="base-collapse__chevron"
        :class="{ 'base-collapse__chevron--open': isOpen }"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </button>
    <div
      :id="contentId"
      class="base-collapse__body"
      role="region"
      :aria-labelledby="headerId"
      :aria-hidden="!isOpen"
    >
      <div class="base-collapse__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useId, inject, ref, computed } from "vue";
import { accordionKey } from "@psy-bot-dev/tokens";

interface Props {
  modelValue?: boolean;
  title: string;
  disabled?: boolean;
  collapseKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  disabled: false,
  collapseKey: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const contentId = useId();
const headerId = useId();

const accordion = inject(accordionKey, null);

const internalOpen = ref(false);

const isOpen = computed(() => {
  if (accordion && props.collapseKey) {
    return accordion.activeKeys.value.includes(props.collapseKey);
  }
  if (props.modelValue !== undefined) {
    return props.modelValue;
  }
  return internalOpen.value;
});

function toggle() {
  if (props.disabled) return;

  if (accordion && props.collapseKey) {
    accordion.toggle(props.collapseKey);
    return;
  }

  const next = !isOpen.value;
  if (props.modelValue !== undefined) {
    emit("update:modelValue", next);
  } else {
    internalOpen.value = next;
  }
}
</script>

<style scoped lang="scss">
.base-collapse {
  --collapse-border: rgba(var(--theme-border-rgb), 0.2);
  --collapse-text: var(--theme-text);
  --collapse-muted: var(--theme-text-secondary);
  --collapse-active-text: var(--collapse-text);
  --collapse-active-chevron: var(--collapse-muted);

  font-family: var(--font-sans);

  &__header {
    @apply flex w-full items-center justify-between px-0 py-3 text-sm font-medium;
    background: transparent;
    border: none;
    color: var(--collapse-text);
    cursor: pointer;
    text-align: left;
    transition: color 0.2s ease;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid var(--theme-accent);
      outline-offset: 2px;
      border-radius: var(--radius-small, 8px);
    }
  }

  &__trigger {
    flex: 1;
    min-width: 0;
  }

  &__chevron {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--collapse-muted);
    transition: transform 0.2s ease, color 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    &--open {
      transform: rotate(180deg);
    }
  }

  &__body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.2s ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  &--open &__header {
    color: var(--collapse-active-text);
  }

  &--open &__chevron {
    color: var(--collapse-active-chevron);
  }

  &--open &__body {
    grid-template-rows: 1fr;
  }

  &__content {
    overflow: hidden;
  }
}
</style>
