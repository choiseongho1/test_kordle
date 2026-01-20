# AGENTS.md

This repository is a small, static web app (HTML/CSS/Vanilla JS) plus a few Node.js utility scripts.
There is no formal lint/test framework wired up (no ESLint/Prettier/Jest/Vitest configs found).

## Quick Start (Local)

### Prereqs
- Node.js: required for the helper scripts (and for `npx vite` if you want a dev server)
- A modern browser: the app itself is served as static files

### Run the app
- Open `index.html` directly in a browser for the simplest flow.
- Optional dev server (recommended when editing):
  - `npx vite`
  - Then open the printed local URL.

Notes:
- A `package-lock.json` exists and references `vite`, but `package.json` is not present in this repo.
  Use `npx vite` instead of `npm run dev` unless a `package.json` is added.

## Build / Lint / Test Commands

### Build
There is no bundling step required for the shipped app.
Treat “build” as one of:
- Static run: open `index.html`.
- Dev server: `npx vite`.

### Data / Wordlist update (scripted)
This project has a “data build” step to regenerate the in-game word list:
- Update the list in `update_words.js` (source list is `WORDS_SOURCE`).
- Run:
  - `node update_words.js`
- Effect:
  - The script rewrites the `const WORDS = [...]` block inside `script.js`.

### Tests
No test runner is configured. Tests are implemented as Node scripts.

Run all tests:
- `node test_words.js`

Run a single test:
- The only test file is `test_words.js`, so “single test” is:
  - `node test_words.js`
- There is no built-in per-case selection/flag support.

### Lint / Format
No lint/format tooling is configured in this repository.
If you introduce tooling, also add a `package.json` and document the scripts here.

## Repo-Specific Rules (Cursor/Copilot)

No Cursor rules found:
- `.cursorrules` not present
- `.cursor/rules/` not present

No Copilot instruction file found:
- `.github/copilot-instructions.md` not present

If these files are added later, mirror their guidance here and prefer the stricter rule.

## Code Style Guidelines

This codebase is intentionally simple (no modules). Preserve the current style and avoid unnecessary refactors.

### Language / Runtime Model
- Browser runtime code is plain ES6+ in `script.js` (no `import`/`export`).
- Node scripts use CommonJS (`require('fs')`) and are run via `node`.

### Formatting
- Indentation: 4 spaces (matches existing JS/CSS files).
- Quotes: single quotes for JS strings; double quotes are used in the word arrays (keep consistent within a list).
- Prefer template literals for interpolation (already used for IDs and messages).
- Keep functions/methods short and cohesive; avoid clever one-liners.

### Imports / Dependencies
- Main app has no imports; do not convert it to ESM unless you also introduce a build step.
- Node scripts may `require(...)` built-in modules (e.g., `fs`).
- Avoid adding dependencies unless absolutely necessary; this repo currently has effectively zero runtime deps.

### Naming
- Classes: PascalCase (e.g., `MedicalKordle`).
- Methods/locals: camelCase (e.g., `createGrid`, `currentTile`).
- Constants: SCREAMING_SNAKE_CASE (e.g., `WORDS`, `KEYBOARD_LAYOUT`).
- DOM IDs/classes: kebab-case (e.g., `grid-container`, `help-btn`).

### State & Side Effects
- Game state lives on the `MedicalKordle` instance:
  - `targetWord`, `targetJaso`, `currentRow`, `currentTile`, `gameOver`
- UI is mutated via direct DOM operations (`document.getElementById`, `classList`, `textContent`).
- Prefer `textContent` over `innerHTML` unless you intentionally render HTML (e.g., help modal).

### Error Handling
- Browser code: fail safely on missing elements.
  - Pattern: `const el = document.getElementById('...'); if (!el) return;`
- Node scripts: fail loud.
  - Let the process throw on IO errors unless you have a clear recovery story.
- Never swallow errors with empty `catch` blocks.

### Types
- No TypeScript in this repo.
- When adding new structures, use simple, explicit shapes (objects/arrays) and document expectations via naming.

### DOM/Event Conventions
- Prefer `addEventListener` when wiring events.
- Ensure event handlers are not registered multiple times; this repo uses an instance guard (`this._keydownHandler`).
- Keep key strings stable (`ENTER`, `BACK`) since they are used as IDs (`key-${key}`).

### Hangul / Word Rules (Core Logic)
- Words are Korean medical terms stored in `const WORDS = [...]` inside `script.js`.
- The game operates on “jaso units” (Hangul decomposition).
- Valid target words are constrained to exactly 6 jaso units and to the allowed keyboard keys.
  - `test_words.js` validates these constraints.
  - `update_words.js` regenerates `WORDS` by filtering `WORDS_SOURCE`.
- If you change decomposition rules or allowed keys, update BOTH:
  - The runtime logic in `script.js`
  - The validation logic in `test_words.js` and the generator in `update_words.js`

### CSS
- CSS uses `:root` variables for theme and repeated colors.
- Keep new colors/sizes as variables when they are reused.
- Prefer existing patterns (flex/grid, `aspect-ratio`, simple key/tile state classes).

## Common Agent Tasks

### Add a new medical term
1. Add it to `WORDS_SOURCE` in `update_words.js`.
2. Run `node update_words.js`.
3. Run `node test_words.js`.

### Debug “word invalid” issues
- Run `node test_words.js` and inspect the printed failures.
- Common causes:
  - Not exactly 6 jaso units after decomposition
  - Contains complex vowels/consonants not present in the on-screen keyboard
