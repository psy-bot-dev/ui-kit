import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import injectCss from "../../tooling/vite-plugin-inject-css.mjs";

export default defineConfig({
  plugins: [vue(), dts({ rollupTypes: true }), injectCss()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue", /^@psy-bot-dev\//],
    },
    cssCodeSplit: false,
  },
});
