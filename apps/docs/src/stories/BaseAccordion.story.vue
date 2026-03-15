<script setup lang="ts">
import { BaseAccordion, BaseCollapse } from "@psy-bot-dev/ui";
import { ref } from "vue";

const single = ref("");
const multi = ref<string[]>([]);
</script>

<template>
  <Story title="UI/BaseAccordion" :layout="{ type: 'grid', width: 400 }">
    <Variant title="Single">
      <base-accordion v-model="single">
        <base-collapse collapse-key="section1" title="Section 1">
          <p style="padding-bottom: 0.75rem">Content for section 1.</p>
        </base-collapse>
        <base-collapse collapse-key="section2" title="Section 2">
          <p style="padding-bottom: 0.75rem">Content for section 2.</p>
        </base-collapse>
        <base-collapse collapse-key="section3" title="Section 3">
          <p style="padding-bottom: 0.75rem">Content for section 3.</p>
        </base-collapse>
      </base-accordion>
    </Variant>
    <Variant title="Multiple">
      <base-accordion v-model="multi" multiple>
        <base-collapse collapse-key="a" title="Panel A">
          <p style="padding-bottom: 0.75rem">Panel A content.</p>
        </base-collapse>
        <base-collapse collapse-key="b" title="Panel B">
          <p style="padding-bottom: 0.75rem">Panel B content.</p>
        </base-collapse>
        <base-collapse collapse-key="c" title="Panel C">
          <p style="padding-bottom: 0.75rem">Panel C content.</p>
        </base-collapse>
      </base-accordion>
    </Variant>
  </Story>
</template>
