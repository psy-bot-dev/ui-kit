<template>
  <div ref="dropdownRef" class="base-dropdown">
    <div ref="triggerRef" class="base-dropdown__trigger" @click="toggle" @keydown.enter.prevent="toggle" @keydown.space.prevent="toggle">
      <slot name="trigger" />
    </div>

    <teleport to="body" :disabled="!fixed">
      <transition name="dropdown">
        <div
          v-if="isOpen"
          ref="menuRef"
          class="base-dropdown__menu"
          :class="[
            `base-dropdown__menu--${position}`,
            {
              'base-dropdown__menu--fixed': fixed,
            },
          ]"
          :style="fixed ? menuStyle : undefined"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from "vue";
import { activeDropdown } from "./dropdownState";

type Position = "bottom-left" | "bottom-right" | "top-left" | "top-right";

interface Props {
  position?: Position;
  fixed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  position: "bottom-right",
  fixed: false,
});

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);
const menuStyle = ref<Record<string, string>>({});

function updateMenuPosition() {
  if (!props.fixed || !triggerRef.value) return;

  const rect = triggerRef.value.getBoundingClientRect();
  const style: Record<string, string> = {};

  if (props.position.includes("bottom")) {
    style.top = `${rect.bottom + 8}px`;
  } else {
    style.bottom = `${window.innerHeight - rect.top + 8}px`;
  }

  if (props.position.includes("right")) {
    style.right = `${window.innerWidth - rect.right}px`;
  } else {
    style.left = `${rect.left}px`;
  }

  menuStyle.value = style;
}

function toggle() {
  if (isOpen.value) {
    close();
  } else {
    if (activeDropdown.value && activeDropdown.value !== close) {
      activeDropdown.value();
    }
    isOpen.value = true;
    activeDropdown.value = close;
    if (props.fixed) {
      nextTick(updateMenuPosition);
    }
  }
}

function close() {
  isOpen.value = false;
  if (activeDropdown.value === close) {
    activeDropdown.value = null;
  }
}

function handleClickOutside(event: MouseEvent) {
  if (!isOpen.value) return;

  const target = event.target as Node;
  const isInsideDropdown = dropdownRef.value?.contains(target);
  const isInsideMenu = menuRef.value?.contains(target);

  if (!isInsideDropdown && !isInsideMenu) {
    close();
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  if (activeDropdown.value === close) {
    activeDropdown.value = null;
  }
});

defineExpose({ close, toggle, isOpen });
</script>

<style scoped lang="scss">
.base-dropdown {
  --dropdown-bg: rgba(var(--theme-card-bg), 0.85);
  --dropdown-border: rgba(var(--theme-card-bg), 0.5);
  --dropdown-shadow: rgba(0, 0, 0, 0.08);
  --dropdown-item-hover: rgba(var(--theme-accent-rgb), 0.08);
  --dropdown-text: var(--theme-text);
  --dropdown-text-muted: var(--theme-text-secondary);
  --dropdown-danger: var(--theme-error);
  --dropdown-danger-hover: rgba(220, 75, 75, 0.08);

  .dark & {
    --dropdown-bg: rgba(30, 50, 40, 0.9);
    --dropdown-shadow: rgba(0, 0, 0, 0.25);
    --dropdown-item-hover: rgba(var(--theme-accent-rgb), 0.1);
    --dropdown-danger-hover: rgba(248, 113, 113, 0.1);
  }

  @apply relative inline-block;

  &__trigger {
    @apply cursor-pointer;
    touch-action: manipulation;
  }

  &__menu {
    --dropdown-bg: rgba(var(--theme-card-bg), 0.9);
    --dropdown-border: rgba(var(--theme-border-rgb), 0.2);
    --dropdown-shadow: rgba(0, 0, 0, 0.1);

    @apply absolute z-50 min-w-[180px] py-2;
    background: var(--dropdown-bg);
    border: 1px solid var(--dropdown-border);
    border-radius: var(--radius-element, 12px);
    box-shadow: 0 8px 32px var(--dropdown-shadow);

    @media (min-width: 769px) {
      backdrop-filter: blur(20px);
    }

    @media (max-width: 768px) {
      --dropdown-bg: rgba(var(--theme-card-bg), 0.98);
    }

    &--bottom-right {
      @apply top-full right-0 mt-2;
    }

    &--bottom-left {
      @apply top-full left-0 mt-2;
    }

    &--top-right {
      @apply bottom-full right-0 mb-2;
    }

    &--top-left {
      @apply bottom-full left-0 mb-2;
    }

    &--fixed {
      @apply fixed;
      z-index: 9999;
    }

    .dark & {
      --dropdown-shadow: rgba(0, 0, 0, 0.25);
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
