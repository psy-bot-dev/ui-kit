<script setup lang="ts">
import { BaseButton } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseButton" :layout="{ type: 'grid', width: 300 }">
    <!-- variants -->
    <Variant title="Primary">
      <base-button variant="primary">Primary</base-button>
    </Variant>
    <Variant title="Secondary">
      <base-button variant="secondary">Secondary</base-button>
    </Variant>
    <Variant title="Danger">
      <base-button variant="danger">Danger</base-button>
    </Variant>
    <Variant title="Ghost">
      <base-button variant="ghost">Ghost</base-button>
    </Variant>
    <Variant title="Outline">
      <base-button variant="outline">Outline</base-button>
    </Variant>

    <!-- Sizes -->
    <Variant title="Size: Small">
      <base-button size="sm">Small</base-button>
    </Variant>
    <Variant title="Size: Medium">
      <base-button size="md">Medium</base-button>
    </Variant>
    <Variant title="Size: Large">
      <base-button size="lg">Large</base-button>
    </Variant>

    <!-- Loading states -->
    <Variant title="Loading: Primary">
      <base-button variant="primary" :loading="true">Loading</base-button>
    </Variant>
    <Variant title="Loading: Secondary">
      <base-button variant="secondary" :loading="true">Loading</base-button>
    </Variant>
    <Variant title="Loading: Danger">
      <base-button variant="danger" :loading="true">Loading</base-button>
    </Variant>
    <Variant title="Loading: Ghost">
      <base-button variant="ghost" :loading="true">Loading</base-button>
    </Variant>
    <Variant title="Loading: Outline">
      <base-button variant="outline" :loading="true">Loading</base-button>
    </Variant>

    <!-- Disabled states -->
    <Variant title="Disabled: Primary">
      <base-button variant="primary" :disabled="true">Disabled</base-button>
    </Variant>
    <Variant title="Disabled: Secondary">
      <base-button variant="secondary" :disabled="true">Disabled</base-button>
    </Variant>
    <Variant title="Disabled: Danger">
      <base-button variant="danger" :disabled="true">Disabled</base-button>
    </Variant>

    <!-- Block -->
    <Variant title="Block: Primary">
      <base-button variant="primary" :block="true">Full Width</base-button>
    </Variant>
    <Variant title="Block: Outline">
      <base-button variant="outline" :block="true">Full Width</base-button>
    </Variant>
  </Story>
</template>
