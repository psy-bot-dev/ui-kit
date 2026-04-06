<script setup lang="ts">
import { CookieConsentBanner } from "@psy-bot-dev/ui";

function clearConsentCookie() {
  document.cookie = "cookie_consent=; path=/; max-age=0";
  window.location.reload();
}

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
      <template #controls>
        <button @click="clearConsentCookie">Reset cookie &amp; reload</button>
      </template>
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
