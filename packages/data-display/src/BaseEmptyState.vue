<template>
  <div class="base-empty">
    <div class="base-empty__icon-wrap">
      <slot name="icon">
        <span class="base-empty__icon-placeholder" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
        </span>
      </slot>
    </div>

    <h3 v-if="title" class="base-empty__title">{{ title }}</h3>

    <p v-if="$slots.default || description" class="base-empty__description">
      <slot>{{ description }}</slot>
    </p>

    <div v-if="$slots.action" class="base-empty__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  title: undefined,
  description: undefined,
});
</script>

<style scoped lang="scss">
.base-empty {
  @apply flex flex-col items-center justify-center;
  padding: 32px 16px;
  text-align: center;
  font-family: var(--font-sans);

  &__icon-wrap {
    @apply flex items-center justify-center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(var(--theme-accent-rgb), 0.1);
    color: var(--theme-accent);
    margin-bottom: 16px;

    .dark & {
      background: rgba(var(--theme-accent-rgb), 0.12);
    }
  }

  &__icon-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--theme-text);
    margin: 0 0 8px;
  }

  &__description {
    font-size: 14px;
    color: var(--theme-text-secondary);
    margin: 0 0 20px;
    max-width: 320px;
    line-height: 1.5;
  }

  &__action {
    @apply flex items-center gap-2;
  }
}
</style>
