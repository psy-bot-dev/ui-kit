# Nearby UI

Modular Vue 3 UI kit and design tokens. Use only the packages you need; all components are built with **Tailwind CSS** and **@psy-bot-dev/tokens**.

## Packages

| Package | Description |
|--------|-------------|
| **@psy-bot-dev/tokens** | Design tokens (colors, typography, radius), CSS variables, Tailwind preset |
| **@psy-bot-dev/spinner** | Loading spinner |
| **@psy-bot-dev/button** | BaseButton, BaseConfirmButton (hold-to-confirm) |
| **@psy-bot-dev/dropdown** | BaseDropdown, BaseDropdownItem, BaseSelect |
| **@psy-bot-dev/forms** | Inputs, checkbox, textarea, form layout |
| **@psy-bot-dev/data-display** | Tag, skeleton, empty state, etc. |
| **@psy-bot-dev/feedback** | Alerts, toasts, modals |
| **@psy-bot-dev/layout** | Accordion, tabs, container, sidebar layout |

Install **@psy-bot-dev/tokens** first (peer dependency of most packages). Add components per package:

```bash
pnpm add @psy-bot-dev/tokens @psy-bot-dev/button @psy-bot-dev/spinner
```

## Quick start

1. **Tokens** — include CSS and Tailwind preset so components look correct:

```js
// tailwind.config.js
import { nearbyPreset } from "@psy-bot-dev/tokens/tailwind";
export default {
  presets: [nearbyPreset],
  content: [
    "node_modules/@psy-bot-dev/button/dist/*.js",
    // ... your app paths
  ],
};
```

```css
/* app.css */
@import "@psy-bot-dev/tokens/css/variables.css";
@import "@psy-bot-dev/tokens/css/base.css";
@import "@psy-bot-dev/button/style.css";
```

2. **Components** — import and use:

```vue
<script setup lang="ts">
import { BaseButton } from "@psy-bot-dev/button";
</script>

<template>
  <BaseButton variant="primary" :loading="busy">Save</BaseButton>
</template>
```

## Development

- **Node** ≥ 22.12  
- **pnpm** ≥ 10  

```bash
git clone <repo>
cd nearby-ui
pnpm install
pnpm build          # build all packages
pnpm typecheck       # typecheck all packages
pnpm lint
```

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm build` | Build every package |
| `pnpm typecheck` | Run `vue-tsc --noEmit` in each package |
| `pnpm lint` | ESLint for the repo |
| `pnpm --filter @psy-bot-dev/button build` | Build a single package |

### Versioning and release

Versions and changelogs are managed with [Changesets](https://github.com/changesets/changesets). To cut a release:

```bash
pnpm changeset          # add a changeset
pnpm version-packages  # bump versions from changesets
pnpm release           # build and publish (CI or manual)
```

## Repository structure

```
nearby-ui/
├── packages/
│   ├── tokens/      # design tokens, Tailwind preset
│   ├── spinner/     # spinner
│   ├── button/      # buttons
│   ├── dropdown/    # dropdown, select
│   ├── forms/       # form controls
│   ├── data-display/
│   ├── feedback/
│   ├── layout/
│   └── ui/          # (optional) re-exports or app-specific
├── apps/
│   └── docs/        # documentation app
├── pnpm-workspace.yaml
└── package.json
```

Each package under `packages/*` is self-contained: its own `vite.config`, `tailwind.config`, and `tsconfig`. Dependencies between packages use `workspace:*` (e.g. `@psy-bot-dev/button` depends on `@psy-bot-dev/spinner` and `@psy-bot-dev/tokens`).

## License

Proprietary. See repository or contact maintainers.
