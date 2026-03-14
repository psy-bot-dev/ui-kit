# Adding component stories (Histoire)

## For AI / automation

When asked to "add stories for the rest of the components" or "create stories for X":

1. **File path rule:** exactly `apps/docs/src/stories/{ComponentName}.story.vue`. Example: `BaseTag.story.vue`, `BaseInput.story.vue`. One file per component, name = component name.

2. **Import rule:** always `import { ComponentName } from "@psy-bot-dev/ui";`. Never import from `@psy-bot-dev/button`, `@psy-bot-dev/forms`, etc. in story files.

3. **Structure:** every story file must contain exactly one `<Story title="ComponentName" group="components">` and one or more `<Variant title="...">` inside it. Copy the template below and replace `ComponentName` / placeholder props.

4. **Components that already have a story (do not duplicate):**
   - BaseSpinner → `BaseSpinner.story.vue`
   - BaseButton → `BaseButton.story.vue`

5. **Components that still need a story (create one file per):**
   - **button:** BaseConfirmButton
   - **dropdown:** BaseDropdown, BaseDropdownItem, BaseSelect
   - **forms:** BaseInput, BaseFormGroup, BaseCheckbox, BaseRadio, BaseTextarea, BaseSwitch, BaseSlider, BaseOtpInput
   - **data-display:** BaseAvatar, BaseBadge, BaseTag, BaseSkeleton, BaseEmptyState
   - **feedback:** BaseAlert, BaseProgress, BaseTooltip, BasePopover, BaseModal
   - **layout:** BaseCard, BaseDivider, BaseTabs, BaseAccordion, BaseCollapse, BaseBreadcrumbs, BaseSidebarLayout, BaseList

6. **How to choose Variants:** open the component's source (e.g. `packages/button/src/BaseConfirmButton.vue`), read its `defineProps` / props. Add one `<Variant>` for "Default", and one Variant per important prop (e.g. "Sizes" if there is a `size` prop with sm/md/lg, "Variants" if there is a `variant` prop). Use the same pattern as BaseButton.story.vue (v-for over prop values).

7. **Copy-paste template:** use the following. Replace `ComponentName` with the real name (e.g. BaseTag), then add or remove Variants and props as needed.

```vue
<script setup lang="ts">
import { ComponentName } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="ComponentName" group="components">
    <Variant title="Default">
      <ComponentName />
    </Variant>
  </Story>
</template>
```

8. **No config changes** when adding a story for an existing component. Do not edit `histoire.config.ts`, `tailwind.config.ts`, or `package.json` unless adding a new package to the monorepo.

---

## Run the docs app

From the repo root:

```bash
pnpm run docs
# or
pnpm storybook
```

> Use `pnpm run docs` (with `run`). Plain `pnpm docs` runs pnpm's built-in command and opens the package page on npm.

The dev server runs at `http://localhost:6006` (or the next free port). Stories are listed under **Components**.

## Where stories live

- **Directory:** `apps/docs/src/stories/`
- **Naming:** one file per component, suffix `.story.vue`  
  Example: `BaseSpinner.story.vue`, `BaseButton.story.vue`
- **Match pattern:** `histoire.config.ts` uses `storyMatch: ["./src/stories/**/*.story.vue"]`, so any new `*.story.vue` in that tree is picked up automatically.

## Create a new story (step-by-step)

### 1. Choose the component

Components are imported from the **meta-package** `@psy-bot-dev/ui`, which re-exports all packages. Do not import from individual packages (e.g. `@psy-bot-dev/button`) in stories.

```ts
// ✅ Correct
import { BaseButton } from "@psy-bot-dev/ui";

// ❌ Do not use in stories
import { BaseButton } from "@psy-bot-dev/button";
```

If the component is not yet exported from `@psy-bot-dev/ui`, add it in `packages/ui/src/index.ts`.

### 2. Story file structure

- **`<Story>`** — one per file. Props: `title` (display name, usually component name), `group="components"`.
- **`<Variant>`** — each variant is a sub-story (e.g. "Default", "Sizes", "States"). Props: `title`.

### 3. Minimal template

```vue
<script setup lang="ts">
import { YourComponent } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="YourComponent" group="components">
    <Variant title="Default">
      <YourComponent />
    </Variant>
  </Story>
</template>
```

### 4. Example: several variants (props)

See `apps/docs/src/stories/BaseButton.story.vue`: it defines arrays of prop values (e.g. `variants`, `sizes`) and uses `v-for` in each Variant to render the component with each value. Copy that pattern for components with `size`, `variant`, `color`, etc.

### 5. Example: accessibility

```vue
<Variant title="With aria-label">
  <BaseSpinner size="md" color="accent" label="Loading data..." />
</Variant>
```

## Checklist for a new story

1. Create `apps/docs/src/stories/ComponentName.story.vue`.
2. Import the component from `@psy-bot-dev/ui` only.
3. Use `<Story title="ComponentName" group="components">` and one or more `<Variant title="...">`.
4. Run `pnpm run docs` and confirm the story appears and renders.

## Styling and Tailwind

- **Tokens:** `src/histoire.setup.ts` imports `@psy-bot-dev/tokens/css/variables.css` and Tailwind. Components using `--theme-*` work as in the app.
- **Tailwind content:** `apps/docs/tailwind.config.ts` already has `../../packages/*/src/**/*.vue`. No change needed when adding a story.
- **Aliases:** `histoire.config.ts` aliases `@psy-bot-dev/*` (except `tokens`) to package sources. No change needed for existing packages.

## Adding a new package to the docs

Only when you add a **new package** under `packages/`:

1. Add the package name to the `psyPackages` array in `apps/docs/histoire.config.ts`.
2. Export the new package from `packages/ui/src/index.ts`.
3. Create story file(s) as above.

## Reference: existing stories

| File | Component | Use as template for |
|------|-----------|---------------------|
| `BaseSpinner.story.vue` | BaseSpinner | Sizes, Colors, aria-label variants |
| `BaseButton.story.vue` | BaseButton | Variants, Sizes, Loading, Disabled, Block |

When in doubt, open `BaseButton.story.vue` and mirror its structure (script with const arrays, template with Story + Variants and v-for).
