import { z } from "zod";

const statusEnum = z.enum(["todo", "doing", "done"]);
const priorityEnum = z.enum(["low", "normal", "high"]);

// optional
const dueDate = z
  .string()
  .trim()
  .optional()
  .refine((v) => v === undefined || !Number.isNaN(Date.parse(v)), {
    message: "dueDate must be a valid date",
  });

export const createTaskSchema = z.object({
  boardId: z.string().min(1, "boardId is required"),
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  status: statusEnum.default("todo"),
  assignee: z.string().trim().optional(),
  dueDate,
  priority: priorityEnum.default("normal"),
});

// PATCH - every field optional, but reject an empty body
export const updateTaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .optional(),
    status: statusEnum.optional(),
    assignee: z.string().trim().optional(),
    dueDate,
    priority: priorityEnum.optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "Provide at least one field to update",
  });
