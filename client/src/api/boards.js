import { request } from "./client";

export function getBoards() {
  return request("/api/boards");
}

export function createBoard(data) {
  return request("/api/boards", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
