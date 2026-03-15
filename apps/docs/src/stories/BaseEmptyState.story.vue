<script setup lang="ts">
import { BaseEmptyState } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseEmptyState" :layout="{ type: 'grid', width: 400 }">
    <Variant title="Default">
      <base-empty-state
        title="No items found"
        description="There are no items to display at this time."
      />
    </Variant>
    <Variant title="Custom icon (slot)">
      <base-empty-state
        title="No results"
        description="Try adjusting your search or filters"
      >
        <template #icon>
          <span aria-hidden="true">🔍</span>
        </template>
      </base-empty-state>
    </Variant>
    <Variant title="With action slot">
      <base-empty-state
        title="No conversations yet"
        description="Start a new conversation to get going."
      >
        <template #action>
          <button
            style="
              padding: 8px 16px;
              background: var(--theme-accent);
              color: #fff;
              border-radius: 8px;
              border: none;
              cursor: pointer;
            "
          >
            Start a chat
          </button>
        </template>
      </base-empty-state>
    </Variant>
    <Variant title="Minimal (no description)">
      <base-empty-state title="Nothing here" />
    </Variant>
  </Story>
</template>
