<script setup lang="ts">
import { BasePopover } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BasePopover" :layout="{ type: 'grid', width: 400 }">
    <Variant title="Click trigger (bottom)">
      <div style="padding: 60px; text-align: center">
        <base-popover position="bottom">
          <template #trigger>
            <button style="padding: 8px 16px">Click me</button>
          </template>
          <div>
            <p style="margin: 0 0 8px; font-weight: 600">Popover title</p>
            <p style="margin: 0; color: gray">
              This is some popover content that can contain any rich HTML.
            </p>
          </div>
        </base-popover>
      </div>
    </Variant>
    <Variant title="Click trigger (top)">
      <div style="padding: 80px 60px 20px; text-align: center">
        <base-popover position="top">
          <template #trigger>
            <button style="padding: 8px 16px">Click me (top)</button>
          </template>
          <div>
            <p style="margin: 0">Popover appears on top.</p>
          </div>
        </base-popover>
      </div>
    </Variant>
    <Variant title="Hover trigger">
      <div style="padding: 60px; text-align: center">
        <base-popover trigger="hover" position="bottom">
          <template #trigger>
            <button style="padding: 8px 16px">Hover me</button>
          </template>
          <div>
            <p style="margin: 0">This popover shows on hover.</p>
          </div>
        </base-popover>
      </div>
    </Variant>
  </Story>
</template>
