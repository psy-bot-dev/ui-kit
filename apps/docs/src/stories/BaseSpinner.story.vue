<script setup lang="ts">
import { BaseSpinner } from "@psy-bot-dev/ui";

const sizes = ["sm", "md", "lg"] as const;
const colors = ["current", "white", "accent"] as const;
</script>

<template>
  <Story title="BaseSpinner" group="components">
    <Variant title="Sizes">
      <div style="display: flex; gap: 16px; align-items: center">
        <BaseSpinner
          v-for="size in sizes"
          :key="size"
          :size="size"
          color="accent"
        />
      </div>
    </Variant>
    <Variant title="Colors">
      <div
        style="
          display: flex;
          gap: 16px;
          align-items: center;
          background: #333;
          padding: 16px;
          border-radius: 8px;
        "
      >
        <BaseSpinner
          v-for="color in colors"
          :key="color"
          :color="color"
          size="md"
        />
      </div>
    </Variant>
    <Variant title="With aria-label">
      <BaseSpinner size="md" color="accent" label="Loading data..." />
    </Variant>
  </Story>
</template>
