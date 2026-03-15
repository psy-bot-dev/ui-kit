<script setup lang="ts">
import { BaseDropdown, BaseDropdownItem } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseDropdown" :layout="{ type: 'single', iframe: true }">
    <Variant title="Default (bottom-right)">
      <div style="padding: 24px">
        <base-dropdown position="bottom-right">
          <template #trigger>
            <button
              style="
                padding: 8px 16px;
                border-radius: 8px;
                border: 1px solid #ddd;
                cursor: pointer;
              "
            >
              Open Dropdown
            </button>
          </template>
          <base-dropdown-item>Edit</base-dropdown-item>
          <base-dropdown-item>Duplicate</base-dropdown-item>
          <base-dropdown-item>Archive</base-dropdown-item>
          <base-dropdown-item :danger="true">Delete</base-dropdown-item>
        </base-dropdown>
      </div>
    </Variant>

    <Variant title="Bottom-left">
      <div style="padding: 24px; display: flex; justify-content: flex-end">
        <base-dropdown position="bottom-left">
          <template #trigger>
            <button
              style="
                padding: 8px 16px;
                border-radius: 8px;
                border: 1px solid #ddd;
                cursor: pointer;
              "
            >
              Bottom Left
            </button>
          </template>
          <base-dropdown-item>Option A</base-dropdown-item>
          <base-dropdown-item>Option B</base-dropdown-item>
          <base-dropdown-item>Option C</base-dropdown-item>
        </base-dropdown>
      </div>
    </Variant>

    <Variant title="Top-right">
      <div style="padding: 200px 24px 24px">
        <base-dropdown position="top-right">
          <template #trigger>
            <button
              style="
                padding: 8px 16px;
                border-radius: 8px;
                border: 1px solid #ddd;
                cursor: pointer;
              "
            >
              Top Right
            </button>
          </template>
          <base-dropdown-item>Option A</base-dropdown-item>
          <base-dropdown-item>Option B</base-dropdown-item>
          <base-dropdown-item>Option C</base-dropdown-item>
        </base-dropdown>
      </div>
    </Variant>

    <Variant title="Top-left">
      <div
        style="
          padding: 200px 24px 24px;
          display: flex;
          justify-content: flex-end;
        "
      >
        <base-dropdown position="top-left">
          <template #trigger>
            <button
              style="
                padding: 8px 16px;
                border-radius: 8px;
                border: 1px solid #ddd;
                cursor: pointer;
              "
            >
              Top Left
            </button>
          </template>
          <base-dropdown-item>Option A</base-dropdown-item>
          <base-dropdown-item>Option B</base-dropdown-item>
          <base-dropdown-item>Option C</base-dropdown-item>
        </base-dropdown>
      </div>
    </Variant>
  </Story>
</template>
