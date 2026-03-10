import { nearbyPreset } from "../tokens/src/tailwind/preset";
import type { Config } from "tailwindcss";

export default {
  presets: [nearbyPreset],
  content: ["./src/**/*.vue"],
} satisfies Partial<Config>;
