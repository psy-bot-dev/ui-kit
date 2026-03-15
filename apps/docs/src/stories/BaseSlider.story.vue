<script setup lang="ts">
import { BaseSlider } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseSlider" :layout="{ type: 'grid', width: 300 }">
    <Variant title="Default">
      <base-slider :model-value="50" />
    </Variant>
    <Variant title="With Label and Value">
      <base-slider :model-value="75" label="Volume" show-value />
    </Variant>
    <Variant title="Custom Range">
      <base-slider
        :model-value="25"
        :min="0"
        :max="50"
        :step="5"
        label="Temperature"
        show-value
      />
    </Variant>
    <Variant title="Disabled">
      <base-slider :model-value="30" label="Disabled" show-value disabled />
    </Variant>
  </Story>
</template>
