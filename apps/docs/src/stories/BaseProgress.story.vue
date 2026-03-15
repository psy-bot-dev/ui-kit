<script setup lang="ts">
import { BaseProgress } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseProgress" :layout="{ type: 'grid', width: 400 }">
    <Variant title="Default (0%)">
      <base-progress :value="0" />
    </Variant>
    <Variant title="50%">
      <base-progress :value="50" />
    </Variant>
    <Variant title="100%">
      <base-progress :value="100" />
    </Variant>
    <Variant title="With label and value">
      <base-progress :value="65" label="Uploading..." :show-value="true" />
    </Variant>
    <Variant title="Indeterminate">
      <base-progress />
    </Variant>
    <Variant title="Without label, with ariaLabel only">
      <!-- eslint-disable-next-line vue/attribute-hyphenation -- prop ariaLabel, TS expects camelCase -->
      <base-progress :value="40" :ariaLabel="'Upload progress'" />
    </Variant>

    <!-- Sizes -->
    <Variant title="Size: sm">
      <base-progress :value="60" size="sm" />
    </Variant>
    <Variant title="Size: md">
      <base-progress :value="60" size="md" />
    </Variant>

    <!-- Colors -->
    <Variant title="Color: accent">
      <base-progress
        :value="70"
        color="accent"
        label="Accent"
        :show-value="true"
      />
    </Variant>
    <Variant title="Color: success">
      <base-progress
        :value="70"
        color="success"
        label="Success"
        :show-value="true"
      />
    </Variant>
    <Variant title="Color: warning">
      <base-progress
        :value="70"
        color="warning"
        label="Warning"
        :show-value="true"
      />
    </Variant>
    <Variant title="Color: error">
      <base-progress
        :value="70"
        color="error"
        label="Error"
        :show-value="true"
      />
    </Variant>
  </Story>
</template>
