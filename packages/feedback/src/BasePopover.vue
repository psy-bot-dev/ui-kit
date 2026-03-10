<template>
  <div
    class="base-popover"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="triggerRef"
      class="base-popover__trigger"
      :aria-haspopup="'dialog'"
      :aria-expanded="isVisible"
      @click="handleTriggerClick"
    >
      <slot name="trigger" />
    </div>

    <teleport to="body">
      <div
        v-if="isVisible"
        ref="contentRef"
        class="base-popover__content"
        :class="`base-popover__content--${actualPosition}`"
        :style="contentStyle"
        role="region"
        :aria-label="ariaLabel"
        tabindex="-1"
        @keydown="handleContentKeydown"
      >
        <div class="base-popover__arrow" />
        <slot />
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from "vue";

type PopoverPosition = "top" | "bottom" | "left" | "right";
type PopoverTrigger = "click" | "hover";

interface Props {
  position?: PopoverPosition;
  trigger?: PopoverTrigger;
  closeOnClickOutside?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  position: "bottom",
  trigger: "click",
  closeOnClickOutside: true,
  ariaLabel: "Popover",
});

const triggerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const actualPosition = ref<PopoverPosition>(props.position);
const contentStyle = ref<Record<string, string>>({});

let hoverShowTimeout: ReturnType<typeof setTimeout> | null = null;
let hoverHideTimeout: ReturnType<typeof setTimeout> | null = null;

function closePopover() {
  isVisible.value = false;
  nextTick(() => triggerRef.value?.focus());
}

function handleTriggerClick() {
  if (props.trigger !== "click") return;
  isVisible.value = !isVisible.value;
  if (isVisible.value) {
    nextTick(() => {
      updatePosition();
      contentRef.value?.focus();
    });
  }
}

function handleContentKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    closePopover();
  }
}

function handleEscape(event: KeyboardEvent) {
  if (isVisible.value && event.key === "Escape") {
    event.preventDefault();
    closePopover();
  }
}

function handleMouseEnter() {
  if (props.trigger !== "hover") return;
  clearTimeout(hoverHideTimeout as ReturnType<typeof setTimeout>);
  hoverShowTimeout = setTimeout(() => {
    isVisible.value = true;
    nextTick(updatePosition);
  }, 150);
}

function handleMouseLeave() {
  if (props.trigger !== "hover") return;
  clearTimeout(hoverShowTimeout as ReturnType<typeof setTimeout>);
  hoverHideTimeout = setTimeout(() => {
    isVisible.value = false;
  }, 200);
}

function handleClickOutside(event: MouseEvent) {
  if (!props.closeOnClickOutside || props.trigger !== "click") return;
  const target = event.target as Node;
  if (
    triggerRef.value?.contains(target) ||
    contentRef.value?.contains(target)
  ) {
    return;
  }
  closePopover();
}

function updatePosition() {
  if (!triggerRef.value || !contentRef.value) return;

  const triggerRect = triggerRef.value.getBoundingClientRect();
  const contentRect = contentRef.value.getBoundingClientRect();
  const gap = 10;
  let pos = props.position;

  const spaceAbove = triggerRect.top;
  const spaceBelow = window.innerHeight - triggerRect.bottom;
  const spaceLeft = triggerRect.left;
  const spaceRight = window.innerWidth - triggerRect.right;

  if (pos === "top" && spaceAbove < contentRect.height + gap) pos = "bottom";
  else if (pos === "bottom" && spaceBelow < contentRect.height + gap)
    pos = "top";
  else if (pos === "left" && spaceLeft < contentRect.width + gap) pos = "right";
  else if (pos === "right" && spaceRight < contentRect.width + gap)
    pos = "left";

  actualPosition.value = pos;

  let top = 0;
  let left = 0;

  switch (pos) {
    case "top":
      top = triggerRect.top - contentRect.height - gap;
      left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
      break;
    case "bottom":
      top = triggerRect.bottom + gap;
      left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
      break;
    case "left":
      top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
      left = triggerRect.left - contentRect.width - gap;
      break;
    case "right":
      top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
      left = triggerRect.right + gap;
      break;
  }

  left = Math.max(8, Math.min(left, window.innerWidth - contentRect.width - 8));

  contentStyle.value = {
    position: "fixed",
    top: `${top}px`,
    left: `${left}px`,
  };
}

function handleScrollResize() {
  if (isVisible.value) updatePosition();
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside, true);
  document.addEventListener("keydown", handleEscape);
  window.addEventListener("scroll", handleScrollResize, {
    capture: true,
    passive: true,
  });
  window.addEventListener("resize", handleScrollResize, { passive: true });
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside, true);
  document.removeEventListener("keydown", handleEscape);
  window.removeEventListener("scroll", handleScrollResize, { capture: true });
  window.removeEventListener("resize", handleScrollResize);
  clearTimeout(hoverShowTimeout as ReturnType<typeof setTimeout>);
  clearTimeout(hoverHideTimeout as ReturnType<typeof setTimeout>);
});
</script>

<style scoped lang="scss">
.base-popover {
  display: inline-flex;

  &__trigger {
    display: inline-flex;
    cursor: pointer;
  }

  &__content {
    position: fixed;
    z-index: 9998;
    min-width: 200px;
    padding: 12px;
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--theme-text);
    background: rgba(var(--theme-card-bg), 0.98);
    backdrop-filter: blur(12px);
    border-radius: var(--radius-small, 8px);
    border: 1px solid rgba(var(--theme-border-rgb), 0.12);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    animation: popover-fade-in 0.15s ease;

    .dark & {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  &__arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    background: rgba(var(--theme-card-bg), 0.98);
    border: 1px solid rgba(var(--theme-border-rgb), 0.12);
    transform: rotate(45deg);

    .base-popover__content--top & {
      bottom: -6px;
      left: 50%;
      margin-left: -5px;
      border-top: none;
      border-left: none;
    }

    .base-popover__content--bottom & {
      top: -6px;
      left: 50%;
      margin-left: -5px;
      border-bottom: none;
      border-right: none;
    }

    .base-popover__content--left & {
      right: -6px;
      top: 50%;
      margin-top: -5px;
      border-bottom: none;
      border-left: none;
    }

    .base-popover__content--right & {
      left: -6px;
      top: 50%;
      margin-top: -5px;
      border-top: none;
      border-right: none;
    }
  }
}

@keyframes popover-fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
