<script setup lang="ts">
import { BaseBreadcrumbs } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseBreadcrumbs" :layout="{ type: 'grid', width: 500 }">
    <Variant title="Default">
      <base-breadcrumbs
        :items="[
          { label: 'Home', to: '/' },
          { label: 'Settings', to: '/settings' },
          { label: 'Profile' },
        ]"
      />
    </Variant>
    <Variant title="With Icons">
      <base-breadcrumbs
        :items="[
          { label: 'Home', to: '/', icon: 'lucide:home' },
          { label: 'Chats', to: '/chats', icon: 'lucide:message-circle' },
          { label: 'Current Chat' },
        ]"
      />
    </Variant>
    <Variant title="Custom Separator">
      <base-breadcrumbs
        separator=">"
        :items="[
          { label: 'Root', to: '/' },
          { label: 'Category', to: '/category' },
          { label: 'Item' },
        ]"
      />
    </Variant>
    <Variant title="Long Labels (Truncation)">
      <base-breadcrumbs
        :items="[
          { label: 'Home', to: '/' },
          {
            label: 'A very long category name that should truncate',
            to: '/long',
          },
          { label: 'Another extremely long page title for testing' },
        ]"
      />
    </Variant>
  </Story>
</template>
