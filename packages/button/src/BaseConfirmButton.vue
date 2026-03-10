<template>
  <button
    class="base-confirm-button"
    :class="{
      'base-confirm-button--holding': isHolding,
      'base-confirm-button--selected': selected,
      'base-confirm-button--disabled': disabled,
    }"
    :style="{ '--hold-duration': `${activeHoldDurationMs}ms` }"
    :disabled="disabled"
    @pointerdown.prevent="onPointerDown"
    @pointerup.prevent="onPointerUp"
    @pointerleave="onPointerUp"
    @pointercancel="onPointerUp"
    @click="onClick"
    @contextmenu.prevent
  >
    <span class="base-confirm-button__label">
      <svg
        v-if="selected"
        class="base-confirm-button__check"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

interface Props {
  label: string;
  holdToConfirm?: boolean;
  holdDuration?: number;
  disabled?: boolean;
  selected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  holdToConfirm: false,
  holdDuration: 1500,
  disabled: false,
  selected: false,
});

const emit = defineEmits<{
  confirmed: [];
}>();

const isHolding = ref(false);
const holdTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const activeHoldDurationMs = ref(props.holdDuration);

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

function onClick() {
  if (props.disabled || props.selected || props.holdToConfirm) return;
  emit("confirmed");
}

function onPointerDown(event: PointerEvent) {
  if (props.disabled || props.selected || !props.holdToConfirm) return;

  const target = event.currentTarget as HTMLElement;
  try {
    target.setPointerCapture(event.pointerId);
  } catch {
    // Pointer capture not supported or already captured
  }

  activeHoldDurationMs.value = props.holdDuration;
  isHolding.value = true;
  vibrate(10);

  const duration = activeHoldDurationMs.value;
  holdTimer.value = setTimeout(() => {
    isHolding.value = false;
    holdTimer.value = null;
    try {
      target.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer may already be released
    }
    vibrate([10, 50, 20]);
    emit("confirmed");
  }, duration);
}

function onPointerUp(event?: PointerEvent) {
  if (!isHolding.value) return;

  if (event) {
    const target = event.currentTarget as HTMLElement;
    target?.releasePointerCapture(event.pointerId);
  }

  isHolding.value = false;
  if (holdTimer.value) {
    clearTimeout(holdTimer.value);
    holdTimer.value = null;
  }
}

watch(
  () => props.holdDuration,
  (val) => {
    if (!isHolding.value) activeHoldDurationMs.value = val;
  },
);

onUnmounted(() => {
  if (holdTimer.value) {
    clearTimeout(holdTimer.value);
  }
});
</script>

<style scoped lang="scss">
.base-confirm-button {
  --cb-bg: rgba(var(--theme-card-bg), 0.6);
  --cb-border: rgba(var(--theme-border-rgb), 0.2);
  --cb-text: var(--theme-text);
  --cb-selected-bg: rgba(var(--theme-accent-rgb), 0.12);
  --cb-selected-border: var(--theme-accent);
  --cb-selected-text: var(--theme-accent);
  --cb-fill: rgba(var(--theme-accent-rgb), 0.15);

  .dark & {
    --cb-bg: rgba(var(--theme-card-bg), 0.4);
    --cb-fill: rgba(var(--theme-accent-rgb), 0.2);
    --cb-selected-bg: rgba(var(--theme-accent-rgb), 0.15);
  }

  @apply relative w-full text-left px-4 py-3 text-sm font-medium;
  background: var(--cb-bg);
  color: var(--cb-text);
  border: 1px solid var(--cb-border);
  border-radius: var(--radius-element, 12px);
  overflow: hidden;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  transition: all 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--cb-fill);
    transform: scaleX(0);
    transform-origin: left;
  }

  &--holding {
    transform: scale(0.97);

    &::before {
      animation: confirm-fill var(--hold-duration) linear forwards;
    }
  }

  &--selected {
    background: var(--cb-selected-bg);
    border-color: var(--cb-selected-border);
    color: var(--cb-selected-text);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(&--disabled):not(&--selected) {
    @media (hover: hover) {
      &:hover {
        border-color: rgba(var(--theme-accent-rgb), 0.3);
      }
    }
  }

  &__label {
    @apply relative z-10 flex items-center gap-2;
  }

  &__check {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
}

@keyframes confirm-fill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
