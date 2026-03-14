import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue";
import vue from "@vitejs/plugin-vue";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.resolve(__dirname, "../../packages");

const psyPackages = [
  "button",
  "data-display",
  "dropdown",
  "feedback",
  "forms",
  "layout",
  "spinner",
  "ui",
] as const;

export default defineConfig({
  plugins: [HstVue()],
  setupFile: "./src/histoire.setup.ts",
  storyMatch: ["./src/stories/**/*.story.vue"],
  tree: {
    groups: [{ id: "components", title: "Components" }],
  },
  vite: {
    plugins: [vue()],
    css: {
      postcss: path.resolve(__dirname),
      preprocessorOptions: {
        scss: { silenceDeprecations: ["legacy-js-api"] },
      },
    },
    resolve: {
      alias: psyPackages.map((pkg) => ({
        find: `@psy-bot-dev/${pkg}`,
        replacement: path.join(packagesDir, pkg, "src/index.ts"),
      })),
    },
    optimizeDeps: {
      exclude: ["flexsearch", "shiki-es", "vscode-oniguruma", "vscode-textmate"],
    },
  },
});
