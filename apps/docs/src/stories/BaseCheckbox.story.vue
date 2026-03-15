<script setup lang="ts">
import { BaseCheckbox } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseCheckbox" :layout="{ type: 'grid', width: 300 }">
    <Variant title="Unchecked">
      <base-checkbox label="Accept terms and conditions" />
    </Variant>
    <Variant title="Checked">
      <base-checkbox :model-value="true" label="Receive notifications" />
    </Variant>
    <Variant title="Indeterminate">
      <base-checkbox indeterminate label="Select all items" />
    </Variant>
    <Variant title="Disabled">
      <base-checkbox disabled label="Disabled option" />
    </Variant>
    <Variant title="Disabled Checked">
      <base-checkbox :model-value="true" disabled label="Locked selection" />
    </Variant>
  </Story>
</template>
