<script setup lang="ts">
import { BaseButton } from "@psy-bot-dev/ui";

const variants = ["primary", "secondary", "danger", "ghost", "outline"] as const;
const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <Story title="BaseButton" group="components">
    <Variant title="Variants">
      <div
        style="
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        "
      >
        <BaseButton v-for="v in variants" :key="v" :variant="v">
          {{ v }}
        </BaseButton>
      </div>
    </Variant>
    <Variant title="Sizes">
      <div style="display: flex; gap: 12px; align-items: center">
        <BaseButton v-for="s in sizes" :key="s" :size="s">
          {{ s }}
        </BaseButton>
      </div>
    </Variant>
    <Variant title="Loading">
      <div style="display: flex; gap: 12px; align-items: center">
        <BaseButton loading>Loading...</BaseButton>
        <BaseButton variant="secondary" loading>Loading...</BaseButton>
      </div>
    </Variant>
    <Variant title="Disabled">
      <BaseButton disabled>Disabled</BaseButton>
    </Variant>
    <Variant title="Block">
      <BaseButton block>Full width</BaseButton>
    </Variant>
  </Story>
</template>
