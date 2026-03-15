<script setup lang="ts">
import { BaseRadio } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseRadio" :layout="{ type: 'grid', width: 300 }">
    <Variant title="Unselected">
      <base-radio value="option1" label="Option one" name="demo-unselected" />
    </Variant>
    <Variant title="Selected">
      <base-radio
        model-value="option1"
        value="option1"
        label="Selected option"
        name="demo-selected"
      />
    </Variant>
    <Variant title="Group">
      <div class="flex flex-col gap-2">
        <base-radio
          model-value="a"
          value="a"
          label="Choice A"
          name="demo-group"
        />
        <base-radio value="b" label="Choice B" name="demo-group" />
        <base-radio value="c" label="Choice C" name="demo-group" />
      </div>
    </Variant>
    <Variant title="Disabled">
      <base-radio
        value="disabled"
        label="Disabled option"
        name="demo-disabled"
        disabled
      />
    </Variant>
  </Story>
</template>
