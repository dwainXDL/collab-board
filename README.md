# 📋 CollabBoard

A collaborative **Kanban-style task board** built with React. Create tasks, move them between columns, assign members, filter and search tasks, and view detailed task information. (scope for now...)

## 📌 Project Status

**🟢 Session 1 - Frontend Complete**

The frontend is fully functional with mock data and is architected to integrate with the real backend in the next session.

## 🛠️ Tech Stack

* **React 19** + **Vite** - Frontend
* **React Router** - Client-side routing
* **Context + useReducer** - Global state management
* **Mock API** - Promise-based API with artificial delay
* **ESLint + Prettier** - Code quality and formatting

## 🚀 Getting Started

### Prerequisites

* **Node.js 18+**

### Installation

```bash
npm install
```

### ▶ Start the development server

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:5173
```

### 🧰 Other Scripts

```bash
npm run lint                  # Run ESLint
npm run build                 # Create production build
npm run preview               # Preview production build
npx prettier --write <files>  # Format specific files
```

## 📁 Project Structure

```text
src/
├── api/           # Network/API calls - mock for now
├── components/    # eusable UI components
├── pages/         # Route-level components
├── hooks/         # Shared stateful logic
├── context/       # Global task state
├── utils/         # Pure utility functions
└── data/          # Mock data
```

### 🧩 Key Components

* `Board` - Main Kanban board
* `Column` - Individual task column
* `TaskCard` - Task display and actions
* `FilterBar` - Filtering and search controls
* `Button` - Reusable button component

### 📄 Pages

* `BoardPage` - Main board
* `NotFoundPage` - 404 page

### 🗃️ Data

* `mockTasks.js` - Temporary mock database

## 📐 Architecture & Data Flow

CollabBoard follows a simple separation-of-concerns architecture:

```text
                    ┌──────────────────┐
                    │   TasksProvider  │
                    │ Context + Reducer│
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │     useTasks()   │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
        │   Pages   │  │ Components│  │   Hooks   │
        └───────────┘  └───────────┘  └───────────┘
                             │
                       ┌─────▼─────┐
                       │    API    │
                       └─────┬─────┘
                             │
                         Mock Data
```

### 🧠 State Management

`TasksProvider` is the **single source of truth** for tasks.

On mount:

1. Calls `api/getTasks()`
2. Displays the loading state
3. Dispatches a `loaded` action
4. Handles errors and exposes retry functionality
5. Provides task data to the rest of the application

Components access state through `useTasks()` and modify it using actions such as:

* `added`
* `moved`
* `deleted`

### 🔌 API Layer

All network communication is isolated inside `api/`.

Components **never call the API directly**. This keeps the frontend ready to switch from mock data to the real Express REST API in Session 2.

## 🧭 Routing

| Route        | Purpose              |
| ------------ | -------------------- |
| `/`          | Main task board      |
| `/tasks/new` | Create a new task    |
| `/tasks/:id` | View task details    |
| `*`          | 404 / Not Found      |

## ✨ Features - Assignment 1

### 📋 Board

* Three Kanban columns:

  * **To Do**
  * **Doing**
  * **Done**
* Per-column task counts

### ➕ Create Tasks

* Controlled form
* Input validation
* Member assignment
* Task details

### 🔀 Move & Delete

* Move tasks between columns
* Delete tasks
* Confirmation before deletion

### 🔎 Task Details

* Dedicated `/tasks/:id` route
* Full task information
* Graceful not-found state for invalid IDs

### 🎯 Filter & Search

* Filter by **status**
* Filter by **assignee**
* earch by task title
* Filter/search state stored in the URL

### 🖥️ Four UI States

The application handles:

* **Loading**
* **Error** + retry
* **Empty**
* **Success**

## 👥 Team

| Member                            | Contribution                                                  |
| --------------------------------- | ------------------------------------------------------------- |
| **Dwain** *(Project Lead)*        | App skeleton, routing, Context + reducer, PR reviews & merges |
| **Yameesha**                      | Mock data + API module                                        |
| **Heshala**                       | Board + Column layout                                         |
| **Thamindu**                      | TaskCard move/delete, Button component, four UI states        |
| **Ashen**                         | Create-task form + validation                                 |
| **Thiranya**                      | Filter & search + URL state                                   |
| **Remaining Member(s)**           | *To be added*                                                 |

## ⚠️ Known Limitations

* Runs entirely on **in-memory mock data**

  * Changes are lost after refreshing the page
  * Session 2 introduces the real backend
  * Session 3 adds MongoDB + client-side persistence
* No authentication
* No real-time synchronization
* No offline support
* No automated tests yet *(planned for Session 4)*
* Deep-linking directly to `/tasks/:id` may briefly display **"Task not found"** during the initial loading delay because the detail page does not yet account for the initial loading state.

## 🗺️ Development Roadmap

* **Session 1** - React frontend + mock API
* **Session 2** - Express REST API
* **Session 3** - MongoDB + client-side persistence
* **Session 4** - Automated testing
