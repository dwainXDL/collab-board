import mongoose from "mongoose";
import { baseOptions } from "./model.options.js";
import { MEMBER_ROLES } from "../constants/enums.js";

const memberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: { type: String, enum: MEMBER_ROLES, default: "viewer" },
  },
  { _id: false },
);

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: { type: [memberSchema], default: [] },
  },
  baseOptions,
);

export const Board = mongoose.model("Board", boardSchema);
