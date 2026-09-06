# 📋 CollabBoard

A collaborative **Kanban-style task board**, built progressively across a 5-session full-stack workshop - from a static React UI to a deployed, real-time, tested application.

## 📌 Project Status

* ✅ **M1 - Frontend** (React + mock data) - complete
* ✅ **M2 - REST API + Auth** (Express + JWT) - complete & integrated with the frontend

## 🗂️ Repository Structure

This is a **monorepo** containing the frontend and backend.

```text
CollabBoard/
├── client/          # React (Vite) frontend  → see client/README.md
├── server/          # Express REST API       → see server/README.md (M2)
└── docker-compose.yml   # Multi-service orchestration (M5)
```

## 🛠️ Tech Stack

| Layer          | Technology                                                    |
| -------------- | ------------------------------------------------------------- |
| **Frontend**   | React 19 + Vite, React Router, Context + useReducer, Tailwind |
| **Backend**    | Node.js + Express (REST API)                                  |
| **Auth**       | JWT                                                           |
| **Database**   | MongoDB + Mongoose *(M3)*                                     |
| **Real-time**  | Socket.io *(M5)*                                              |
| **Testing/CI** | Jest + RTL / Supertest, GitHub Actions *(M4)*                 |
| **DevOps**     | Docker + docker-compose *(M5)*                                |

## 🚀 Getting Started

Run the **backend** and **frontend** in two terminals. Start the backend first - the Vite dev server proxies `/api` requests to it.

### 1. Backend (Express API — port 4000)

```bash
cd server
npm install
cp .env.example .env        # then set JWT_SECRET (see server/README.md)
npm run dev                 # http://localhost:4000
```

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
| M2 | Express REST API + JWT auth                 | 🔜     |
| M3 | MongoDB + client-side persistence           | ⬜      |
| M4 | Tests (both tiers) + CI                     | ⬜      |
| M5 | Real-time, offline sync, Docker, deployment | ⬜      |

## 👥 Team

| Member                     | Contribution                                               |
| -------------------------- | ---------------------------------------------------------- |
| **Dwain** *(Project Lead)* | App skeleton, routing, Context + reducer, reviews & merges |
| **Yameesha**               | Mock data + API module                                     |
| **Heshala**                | Board + Column layout                                      |
| **Thamindu**               | TaskCard move/delete, Button, four UI states               |
| **Ashen**                  | Create-task form + validation                              |
| **Thiranya**               | Filter & search + URL state                                |
| **Sewwandi**               | UI polish (Tailwind), design docs                          |
| **Nisith**                 | UI polish (pages & states)                                 |
| **Isira**                  | Error-state demo                                           |

## ⚠️ Known Limitations

* Backend uses an **in-memory data store** - all data resets when the server restarts (MongoDB + Mongoose arrive in M3)
* No real-time sync, offline support, automated tests, or deployment yet *(M4–M5)*
