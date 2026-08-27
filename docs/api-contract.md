# CollabBoard API Contract (M2)

The interface both halves of the team code against. Agreed from the Session 2 deck.
Server runs on **:4000**; the client reaches it via a Vite `/api` proxy in dev and CORS in production.

## Conventions

- Base path `/api`.
- **Auth:** JWT in `Authorization: Bearer <token>`, `expiresIn: 1h`, signed with `{ sub: userId, email }`.
- **Passwords:** hashed with bcrypt = never stored plaintext, never returned.
- **Validation:** zod on every write endpoint -> `400` with per-field `details`.
- **Errors:** one central handler, one shape (below).
- **Ownership** is checked in the **service** layer, where the user is known.

## Endpoints

| Method & path | Purpose | Auth | Success | Errors |
|---|---|:--:|---|---|
| `POST /api/auth/register` | Create an account | – | `201` + user | 400, 409 |
| `POST /api/auth/login` | Exchange credentials for a token | – | `200` + `{ token, user }` | 400, 401 |
| `GET /api/auth/me` | Current user from the token | ✓ | `200` + user | 401 |
| `GET /api/boards` | Boards this user can see | ✓ | `200` + `[board]` | 401 |
| `POST /api/boards` | Create a board | ✓ | `201` + board | 400, 401 |
| `GET /api/boards/:id/tasks` | Tasks on a board (filterable) | ✓ | `200` + `[task]` | 401, 403, 404 |
| `POST /api/tasks` | Create a task (`boardId` in body) | ✓ | `201` + task | 400, 401, 403 |
| `PATCH /api/tasks/:id` | Update fields incl. status | ✓ | `200` + task | 400, 401, 403, 404 |
| `DELETE /api/tasks/:id` | Remove a task | ✓ | `204` | 401, 403, 404 |

**Filtering** on `GET /api/boards/:id/tasks`: `?status=`, `?assignee=`, `?sort=`, `?page=`, `?limit=` - implemented once in the service.

## Shapes

```jsonc
User   { id, name, email }                                    // passwordHash is NEVER returned
Board  { id, name, ownerId, members: [userId] }
Task   {
  id, boardId, title,
  status: "todo" | "doing" | "done",
  assignee, dueDate: "YYYY-MM-DD",
  priority: "low" | "normal" | "high"
}
Error  { message, code, details?: [ { field, message } ] }   // one shape, everywhere
```

Success responses return the resource (or array) directly; errors always use the `Error` shape.

## Status codes (graded)

| Code | When |
|---|---|
| 200 | Successful GET / PATCH returning a body |
| 201 | POST created a resource (include it in the body) |
| 204 | Successful DELETE (no body) |
| 400 | Validation failed - malformed input |
| 401 | No/invalid/expired token - *"who are you?"* |
| 403 | Valid token, but not allowed (not a board member) - *"I know you, and no"* |
| 404 | Resource does not exist |
| 409 | Duplicate email on register |
| 500 | Unhandled server error (never sent deliberately) |

## Client integration

- `api/client.js` - a `request(path, options)` helper: attaches the Bearer token from
  `localStorage`, handles `401` centrally (clear token + fire an `auth:expired` event),
  returns `null` on `204`.
- `api/tasks.js` - the mock stubs become real `request()` calls. **Components/reducer stay untouched.**
- `api/auth.js` + an `AuthContext` (holds `user` + `token`, login/logout, listens for `auth:expired`).
- **Vite proxy** (`/api` → `http://localhost:4000`) in dev; **CORS** (`origin: clientOrigin, credentials: true`) on the server for the deployed build.
- `mockTasks.js` is deleted (Assignment 2 requirement).

## Decisions (document the why, not just the endpoints)

- **Token in `localStorage`** - simplest, works across ports; the tradeoff is XSS readability.
- **In-memory store on the server for M2** - data resets on restart; swapped for MongoDB in M3 with nothing above the repository layer changing.
- **Server assigns ids** - the client stops generating `crypto.randomUUID()`.
