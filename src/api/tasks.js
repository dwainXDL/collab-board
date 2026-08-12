import { mockTasks } from "../data/mockTasks";

const delay = (data, ms = 400) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export function getTasks() {
  return delay([...mockTasks]);
}

export function createTask(data) {
  return delay({ id: crypto.randomUUID(), ...data });
}

export function updateTaskStatus(id, status) {
  return delay({ id, status });
}

export function deleteTask(id) {
  return delay({ success: true, id });
}
