import { request } from "./client";

export function getTasks(boardId) {
  return request(`/api/boards/${boardId}/tasks`);
}

export function createTask(data) {
  return request("/api/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateTaskStatus(id, status) {
  return request(`/api/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: "DELETE" });
}
