<template>
  <ul
    class="base-list"
    :class="[
      { 'base-list--divided': divided },
      { 'base-list--bordered': variant === 'bordered' },
      { 'base-list--hoverable': hoverable },
    ]"
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
type ListVariant = "default" | "bordered";

interface Props {
  divided?: boolean;
  variant?: ListVariant;
  hoverable?: boolean;
}

withDefaults(defineProps<Props>(), {
  divided: false,
  variant: "default",
  hoverable: false,
});
</script>

<style scoped lang="scss">
.base-list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);

  &--divided {
    :deep(li + li) {
      border-top: 1px solid rgba(var(--theme-border-rgb), 0.15);
    }
  }

  &--bordered {
    border: 1px solid rgba(var(--theme-border-rgb), 0.15);
    border-radius: var(--radius-card, 16px);
    overflow: hidden;

    .dark & {
      border-color: rgba(var(--theme-border-rgb), 0.12);
    }
  }

  &--hoverable {
    :deep(li) {
      transition: background-color 0.15s ease;

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }

      @media (hover: hover) {
        &:hover {
          background: rgba(var(--theme-accent-rgb), 0.04);

          .dark & {
            background: rgba(var(--theme-accent-rgb), 0.06);
          }
        }
      }
    }
  }

  :deep(li) {
    padding: 10px 14px;
    font-size: 14px;
    color: var(--theme-text);
  }
}
</style>
