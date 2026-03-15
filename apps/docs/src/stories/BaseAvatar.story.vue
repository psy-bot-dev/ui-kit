<script setup lang="ts">
import { BaseAvatar } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseAvatar" :layout="{ type: 'grid', width: 200 }">
    <!-- Sizes -->
    <Variant title="Size: xs">
      <base-avatar size="xs" name="Alice" />
    </Variant>
    <Variant title="Size: sm">
      <base-avatar size="sm" name="Bob" />
    </Variant>
    <Variant title="Size: md">
      <base-avatar size="md" name="Charlie" />
    </Variant>
    <Variant title="Size: lg">
      <base-avatar size="lg" name="Diana" />
    </Variant>
    <Variant title="Size: xl">
      <base-avatar size="xl" name="Eve" />
    </Variant>

    <!-- With image -->
    <Variant title="With image">
      <base-avatar
        src="https://i.pravatar.cc/80?u=1"
        alt="User avatar"
        size="lg"
      />
    </Variant>

    <!-- Fallback (broken image) -->
    <Variant title="Broken image fallback">
      <base-avatar
        src="https://broken-url.invalid/img.png"
        name="Fallback"
        size="lg"
      />
    </Variant>

    <!-- Statuses -->
    <Variant title="Status: online">
      <base-avatar name="Online" size="lg" status="online" />
    </Variant>
    <Variant title="Status: offline">
      <base-avatar name="Offline" size="lg" status="offline" />
    </Variant>
    <Variant title="Status: away">
      <base-avatar name="Away" size="lg" status="away" />
    </Variant>

    <!-- Rounded variants -->
    <Variant title="Rounded: full (default)">
      <base-avatar name="Full" size="lg" rounded="full" />
    </Variant>
    <Variant title="Rounded: lg">
      <base-avatar name="Lg" size="lg" rounded="lg" />
    </Variant>
  </Story>
</template>
