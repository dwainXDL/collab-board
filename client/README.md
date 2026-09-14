# 📋 CollabBoard - Client

The **React (Vite) frontend** for CollabBoard. For the project overview, full tech stack, team, and milestones, see the [root README](../README.md).

## 🚀 Getting Started

### Prerequisites

* **Node.js 18+**

### Installation & Dev Server

```bash
npm install
npm run dev        # http://localhost:5173
```

### 🧰 Other Scripts

```bash
npm run lint                  # Run ESLint
npm run build                 # Production build
npm run preview               # Preview the production build
npx prettier --write <files>  # Format specific files (not the whole repo)
```

## 📁 Project Structure

```text
src/
├── api/          # All network/API calls (real fetch, via api/client.js) - nothing else calls fetch
├── components/   # Reusable UI (Board, Column, TaskCard, FilterBar, Button, Spinner, ConflictDialog)
├── pages/        # Route-level components (BoardPage, NewTaskPage, TaskDetailPage, LoginPage, RegisterPage, NotFoundPage)
├── hooks/        # Shared stateful logic (useTasks, useAuth, useBoard)
├── context/      # Global state (TasksProvider, AuthProvider, BoardProvider - each Context + useReducer/useState)
├── db/           # localDB.js - PouchDB local-first cache (boards/tasks), reconciled against the server
└── utils/        # Pure utility functions (filterTasks)
```

## 📐 Architecture & Data Flow

`TasksProvider` (Context + `useReducer`) is the **single source of truth** for tasks.

On mount it:

1. Renders instantly from the local PouchDB cache (`getLocalTasks`), if any
2. Fetches from the real API (`api/getTasks()`) and reconciles the cache against the response - the server always wins
3. If the server is unreachable but a local cache exists, shows a non-blocking **offline banner** instead of an error
4. Exposes `loading`, `error`, `retry`, and `offline` so `BoardPage` can render all four UI states

Components read state through `useTasks()` and modify it with actions: `added`, `moved`, `deleted` - each mutation also writes through to the local cache (`putTask`/`removeTask`) at the
call site, keeping the reducer itself pure.

### 🔌 API Layer

All network communication is isolated inside `api/`. Components **never call `fetch` directly** - `api/client.js` provides a shared `request()` helper that attaches the JWT (`localStorage`) and
handles `401`s centrally. `api/tasks.js` and `api/boards.js` are real HTTP calls to the Express + MongoDB backend (M2/M3) - there is no more mock data (`mockTasks.js` was removed once the real API
was live).

### 🔀 Optimistic Concurrency & Conflicts (M3)

Task updates send the task's current `version` as `baseVersion`. If the server rejects the update with `409 VERSION_CONFLICT` (someone else changed the task first), `Board.jsx` shows a
`ConflictDialog` with the server's current state versus the attempted change, letting the user choose **Keep server** or **Force mine** - edits are never silently overwritten.

### 💾 Client-Side Persistence (M3)

`src/db/localDB.js` keeps a local PouchDB database (`collabboard`) so boards/tasks survive a refresh or a lost connection. `vite-plugin-pwa` caches the app shell so the production build can
reload while offline.

## 🧭 Routing

| Route        | Purpose                                          |
| ------------ | ------------------------------------------------- |
| `/`          | Main task board (protected)                      |
| `/tasks/new` | Create a new task (protected)                    |
| `/tasks/:id` | View task details (protected, not-found handled) |
| `/login`     | Log in                                           |
| `/register`  | Create an account                                |
| `*`          | 404 / Not Found                                  |

## ✨ Features

**Assignment 1 (M1)**
* **Board** - To Do / Doing / Done columns with per-column counts
* **Create Tasks** - controlled form with validation
* **Move & Delete** - move between columns; delete asks for confirmation
* **Task Details** - dedicated `/tasks/:id` route with graceful not-found state
* **Filter & Search** - by status/assignee + title search, reflected in the URL
* **Four UI States** - loading / error(+retry) / empty / success

**Assignment 2 (M2)**
* **Auth** - register/login against the real API, JWT stored in `localStorage`; protected routes redirect to `/login` when logged out
* Board/task mutations flow through the real Express + MongoDB backend, not mock data

**Assignment 3 (M3)**
* **Local-first persistence** - PouchDB cache renders the board instantly and survives a refresh or lost connection; an offline banner replaces a hard error when the server is unreachable
* **Conflict resolution** - concurrent edits to the same task surface a `ConflictDialog` (Keep server / Force mine) instead of silently overwriting one user's change

## 📎 Design Documents

### Component Tree

* [draw.io file](./docs/component-tree.drawio)

![Component Tree](./docs/component-tree.png)

### Wireframe

* [draw.io file](./docs/wireframe.drawio)

![Board Wireframe](./docs/wireframe.png)
