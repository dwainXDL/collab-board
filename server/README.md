# 🖥️ CollabBoard Server

The **Node.js + Express** backend for CollabBoard - a JWT-secured REST API for managing boards and tasks, developed as part of **M2**.

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
| **Data Store** | In-memory *(MongoDB + Mongoose in M3)* |

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
```

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

Check whether the API is running:

```http
GET /api/health
```

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
    ├── repositories/      # In-memory data store
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
| `POST` | `/api/tasks` | ✓ | Create a task |
| `PATCH` | `/api/tasks/:id` | ✓ | Update a task |
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

📮 **Postman Collection:** [docs/CollabBoard.postman_collection.json](../docs/CollabBoard.postman_collection.json)

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
| **401** | Missing, invalid, or expired token |
| **403** | Valid token, but user does not have access |
| **400** | Request validation failed |
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

## 💾 Data Storage

The M2 backend currently uses an **in-memory data store**.

> ⚠️ Note: All users, boards, and tasks are reset when the server restarts.

The repository layer is designed so the in-memory implementation can be replaced with MongoDB + Mongoose in M3 without changing the API structure.

## 📚 Related Documentation

- 🏠 [Root README](../README.md)
- 📖 [API Contract](../docs/api-contract.md)
- 📮 [Postman Collection](../docs/CollabBoard.postman_collection.json)

---