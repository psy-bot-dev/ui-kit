<script setup lang="ts">
import { CookieConsentBanner } from "@psy-bot-dev/ui";

// Clear consent cookie before component mounts so banner is always visible
document.cookie = "cookie_consent=; path=/; max-age=0";

const logAction = (name: string) => () => console.log(`[story] ${name}`);
</script>

<template>
  <Story title="UI/CookieConsentBanner" :layout="{ type: 'single', iframe: true }">
    <Variant title="Center (default)">
      <div style="min-height: 300px; position: relative">
        <CookieConsentBanner
          cookie-policy-url="#"
          :on-analytics-granted="logAction('analytics-granted')"
        />
      </div>
    </Variant>

    <Variant title="Right">
      <div style="min-height: 300px; position: relative">
        <CookieConsentBanner
          cookie-policy-url="#"
          position="right"
          :on-analytics-granted="logAction('analytics-granted')"
        />
      </div>
    </Variant>

    <Variant title="Left">
      <div style="min-height: 300px; position: relative">
        <CookieConsentBanner
          cookie-policy-url="#"
          position="left"
          :on-analytics-granted="logAction('analytics-granted')"
        />
      </div>
    </Variant>
  </Story>
</template>
