<script setup lang="ts">
import { BaseTag } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseTag" :layout="{ type: 'grid', width: 200 }">
    <!-- Variants -->
    <Variant title="Primary">
      <base-tag variant="primary">Primary</base-tag>
    </Variant>
    <Variant title="Secondary">
      <base-tag variant="secondary">Secondary</base-tag>
    </Variant>
    <Variant title="Success">
      <base-tag variant="success">Success</base-tag>
    </Variant>
    <Variant title="Warning">
      <base-tag variant="warning">Warning</base-tag>
    </Variant>
    <Variant title="Error">
      <base-tag variant="error">Error</base-tag>
    </Variant>
    <Variant title="Neutral">
      <base-tag variant="neutral">Neutral</base-tag>
    </Variant>

    <!-- Sizes -->
    <Variant title="Size: sm">
      <base-tag size="sm">Small tag</base-tag>
    </Variant>
    <Variant title="Size: md">
      <base-tag size="md">Medium tag</base-tag>
    </Variant>

    <!-- With icon (slot) -->
    <Variant title="With icon">
      <base-tag variant="primary">
        <template #icon>★</template>
        Featured
      </base-tag>
    </Variant>

    <!-- Closable -->
    <Variant title="Closable">
      <base-tag :closable="true" variant="primary">Removable</base-tag>
    </Variant>
    <Variant title="Closable with icon">
      <base-tag :closable="true" variant="success">
        <template #icon>🏷</template>
        Label
      </base-tag>
    </Variant>
  </Story>
</template>
