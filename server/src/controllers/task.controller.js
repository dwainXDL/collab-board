import { asyncHandler } from "../utils/asyncHandler.js";
import * as taskService from "../services/task.service.js";

export const create = asyncHandler(async (req, res) => {
  const task = taskService.createTask(req.body);
  res.status(201).json(task);
});

export const update = asyncHandler(async (req, res) => {
  const task = taskService.updateTask(req.params.id, req.body);
  res.status(200).json(task);
});

export const remove = asyncHandler(async (req, res) => {
  taskService.deleteTask(req.params.id);
  res.status(204).send();
});

// GET /api/boards/:id/tasks  (id = boardId)
export const listByBoard = asyncHandler(async (req, res) => {
  const tasks = taskService.listTasks(req.params.id, req.query);
  res.status(200).json(tasks);
});
