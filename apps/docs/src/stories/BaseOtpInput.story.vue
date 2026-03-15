<script setup lang="ts">
import { BaseOtpInput } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseOtpInput" :layout="{ type: 'grid', width: 350 }">
    <Variant title="Default">
      <base-otp-input />
    </Variant>
    <Variant title="Partially Filled">
      <base-otp-input model-value="123" />
    </Variant>
    <Variant title="Complete">
      <base-otp-input model-value="123456" />
    </Variant>
    <Variant title="Error">
      <base-otp-input model-value="123456" error="Invalid verification code" />
    </Variant>
    <Variant title="4 Digits">
      <base-otp-input :length="4" />
    </Variant>
    <Variant title="Disabled">
      <base-otp-input model-value="123456" disabled />
    </Variant>
  </Story>
</template>
