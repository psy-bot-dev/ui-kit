<template>
  <div class="base-tabs" :class="[`base-tabs--${variant}`]">
    <div class="base-tabs__list" role="tablist">
      <button
        v-for="item in items"
        :id="`tab-${item.key}`"
        :key="item.key"
        ref="tabRefs"
        class="base-tabs__tab"
        :class="{
          'base-tabs__tab--active': modelValue === item.key,
          'base-tabs__tab--disabled': item.disabled,
        }"
        role="tab"
        :aria-selected="modelValue === item.key"
        :aria-controls="`tabpanel-${item.key}`"
        :tabindex="modelValue === item.key ? 0 : -1"
        :disabled="item.disabled"
        type="button"
        @click="selectTab(item)"
        @keydown="handleKeydown($event, item)"
      >
        <slot name="item" :item="item" :active="modelValue === item.key">
          {{ item.label }}
        </slot>
      </button>
    </div>
    <div class="base-tabs__panels">
      <div
        v-for="item in items"
        :id="`tabpanel-${item.key}`"
        :key="item.key"
        class="base-tabs__panel"
        :class="{ 'base-tabs__panel--active': modelValue === item.key }"
        role="tabpanel"
        :aria-labelledby="`tab-${item.key}`"
        :hidden="modelValue !== item.key"
      >
        <slot :name="`tab-${item.key}`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

interface TabItem {
  key: string;
  label: string;
  disabled?: boolean;
  icon?: string;
}

interface Props {
  modelValue?: string;
  items: TabItem[];
  variant?: "underline" | "pills";
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  variant: "underline",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const tabRefs = ref<HTMLButtonElement[]>([]);

function selectTab(item: TabItem) {
  if (item.disabled) return;
  emit("update:modelValue", item.key);
}

function handleKeydown(event: KeyboardEvent, currentItem: TabItem) {
  const enabledItems = props.items.filter((i) => !i.disabled);
  const currentIndex = enabledItems.findIndex((i) => i.key === currentItem.key);
  let nextIndex = -1;

  if (event.key === "ArrowRight") {
    event.preventDefault();
    nextIndex = (currentIndex + 1) % enabledItems.length;
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
  }

  if (nextIndex >= 0) {
    const nextItem = enabledItems[nextIndex];
    emit("update:modelValue", nextItem.key);
    const allIndex = props.items.findIndex((i) => i.key === nextItem.key);
    nextTick(() => {
      tabRefs.value[allIndex]?.focus();
    });
  }
}
</script>

<style scoped lang="scss">
.base-tabs {
  --tabs-border: rgba(var(--theme-border-rgb), 0.2);
  --tabs-text: var(--theme-text-secondary);
  --tabs-active-text: var(--theme-accent);
  --tabs-active-bg: rgba(var(--theme-accent-rgb), 0.12);

  font-family: var(--font-sans);

  &__list {
    display: flex;
    gap: 0;
  }

  &__tab {
    @apply px-4 py-2.5 text-sm font-medium;
    position: relative;
    background: transparent;
    border: none;
    color: var(--tabs-text);
    cursor: pointer;
    white-space: nowrap;
    transition:
      color 0.2s ease,
      background 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    &--disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid var(--theme-accent);
      outline-offset: -2px;
      border-radius: var(--radius-small, 8px);
    }
  }

  &__panels {
    margin-top: 0.75rem;
  }

  &__panel {
    display: none;

    &--active {
      display: block;
    }
  }

  &--underline {
    .base-tabs__list {
      border-bottom: 1px solid var(--tabs-border);
    }

    .base-tabs__tab {
      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--tabs-active-text);
        transform: scaleX(0);
        transition: transform 0.2s ease;

        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }
      }

      &--active {
        color: var(--tabs-active-text);

        &::after {
          transform: scaleX(1);
        }
      }

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--tabs-active-text);
        }
      }
    }
  }

  &--pills {
    .base-tabs__list {
      gap: 0.25rem;
    }

    .base-tabs__tab {
      border-radius: var(--radius-small, 8px);

      &--active {
        background: var(--tabs-active-bg);
        color: var(--tabs-active-text);
      }

      @media (hover: hover) {
        &:hover:not(:disabled):not(.base-tabs__tab--active) {
          background: rgba(var(--theme-border-rgb), 0.1);
        }
      }
    }
  }
}
</style>
