<script setup lang="ts">
import { BaseFormGroup } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseFormGroup" :layout="{ type: 'grid', width: 300 }">
    <Variant title="Default">
      <base-form-group label="Email address" for="email-default">
        <input
          id="email-default"
          type="email"
          placeholder="you@example.com"
          class="w-full rounded-lg border px-4 py-3"
        />
      </base-form-group>
    </Variant>
    <Variant title="With Hint">
      <base-form-group
        label="Username"
        for="username-hint"
        hint="Must be 3-20 characters"
      >
        <input
          id="username-hint"
          type="text"
          placeholder="johndoe"
          class="w-full rounded-lg border px-4 py-3"
        />
      </base-form-group>
    </Variant>
    <Variant title="With Error">
      <base-form-group
        label="Password"
        for="password-error"
        error="Password must be at least 8 characters"
      >
        <input
          id="password-error"
          type="password"
          class="w-full rounded-lg border border-red-500 px-4 py-3"
        />
      </base-form-group>
    </Variant>
    <Variant title="Required">
      <base-form-group label="Full name" for="name-required" required>
        <input
          id="name-required"
          type="text"
          placeholder="Jane Doe"
          class="w-full rounded-lg border px-4 py-3"
        />
      </base-form-group>
    </Variant>
  </Story>
</template>
