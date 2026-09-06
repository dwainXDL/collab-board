import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const userRepository = {
  async findByEmail(email) {
    return User.findOne({ email });
  },

  async create({ email, passwordHash, name }) {
    try {
      return await User.create({ name, email, passwordHash });
    } catch (err) {
      if (err.code === 11000) {
        throw new AppError("Email already in use", 409, "EMAIL_IN_USE");
      }
      throw err;
    }
  },
};