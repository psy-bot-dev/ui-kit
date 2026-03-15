<script setup lang="ts">
import { BaseTabs } from "@psy-bot-dev/ui";
import { ref } from "vue";

const activeTab = ref("tab1");
const pillsTab = ref("a");

const items = [
  { key: "tab1", label: "General" },
  { key: "tab2", label: "Settings" },
  { key: "tab3", label: "Disabled", disabled: true },
  { key: "tab4", label: "About" },
];

const pillItems = [
  { key: "a", label: "All" },
  { key: "b", label: "Active" },
  { key: "c", label: "Archived" },
];
</script>

<template>
  <Story title="UI/BaseTabs" :layout="{ type: 'grid', width: 500 }">
    <Variant title="Underline">
      <base-tabs v-model="activeTab" :items="items">
        <template #tab-tab1>General content here.</template>
        <template #tab-tab2>Settings content here.</template>
        <template #tab-tab4>About content here.</template>
      </base-tabs>
    </Variant>
    <Variant title="Pills">
      <base-tabs v-model="pillsTab" :items="pillItems" variant="pills">
        <template #tab-a>All items shown.</template>
        <template #tab-b>Only active items.</template>
        <template #tab-c>Archived items.</template>
      </base-tabs>
    </Variant>
  </Story>
</template>
