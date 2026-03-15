<script setup lang="ts">
import { BaseSpinner } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseSpinner" :layout="{ type: 'grid', width: 200 }">
    <Variant title="Small / Current">
      <base-spinner size="sm" color="current" />
    </Variant>
    <Variant title="Small / White">
      <div style="background: #333; padding: 16px; border-radius: 8px">
        <base-spinner size="sm" color="white" />
      </div>
    </Variant>
    <Variant title="Small / Accent">
      <base-spinner size="sm" color="accent" />
    </Variant>

    <Variant title="Medium / Current">
      <base-spinner size="md" color="current" />
    </Variant>
    <Variant title="Medium / White">
      <div style="background: #333; padding: 16px; border-radius: 8px">
        <base-spinner size="md" color="white" />
      </div>
    </Variant>
    <Variant title="Medium / Accent">
      <base-spinner size="md" color="accent" />
    </Variant>

    <Variant title="Large / Current">
      <base-spinner size="lg" color="current" />
    </Variant>
    <Variant title="Large / White">
      <div style="background: #333; padding: 16px; border-radius: 8px">
        <base-spinner size="lg" color="white" />
      </div>
    </Variant>
    <Variant title="Large / Accent">
      <base-spinner size="lg" color="accent" />
    </Variant>
  </Story>
</template>
