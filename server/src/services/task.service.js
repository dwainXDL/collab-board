import { randomUUID } from "node:crypto";
import { taskRepository } from "../repositories/task.repo.js";
import { NotFoundError } from "../utils/AppError.js";

// NOTE: CRUD only
export function createTask(data) {
  const task = {
    id: randomUUID(),
    boardId: data.boardId,
    title: data.title,
    status: data.status, // zod defaults to "todo"
    assignee: data.assignee ?? null,
    dueDate: data.dueDate ?? null,
    priority: data.priority, // zod defaults to "normal"
    createdAt: new Date().toISOString(),
  };
  return taskRepository.create(task);
}

export function updateTask(id, patch) {
  const updated = taskRepository.update(id, patch);
  if (!updated) throw new NotFoundError("Task");
  return updated;
}

export function deleteTask(id) {
  const removed = taskRepository.remove(id);
  if (!removed) throw new NotFoundError("Task");
}

export function listTasks(boardId, query = {}) {
  let tasks = taskRepository.findByBoard(boardId);

  // filters
  if (query.status) tasks = tasks.filter((t) => t.status === query.status);
  if (query.assignee)
    tasks = tasks.filter((t) => t.assignee === query.assignee);

  // sort: ?sort=field (asc) or ?sort=-field (desc)
  if (query.sort) {
    const desc = query.sort.startsWith("-");
    const key = desc ? query.sort.slice(1) : query.sort;
    tasks = [...tasks].sort((a, b) => {
      const av = a[key] ?? "";
      const bv = b[key] ?? "";
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * (desc ? -1 : 1);
    });
  }

  // pagination: only when ?limit= is provided
  if (query.limit) {
    const limit = Math.max(1, Number(query.limit) || 1);
    const page = Math.max(1, Number(query.page) || 1);
    const start = (page - 1) * limit;
    tasks = tasks.slice(start, start + limit);
  }

  return tasks;
}
