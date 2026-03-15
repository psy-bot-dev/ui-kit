<script setup lang="ts">
import { BaseCollapse } from "@psy-bot-dev/ui";
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <Story title="UI/BaseCollapse" :layout="{ type: 'grid', width: 400 }">
    <Variant title="Default (uncontrolled)">
      <base-collapse title="Click to expand">
        <p style="padding-bottom: 0.75rem">
          This is the collapsible content. It uses a CSS grid animation for
          smooth height transitions.
        </p>
      </base-collapse>
    </Variant>
    <Variant title="Controlled (v-model)">
      <base-collapse v-model="open" title="Controlled collapse">
        <p style="padding-bottom: 0.75rem">Open state: {{ open }}</p>
      </base-collapse>
    </Variant>
    <Variant title="Disabled">
      <base-collapse title="Cannot open" disabled>
        <p>You should not see this.</p>
      </base-collapse>
    </Variant>
    <Variant title="Custom Title Slot">
      <base-collapse title="fallback">
        <template #title>
          <strong>Custom Title</strong>
        </template>
        <p style="padding-bottom: 0.75rem">Content with a custom title slot.</p>
      </base-collapse>
    </Variant>
  </Story>
</template>
