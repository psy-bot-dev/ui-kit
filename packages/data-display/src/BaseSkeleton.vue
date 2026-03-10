<template>
  <div class="skeleton" :class="variantClass" :style="customStyle" />
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "text" | "circle" | "rect";
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "text",
  width: undefined,
  height: undefined,
});

const variantClass = computed(() => `skeleton--${props.variant}`);

const customStyle = computed(() => ({
  width: props.width,
  height: props.height,
}));
</script>

<style scoped lang="scss">
.skeleton {
  --skeleton-base: rgba(var(--theme-accent-rgb), 0.08);
  --skeleton-shine: rgba(var(--theme-accent-rgb), 0.15);

  .dark & {
    --skeleton-base: rgba(var(--theme-accent-rgb), 0.1);
    --skeleton-shine: rgba(var(--theme-accent-rgb), 0.18);
  }

  position: relative;
  overflow: hidden;
  background: var(--skeleton-base);
  border-radius: var(--radius-small);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      var(--skeleton-shine),
      transparent
    );
    transform: translateX(-100%);
    animation: skeleton-shimmer 1.8s ease-in-out infinite;
  }

  &--text {
    height: 14px;
    border-radius: 6px;
  }

  &--circle {
    border-radius: 50%;
  }

  &--rect {
    border-radius: var(--radius-element);
  }
}

@keyframes skeleton-shimmer {
  0% {
    transform: translateX(-100%);
  }
  50%,
  100% {
    transform: translateX(100%);
  }
}
</style>
