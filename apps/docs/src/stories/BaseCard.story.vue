<script setup lang="ts">
import { BaseCard } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseCard" :layout="{ type: 'grid', width: 400 }">
    <Variant title="Default">
      <base-card>
        <p>Card content goes here.</p>
      </base-card>
    </Variant>
    <Variant title="With Header and Footer">
      <base-card>
        <template #header>
          <strong>Card Title</strong>
        </template>
        <p>Card body content.</p>
        <template #footer>
          <small>Footer info</small>
        </template>
      </base-card>
    </Variant>
    <Variant title="Outlined">
      <base-card variant="outlined">
        <p>Outlined card variant.</p>
      </base-card>
    </Variant>
    <Variant title="Elevated">
      <base-card variant="elevated">
        <p>Elevated card with shadow.</p>
      </base-card>
    </Variant>
    <Variant title="Clickable">
      <base-card clickable @click="() => {}">
        <p>Click me — I have hover lift.</p>
      </base-card>
    </Variant>
    <Variant title="Padding Small">
      <base-card padding="sm">
        <p>Small padding.</p>
      </base-card>
    </Variant>
    <Variant title="Padding Large">
      <base-card padding="lg">
        <p>Large padding.</p>
      </base-card>
    </Variant>
    <Variant title="No Padding">
      <base-card padding="none">
        <p>No padding at all.</p>
      </base-card>
    </Variant>
  </Story>
</template>
