import { User } from "../models/user.model.js";

export const userRepository = {
  async findByEmail(email) {
    return User.findOne({ email });
  },

  async create({ email, passwordHash, name }) {
    return User.create({ name, email, passwordHash });
  },
};
