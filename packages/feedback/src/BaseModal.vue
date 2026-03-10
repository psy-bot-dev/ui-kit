<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="modelValue" class="base-modal" @click.self="onBackdropClick">
        <div class="base-modal__content">
          <div v-if="title || $slots.header" class="base-modal__header">
            <slot name="header">
              <h3 class="base-modal__title">{{ title }}</h3>
            </slot>
            <button
              v-if="closable"
              class="base-modal__close"
              type="button"
              :aria-label="closeAriaLabel"
              @click="close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div class="base-modal__body">
            <slot />
          </div>

          <div v-if="$slots.footer" class="base-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from "vue";

interface Props {
  modelValue: boolean;
  title?: string;
  closable?: boolean;
  closeOnBackdrop?: boolean;
  closeAriaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  closable: true,
  closeOnBackdrop: true,
  closeAriaLabel: "Close",
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

function close() {
  emit("update:modelValue", false);
}

function onBackdropClick() {
  if (props.closeOnBackdrop) {
    close();
  }
}

function handleEscape(e: KeyboardEvent) {
  if (e.key === "Escape" && props.modelValue && props.closable) {
    close();
  }
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    }
  },
);

onUnmounted(() => {
  document.body.style.overflow = "";
  document.removeEventListener("keydown", handleEscape);
});

defineExpose({ close });
</script>

<style scoped lang="scss">
.base-modal {
  @apply fixed inset-0 z-[9999] flex items-center justify-center p-4;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);

  &__content {
    --modal-bg: rgba(var(--theme-card-bg), 0.95);
    --modal-border: rgba(var(--theme-border-rgb), 0.2);
    --modal-shadow: rgba(0, 0, 0, 0.15);
    --modal-text: var(--theme-text);
    --modal-text-muted: var(--theme-text-secondary);

    @apply w-full max-w-md;
    background: var(--modal-bg);
    border: 1px solid var(--modal-border);
    border-radius: var(--radius-card, 16px);
    box-shadow: 0 16px 48px var(--modal-shadow);

    @media (min-width: 769px) {
      backdrop-filter: blur(20px);
    }

    .dark & {
      --modal-shadow: rgba(0, 0, 0, 0.4);
    }
  }

  &__header {
    @apply flex items-center justify-between gap-4 px-6 py-4;
    border-bottom: 1px solid var(--modal-border);
  }

  &__title {
    @apply text-lg font-semibold;
    font-family: var(--font-sans);
    color: var(--modal-text);
  }

  &__close {
    @apply flex shrink-0 rounded-lg p-2;
    min-width: 36px;
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--modal-text-muted);
    transition: all 0.2s ease;
    background: transparent;
    border: none;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        color: var(--modal-text);
        background: rgba(0, 0, 0, 0.05);
      }
    }

    .dark & {
      @media (hover: hover) {
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }

  &__body {
    @apply px-6 py-5;
    color: var(--modal-text);
    font-family: var(--font-sans);
  }

  &__footer {
    @apply flex items-center justify-end gap-3 px-6 py-4;
    border-top: 1px solid var(--modal-border);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;

  .base-modal__content {
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .base-modal__content {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
}
</style>
