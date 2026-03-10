<template>
  <div
    class="base-sidebar-layout"
    :class="{
      'base-sidebar-layout--mobile': isMobile,
      'base-sidebar-layout--open': isMobileOpen,
    }"
  >
    <transition name="base-sidebar-layout-overlay">
      <div
        v-if="isMobile && isMobileOpen"
        class="base-sidebar-layout__overlay"
        @click="close"
      />
    </transition>
    <aside
      class="base-sidebar-layout__sidebar"
      :style="{ width: sidebarWidth }"
    >
      <slot name="sidebar" />
    </aside>
    <main class="base-sidebar-layout__main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface Props {
  sidebarWidth?: string;
  breakpoint?: number;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  sidebarWidth: "320px",
  breakpoint: 768,
  modelValue: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const isMobile = ref(
  typeof window !== "undefined"
    ? !window.matchMedia(`(min-width: ${props.breakpoint}px)`).matches
    : true,
);

const isMobileOpen = computed(() => isMobile.value && props.modelValue);

function open() {
  emit("update:modelValue", true);
}

function close() {
  emit("update:modelValue", false);
}

defineExpose({ open, close });

let mediaQuery: MediaQueryList | null = null;

function handleMediaChange(e: MediaQueryListEvent | MediaQueryList) {
  isMobile.value = !e.matches;
  if (!isMobile.value) {
    emit("update:modelValue", false);
  }
}

onMounted(() => {
  mediaQuery = window.matchMedia(`(min-width: ${props.breakpoint}px)`);
  handleMediaChange(mediaQuery);
  mediaQuery.addEventListener("change", handleMediaChange);
});

onUnmounted(() => {
  mediaQuery?.removeEventListener("change", handleMediaChange);
});
</script>

<style scoped lang="scss">
.base-sidebar-layout {
  --sidebar-bg: rgba(var(--theme-card-bg), 0.9);
  --sidebar-border: rgba(var(--theme-border-rgb), 0.2);
  --overlay-bg: rgba(0, 0, 0, 0.3);

  .dark & {
    --sidebar-bg: rgba(var(--theme-card-bg), 0.95);
    --overlay-bg: rgba(0, 0, 0, 0.5);
  }

  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &__sidebar {
    flex-shrink: 0;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--sidebar-border);
    backdrop-filter: blur(20px);
    overflow-y: auto;
    height: 100%;
  }

  &--mobile &__sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  &--open &__sidebar {
    transform: translateX(0);
  }

  &__overlay {
    position: fixed;
    inset: 0;
    background: var(--overlay-bg);
    z-index: 40;
  }

  &__main {
    flex: 1;
    min-width: 0;
    overflow-y: auto;
    height: 100%;
  }
}

.base-sidebar-layout-overlay-enter-active,
.base-sidebar-layout-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.base-sidebar-layout-overlay-enter-from,
.base-sidebar-layout-overlay-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .base-sidebar-layout-overlay-enter-active,
  .base-sidebar-layout-overlay-leave-active {
    transition: none;
  }
}
</style>
