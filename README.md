# Velvet

Velvet is a production-ready Electron desktop task manager for Windows with local persistence, smart task views, categories, reminders, attachments, advanced theming, and a wizard-style NSIS installer.

## Project Tree

```text
.
|-- build
|   `-- icons
|       |-- icon.ico
|       |-- icon.png
|       |-- velvet_tasks_icon.ico
|       `-- README.md
|-- scripts
|   |-- patch-win-exe.js
|   `-- sync-icon.js
|-- src
|   |-- main
|   |   |-- main.js
|   |   `-- store.js
|   |-- preload
|   |   `-- preload.js
|   `-- renderer
|       |-- app.js
|       |-- index.html
|       `-- styles.css
|-- package.json
|-- package-lock.json
|-- velvet_tasks_icon.ico
`-- README.md
```

## Requirements

- Node.js 20+
- npm 10+
- Windows 10/11 (for installer creation and install validation)

## Install

```bash
npm install
```

## Scripts

- Development:

```bash
npm run dev
```

- Build unpacked app:

```bash
npm run build
```

- Alias for unpacked build:

```bash
npm run package
```

- Build wizard-style installer (.exe):

```bash
npm run make-installer
```

## Packaging Notes

- Installer target: NSIS wizard (`oneClick: false`)
- `asar` enabled
- `compression: maximum`
- Locales trimmed to `en-US` for smaller output
- `devDependencies` are not packaged into production output
- `scripts/patch-win-exe.js` applies EXE metadata/icon (`Velvet`, version, filename) after unpacked build

## Data Storage

Velvet stores data in Electron user data:

```text
%APPDATA%\Velvet\app-state.json
```

Stored data includes:

- tasks
- categories
- settings/theme preferences

Malformed state is handled safely:

- app falls back to defaults
- corrupt source is copied to `app-state.json.corrupt-<timestamp>`

Legacy data migration:

- on first launch with the new Velvet identity, data is imported automatically from older folders (`Velvet Tasks`, `velvet-tasks`, `VelvetTasks`) when present.

## Branding, Name, Icon, Version

### App name and identity

Update in `package.json`:

- `name`
- `productName`
- `build.appId`
- `build.win.executableName`
- `build.nsis.shortcutName`
- `build.nsis.uninstallDisplayName`

### Version

Update `version` in `package.json`.

### Icon

1. Replace root icon file:
   - `velvet_tasks_icon.ico`
2. Run any script (`dev`, `build`, `package`, `make-installer`):
   - `scripts/sync-icon.js` copies it automatically to packaging paths.

Windows icon targets covered:

- app executable
- installer/uninstaller
- desktop/start menu shortcut
- BrowserWindow icon
- tray icon (when tray mode is enabled)

## Old Installed Build

If you installed an older app identity (for example `Velvet Tasks` with previous app ID), uninstall it first, then install the new Velvet build to avoid duplicate entries and stale icon cache.
