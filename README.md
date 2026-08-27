# 📋 CollabBoard

A collaborative **Kanban-style task board**, built progressively across a 5-session full-stack workshop - from a static React UI to a deployed, real-time, tested application.

## 📌 Project Status

* ✅ **M1 - Frontend** (React + mock data) - complete
* 🔜 **M2 - REST API + Auth** (Express + JWT) — in progress

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

### Frontend

```bash
cd client
npm install
npm run dev        # http://localhost:5173
```

### Backend *(from M2 onward)*

```bash
cd server
npm install
npm run dev        # http://localhost:5000
```

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

* Frontend runs entirely on **in-memory mock data** - changes reset on refresh (the real backend arrives in M2/M3)
* No authentication, real-time sync, offline support, tests, or deployment yet *(later milestones)*
