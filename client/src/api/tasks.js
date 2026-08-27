import { mockTasks } from "../data/mockTasks";

const delay = (data, ms = 400) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

const fail = (ms = 400) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Simulated network error")), ms),
  );

export function getTasks() {
  const shouldFail = new URLSearchParams(window.location.search).has("fail");
  return shouldFail ? fail() : delay([...mockTasks]);
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
