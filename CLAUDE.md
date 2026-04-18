# CLAUDE.md

## What This Project Does
Velvet is a Windows-focused Electron desktop task manager that stores all task data locally and supports categories, reminders, attachments, theming, tray behavior, and a global Quick Add window.  
It also includes packaging scripts to produce a branded NSIS installer (`VelvetSetup-<version>.exe`) and patch Windows executable metadata/icons.

## Tech Stack
- Node.js `20+` (required by project README)
- npm `10+` (required by project README)
- JavaScript (CommonJS modules, no TypeScript)
- Electron `^37.2.0`
- electron-builder `^26.0.12`
- rcedit `^5.0.2`
- HTML + CSS (vanilla, no UI framework)
- NSIS installer target via electron-builder (`oneClick: false`, `x64`)

## Folder Structure
- `.claude/`: local Claude/Codex workspace artifacts (includes worktree snapshots; not app runtime code).
- `.git/`: git metadata.
- `build/`: packaging resources; primarily icons used for app/installer branding.
- `node_modules/`: installed dependencies.
- `scripts/`: build helper scripts.
- `src/`: application source code.
- `src/main/`: Electron main process (`main.js`) and persistence/schema logic (`store.js`).
- `src/preload/`: preload bridge exposing safe IPC API to renderer (`preload.js`).
- `src/renderer/`: renderer UI (`app.js`, `index.html`, `styles.css`, `design-system.css`) and Quick Add window UI (`quick-add.*`).

## Install, Run, Build, Test
- Install:
  - `npm install`
- Run in development:
  - `npm run dev`
- Build unpacked app:
  - `npm run build`
- Build installer:
  - `npm run make-installer`
- Package alias:
  - `npm run package`
- Test:
  - No automated test command is defined in `package.json` (manual verification only).

## Environment Variables
- None required by this codebase.

## Non-Obvious Architectural Decisions
- Local-first persistence is centralized in `src/main/store.js`:
  - state normalization on read/write,
  - atomic writes via `app-state.json.tmp` + rename,
  - corrupt-file fallback with `app-state.json.corrupt-<timestamp>`.
- Legacy migration is built into startup:
  - on first run it attempts to import from older app-data directories (`Velvet Tasks`, `velvet-tasks`, `VelvetTasks`).
- Main/renderer contract is strict IPC:
  - renderer only calls `window.todoAPI` from preload,
  - all mutations are performed in main process handlers (`tasks:*`, `categories:*`, `settings:*`, etc.).
- Quick Add is a dedicated hidden frameless `BrowserWindow`:
  - pre-created at startup,
  - shown by global shortcut,
  - uses parser logic in main process (`parseQuickAddLine`) before task creation.
- Reminder notifications are polling-based:
  - sweep runs every 30s and marks `reminderNotifiedAt` to avoid duplicate notifications.

## Known Issues / Fragile Parts / Workarounds
- No automated tests or linting scripts are configured:
  - workaround: run focused manual checks via `npm run dev` after each change.
- `src/renderer/app.js` is large and monolithic (~3000 lines):
  - fragile for broad refactors; prefer small targeted edits.
- Quick Add parser is heuristic/string-based:
  - category/date/time/priority extraction can produce edge-case misparses on ambiguous text.
- Global shortcut registration can fail due OS/app conflicts:
  - code falls back to default shortcut (`Ctrl+Alt+V`) when possible.
- File attachments store absolute file paths:
  - moving/deleting source files breaks open behavior (`File not found`).
- There is a visible mojibake string in Quick Add (`Parsing task detailsâ€¦` in `src/renderer/quick-add.js`), indicating an encoding artifact.

## Stable Areas (Avoid Changing Unless Necessary)
- IPC channel names and payload shapes between:
  - `src/main/main.js`,
  - `src/preload/preload.js`,
  - `src/renderer/app.js` / `src/renderer/quick-add.js`.
- State schema normalization/default behavior in `src/main/store.js` (tasks/categories/settings/meta).
- Electron security flags for windows:
  - `contextIsolation: true`,
  - `nodeIntegration: false`.
- Packaging identity and installer behavior in `package.json` and `scripts/`:
  - app ID, executable name, NSIS config, icon sync/patch flow.

## Coding Conventions Used
- JavaScript style:
  - 2-space indentation,
  - semicolons,
  - single quotes for strings.
- Naming:
  - `camelCase` for variables/functions,
  - `UPPER_SNAKE_CASE` for constants,
  - descriptive IPC channel names with namespace prefixes (example: `tasks:save`).
- Module style:
  - CommonJS (`require`, `module.exports`) in main/preload/scripts/store.
- Renderer pattern:
  - central `state` object,
  - many pure-ish helper functions plus DOM event binding,
  - IDs and `data-*` attributes are used as stable UI hooks.
- CSS pattern:
  - tokenized design system variables (`--ds-*`) in `design-system.css`,
  - component/layout styling in `styles.css`,
  - responsive breakpoints and data-attribute driven theming.
