<script setup lang="ts">
import { ref } from "vue";
import { BaseInput } from "@psy-bot-dev/ui";

const text = ref("");
const email = ref("");
const password = ref("");
const errorText = ref("");
const readonlyText = ref("Read-only value");
const messageText = ref("");
</script>

<template>
  <Story title="UI/BaseInput" :layout="{ type: 'single', iframe: true }">
    <Variant title="Default">
      <div style="max-width: 400px; padding: 24px">
        <base-input v-model="text" placeholder="Enter some text" />
      </div>
    </Variant>

    <Variant title="With Label">
      <div style="max-width: 400px; padding: 24px">
        <base-input
          v-model="email"
          label="Email address"
          placeholder="you@example.com"
          type="email"
          inputmode="email"
        />
      </div>
    </Variant>

    <Variant title="With Message">
      <div style="max-width: 400px; padding: 24px">
        <base-input
          v-model="messageText"
          label="Username"
          placeholder="Choose a username"
          message="Must be at least 3 characters"
        />
      </div>
    </Variant>

    <Variant title="With Error">
      <div style="max-width: 400px; padding: 24px">
        <base-input
          v-model="errorText"
          label="Email"
          placeholder="you@example.com"
          error="Please enter a valid email address"
        />
      </div>
    </Variant>

    <Variant title="Error State (no message)">
      <div style="max-width: 400px; padding: 24px">
        <base-input
          v-model="errorText"
          label="Email"
          placeholder="you@example.com"
          :error-state="true"
        />
      </div>
    </Variant>

    <Variant title="Readonly">
      <div style="max-width: 400px; padding: 24px">
        <base-input
          v-model="readonlyText"
          label="Account ID"
          :readonly="true"
        />
      </div>
    </Variant>

    <Variant title="Password">
      <div style="max-width: 400px; padding: 24px">
        <base-input
          v-model="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
    </Variant>
  </Story>
</template>
