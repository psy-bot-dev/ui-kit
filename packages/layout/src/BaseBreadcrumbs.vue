<template>
  <nav class="base-breadcrumbs" aria-label="Breadcrumb">
    <ol class="base-breadcrumbs__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="base-breadcrumbs__item"
        :class="{ 'base-breadcrumbs__item--current': isCurrent(index) }"
      >
        <template v-if="index > 0">
          <span class="base-breadcrumbs__separator" aria-hidden="true">
            <slot name="separator">{{ separator }}</slot>
          </span>
        </template>
        <slot name="item" :item="item" :current="isCurrent(index)">
          <span
            v-if="isCurrent(index)"
            class="base-breadcrumbs__link"
            aria-current="page"
          >
            {{ item.label }}
          </span>
          <a
            v-else-if="item.to"
            :href="item.to"
            class="base-breadcrumbs__link base-breadcrumbs__link--navigable"
          >
            {{ item.label }}
          </a>
          <span v-else class="base-breadcrumbs__link">
            {{ item.label }}
          </span>
        </slot>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  to?: string;
  icon?: string;
}

interface Props {
  items: BreadcrumbItem[];
  separator?: string;
}

const props = withDefaults(defineProps<Props>(), {
  separator: "/",
});

function isCurrent(index: number): boolean {
  return index === props.items.length - 1;
}
</script>

<style scoped lang="scss">
.base-breadcrumbs {
  --crumb-text: var(--theme-text-secondary);
  --crumb-active: var(--theme-text);
  --crumb-hover: var(--theme-accent);
  --crumb-separator: var(--theme-text-muted);

  font-family: var(--font-sans);

  &__list {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    gap: 0;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    min-width: 0;
    font-size: 0.875rem;
  }

  &__separator {
    @apply mx-1.5;
    color: var(--crumb-separator);
    flex-shrink: 0;
    font-size: 0.75rem;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--crumb-text);
    text-decoration: none;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &--navigable {
      transition: color 0.15s ease;

      @media (hover: hover) {
        &:hover {
          color: var(--crumb-hover);
        }
      }
    }
  }

  &__item--current &__link {
    color: var(--crumb-active);
    font-weight: 500;
  }
}
</style>
