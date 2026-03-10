<template>
  <div class="base-accordion">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, readonly } from "vue";
import { accordionKey } from "@nearby/tokens";

interface Props {
  modelValue?: string | string[];
  multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  multiple: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | string[]];
}>();

const activeKeys = computed<string[]>(() => {
  if (props.modelValue === undefined) return [];
  if (Array.isArray(props.modelValue)) return props.modelValue;
  return [props.modelValue];
});

function toggle(key: string) {
  const isActive = activeKeys.value.includes(key);

  if (props.multiple) {
    const next = isActive
      ? activeKeys.value.filter((k) => k !== key)
      : [...activeKeys.value, key];
    emit("update:modelValue", next);
  } else {
    emit("update:modelValue", isActive ? "" : key);
  }
}

provide(accordionKey, {
  activeKeys: readonly(activeKeys),
  toggle,
});
</script>

<style scoped lang="scss">
.base-accordion {
  display: flex;
  flex-direction: column;
}
</style>
