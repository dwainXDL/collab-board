import { asyncHandler } from "../utils/asyncHandler.js";
import * as taskService from "../services/task.service.js";

export const create = asyncHandler(async (req, res) => {
  const task = taskService.createTask(req.body, req.user.id);
  res.status(201).json(task);
});

export const update = asyncHandler(async (req, res) => {
  const task = taskService.updateTask(req.params.id, req.body, req.user.id);
  res.status(200).json(task);
});

export const remove = asyncHandler(async (req, res) => {
  taskService.deleteTask(req.params.id, req.user.id);
  res.status(204).send();
});

// GET /api/boards/:id/tasks  (id = boardId)
export const listByBoard = asyncHandler(async (req, res) => {
  const tasks = taskService.listTasks(req.params.id, req.user.id, req.query);
  res.status(200).json(tasks);
});
