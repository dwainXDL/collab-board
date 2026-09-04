import mongoose from "mongoose";
import { baseOptions, toIdJSON } from "./model.options.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },

    email: { type: String, required: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  {
    ...baseOptions,
    toJSON: {
      transform(doc, ret) {
        toIdJSON(doc, ret);
        delete ret.passwordHash;
        return ret;
      },
    },
  },
);

export const User = mongoose.model("User", userSchema);
