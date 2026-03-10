<template>
  <div
    class="base-avatar"
    :class="[
      `base-avatar--${size}`,
      `base-avatar--rounded-${rounded}`,
      status ? `base-avatar--${status}` : '',
    ]"
  >
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt || name || 'Avatar'"
      class="base-avatar__image"
      @error="imageError = true"
    />
    <span
      v-else
      class="base-avatar__fallback"
      :aria-label="alt || name || 'Avatar'"
    >
      <slot>{{ initial }}</slot>
    </span>
    <span v-if="status" class="base-avatar__status" :aria-label="status" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarRounded = "full" | "lg";
type AvatarStatus = "online" | "offline" | "away";

interface Props {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  rounded?: AvatarRounded;
  status?: AvatarStatus | null;
}

const props = withDefaults(defineProps<Props>(), {
  src: null,
  alt: undefined,
  name: undefined,
  size: "md",
  rounded: "full",
  status: null,
});

const imageError = ref(false);

const initial = computed(() => {
  if (!props.name) return "?";
  return props.name.charAt(0).toUpperCase();
});

watch(
  () => props.src,
  () => {
    imageError.value = false;
  },
);
</script>

<style scoped lang="scss">
.base-avatar {
  --avatar-size: 40px;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--avatar-size);
  height: var(--avatar-size);
  flex-shrink: 0;
  font-family: var(--font-sans);

  &--xs {
    --avatar-size: 24px;
    font-size: 11px;
  }

  &--sm {
    --avatar-size: 32px;
    font-size: 13px;
  }

  &--md {
    --avatar-size: 40px;
    font-size: 15px;
  }

  &--lg {
    --avatar-size: 48px;
    font-size: 18px;
  }

  &--xl {
    --avatar-size: 64px;
    font-size: 22px;
  }

  &--rounded-full {
    border-radius: 50%;

    .base-avatar__image,
    .base-avatar__fallback {
      border-radius: 50%;
    }
  }

  &--rounded-lg {
    border-radius: var(--radius-element, 12px);

    .base-avatar__image,
    .base-avatar__fallback {
      border-radius: var(--radius-element, 12px);
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__fallback {
    @apply flex items-center justify-center;
    width: 100%;
    height: 100%;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(
      135deg,
      var(--theme-accent),
      var(--theme-accent-hover)
    );
    user-select: none;
  }

  &__status {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25%;
    height: 25%;
    min-width: 8px;
    min-height: 8px;
    border-radius: 50%;
    border: 2px solid rgba(var(--theme-card-bg), 1);
    box-sizing: content-box;
  }

  &--online .base-avatar__status {
    background-color: #4ade80;
  }

  &--offline .base-avatar__status {
    background-color: var(--theme-text-muted);
  }

  &--away .base-avatar__status {
    background-color: #fbbf24;
  }
}
</style>
