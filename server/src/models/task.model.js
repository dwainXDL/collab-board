import mongoose from "mongoose";
import { baseOptions } from "./model.options.js";
import { TASK_STATUSES, TASK_PRIORITIES } from "../constants/enums.js";

const taskSchema = new mongoose.Schema(
  {
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
    title: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String, trim: true, default: "" },
    status: { type: String, enum: TASK_STATUSES, default: "todo" },
    // Free-text display name, not a ref: the client sends "Unassigned".
    assignee: { type: String, trim: true, default: "Unassigned" },
    dueDate: { type: Date, default: null },
    priority: { type: String, enum: TASK_PRIORITIES, default: "normal" },
    position: { type: Number, default: 0 },
    columnId: { type: String, default: null },
    // Bumped by the update path in #75. Distinct from Mongoose's own __v,
    // which is not incremented on ordinary field updates.
    version: { type: Number, default: 0 },
  },
  baseOptions,
);

export const Task = mongoose.model("Task", taskSchema);
