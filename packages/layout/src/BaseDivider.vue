<template>
  <div
    v-if="!vertical"
    class="base-divider"
    :class="[
      `base-divider--${spacing}`,
      { 'base-divider--with-label': hasLabel },
    ]"
    role="separator"
  >
    <template v-if="hasLabel">
      <span class="base-divider__line" />
      <span class="base-divider__label">
        <slot>{{ label }}</slot>
      </span>
      <span class="base-divider__line" />
    </template>
  </div>
  <span
    v-else
    class="base-divider base-divider--vertical"
    :class="[`base-divider--${spacing}`]"
    role="separator"
    aria-orientation="vertical"
  />
</template>

<script setup lang="ts">
import { useSlots, computed } from "vue";

type Spacing = "sm" | "md" | "lg";

interface Props {
  vertical?: boolean;
  label?: string;
  spacing?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  vertical: false,
  label: undefined,
  spacing: "md",
});

const slots = useSlots();

const hasLabel = computed(() => !!props.label || !!slots.default);
</script>

<style scoped lang="scss">
.base-divider {
  --divider-color: rgba(var(--theme-border-rgb), 0.3);
  --divider-label-color: var(--theme-text-muted);

  display: flex;
  align-items: center;
  width: 100%;

  &:not(&--with-label)::before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: var(--divider-color);
  }

  &--sm {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  &--md {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  &--lg {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  &--with-label {
    gap: 0.75rem;
  }

  &--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    background: var(--divider-color);
    vertical-align: middle;
    margin-top: 0;
    margin-bottom: 0;

    &.base-divider--sm {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }

    &.base-divider--md {
      margin-left: 0.75rem;
      margin-right: 0.75rem;
    }

    &.base-divider--lg {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  &__line {
    flex: 1;
    height: 1px;
    background: var(--divider-color);
  }

  &__label {
    flex-shrink: 0;
    font-family: var(--font-sans);
    font-size: 0.75rem;
    color: var(--divider-label-color);
    white-space: nowrap;
  }
}
</style>
