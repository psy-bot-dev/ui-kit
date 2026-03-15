<script setup lang="ts">
import { BaseDivider } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseDivider" :layout="{ type: 'grid', width: 400 }">
    <Variant title="Default">
      <base-divider />
    </Variant>
    <Variant title="With Label">
      <base-divider label="or continue with" />
    </Variant>
    <Variant title="With Slot Label">
      <base-divider>
        <strong>Section Break</strong>
      </base-divider>
    </Variant>
    <Variant title="Spacing Small">
      <p>Above</p>
      <base-divider spacing="sm" />
      <p>Below</p>
    </Variant>
    <Variant title="Spacing Large">
      <p>Above</p>
      <base-divider spacing="lg" />
      <p>Below</p>
    </Variant>
    <Variant title="Vertical">
      <div style="display: flex; align-items: center">
        <span>Left</span>
        <base-divider vertical />
        <span>Right</span>
      </div>
    </Variant>
  </Story>
</template>
