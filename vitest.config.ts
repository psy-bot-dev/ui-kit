import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "happy-dom",
    include: ["packages/**/__tests__/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@psy-bot-dev/spinner": path.resolve(__dirname, "packages/spinner/src/index.ts"),
    },
  },
});
