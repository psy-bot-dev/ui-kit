import { nearbyPreset } from "@nearby/tokens/tailwind";
import type { Config } from "tailwindcss";

export default {
  presets: [nearbyPreset],
  content: ["./src/**/*.vue"],
} satisfies Partial<Config>;
