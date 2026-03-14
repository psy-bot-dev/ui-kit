import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{vue,ts}",
    "../../packages/*/src/**/*.vue",
  ],
} satisfies Partial<Config>;
