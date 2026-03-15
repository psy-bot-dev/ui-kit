<script setup lang="ts">
import { BaseSwitch } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseSwitch" :layout="{ type: 'grid', width: 300 }">
    <Variant title="Off">
      <base-switch label="Enable notifications" />
    </Variant>
    <Variant title="On">
      <base-switch :model-value="true" label="Dark mode" />
    </Variant>
    <Variant title="Small">
      <base-switch size="sm" label="Compact switch" />
    </Variant>
    <Variant title="Label Left">
      <base-switch label="Left label" label-position="left" />
    </Variant>
    <Variant title="Disabled">
      <base-switch disabled label="Cannot toggle" />
    </Variant>
    <Variant title="Disabled On">
      <base-switch :model-value="true" disabled label="Locked on" />
    </Variant>
  </Story>
</template>
