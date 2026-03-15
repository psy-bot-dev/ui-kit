<script setup lang="ts">
import { BaseSidebarLayout } from "@psy-bot-dev/ui";
import { ref } from "vue";

const sidebarOpen = ref(false);
</script>

<template>
  <Story title="UI/BaseSidebarLayout" :layout="{ type: 'single' }">
    <Variant title="Default">
      <div style="height: 400px; border: 1px solid #ccc">
        <base-sidebar-layout v-model="sidebarOpen">
          <template #sidebar>
            <div style="padding: 1rem">
              <h3>Sidebar</h3>
              <p>Navigation items go here.</p>
            </div>
          </template>
          <div style="padding: 1rem">
            <button @click="sidebarOpen = !sidebarOpen">
              Toggle Sidebar (mobile)
            </button>
            <h2>Main Content</h2>
            <p>The sidebar is always visible on desktop.</p>
          </div>
        </base-sidebar-layout>
      </div>
    </Variant>
    <Variant title="Custom Width">
      <div style="height: 400px; border: 1px solid #ccc">
        <base-sidebar-layout sidebar-width="240px">
          <template #sidebar>
            <div style="padding: 1rem">
              <h3>Narrow Sidebar</h3>
            </div>
          </template>
          <div style="padding: 1rem">
            <h2>Main Content</h2>
            <p>240px sidebar width.</p>
          </div>
        </base-sidebar-layout>
      </div>
    </Variant>
  </Story>
</template>
