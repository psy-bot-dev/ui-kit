<script setup lang="ts">
import { BaseBadge } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseBadge" :layout="{ type: 'grid', width: 200 }">
    <!-- Variants -->
    <Variant title="Primary">
      <base-badge variant="primary">New</base-badge>
    </Variant>
    <Variant title="Secondary">
      <base-badge variant="secondary">Draft</base-badge>
    </Variant>
    <Variant title="Success">
      <base-badge variant="success">Active</base-badge>
    </Variant>
    <Variant title="Warning">
      <base-badge variant="warning">Pending</base-badge>
    </Variant>
    <Variant title="Error">
      <base-badge variant="error">Failed</base-badge>
    </Variant>
    <Variant title="Neutral">
      <base-badge variant="neutral">Archived</base-badge>
    </Variant>

    <!-- Sizes -->
    <Variant title="Size: sm">
      <base-badge size="sm">Small</base-badge>
    </Variant>
    <Variant title="Size: md">
      <base-badge size="md">Medium</base-badge>
    </Variant>

    <!-- Dot -->
    <Variant title="Dot: primary">
      <base-badge variant="primary" :dot="true" />
    </Variant>
    <Variant title="Dot: success">
      <base-badge variant="success" :dot="true" />
    </Variant>
    <Variant title="Dot: error">
      <base-badge variant="error" :dot="true" />
    </Variant>

    <!-- Count -->
    <Variant title="Count: 5">
      <base-badge variant="error" :count="5" />
    </Variant>
    <Variant title="Count: 42">
      <base-badge variant="error" :count="42" />
    </Variant>
    <Variant title="Count: 150 (max 99)">
      <base-badge variant="error" :count="150" />
    </Variant>
    <Variant title="Count: 150 (max 9)">
      <base-badge variant="error" :count="150" :max="9" />
    </Variant>
  </Story>
</template>
