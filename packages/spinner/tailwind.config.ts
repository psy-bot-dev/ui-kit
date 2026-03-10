import { nearbyPreset } from "@psy-bot-dev/tokens/tailwind";
import type { Config } from "tailwindcss";

export default {
  presets: [nearbyPreset],
  content: ["./src/**/*.vue"],
} satisfies Partial<Config>;
