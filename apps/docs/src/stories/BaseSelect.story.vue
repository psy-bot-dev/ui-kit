<script setup lang="ts">
import { ref } from "vue";
import { BaseSelect } from "@psy-bot-dev/ui";

const selected = ref<string | null>(null);
const selectedWithLabel = ref<string | null>("vue");
const selectedDisabled = ref<string | null>("react");

const frameworkOptions = [
  { value: "vue", label: "Vue.js" },
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "ru", label: "Russian" },
  { value: "ky", label: "Kyrgyz" },
];
</script>

<template>
  <Story title="UI/BaseSelect" :layout="{ type: 'single', iframe: true }">
    <Variant title="Default">
      <div style="max-width: 320px; padding: 24px">
        <base-select
          v-model="selected"
          :options="frameworkOptions"
          placeholder="Select a framework"
        />
        <p style="margin-top: 12px; font-size: 13px; color: #888">
          Selected: {{ selected ?? "none" }}
        </p>
      </div>
    </Variant>

    <Variant title="With Label">
      <div style="max-width: 320px; padding: 24px">
        <base-select
          v-model="selectedWithLabel"
          :options="frameworkOptions"
          label="Framework"
          placeholder="Choose one"
        />
      </div>
    </Variant>

    <Variant title="Disabled">
      <div style="max-width: 320px; padding: 24px">
        <base-select
          v-model="selectedDisabled"
          :options="frameworkOptions"
          label="Framework"
          placeholder="Choose one"
          :disabled="true"
        />
      </div>
    </Variant>

    <Variant title="With Placeholder">
      <div style="max-width: 320px; padding: 24px">
        <base-select
          :model-value="null"
          :options="languageOptions"
          label="Language"
          placeholder="Pick a language..."
        />
      </div>
    </Variant>
  </Story>
</template>
