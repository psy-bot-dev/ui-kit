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

## Theming

### Dark mode

```html
<html class="dark">
```

### Color palettes

```html
<html data-palette="coral">
```

Available: `coral`, `blue`, `violet`, `teal`, `pink`, `amber`, `navy`, `sage`, `lavender`, `earth`.

### CSS variables override

```css
:root {
  --theme-accent: #your-color;
  --theme-text: #your-color;
  --theme-bg: #your-color;
  --radius-element: 8px;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

Key variables: `--theme-accent`, `--theme-text`, `--theme-text-secondary`, `--theme-text-muted`, `--theme-bg`, `--theme-card-bg`, `--theme-input-bg`, `--theme-border-rgb`, `--theme-error`, `--radius-card` (16px), `--radius-element` (12px), `--radius-small` (8px).

## Component API

### BaseButton

```vue
<BaseButton variant="primary" size="md" :loading="false" block>Save</BaseButton>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"primary" \| "secondary" \| "danger" \| "ghost" \| "outline"` | `"primary"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` |
| `disabled` | `boolean` | `false` |
| `loading` | `boolean` | `false` |
| `block` | `boolean` | `false` |

Events: `click`. Slots: `default`, `icon`.

### BaseInput

```vue
<BaseInput v-model="email" label="Email" type="email" placeholder="you@example.com" error="Required" />
```

| Prop | Type | Default |
|------|------|---------|
| `modelValue` | `string` | `""` |
| `label` | `string` | `""` |
| `type` | `string` | `"text"` |
| `placeholder` | `string` | `""` |
| `message` | `string` | `""` |
| `error` | `string` | `""` |
| `errorState` | `boolean` | `false` |
| `readonly` | `boolean` | `false` |
| `inputmode` | `string` | -- |
| `autocomplete` | `string` | -- |

### BaseTextarea

```vue
<BaseTextarea v-model="bio" label="Bio" :rows="3" :auto-resize="true" />
```

| Prop | Type | Default |
|------|------|---------|
| `modelValue` | `string` | `""` |
| `label` / `placeholder` / `error` | `string` | `""` |
| `rows` | `number` | `3` |
| `maxRows` | `number` | `8` |
| `autoResize` | `boolean` | `true` |
| `readonly` / `disabled` | `boolean` | `false` |

### BaseCheckbox

```vue
<BaseCheckbox v-model="agreed" label="I agree to terms" :indeterminate="false" />
```

Props: `modelValue` (boolean), `label` (string), `disabled` (boolean), `indeterminate` (boolean).

### BaseRadio

```vue
<BaseRadio v-model="plan" value="free" label="Free" />
<BaseRadio v-model="plan" value="pro" label="Pro" />
```

Props: `modelValue` (string), `value` (string, required), `label` (string), `disabled` (boolean).

### BaseSwitch

```vue
<BaseSwitch v-model="notifications" label="Enable notifications" size="md" />
```

Props: `modelValue` (boolean), `label` (string), `disabled` (boolean), `size` (`"sm" | "md"`), `labelPosition` (`"left" | "right"`).

### BaseSlider

```vue
<BaseSlider v-model="volume" :min="0" :max="100" :step="5" show-value />
```

Props: `modelValue` (number), `min` (number), `max` (number), `step` (number), `disabled` (boolean), `showValue` (boolean), `label` (string). Slot: `value` (scoped: `{ value }`).

### BaseOtpInput

```vue
<BaseOtpInput v-model="code" :length="6" auto-focus @complete="onVerify" />
```

Props: `modelValue` (string), `length` (number, default: 6), `disabled` (boolean), `error` (string), `autoFocus` (boolean). Events: `update:modelValue`, `complete`.

### BaseFormGroup

```vue
<BaseFormGroup label="Email" error="Invalid email" hint="We won't share it" required>
  <BaseInput v-model="email" type="email" />
</BaseFormGroup>
```

Props: `label` (string), `for` (string), `error` (string), `hint` (string), `required` (boolean). Slots: `default`, `label`, `error`.

### BaseSelect

```vue
<BaseSelect v-model="country" :options="countries" label="Country" />
```

See source for full API.

### BaseAlert

```vue
<BaseAlert type="success" title="Saved!" variant="soft" closable>
  Your changes have been saved.
  <template #action><BaseButton size="sm" variant="ghost">Undo</BaseButton></template>
</BaseAlert>
```

| Prop | Type | Default |
|------|------|---------|
| `type` | `"info" \| "success" \| "warning" \| "error"` | `"info"` |
| `variant` | `"filled" \| "outlined" \| "soft"` | `"soft"` |
| `title` | `string` | -- |
| `closable` | `boolean` | `false` |
| `modelValue` | `boolean` | -- |

Events: `close`, `update:modelValue`. Slots: `default`, `icon`, `action`.

### BaseModal

```vue
<BaseModal v-model="isOpen" title="Confirm action">
  <p>Are you sure?</p>
  <template #footer>
    <BaseButton variant="ghost" @click="isOpen = false">Cancel</BaseButton>
    <BaseButton variant="danger" @click="onConfirm">Delete</BaseButton>
  </template>
</BaseModal>
```

Props: `modelValue` (boolean, required), `title` (string), `closable` (boolean, default: true), `closeOnBackdrop` (boolean, default: true). Slots: `default`, `header`, `footer`. Expose: `close()`, `isOpen`.

### BaseProgress

```vue
<BaseProgress :value="75" color="success" show-value />
<BaseProgress />  <!-- indeterminate -->
```

Props: `value` (number 0-100 or undefined), `size` (`"sm" | "md"`), `color` (`"accent" | "success" | "warning" | "error"`), `showValue` (boolean).

### BaseTooltip

```vue
<BaseTooltip content="More info" position="top">
  <BaseButton variant="ghost">Hover me</BaseButton>
</BaseTooltip>
```

Props: `content` (string, required), `position` (`"top" | "bottom" | "left" | "right"`), `delay` (number, default: 200), `disabled` (boolean).

### BasePopover

```vue
<BasePopover position="bottom" trigger="click">
  <template #trigger><BaseButton>Open</BaseButton></template>
  <p>Popover content</p>
</BasePopover>
```

Props: `position` (`"top" | "bottom" | "left" | "right"`), `trigger` (`"click" | "hover"`), `closeOnClickOutside` (boolean). Expose: `open()`, `close()`.

### BaseAvatar

```vue
<BaseAvatar src="/photo.jpg" name="John Doe" size="lg" status="online" />
```

Props: `src` (string | null), `name` (string), `size` (`"xs" | "sm" | "md" | "lg" | "xl"`), `rounded` (`"full" | "lg"`), `status` (`"online" | "offline" | "away" | null`).

### BaseBadge

```vue
<BaseBadge variant="error" :count="5" :max="99" />
<BaseBadge variant="success" dot />
```

Props: `variant` (`"primary" | "secondary" | "success" | "warning" | "error" | "neutral"`), `size` (`"sm" | "md"`), `dot` (boolean), `count` (number), `max` (number, default: 99).

### BaseTag

```vue
<BaseTag variant="primary" closable @close="onRemove">Vue 3</BaseTag>
```

Props: `variant` (`"primary" | "secondary" | "success" | "warning" | "error" | "neutral"`), `size` (`"sm" | "md"`), `closable` (boolean). Events: `close`. Slots: `default`, `icon`.

### BaseSkeleton

```vue
<BaseSkeleton variant="circle" width="48px" height="48px" />
<BaseSkeleton variant="text" width="200px" />
<BaseSkeleton variant="rect" height="120px" />
```

Props: `variant` (`"text" | "circle" | "rect"`), `width` (string), `height` (string).

### BaseEmptyState

```vue
<BaseEmptyState title="No results" description="Try a different query">
  <template #action><BaseButton>Reset</BaseButton></template>
</BaseEmptyState>
```

Props: `title` (string), `description` (string). Slots: `default`, `icon`, `action`.

### BaseCard

```vue
<BaseCard variant="elevated" padding="lg" clickable @click="goTo">
  <template #header>Title</template>
  Content
  <template #footer>Footer</template>
</BaseCard>
```

Props: `variant` (`"default" | "outlined" | "elevated"`), `padding` (`"none" | "sm" | "md" | "lg"`), `clickable` (boolean). Events: `click`. Slots: `default`, `header`, `footer`.

### BaseAccordion + BaseCollapse

```vue
<BaseAccordion v-model="active" multiple>
  <BaseCollapse title="Section 1" collapse-key="s1">Content 1</BaseCollapse>
  <BaseCollapse title="Section 2" collapse-key="s2">Content 2</BaseCollapse>
</BaseAccordion>
```

Accordion: `modelValue` (string | string[]), `multiple` (boolean).
Collapse: `title` (string, required), `collapseKey` (string), `disabled` (boolean). Slots: `default`, `title`.

**Active state styling:** Override CSS variables to highlight the open item:

```css
.base-collapse {
  --collapse-active-text: var(--theme-accent);
  --collapse-active-chevron: var(--theme-accent);
}
```

### BaseTabs

```vue
<BaseTabs v-model="tab" :items="[{ key: 'a', label: 'Tab A' }, { key: 'b', label: 'Tab B' }]" variant="underline">
  <template #tab-a>Content A</template>
  <template #tab-b>Content B</template>
</BaseTabs>
```

Props: `modelValue` (string), `items` (`{ key, label, disabled?, icon? }[]`, required), `variant` (`"underline" | "pills"`). Slots: `tab-{key}`, `item` (scoped).

### BaseDivider

```vue
<BaseDivider label="OR" spacing="md" />
<BaseDivider vertical />
```

Props: `vertical` (boolean), `label` (string), `spacing` (`"sm" | "md" | "lg"`).

### BaseList

```vue
<BaseList divided hoverable variant="bordered">
  <li>Item 1</li>
  <li>Item 2</li>
</BaseList>
```

Props: `divided` (boolean), `variant` (`"default" | "bordered"`), `hoverable` (boolean).

### BaseBreadcrumbs

```vue
<BaseBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Products' }]" separator="/" />
```

Props: `items` (`{ label, to?, icon? }[]`, required), `separator` (string). Slots: `item` (scoped: `{ item, current }`), `separator`.

### BaseSidebarLayout

```vue
<BaseSidebarLayout v-model="open" sidebar-width="280px" :breakpoint="768">
  <template #sidebar>Nav</template>
  Main content
</BaseSidebarLayout>
```

Props: `sidebarWidth` (string, default: "320px"), `breakpoint` (number, default: 768), `modelValue` (boolean). Expose: `open()`, `close()`.

### BaseDropdown + BaseDropdownItem

```vue
<BaseDropdown position="bottom-right">
  <template #trigger><BaseButton variant="ghost">Menu</BaseButton></template>
  <BaseDropdownItem @click="edit">Edit</BaseDropdownItem>
  <BaseDropdownItem danger @click="remove">Delete</BaseDropdownItem>
</BaseDropdown>
```

Dropdown: `position` (`"bottom-left" | "bottom-right" | "top-left" | "top-right"`), `fixed` (boolean). Expose: `close()`, `toggle()`, `isOpen`.
DropdownItem: `danger` (boolean). Events: `click`. Slots: `default`, `icon`.

### BaseSpinner

```vue
<BaseSpinner size="lg" color="accent" label="Loading..." />
```

Props: `size` (`"sm" | "md" | "lg"`), `color` (`"current" | "white" | "accent"`), `label` (string).

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
| `pnpm run docs` | Start Histoire dev server (component stories) |
| `pnpm build` | Build every package |
| `pnpm typecheck` | Run `vue-tsc --noEmit` in each package |
| `pnpm lint` | ESLint for the repo |
| `pnpm --filter @psy-bot-dev/button build` | Build a single package |

### Adding component stories

Stories live in `apps/docs/src/stories/*.story.vue`. To add a story for a component:

1. Create a new file, e.g. `ComponentName.story.vue`.
2. Import from `@psy-bot-dev/ui`, use `<Story>` and `<Variant>` (see existing BaseSpinner / BaseButton stories).
3. Run `pnpm run docs` to verify.

Full guide: [docs/adding-stories.md](docs/adding-stories.md).

### Versioning and release

Versions and changelogs are managed with [Changesets](https://github.com/changesets/changesets). To cut a release:

```bash
pnpm changeset          # add a changeset
pnpm version-packages  # bump versions from changesets
pnpm release           # build and publish (CI or manual)
```

Packages are published to **GitHub Packages** as private under the `@psy-bot-dev` scope. CI uses `GITHUB_TOKEN`; consumers need a PAT with `read:packages` and `.npmrc` with `@psy-bot-dev:registry=https://npm.pkg.github.com` and auth token.

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
