# Contributing to nearby-ui

Монорепозиторий UI-кита для экосистемы psy-bot-dev. Пакеты публикуются в GitHub Packages под скоупом `@psy-bot-dev/*`.

## Структура репозитория

```
nearby-ui/
├── packages/
│   ├── tokens/        # CSS-переменные, Tailwind preset, типы токенов
│   ├── spinner/       # BaseSpinner
│   ├── data-display/  # BaseAvatar, BaseBadge, BaseTag, BaseSkeleton, BaseEmptyState
│   ├── feedback/      # BaseAlert, BaseProgress, BaseTooltip, BasePopover, BaseModal
│   ├── layout/        # BaseCard, BaseDivider, BaseTabs, BaseAccordion, BaseCollapse,
│   │                  # BaseBreadcrumbs, BaseSidebarLayout, BaseList
│   ├── forms/         # BaseInput, BaseFormGroup, BaseCheckbox, BaseRadio,
│   │                  # BaseTextarea, BaseSwitch, BaseSlider, BaseOtpInput
│   ├── dropdown/      # BaseDropdown, BaseDropdownItem, BaseSelect
│   ├── button/        # BaseButton, BaseConfirmButton
│   └── ui/            # мета-пакет: реэкспортирует всё из пакетов выше
├── apps/
│   └── docs/          # Histoire storybook — визуальная документация компонентов
├── tooling/
│   ├── vite-plugin-inject-css.mjs  # внедряет стили компонента в JS бандл
│   └── postcss.config.*            # общий PostCSS конфиг (Tailwind + Autoprefixer)
├── .changeset/        # pending changesets (создаются через pnpm changeset)
└── pnpm-workspace.yaml
```

**Порядок зависимостей** (leaf → root): `tokens` → `spinner` → `data-display` → `feedback` → `layout` → `forms` → `dropdown` → `button` → `ui`. Каждый пакет зависит только от пакетов левее себя.

## Первоначальная настройка

```bash
# Клонировать репозиторий
git clone https://github.com/psy-bot-dev/nearby-ui.git
cd nearby-ui

# Установить зависимости (Node >= 22, pnpm >= 10)
pnpm install

# Собрать все пакеты (необходимо перед запуском storybook и тестов)
pnpm build

# Запустить storybook
pnpm storybook        # → http://localhost:6006

# Запустить тесты
pnpm test

# Typecheck всех пакетов
pnpm typecheck

# Lint
pnpm lint
pnpm lint:fix
```

## Локальная разработка

При разработке компонентов достаточно собирать только изменённый пакет:

```bash
# Собрать конкретный пакет и следить за изменениями
pnpm --filter @psy-bot-dev/button build --watch

# Или запустить storybook — он подхватывает изменения через исходники
pnpm storybook
```

## Как добавить новый компонент

### 1. Определить пакет

Выбери подходящий пакет исходя из назначения компонента. Если ни один не подходит — создай новый (смотри раздел «Создание нового пакета»).

### 2. Создать компонент

```bash
# Пример: добавляем BaseTimeline в @psy-bot-dev/data-display
touch packages/data-display/src/BaseTimeline.vue
```

Требования к компоненту:
- `<script setup lang="ts">` — Composition API, строгая типизация
- `<style scoped lang="scss">` — только BEM-классы + CSS-переменные из `@psy-bot-dev/tokens`
- **Никаких Nuxt-зависимостей** (`useNuxtApp`, `navigateTo`, `useRuntimeConfig` и т.д.)
- **Никаких прямых импортов** из других пакетов кроме `@psy-bot-dev/tokens`

### 3. Экспортировать

```ts
// packages/data-display/src/index.ts
export { default as BaseTimeline } from "./BaseTimeline.vue";
```

### 4. Добавить в мета-пакет

Мета-пакет `@psy-bot-dev/ui` реэкспортирует всё автоматически — ничего менять не нужно, если компонент уже экспортирован из своего пакета.

### 5. Написать story

```bash
# apps/docs/src/stories/BaseTimeline.story.vue
```

### 6. Написать changeset

```bash
pnpm changeset
# → выбрать @psy-bot-dev/data-display
# → выбрать тип: patch / minor / major
# → описать изменение (одна строка)
```

## Как создать новый пакет

```bash
mkdir packages/my-package
cd packages/my-package

# Создать package.json по образцу соседнего пакета
# Обязательные поля:
# - "name": "@psy-bot-dev/my-package"
# - "type": "module"
# - "exports": { ".": { "types": ..., "import": ..., "require": ... } }
# - "sideEffects": ["*.css"]
# - "publishConfig": { "registry": "https://npm.pkg.github.com", "access": "restricted" }
# - "peerDependencies": { "vue": ">=3.5.0" }

# Добавить в packages/ui/src/index.ts:
echo 'export * from "@psy-bot-dev/my-package";' >> ../ui/src/index.ts
```

Скопируй `vite.config.ts` из соседнего пакета — все пакеты используют одинаковый конфиг сборки.

## Versioning и Changelog

Проект использует [Changesets](https://github.com/changesets/changesets) для семантического версионирования.

### Процесс

```
1. Разработчик вносит изменения
2. pnpm changeset          ← описать изменение + выбрать affected packages + bump type
3. git commit + git push
4. Открыть PR в main
5. CI проверяет build + typecheck + lint
6. После merge в main — release.yml автоматически публикует пакеты
```

### Типы bump

| Тип | Когда использовать |
|-----|--------------------|
| `patch` | Bugfix, не меняющий API |
| `minor` | Новый компонент или новый prop с дефолтным значением |
| `major` | Breaking change: удаление prop, переименование, изменение slot API |

### Просмотр CHANGELOG

Каждый пакет имеет собственный `CHANGELOG.md`, который автоматически обновляется при релизе. Смотри, например, `packages/button/CHANGELOG.md`.

## Snapshot-версии для тестирования в PR

Если нужно протестировать изменения в downstream проекте до merge, напиши в PR-комментарий:

```
/snapshot
```

Workflow автоматически опубликует версии вида `0.2.0-alpha.abc1234` и добавит комментарий с именами пакетов. В downstream проекте:

```bash
pnpm add @psy-bot-dev/ui@alpha
```

## CI Workflows

| Workflow | Файл | Триггер | Что делает |
|----------|------|---------|------------|
| CI | `ci.yml` | PR в `main` | `pnpm -r build` + `pnpm -r typecheck` + `pnpm lint` |
| Release | `release.yml` | push в `main` | `pnpm release` → публикация изменённых пакетов в GitHub Packages |
| Snapshot | `snapshot.yml` | комментарий `/snapshot` в PR | публикует alpha-версии для тестирования |

## Аутентификация в GitHub Packages

Пакеты приватные (`"access": "restricted"`). Для установки нужен токен с правом `read:packages`.

### Локально

```bash
# 1. Создать Personal Access Token (PAT) на github.com:
#    Settings → Developer settings → Personal access tokens → Fine-grained
#    Права: read:packages (для организации psy-bot-dev)

# 2. Добавить в окружение
export GITHUB_TOKEN=ghp_ваш_токен

# или прописать в ~/.npmrc (не коммитить!)
# //npm.pkg.github.com/:_authToken=ghp_ваш_токен
```

### В downstream CI

Добавить `GITHUB_TOKEN` (или отдельный PAT) в секреты репозитория. Пример для GitHub Actions:

```yaml
- name: Install dependencies
  run: pnpm install --frozen-lockfile
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

`.npmrc` в downstream репозитории должен содержать:

```
@psy-bot-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```
