# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Vue 3 component library monorepo (`@psy-bot-dev` scope) published to GitHub Packages. Uses pnpm workspaces, Vite for building, and Vitest for testing.

## Commands

```bash
pnpm build                          # Build all packages
pnpm --filter @psy-bot-dev/button build  # Build single package
pnpm test                           # Run all tests once
pnpm test:watch                     # Watch mode
npx vitest packages/button/__tests__/BaseButton.test.ts  # Single test file
pnpm lint                           # ESLint
pnpm lint:fix                       # ESLint with --fix
pnpm typecheck                      # vue-tsc --noEmit all packages
pnpm docs                           # Start Histoire dev server
```

## Architecture

### Package dependency order (leaf → root)

`tokens` → `spinner` → `button`, `data-display`, `dropdown`, `forms`, `feedback`, `layout` → `ui` (meta-package re-exporting all)

- **tokens** — Design tokens (CSS variables, Tailwind preset, Vue injection keys, shared types)
- **ui** — Re-exports all component packages; consumers install this one package
- **apps/docs** — Histoire stories for documentation

### Component conventions

- **Vue 3 Composition API** with `<script setup lang="ts">` and strict typing
- **BEM naming**: `.base-component`, `.base-component--variant`, `.base-component__slot`
- **CSS variables** from tokens (e.g., `var(--theme-accent)`, `var(--color-primary)`)
- **Scoped SCSS** with Tailwind CSS utilities
- Props use `withDefaults(defineProps<Props>(), {...})` with union-typed variants/sizes
- Events use typed `defineEmits<{ click: [event: MouseEvent] }>()`
- Cross-package state via provide/inject keys from `@psy-bot-dev/tokens` (`accordionKey`, `formGroupErrorIdKey`, etc.)

### Build setup per package

Each package uses Vite with `vue()`, `dts({ rollupTypes: true })`, and a custom `injectCss()` plugin (`tooling/vite-plugin-inject-css.mjs`) that injects CSS side-effect imports into the JS bundle. Vue and `@psy-bot-dev/*` are externalized. Output format is ESM only.

### Package exports pattern

```json
{
  ".": { "import": "./dist/index.js", "types": "./dist/index.d.ts" },
  "./style.css": "./dist/index.css"
}
```

Peer dependencies: `vue >=3.5.0` plus any `@psy-bot-dev/*` siblings.

### Testing

Vitest with `@vue/test-utils` and `happy-dom`. Tests live in `packages/<name>/__tests__/*.test.ts`.

### CI/CD

- **PR gatekeeper**: build → typecheck → lint (blocks merge on failure)
- **Main release**: `multi-semantic-release` → publish to GitHub Packages
- **Snapshot**: `/snapshot` comment on PR publishes `0.2.0-alpha.{SHA}` versions

### Commit conventions

Conventional commits (`feat:`, `fix:`, etc.) drive semantic-release versioning. Husky hooks strip `Co-authored-by` and `Made-with` trailers from commit messages.
