import { taskRepository } from "../repositories/task.repo.js";
import { NotFoundError } from "../utils/AppError.js";
import { assertMember } from "./board.service.js";

export async function createTask(data, userId) {
  await assertMember(data.boardId, userId);
  return taskRepository.create({
    boardId: data.boardId,
    title: data.title,
    status: data.status,
    assignee: data.assignee,
    dueDate: data.dueDate ?? null,
    priority: data.priority,
  });
}

export async function updateTask(id, patch, userId) {
  const task = await taskRepository.findById(id);
  if (!task) throw new NotFoundError("Task");
  await assertMember(task.boardId, userId);
  const updated = await taskRepository.update(id, patch);
  return updated;
}

export async function deleteTask(id, userId) {
  const task = await taskRepository.findById(id);
  if (!task) throw new NotFoundError("Task");
  await assertMember(task.boardId, userId);
  await taskRepository.remove(id);
}

export async function listTasks(boardId, userId, query = {}) {
  await assertMember(boardId, userId);
  let tasks = await taskRepository.findByBoard(boardId);

  if (query.status) tasks = tasks.filter((t) => t.status === query.status);
  if (query.assignee)
    tasks = tasks.filter((t) => t.assignee === query.assignee);

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

  if (query.limit) {
    const limit = Math.max(1, Number(query.limit) || 1);
    const page = Math.max(1, Number(query.page) || 1);
    const start = (page - 1) * limit;
    tasks = tasks.slice(start, start + limit);
  }

  return tasks;
}
