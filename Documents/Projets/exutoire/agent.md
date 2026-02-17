# agent.md — Exutoire (PWA Brain Dump)
**Version spec**: 0.1.0-build(GIT_COMMIT_COUNT)  
**License**: Apache-2.0  
**Goal**: Generate production-ready code (lightweight, robust, WCAG 2.1 AA) for a PWA that supports brain dump sessions with fast categorization and exports.

---

## 1) Product intent

Exutoire is a minimalist “brain dump” tool with a strict two-step cognitive pipeline:

- **Phase 1 (Capture)**: dump thoughts *one at a time*, with **no censorship** and **no deletion**.
- **Phase 2 (Categorize)**: quickly classify each thought using four colored emoji buttons; deletion is possible here, but goes to a **trash (corbeille)** via soft-delete.
- **End**: explicit **“Terminer et exporter”**; exports are generated **automatically**, and **manual export** is available at any time.

Exutoire is **not**:
- a task manager
- a journal app
- a productivity dashboard
- an analytics tool

---

## 2) Tech constraints (hard)

### Platform
- **PWA**, offline-first
- **Vanilla JS (ES modules)**, no heavy frameworks
- **IndexedDB** for persistence
- **Service Worker** for offline caching
- No external APIs in MVP

### Accessibility
- Must meet **WCAG 2.1 AA**:
  - Full keyboard navigation
  - Visible focus state (high contrast)
  - Proper labels / accessible names
  - No reliance on color alone (emoji + text labels)
  - Touch targets ≥ 44px
  - Text zoom 200% without layout breakage
  - Reduced motion respect (no decorative animation)

### CSS compactness rule (hard)
- CSS must reuse declarations as much as possible:
  - centralize with CSS variables
  - shared base classes
  - avoid duplicating component styles
  - avoid one-off overrides unless necessary

### Theme
- **Automatic** via `prefers-color-scheme` (no toggle in MVP)

### Versioning (hard)
- Display version in UI footer: `Exutoire v{semver}-build{N}`
- `semver` managed via `npm version` (major/minor/patch)
- `build{N}` derived from git commit count: `git rev-list --count HEAD`

### License
- **Apache 2.0** (`LICENSE` file + `package.json` set to `Apache-2.0`)

---

## 3) UX / Layout

### Global layout (B + C: warm + Bauhaus-structured)
- Clean grid, generous spacing, no shadows
- Slight rounding (max 4px), bold geometric blocks
- Typo: “human” sans (e.g., IBM Plex Sans or Inter)

### Screens
**Option A chosen: two distinct screens**

#### Screen 1 — Phase 1: Capture
Header:
- Left: “Exutoire”
- Right: optional timer display (if enabled)
- Right: **Clôturer** button (moves to Phase 2)

Main:
- Single-line input (thought capture)
- Button “Enregistrer”
- Enter = same as “Enregistrer”
- **Deletion is impossible here**

Behavior:
- Each submit creates an atomic thought record
- Auto-save is intrinsic (since each thought is persisted immediately)
- If app is closed mid-session, it **auto-restores** the active session

#### Screen 2 — Phase 2: Categorize
List of thoughts (scrollable). Each item is exactly:
- **Line 1**: thought text
- **Line 2**: 4 category buttons (color + emoji + label), fast classification

Category buttons (example mapping):
- 🔴 Action concrète
- 🟡 Idée créative
- 🔵 Inquiétude / émotion
- 🟢 Information à garder

Keyboard shortcuts (MVP):
- With a thought focused:
  - `1` = Action
  - `2` = Idée
  - `3` = Inquiétude
  - `4` = Information

Deletion in Phase 2:
- “Supprimer” moves thought to **Corbeille** (soft delete) **with confirmation**

Termination:
- Button **“Terminer et exporter”**
- Export is allowed even if some thoughts are **Non classé**
- After completion, show a **neutral end screen**:
  - “Session terminée”
  - “Exports générés”
  - Button “Nouvelle session”
  - No stats, no analysis

---

## 4) Core domain model

### Session
- Sessions persist locally (not auto-deleted).
- One active session at a time.

**Session fields**
- `id` (UUID)
- `createdAt` (ISO)
- `status`: `"active" | "closed"`
- `timerEnabled` (boolean)
- `timerMinutes` (number | null) — optional

### Thought
Default category is **Non classé**.

**Thought fields**
- `id` (UUID)
- `sessionId` (UUID)
- `content` (string) — stored encrypted (see section 6)
- `createdAt` (ISO)
- `category`: `null | "action" | "idee" | "inquietude" | "information"`
- `categorizedAt`: `ISO | null`
- `deleted`: boolean (default `false`)
- `deletedAt`: `ISO | null`

---

## 5) Persistence & sessions

### IndexedDB
Stores:
- sessions
- thoughts
- crypto key material (see section 6)

### Persistence rules
- On app load:
  - if an **active** session exists, restore it automatically
  - otherwise create a new session (or show “Nouvelle session” if you prefer minimal start)

### History (MVP)
- Provide a simple “Historique” view (read-only):
  - list sessions with date/time + counts
  - open a session to view categorized output (read-only)
- Corbeille visibility can be deferred, but `deleted=true` must be respected in active UI (hidden).

---

## 6) Encryption (Option C)

### Approach
- Use **Web Crypto API** (AES-GCM 256).
- No user password.
- Generate a key on first run; store locally.
- **Key is regenerated only if user clears all local data** (future “reset” action).
- If data exists but key is missing (rare/devtools), show a clear recovery message and offer reset.

### Storage format
Store encrypted payload per thought:
- `ciphertext` (base64)
- `iv` (base64)

---

## 7) Export (hard)

Exports are generated:
- **Automatically** on “Terminer et exporter”
- Also available via a manual “Exporter” action

### 7.1 Markdown export
- **One `.md` file per session**
- Filename: `exutoire-YYYY-MM-DD-HHMM.md` (local timezone)
- Sections in this order:
  1) Actions concrètes
  2) Idées créatives
  3) Inquiétudes / émotions
  4) Informations à garder
  5) Non classé

Format example:

```md
# Exutoire — DD-MM-YYYY

## Actions concrètes
- ...

## Idées créatives
- ...

## Inquiétudes / émotions
- ...

## Informations à garder
- ...

## Non classé
- ...
```

### 7.2 JSON export
- One `.json` file per session
- Filename matches `.md` timestamp
- JSON schema:

```json
{
  "schemaVersion": 1,
  "app": "Exutoire",
  "version": "0.1.0-build12",
  "session": {
    "id": "uuid",
    "createdAt": "ISO",
    "closedAt": "ISO",
    "timerEnabled": false,
    "timerMinutes": null
  },
  "thoughts": [
    {
      "id": "uuid",
      "content": "decrypted plaintext content in export",
      "createdAt": "ISO",
      "category": null,
      "categorizedAt": null,
      "deleted": false,
      "deletedAt": null
    }
  ]
}
```

Notes:
- Exports should contain **plaintext content** (user expects readable exports).
- Deleted thoughts:
  - MVP recommendation: exclude deleted from exports by default.
  - If included later, add `deleted:true`.

---

## 8) Repository structure (chosen: modular light)

```
/index.html
/manifest.webmanifest
/sw.js
/package.json
/LICENSE

/src
  main.js
  version.js

  /core
    state.js
    session.js

  /data
    db.js
    crypto.js
    export-md.js
    export-json.js

  /ui
    layout.js
    phase1.js
    phase2.js
    thought-card.js
    history.js
    end-screen.js

/style
  variables.css
  base.css
  components.css

/assets
  /icons  (PWA icons)
```

---

## 9) UI components requirements

### thought-card
- Renders 2 lines max (text + button row)
- Category buttons:
  - emoji + label text (not color only)
  - `aria-pressed` reflects state
- Focusable container:
  - supports numeric shortcuts 1–4
- Delete action:
  - confirmation modal/dialog
  - moves to corbeille (soft delete)

### dialogs
- Use native `<dialog>` if supported, with fallback, or accessible modal pattern:
  - focus trap
  - Esc closes (optional in MVP; ensure accessible)
  - return focus to trigger on close

### footer
- Shows version string (from `version.js`):
  - `Exutoire vX.Y.Z-buildN`

---

## 10) CSS rules (compact, shared)

- One global spacing scale (8px multiples)
- Use CSS variables for:
  - colors (bg/text + category colors)
  - border radius
  - border width
  - focus outline
- Reuse base classes:
  - `.btn` base
  - `.btn--action/.btn--idea/.btn--inquietude/.btn--info` only set color variables, no repeated layout rules
- Use `prefers-reduced-motion: reduce` to disable transitions
- No decorative animations

---

## 11) Offline & caching

Service Worker MVP:
- Cache shell assets: HTML, CSS, JS, manifest, icons
- Stale-while-revalidate or cache-first strategy for shell
- No runtime caching needed (no network fetches)

---

## 12) Security & privacy

- No network calls in MVP
- No analytics / tracking
- Local encryption as described
- Provide clear “Reset local data” concept (can be V2 UI), which clears:
  - sessions
  - thoughts
  - key material

---

## 13) Non-goals (MVP)

- Calendar/to-do integration (explicitly post-MVP)
- Cloud sync
- AI categorization
- Full text search across history (can be V2)
- Rich text editing
- Multi-user auth

---

## 14) Test plan (MVP)

Minimum automated tests are optional; at least ensure:
- Create session
- Add thought (Enter + button)
- Restore active session after refresh
- Phase switch via Clôturer
- Categorize via buttons + via keys 1–4
- Non classé export behavior
- Soft delete with confirmation
- Export `.md` structure correctness
- Export `.json` schema correctness
- Offline load works
- Keyboard navigation + visible focus passes smoke checks

---

## 15) Delivery checklist

- `LICENSE` Apache-2.0 present
- `package.json` contains `"license": "Apache-2.0"`
- Version injection:
  - `semver` from `package.json`
  - `build` from git commit count at build time
- Footer displays version
- WCAG AA checklist passed (manual audit)

---
