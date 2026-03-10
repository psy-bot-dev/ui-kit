<template>
  <div
    class="base-select"
    :class="[
      variant === 'sidebar' && 'base-select--sidebar',
      disabled && 'base-select--disabled',
    ]"
  >
    <label v-if="label" class="base-select__label">
      {{ label }}
    </label>
    <BaseDropdown
      ref="dropdownRef"
      class="base-select__dropdown"
      :position="position"
      :fixed="fixed"
    >
      <template #trigger>
        <div
          class="base-select__trigger"
          :class="{ 'base-select__trigger--open': isDropdownOpen }"
          role="combobox"
          :aria-expanded="isDropdownOpen"
          :aria-haspopup="'listbox'"
          :aria-label="props['aria-label'] ?? ariaLabel ?? label"
          @click="onTriggerClick"
        >
          <span class="base-select__value">
            {{ selectedLabel ?? placeholder }}
          </span>
          <svg
            class="base-select__chevron"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </template>
      <button
        v-for="opt in options"
        :key="opt.value"
        type="button"
        class="base-select__option"
        :class="{ 'base-select__option--selected': opt.value === modelValue }"
        role="option"
        :aria-selected="opt.value === modelValue"
        @click="select(opt)"
      >
        {{ opt.label ?? opt.value }}
      </button>
    </BaseDropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import BaseDropdown from "./BaseDropdown.vue";

export interface BaseSelectOption {
  value: string;
  label?: string;
}

export interface BaseSelectProps {
  modelValue: string | null;
  options: BaseSelectOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
  "aria-label"?: string;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  fixed?: boolean;
  variant?: "default" | "sidebar";
}

const props = withDefaults(defineProps<BaseSelectProps>(), {
  label: "",
  placeholder: "",
  disabled: false,
  ariaLabel: undefined,
  position: "bottom-left",
  fixed: false,
  variant: "default",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const dropdownRef = ref<InstanceType<typeof BaseDropdown> | null>(null);

const isDropdownOpen = computed(() => dropdownRef.value?.isOpen ?? false);

const selectedLabel = computed(() => {
  if (props.modelValue == null) return null;
  const opt = props.options.find((o) => o.value === props.modelValue);
  return opt ? (opt.label ?? opt.value) : props.modelValue;
});

function onTriggerClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function select(opt: BaseSelectOption) {
  if (props.disabled) return;
  emit("update:modelValue", opt.value);
  dropdownRef.value?.close();
}
</script>

<style scoped lang="scss">
.base-select {
  @apply block w-full;

  &__label {
    @apply mb-1.5 block text-xs;
    font-family: var(--font-sans);
    color: var(--theme-text-secondary);
  }

  &__dropdown {
    @apply block w-full;

    :deep(.base-dropdown__menu) {
      width: 100%;
      min-width: 0;
      z-index: 110;
    }
  }

  &__trigger {
    @apply flex w-full items-center justify-between gap-2 px-4 py-2.5 text-sm;
    font-family: var(--font-sans);
    min-height: 44px;
    background: rgba(var(--theme-input-bg), 0.6);
    border: 1px solid rgba(var(--theme-border-rgb), 0.3);
    border-radius: var(--radius-element);
    color: var(--theme-text);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;

    &:hover:not(.base-select__trigger--disabled) {
      border-color: var(--theme-accent);
    }

    &--open {
      border-color: var(--theme-accent);
      box-shadow: 0 0 0 3px rgba(var(--theme-accent-rgb), 0.12);

      .dark & {
        box-shadow: 0 0 0 3px rgba(var(--theme-accent-rgb), 0.1);
      }
    }

    &--disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__value {
    @apply flex-1 truncate text-left;
  }

  &__chevron {
    flex-shrink: 0;
    color: var(--theme-text-secondary);
  }

  &__option {
    @apply flex w-full items-center px-4 py-2.5 text-left text-sm;
    font-family: var(--font-sans);
    color: var(--theme-text);
    transition: background 0.15s ease;
    background: transparent;
    border: none;
    cursor: pointer;
    width: 100%;

    &:hover {
      background: rgba(var(--theme-accent-rgb), 0.08);
    }

    .dark &:hover {
      background: rgba(var(--theme-accent-rgb), 0.1);
    }

    &--selected {
      background: rgba(var(--theme-accent-rgb), 0.12);
    }
  }

  &--sidebar {
    .base-select__label {
      color: var(--sidebar-text-muted);
    }

    .base-select__trigger {
      background: var(--sidebar-input-bg);
      border-color: var(--sidebar-border);
      color: var(--sidebar-text);

      &:hover:not(.base-select__trigger--disabled) {
        border-color: var(--sidebar-accent);
      }

      &--open {
        border-color: var(--sidebar-accent);
        box-shadow: 0 0 0 3px rgba(var(--theme-accent-rgb), 0.12);
        background: rgba(var(--theme-card-bg), 0.6);

        .dark & {
          box-shadow: 0 0 0 3px rgba(var(--theme-accent-rgb), 0.1);
          background: rgba(var(--theme-input-bg), 0.6);
        }
      }
    }

    .base-select__chevron {
      color: var(--sidebar-text-muted);
    }
  }

  &--disabled .base-select__trigger {
    cursor: not-allowed;
  }
}
</style>
