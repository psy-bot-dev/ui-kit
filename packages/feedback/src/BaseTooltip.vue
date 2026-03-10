<template>
  <div
    class="base-tooltip"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <div
      ref="triggerRef"
      class="base-tooltip__trigger"
      :aria-describedby="!disabled ? tooltipId : undefined"
    >
      <slot />
    </div>

    <teleport to="body">
      <div
        v-if="isVisible && !disabled"
        :id="tooltipId"
        ref="bubbleRef"
        class="base-tooltip__bubble"
        :class="`base-tooltip__bubble--${actualPosition}`"
        :style="bubbleStyle"
        role="tooltip"
      >
        {{ content }}
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onUnmounted, useId } from "vue";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface Props {
  content: string;
  position?: TooltipPosition;
  delay?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  position: "top",
  delay: 200,
  disabled: false,
});

const triggerRef = ref<HTMLElement | null>(null);
const bubbleRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const actualPosition = ref<TooltipPosition>(props.position);
const bubbleStyle = ref<Record<string, string>>({});
const tooltipId = `tooltip-${useId()}`;

let showTimeout: ReturnType<typeof setTimeout> | null = null;
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

function show() {
  if (props.disabled) return;
  clearTimeout(hideTimeout as ReturnType<typeof setTimeout>);
  showTimeout = setTimeout(() => {
    isVisible.value = true;
    nextTick(updatePosition);
  }, props.delay);
}

function hide() {
  clearTimeout(showTimeout as ReturnType<typeof setTimeout>);
  hideTimeout = setTimeout(() => {
    isVisible.value = false;
  }, 100);
}

function handleMouseEnter() {
  show();
}

function handleMouseLeave() {
  hide();
}

function handleFocusIn() {
  show();
}

function handleFocusOut() {
  hide();
}

function updatePosition() {
  if (!triggerRef.value || !bubbleRef.value) return;

  const triggerRect = triggerRef.value.getBoundingClientRect();
  const bubbleRect = bubbleRef.value.getBoundingClientRect();
  const gap = 8;
  let pos = props.position;

  const spaceAbove = triggerRect.top;
  const spaceBelow = window.innerHeight - triggerRect.bottom;
  const spaceLeft = triggerRect.left;
  const spaceRight = window.innerWidth - triggerRect.right;

  if (pos === "top" && spaceAbove < bubbleRect.height + gap) pos = "bottom";
  else if (pos === "bottom" && spaceBelow < bubbleRect.height + gap)
    pos = "top";
  else if (pos === "left" && spaceLeft < bubbleRect.width + gap) pos = "right";
  else if (pos === "right" && spaceRight < bubbleRect.width + gap) pos = "left";

  actualPosition.value = pos;

  let top = 0;
  let left = 0;

  switch (pos) {
    case "top":
      top = triggerRect.top - bubbleRect.height - gap;
      left = triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
      break;
    case "bottom":
      top = triggerRect.bottom + gap;
      left = triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
      break;
    case "left":
      top = triggerRect.top + triggerRect.height / 2 - bubbleRect.height / 2;
      left = triggerRect.left - bubbleRect.width - gap;
      break;
    case "right":
      top = triggerRect.top + triggerRect.height / 2 - bubbleRect.height / 2;
      left = triggerRect.right + gap;
      break;
  }

  left = Math.max(8, Math.min(left, window.innerWidth - bubbleRect.width - 8));

  bubbleStyle.value = {
    position: "fixed",
    top: `${top}px`,
    left: `${left}px`,
  };
}

onUnmounted(() => {
  clearTimeout(showTimeout as ReturnType<typeof setTimeout>);
  clearTimeout(hideTimeout as ReturnType<typeof setTimeout>);
});
</script>

<style scoped lang="scss">
.base-tooltip {
  display: inline-flex;

  &__trigger {
    display: inline-flex;
  }

  &__bubble {
    position: fixed;
    z-index: 9999;
    max-width: 250px;
    padding: 6px 10px;
    font-family: var(--font-sans);
    font-size: 12px;
    line-height: 1.4;
    color: var(--theme-text);
    background: rgba(var(--theme-card-bg), 0.95);
    backdrop-filter: blur(10px);
    border-radius: var(--radius-small, 8px);
    border: 1px solid rgba(var(--theme-border-rgb), 0.12);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    pointer-events: none;
    animation: tooltip-fade-in 0.15s ease;

    .dark & {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }

    @media (hover: none) {
      display: none;
    }

    &::before {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      background: rgba(var(--theme-card-bg), 0.95);
      border: 1px solid rgba(var(--theme-border-rgb), 0.12);
      transform: rotate(45deg);
    }

    &--top::before {
      bottom: -5px;
      left: 50%;
      margin-left: -4px;
      border-top: none;
      border-left: none;
    }

    &--bottom::before {
      top: -5px;
      left: 50%;
      margin-left: -4px;
      border-bottom: none;
      border-right: none;
    }

    &--left::before {
      right: -5px;
      top: 50%;
      margin-top: -4px;
      border-bottom: none;
      border-left: none;
    }

    &--right::before {
      left: -5px;
      top: 50%;
      margin-top: -4px;
      border-top: none;
      border-right: none;
    }
  }
}

@keyframes tooltip-fade-in {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
