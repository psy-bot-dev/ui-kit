<template>
  <component
    :is="clickable ? 'button' : 'div'"
    class="base-card"
    :class="[
      `base-card--${variant}`,
      `base-card--padding-${padding}`,
      { 'base-card--clickable': clickable },
    ]"
    :type="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="handleClick"
  >
    <div v-if="$slots.header" class="base-card__header">
      <slot name="header" />
    </div>
    <div class="base-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </component>
</template>

<script setup lang="ts">
type Variant = "default" | "outlined" | "elevated";
type Padding = "none" | "sm" | "md" | "lg";

interface Props {
  variant?: Variant;
  padding?: Padding;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  padding: "md",
  clickable: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function handleClick(event: MouseEvent) {
  if (!props.clickable) return;
  emit("click", event);
}
</script>

<style scoped lang="scss">
.base-card {
  --card-bg: rgba(var(--theme-card-bg), 0.7);
  --card-border: rgba(var(--theme-border-rgb), 0.2);
  --card-radius: var(--radius-card, 16px);

  .dark & {
    --card-bg: rgba(var(--theme-card-bg), 0.6);
    --card-border: rgba(var(--theme-border-rgb), 0.15);
  }

  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  backdrop-filter: blur(20px);
  font-family: var(--font-sans);
  color: var(--theme-text);
  text-align: left;
  width: 100%;
  transition: all 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &--outlined {
    background: transparent;
    backdrop-filter: none;
  }

  &--elevated {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

    .dark & {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
  }

  &--padding-none {
    .base-card__header,
    .base-card__body,
    .base-card__footer {
      padding: 0;
    }
  }

  &--padding-sm {
    .base-card__header,
    .base-card__body,
    .base-card__footer {
      padding: 0.75rem;
    }
  }

  &--padding-md {
    .base-card__header,
    .base-card__body,
    .base-card__footer {
      padding: 1rem;
    }
  }

  &--padding-lg {
    .base-card__header,
    .base-card__body,
    .base-card__footer {
      padding: 1.5rem;
    }
  }

  &--clickable {
    cursor: pointer;
    border: 1px solid var(--card-border);
    appearance: none;

    @media (hover: hover) {
      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);

        .dark & {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
        }
      }
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &__header {
    border-bottom: 1px solid var(--card-border);
  }

  &__body {
    flex: 1;
  }

  &__footer {
    border-top: 1px solid var(--card-border);
  }
}
</style>
