<script setup lang="ts">
import { BaseTooltip } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseTooltip" :layout="{ type: 'grid', width: 300 }">
    <Variant title="Top (default)">
      <div style="padding: 40px; text-align: center">
        <base-tooltip content="Tooltip on top">
          <button style="padding: 8px 16px">Hover me</button>
        </base-tooltip>
      </div>
    </Variant>
    <Variant title="Bottom">
      <div style="padding: 40px; text-align: center">
        <base-tooltip content="Tooltip on bottom" position="bottom">
          <button style="padding: 8px 16px">Hover me</button>
        </base-tooltip>
      </div>
    </Variant>
    <Variant title="Left">
      <div style="padding: 40px; text-align: center">
        <base-tooltip content="Tooltip on left" position="left">
          <button style="padding: 8px 16px">Hover me</button>
        </base-tooltip>
      </div>
    </Variant>
    <Variant title="Right">
      <div style="padding: 40px; text-align: center">
        <base-tooltip content="Tooltip on right" position="right">
          <button style="padding: 8px 16px">Hover me</button>
        </base-tooltip>
      </div>
    </Variant>
    <Variant title="Long content">
      <div style="padding: 40px; text-align: center">
        <base-tooltip
          content="This is a longer tooltip message that wraps across multiple lines to demonstrate the max-width behavior."
        >
          <button style="padding: 8px 16px">Hover for long tooltip</button>
        </base-tooltip>
      </div>
    </Variant>
    <Variant title="Disabled">
      <div style="padding: 40px; text-align: center">
        <base-tooltip content="You won't see this" :disabled="true">
          <button style="padding: 8px 16px">Disabled tooltip</button>
        </base-tooltip>
      </div>
    </Variant>
  </Story>
</template>
