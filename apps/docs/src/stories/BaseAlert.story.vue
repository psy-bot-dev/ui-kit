<script setup lang="ts">
import { BaseAlert } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseAlert" :layout="{ type: 'grid', width: 400 }">
    <!-- Types -->
    <Variant title="Info (soft)">
      <base-alert type="info" title="Information">
        This is an informational message.
      </base-alert>
    </Variant>
    <Variant title="Success (soft)">
      <base-alert type="success" title="Success">
        Operation completed successfully.
      </base-alert>
    </Variant>
    <Variant title="Warning (soft)">
      <base-alert type="warning" title="Warning">
        Please review this before proceeding.
      </base-alert>
    </Variant>
    <Variant title="Error (soft)">
      <base-alert type="error" title="Error">
        Something went wrong. Please try again.
      </base-alert>
    </Variant>

    <!-- Filled -->
    <Variant title="Info (filled)">
      <base-alert type="info" variant="filled" title="Information">
        Filled variant for strong emphasis.
      </base-alert>
    </Variant>
    <Variant title="Error (filled)">
      <base-alert type="error" variant="filled" title="Error">
        Filled error alert.
      </base-alert>
    </Variant>

    <!-- Outlined -->
    <Variant title="Info (outlined)">
      <base-alert type="info" variant="outlined" title="Information">
        Outlined variant with border.
      </base-alert>
    </Variant>
    <Variant title="Warning (outlined)">
      <base-alert type="warning" variant="outlined" title="Warning">
        Outlined warning alert.
      </base-alert>
    </Variant>

    <!-- Closable -->
    <Variant title="Closable">
      <base-alert type="info" title="Dismissible" :closable="true">
        Click the X to dismiss this alert.
      </base-alert>
    </Variant>

    <!-- No title -->
    <Variant title="No title">
      <base-alert type="success">
        A simple success message without a title.
      </base-alert>
    </Variant>
  </Story>
</template>
