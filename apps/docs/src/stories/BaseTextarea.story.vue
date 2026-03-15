<script setup lang="ts">
import { BaseTextarea } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseTextarea" :layout="{ type: 'grid', width: 300 }">
    <Variant title="Default">
      <base-textarea label="Message" placeholder="Type your message..." />
    </Variant>
    <Variant title="With Content">
      <base-textarea
        label="Bio"
        model-value="This is a sample bio text that demonstrates the textarea component with some content already filled in."
      />
    </Variant>
    <Variant title="Error">
      <base-textarea
        label="Description"
        error="Description is required"
        model-value=""
      />
    </Variant>
    <Variant title="Readonly">
      <base-textarea
        label="Terms"
        readonly
        model-value="These terms cannot be edited by the user."
      />
    </Variant>
    <Variant title="Disabled">
      <base-textarea
        label="Notes"
        disabled
        model-value="This textarea is disabled."
      />
    </Variant>
  </Story>
</template>
