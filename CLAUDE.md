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

## Documentation sync (MANDATORY)

When any `feat:` or `fix:` commit changes a component's public API (props, events, slots, expose) or adds/removes a component:

1. **CLAUDE.md** — update the "Component API Reference" section below to match the new source of truth (the component's `defineProps`, `defineEmits`, `defineExpose`, and `<slot>` usage).
2. **README.md** — update the corresponding "Component API" section with the same changes plus a usage example if it's a new component.
3. If a **new component** is added — add its entry to both files. If a component is **removed** — delete its entry from both files.
4. If **tokens/theming** change (new CSS variables, palettes, Tailwind preset changes) — update the Theming section in README.md and relevant CSS variable references in CLAUDE.md.

Keep docs in sync with code in the **same commit** — do not defer to a separate docs PR.

## Component API Reference

### Button (`@psy-bot-dev/button`)

#### BaseButton
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "danger" \| "ghost" \| "outline"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | HTML type |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading spinner (auto-disables) |
| `block` | `boolean` | `false` | Full width |

Events: `click` (MouseEvent). Slots: `default`, `icon`.

### Spinner (`@psy-bot-dev/spinner`)

#### BaseSpinner
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Spinner size |
| `color` | `"current" \| "white" \| "accent"` | `"current"` | Color |
| `label` | `string` | — | Aria label |

### Forms (`@psy-bot-dev/forms`)

#### BaseInput
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `""` | v-model |
| `label` | `string` | `""` | Label text |
| `type` | `string` | `"text"` | HTML input type |
| `placeholder` | `string` | `""` | Placeholder |
| `message` | `string` | `""` | Helper message |
| `error` | `string` | `""` | Error message (sets error styling) |
| `errorState` | `boolean` | `false` | Error styling without message |
| `readonly` | `boolean` | `false` | Readonly |
| `inputmode` | `string` | — | HTML inputmode |
| `autocomplete` | `string` | — | HTML autocomplete |

Events: `update:modelValue`.

#### BaseTextarea
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `""` | v-model |
| `label` | `string` | `""` | Label text |
| `placeholder` | `string` | `""` | Placeholder |
| `error` | `string` | `""` | Error message |
| `disabled` | `boolean` | `false` | Disabled |
| `readonly` | `boolean` | `false` | Readonly |
| `rows` | `number` | `3` | Rows |
| `maxRows` | `number` | `8` | Max rows (autoResize) |
| `autoResize` | `boolean` | `true` | Auto-resize |

Events: `update:modelValue`.

#### BaseCheckbox
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | v-model |
| `label` | `string` | `""` | Label |
| `disabled` | `boolean` | `false` | Disabled |
| `indeterminate` | `boolean` | `false` | Indeterminate state |

Events: `update:modelValue`. Slots: `default` (label override).

#### BaseRadio
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `""` | v-model (group value) |
| `value` | `string` | **required** | Option value |
| `label` | `string` | `""` | Label |
| `disabled` | `boolean` | `false` | Disabled |

Events: `update:modelValue`. Slots: `default` (label override).

#### BaseSwitch
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | v-model |
| `label` | `string` | `""` | Label |
| `disabled` | `boolean` | `false` | Disabled |
| `size` | `"sm" \| "md"` | `"md"` | Size |
| `labelPosition` | `"left" \| "right"` | `"right"` | Label position |

Events: `update:modelValue`. Slots: `default` (label override).

#### BaseSelect
v-model select with options. See source for full API.

#### BaseSlider
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | `0` | v-model |
| `min` | `number` | `0` | Minimum |
| `max` | `number` | `100` | Maximum |
| `step` | `number` | `1` | Step |
| `disabled` | `boolean` | `false` | Disabled |
| `showValue` | `boolean` | `false` | Show value |
| `label` | `string` | `""` | Label |

Events: `update:modelValue`. Slots: `value` (scoped: `{ value }`).

#### BaseOtpInput
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `""` | v-model |
| `length` | `number` | `6` | Digit count |
| `disabled` | `boolean` | `false` | Disabled |
| `error` | `string` | `""` | Error message |
| `autoFocus` | `boolean` | `false` | Auto-focus first field |

Events: `update:modelValue`, `complete` (all digits entered).

#### BaseFormGroup
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `""` | Group label |
| `for` | `string` | — | Associated input id |
| `error` | `string` | `""` | Error message |
| `hint` | `string` | `""` | Hint text |
| `required` | `boolean` | `false` | Required asterisk |

Slots: `default`, `label`, `error`. Provides context to child form controls via inject.

### Feedback (`@psy-bot-dev/feedback`)

#### BaseAlert
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Alert type |
| `title` | `string` | — | Title |
| `closable` | `boolean` | `false` | Show close button |
| `variant` | `"filled" \| "outlined" \| "soft"` | `"soft"` | Visual style |
| `modelValue` | `boolean` | — | Visibility (v-model) |

Events: `close`, `update:modelValue`. Slots: `default`, `icon`, `action`.
Accessibility: `role="alert"` for error/warning, `role="status"` for info/success.

#### BaseModal
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | **required** | Visibility (v-model) |
| `title` | `string` | `""` | Title |
| `closable` | `boolean` | `true` | Close button |
| `closeOnBackdrop` | `boolean` | `true` | Close on backdrop click |

Events: `update:modelValue`. Slots: `default`, `header`, `footer`.
Expose: `close()`, `isOpen`. Teleports to body, manages scroll lock.

#### BaseProgress
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | 0–100, undefined = indeterminate |
| `size` | `"sm" \| "md"` | `"md"` | Size |
| `color` | `"accent" \| "success" \| "warning" \| "error"` | `"accent"` | Color |
| `showValue` | `boolean` | `false` | Show percentage |

#### BaseTooltip
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | **required** | Tooltip text |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Position |
| `delay` | `number` | `200` | Show delay (ms) |
| `disabled` | `boolean` | `false` | Disabled |

Slots: `default` (trigger). Teleports to body, auto-repositions.

#### BasePopover
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Position |
| `trigger` | `"click" \| "hover"` | `"click"` | Trigger mode |
| `closeOnClickOutside` | `boolean` | `true` | Close on outside click |

Slots: `default` (content), `trigger`. Expose: `open()`, `close()`.

### Data Display (`@psy-bot-dev/data-display`)

#### BaseAvatar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string \| null` | `null` | Image URL |
| `name` | `string` | — | Name (generates initial) |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size |
| `rounded` | `"full" \| "lg"` | `"full"` | Border radius |
| `status` | `"online" \| "offline" \| "away" \| null` | `null` | Status dot |

#### BaseBadge
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "success" \| "warning" \| "error" \| "neutral"` | `"primary"` | Color |
| `size` | `"sm" \| "md"` | `"md"` | Size |
| `dot` | `boolean` | `false` | Dot mode |
| `count` | `number` | — | Count (shows "99+" when > `max`) |
| `max` | `number` | `99` | Max count |

#### BaseTag
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "success" \| "warning" \| "error" \| "neutral"` | `"primary"` | Color |
| `size` | `"sm" \| "md"` | `"md"` | Size |
| `closable` | `boolean` | `false` | Show close button |

Events: `close`. Slots: `default`, `icon`.

#### BaseSkeleton
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"text" \| "circle" \| "rect"` | `"text"` | Shape |
| `width` | `string` | — | Custom width |
| `height` | `string` | — | Custom height |

#### BaseEmptyState
Props: `title` (string), `description` (string). Slots: `default`, `icon`, `action`.

### Layout (`@psy-bot-dev/layout`)

#### BaseCard
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outlined" \| "elevated"` | `"default"` | Style |
| `padding` | `"none" \| "sm" \| "md" \| "lg"` | `"md"` | Padding |
| `clickable` | `boolean` | `false` | Clickable |

Events: `click` (when clickable). Slots: `default`, `header`, `footer`.

#### BaseAccordion + BaseCollapse
Accordion: `modelValue` (string | string[]), `multiple` (boolean). Events: `update:modelValue`.
Collapse: `title` (string, required), `disabled` (boolean), `collapseKey` (string). Slots: `default`, `title`.

#### BaseTabs
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Active tab key |
| `items` | `TabItem[]` | **required** | `{ key, label, disabled?, icon? }` |
| `variant` | `"underline" \| "pills"` | `"underline"` | Style |

Events: `update:modelValue`. Slots: `item` (scoped), `tab-{key}` (per-tab content).

#### BaseDivider
Props: `vertical` (boolean), `label` (string), `spacing` (`"sm" \| "md" \| "lg"`). Slots: `default`.

#### BaseList
Props: `divided` (boolean), `variant` (`"default" \| "bordered"`), `hoverable` (boolean). Slots: `default`.

#### BaseBreadcrumbs
Props: `items` (BreadcrumbItem[], required: `{ label, to?, icon? }`), `separator` (string, default: `"/"`).
Slots: `item` (scoped: `{ item, current }`), `separator`.

#### BaseSidebarLayout
Props: `sidebarWidth` (string, default: `"320px"`), `breakpoint` (number, default: `768`), `modelValue` (boolean).
Slots: `default` (main), `sidebar`. Expose: `open()`, `close()`.

### Dropdown (`@psy-bot-dev/dropdown`)

#### BaseDropdown
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"bottom-left" \| "bottom-right" \| "top-left" \| "top-right"` | `"bottom-right"` | Menu position |
| `fixed` | `boolean` | `false` | Fixed positioning |

Slots: `trigger`, `default` (items). Expose: `close()`, `toggle()`, `isOpen`.

#### BaseDropdownItem
Props: `danger` (boolean). Events: `click`. Slots: `default`, `icon`.
