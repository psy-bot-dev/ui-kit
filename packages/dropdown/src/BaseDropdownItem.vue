<template>
  <button
    class="base-dropdown-item"
    :class="{ 'base-dropdown-item--danger': danger }"
    type="button"
    @click="$emit('click')"
  >
    <span v-if="$slots.icon" class="base-dropdown-item__icon">
      <slot name="icon" />
    </span>
    <span class="base-dropdown-item__label">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  danger?: boolean;
}

withDefaults(defineProps<Props>(), {
  danger: false,
});

defineEmits<{
  click: [];
}>();
</script>

<style scoped lang="scss">
.base-dropdown-item {
  --item-text: var(--theme-text);
  --item-text-muted: var(--theme-text-secondary);
  --item-hover: rgba(var(--theme-accent-rgb), 0.08);
  --item-danger: var(--theme-error);
  --item-danger-hover: rgba(220, 75, 75, 0.08);

  .dark & {
    --item-hover: rgba(var(--theme-accent-rgb), 0.1);
    --item-danger-hover: rgba(248, 113, 113, 0.1);
  }

  @apply flex w-full items-center gap-3 px-4 py-2.5 text-left;
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--item-text);
  transition: background 0.15s ease;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--item-hover);
  }

  &__icon {
    @apply flex h-5 w-5 flex-shrink-0 items-center justify-center;
    color: var(--item-text-muted);
  }

  &__label {
    @apply flex-1;
  }

  &--danger {
    color: var(--item-danger);

    .base-dropdown-item__icon {
      color: var(--item-danger);
    }

    &:hover {
      background: var(--item-danger-hover);
    }
  }
}
</style>
