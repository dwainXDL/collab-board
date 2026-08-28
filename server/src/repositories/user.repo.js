import { randomUUID } from "node:crypto";

// In-memory store (M2 stage - no DB driver wired up yet).
// email -> user record: { id, email, passwordHash, createdAt }
const usersByEmail = new Map();

export const userRepository = {
  findByEmail(email) {
    return usersByEmail.get(email) ?? null;
  },

  create({ email, passwordHash }) {
    const user = {
      id: randomUUID(),
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    usersByEmail.set(email, user);
    return user;
  },
};