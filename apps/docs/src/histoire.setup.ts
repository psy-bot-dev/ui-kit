import "@psy-bot-dev/tokens/css/variables.css";
import "./histoire.css";
import { defineSetupVue3 } from "@histoire/plugin-vue";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      "cookies | banner":
        "We use cookies to ensure the site works properly and to improve your experience. You can manage your preferences at any time.",
      "cookies | acceptAll": "Accept All",
      "cookies | essentialOnly": "Essential Only",
      "cookies | preferences": "Preferences",
      "cookies | preferencesTitle": "Cookie Preferences",
      "cookies | preferencesDescription":
        "Choose which cookies you allow. Essential cookies are required for the site to function and cannot be turned off.",
      "cookies | essentialTitle": "Essential Cookies",
      "cookies | essentialDescription":
        "These cookies are necessary for the site to work. They enable core features like authentication and security.",
      "cookies | alwaysActive": "Always active",
      "cookies | analyticsTitle": "Analytics Cookies",
      "cookies | analyticsDescription":
        "These cookies help us understand how you use the site so we can improve your experience.",
      "cookies | save": "Save Preferences",
      "cookies | privacyLink": "Cookie Policy",
      "cookies | ariaLabel": "Cookie consent",
      "cookies | close": "Close",
    },
  },
});

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(i18n);
});
