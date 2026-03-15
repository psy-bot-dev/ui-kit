<script setup lang="ts">
import { BaseDropdownItem } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseDropdownItem" :layout="{ type: 'single', iframe: true }">
    <Variant title="Default">
      <div
        style="
          max-width: 240px;
          padding: 8px 0;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        "
      >
        <base-dropdown-item>Edit</base-dropdown-item>
        <base-dropdown-item>Duplicate</base-dropdown-item>
        <base-dropdown-item>Archive</base-dropdown-item>
      </div>
    </Variant>

    <Variant title="With Icon">
      <div
        style="
          max-width: 240px;
          padding: 8px 0;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        "
      >
        <base-dropdown-item>
          <template #icon>
            <icon name="lucide:pencil" size="18" />
          </template>
          Edit
        </base-dropdown-item>
        <base-dropdown-item>
          <template #icon>
            <icon name="lucide:copy" size="18" />
          </template>
          Duplicate
        </base-dropdown-item>
        <base-dropdown-item>
          <template #icon>
            <icon name="lucide:archive" size="18" />
          </template>
          Archive
        </base-dropdown-item>
      </div>
    </Variant>

    <Variant title="Danger">
      <div
        style="
          max-width: 240px;
          padding: 8px 0;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        "
      >
        <base-dropdown-item>
          <template #icon>
            <icon name="lucide:pencil" size="18" />
          </template>
          Edit
        </base-dropdown-item>
        <base-dropdown-item :danger="true">
          <template #icon>
            <icon name="lucide:trash-2" size="18" />
          </template>
          Delete
        </base-dropdown-item>
      </div>
    </Variant>
  </Story>
</template>
