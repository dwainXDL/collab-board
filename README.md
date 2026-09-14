# 📋 CollabBoard

A collaborative **Kanban-style task board**, built progressively across a 5-session full-stack workshop - from a static React UI to a deployed, real-time, tested application.

## 📌 Project Status

* ✅ **M1 - Frontend** (React + mock data) - complete
* ✅ **M2 - REST API + Auth** (Express + JWT) - complete & integrated with the frontend
* ✅ **M3 - Database & Persistence** (MongoDB/Mongoose, optimistic concurrency, PouchDB local cache) - complete

## 🗂️ Repository Structure

This is a **monorepo** containing the frontend and backend.

```text
CollabBoard/
├── client/          # React (Vite) frontend  → see client/README.md
├── server/          # Express REST API       → see server/README.md (M2)
└── docker-compose.yml   # Multi-service orchestration (M5)
```

📄 See [`docs/data-model.md`](docs/data-model.md) for the full data model, embed-vs-reference justification, indexes, and ERD.


## 🛠️ Tech Stack

| Layer          | Technology                                                    |
| -------------- | ------------------------------------------------------------- |
| **Frontend**   | React 19 + Vite, React Router, Context + useReducer, Tailwind |
| **Backend**    | Node.js + Express (REST API) ✅                                |
| **Auth**       | JWT ✅                                                         |
| **Database**   | MongoDB + Mongoose ✅                                          |
| **Real-time**  | Socket.io *(M5)*                                              |
| **Testing/CI** | Jest + RTL / Supertest, GitHub Actions *(M4)*                 |
| **DevOps**     | Docker + docker-compose *(M5)*                                |

## 🚀 Getting Started

Run the **backend** and **frontend** in two terminals. Start the backend first - the Vite dev server proxies `/api` requests to it.

### 1. Backend (Express API — port 4000)

```bash
cd server
npm install
cp .env.example .env        # then set JWT_SECRET and MONGODB_URI (see server/README.md)
npm run dev                 # http://localhost:4000
```

🐳 Needs a MongoDB instance — local Docker (`docker run -d --name collabboard-mongo -p 27017:27017 -v collabboarddata:/data/db mongo:8`) or a MongoDB Atlas free-tier cluster both work; just point `MONGODB_URI` at it.

### 2. Frontend (React + Vite - port 5173)

```bash
cd client
npm install
npm run dev                 # http://localhost:5173
```

Open **http://localhost:5173**, register an account, and you're in. The frontend proxies `/api`
→ `http://localhost:4000`, so no CORS setup is needed in development.

> Details: [`server/README.md`](server/README.md) · [`client/README.md`](client/README.md)

## 🗺️ Milestones

| #  | Milestone                                   | Status |
| -- | ------------------------------------------- | ------ |
| M1 | React client on mock data                   | ✅      |
| M2 | Express REST API + JWT auth                 | ✅      |
| M3 | MongoDB + client-side persistence           | ✅      |
| M4 | Tests (both tiers) + CI                     | ⬜      |
| M5 | Real-time, offline sync, Docker, deployment | ⬜      |

## 👥 Team

| Member                     | Contribution                                               |
| -------------------------- | ---------------------------------------------------------- |
| **Dwain** *(Project Lead)* | App skeleton, routing, Context + reducer, reviews & merges; M3: Mongo connection + health endpoint |
| **Yameesha**               | Mock data + API module; M3: overdue-by-assignee stats aggregation endpoint |
| **Heshala**                | Board + Column layout; M3: DB indexes + unique-email constraint (409 handling) |
| **Thamindu**               | TaskCard move/delete, Button, four UI states; M3: repository migration to async Mongoose, offline reconcile + PWA shell, conflict-detection/resolution UI |
| **Ashen**                  | Create-task form + validation; M3: Mongoose models + shared enums, default-board seeding on register |
| **Thiranya**               | Filter & search + URL state; M3: data model documentation + ERD |
| **Sewwandi**               | UI polish (Tailwind), design docs                          |
| **Nisith**                 | UI polish (pages & states); M3: malformed-ObjectId guard (CastError → 404) |
| **Isira**                  | Error-state demo; M3: PouchDB local-first store integration |
| **Dineth**                 | M3: server-side optimistic concurrency control (version/baseVersion + 409 conflicts) |

## ⚠️ Known Limitations

* Offline **write queue/replay** (edits made while offline are applied locally but not yet queued for replay when the connection returns) is a deferred follow-up beyond core M3
* The overdue-stats aggregation endpoint (`GET /api/boards/:id/stats`) has no UI panel consuming it yet
* No real-time sync, automated tests, or deployment yet *(M4–M5)*
