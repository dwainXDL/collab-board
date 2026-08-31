import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { AppError } from "../utils/AppError.js";
import { userRepository } from "../repositories/user.repo.js";
import { createBoard } from "./board.service.js";

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = "1h";

// Strips sensitive fields (passwordHash) before a user object leaves the service.
export function publicUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

export async function register({ name, email, password }) {
  const existing = userRepository.findByEmail(email);
  if (existing) {
    throw new AppError("Email already in use", 409, "EMAIL_IN_USE");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = userRepository.create({ email, passwordHash, name });

  createBoard(user.id, { name: "My Board" });

  return publicUser(user);
}

export async function login({ email, password }) {
  const user = userRepository.findByEmail(email);
  if (!user) {
    throw new AppError("Invalid Email or Password", 401, "INVALID_CREDENTIALS");
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    throw new AppError("Invalid Email or Password", 401, "INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    config.jwtSecret,
    {
      expiresIn: TOKEN_EXPIRY,
    },
  );

  return { token, user: publicUser(user) };
}

export function me(user) {
  return publicUser(user);
}
