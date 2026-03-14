import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: {
        index: "src/index.ts",
        "tailwind/preset": "src/tailwind/preset.ts",
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue", "tailwindcss"],
    },
  },
});
