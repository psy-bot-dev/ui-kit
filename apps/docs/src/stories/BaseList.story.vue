<script setup lang="ts">
import { BaseList } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseList" :layout="{ type: 'grid', width: 400 }">
    <Variant title="Default">
      <base-list>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </base-list>
    </Variant>
    <Variant title="Divided">
      <base-list :divided="true">
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </base-list>
    </Variant>
    <Variant title="Bordered">
      <base-list variant="bordered">
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </base-list>
    </Variant>
    <Variant title="Bordered + Divided">
      <base-list variant="bordered" :divided="true">
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </base-list>
    </Variant>
    <Variant title="Hoverable">
      <base-list :hoverable="true" :divided="true">
        <li>Hover over me</li>
        <li>Hover over me too</li>
        <li>And me</li>
      </base-list>
    </Variant>
    <Variant title="Bordered + Divided + Hoverable">
      <base-list variant="bordered" :divided="true" :hoverable="true">
        <li>Clickable item one</li>
        <li>Clickable item two</li>
        <li>Clickable item three</li>
      </base-list>
    </Variant>
  </Story>
</template>
