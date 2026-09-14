# 🖥️ CollabBoard Server

The **Node.js + Express** backend for CollabBoard - a JWT-secured REST API for managing boards and tasks, backed by **MongoDB via Mongoose** (M2 auth/API + M3 persistence).

> 📌 For the complete project overview, see the [root README](../README.md).

## 🛠️ Tech Stack

| Category | Technology |
| -------- | ---------- |
| **Runtime** | Node.js 18+ |
| **Framework** | Express |
| **Module System** | ES Modules |
| **Authentication** | JWT (`jsonwebtoken`) |
| **Password Hashing** | bcryptjs |
| **Validation** | Zod |
| **Rate Limiting** | express-rate-limit |
| **Data Store** | MongoDB + Mongoose ✅ |

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js 18+**
- **npm**

### 1️⃣ Install Dependencies

```bash
cd server
npm install
```

### 2️⃣ Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Configure your .env file:

```env
PORT=4000
JWT_SECRET=<a long random string>
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/collabboard
```

`MONGODB_URI` can point at a local Docker Mongo (`docker run -d --name collabboard-mongo -p 27017:27017 -v collabboarddata:/data/db mongo:8`) or a MongoDB Atlas free-tier cluster - the server just needs a reachable connection string. The DB name is **`collabboard`**.

You can generate a secure JWT secret using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3️⃣ Run the Server

Start the development server with automatic reload:

```bash
npm run dev
```

The API will be available at:

```http
http://localhost:4000
```

### ❤️ Health Check

Check whether the API - and its MongoDB connection - is running:

```http
GET /api/health
```

Response includes the live Mongoose connection state (`connected`, `connecting`, `disconnected`, `disconnecting`):

```json
{ "status": "OK", "uptime": 12.3, "db": "connected" }
```

`server.js` **awaits `connectDb()` before calling `app.listen`**, and exits with a clear error message if the database is unreachable at startup - the server never comes up silently disconnected from Mongo.

## 🏗️ Architecture

The backend follows a 4-layer architecture:

```
Request
   │
   ▼
Route
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
```

Each layer has a clear responsibility:

| Layer | Responsibility |
| ----- | -------------- |
| **Routes** | Define endpoints and connect middleware |
| **Controllers** | Handle HTTP requests and responses |
| **Services** | Business logic and ownership checks |
| **Repositories** | Data access and storage |

`server.js` starts the application and is the only file responsible for calling `listen`.

`app.js` builds and exports the Express application, allowing it to be imported directly by the test suite in **M4**.

## 📁 Folder Structure

```
server/
└── src/
    ├── server.js          # Starts the server
    ├── app.js             # Builds and exports the Express app
    ├── config.js          # Environment configuration
    │
    ├── routes/            # API endpoint wiring
    ├── controllers/       # HTTP request/response handling
    ├── services/          # Business logic & ownership checks
    ├── repositories/      # Mongoose data access (Mongo-backed)
    ├── models/            # Mongoose schemas (User, Board, Task)
    ├── db/                # connectDb() - Mongo connection setup
    ├── constants/         # Shared enums (status/priority/role) - used by both models & Zod
    ├── schemas/           # Zod validation schemas
    ├── middleware/        # Authentication, validation & error handling
    └── utils/              # AppError & asyncHandler
```

## 🔄 Middleware Flow

Requests pass through the following middleware pipeline:

```
CORS
  ↓
express.json
  ↓
requestId
  ↓
logger
  ↓
Routes
  ↓
notFoundHandler
  ↓
errorHandler
```

## 🔌 API Endpoints

| Method | Route | Auth | Description |
| ------ | ----- | ---- | ----------- |
| `GET` | `/api/health` | — | Health check |
| `POST` | `/api/auth/register` | — | Register a new user and seed a default board |
| `POST` | `/api/auth/login` | — | Login and receive `{ token, user }` |
| `GET` | `/api/auth/me` | ✓ | Get the current user |
| `GET` | `/api/boards` | ✓ | Get boards the user is a member of |
| `POST` | `/api/boards` | ✓ | Create a new board |
| `GET` | `/api/boards/:id/tasks` | ✓ | Get tasks belonging to a board |
| `GET` | `/api/boards/:id/stats` | ✓ | Overdue task count grouped by assignee (member-guarded aggregation) |
| `POST` | `/api/tasks` | ✓ | Create a task |
| `PATCH` | `/api/tasks/:id` | ✓ | Update a task (optionally with `baseVersion` for optimistic concurrency) |
| `DELETE` | `/api/tasks/:id` | ✓ | Delete a task |

## 🔎 Task Filtering & Pagination

Board task requests support the following query parameters:

```
?status=
&assignee=
&sort=
&page=
&limit=
```

Example:

```
GET /api/boards/:id/tasks?status=todo&assignee=user123&sort=-createdAt&page=1&limit=10
```

📖 **Full API Contract:** [docs/api-contract.md](../docs/api-contract.md)

📮 **Postman Collection:** [docs/CollaBoardAPI.postman_collection.json](../docs/CollaBoardAPI.postman_collection.json)

## 🔐 Authentication & Security

The API uses **JWT-based authentication** to protect private endpoints.

- 🔑 **Password hashing** - Passwords are securely hashed using **bcrypt**
- 🎟️ **JWT authentication** - Tokens contain `{ sub, email, name }`
- ⏱️ **Token expiration** - Tokens expire after **1 hour**
- 🛡️ **Protected endpoints** - Authenticated endpoints require a valid JWT
- 🚦 **Rate limiting** - Login requests are rate-limited
- ✅ **Request validation** - Request bodies are validated using **Zod**

### 🔒 Authorization

```
| Status | Meaning |
| ------ | ------- |
| **400** | Request validation failed |
| **401** | Missing, invalid, or expired token |
| **403** | Valid token, but user does not have access |
| **404** | Resource does not exist, or `:id` is not a valid MongoDB ObjectId |
| **409** | Duplicate email on register, or a stale `baseVersion` on task update (`VERSION_CONFLICT`) |
```

Validation errors return a `details` array containing the affected field and message:

```json
{
  "field": "email",
  "message": "Invalid email address"
}
```

## ⚠️ Error Response

API errors follow a consistent structure:

```json
{
  "message": "Something went wrong",
  "code": "ERROR_CODE",
  "requestId": "request-id",
  "details": []
}
```

## 💾 Database (M3)

The backend is now backed by **MongoDB via Mongoose** - data survives a server restart. The in-memory arrays from M2 are gone; the repository layer kept its function signatures, so nothing
above it (services/controllers) had to change shape, though calls did become `async`/`await`.

- **users** `{ name, email (unique), passwordHash, timestamps }` - `passwordHash` is stripped from every response via a shared `toJSON` transform.
- **boards** `{ name, ownerId, members: [{ userId, role }], timestamps }` - members are **embedded** (small, bounded, always read with the board).
- **tasks** `{ boardId (ref), title, description, status, assignee, dueDate, priority, position, columnId, version, timestamps }` - tasks are **referenced**, not embedded, since a board can 
accumulate hundreds of them.

Registering a new user automatically seeds a default **"My Board"** so the app isn't empty on first login.

### Indexes

`users.email` (unique - duplicate registration returns `409`); `tasks { boardId, status, position }`; `tasks { boardId, dueDate }`; `tasks { assignee, status }`; and a text index on `tasks { title, description }` for search.

### Optimistic Concurrency

Every task has a `version` integer, distinct from Mongoose's own `__v`. A `PATCH` can include `baseVersion`; if it no longer matches the stored version (someone else updated the task first),
the request fails with `409 VERSION_CONFLICT` and returns the current server state instead of silently overwriting it. `baseVersion` is optional - omitting it does a plain update with no
concurrency check, so older callers keep working.

📖 **Full data model + embed/reference rationale + ERD:** [docs/data-model.md](../docs/data-model.md)

## 📚 Related Documentation

- 🏠 [Root README](../README.md)
- 📖 [API Contract](../docs/api-contract.md)
- 📮 [Postman Collection](../docs/CollaBoardAPI.postman_collection.json)

---