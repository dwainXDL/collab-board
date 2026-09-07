import { getPendingWrites, removePendingWrite } from "./localDB.js";
import { createTask, updateTaskStatus, deleteTask } from "../api/tasks.js";

export async function replayQueue() {
  const pending = await getPendingWrites();
  const conflicts = [];

  for (const entry of pending) {
    try {
      switch (entry.type) {
        case "create":
          await createTask(entry.payload);
          break;
        case "move":
          await updateTaskStatus(entry.payload.id, entry.payload.status);
          break;
        case "delete":
          await deleteTask(entry.payload.id);
          break;
      }
      await removePendingWrite(entry._id);
    } catch (err) {
      if (err.status === 409) {
        conflicts.push({ entry, details: err.details });
        await removePendingWrite(entry._id);
      } else {
        // Network still down — stop replay, keep remaining in queue
        break;
      }
    }
  }

  return conflicts;
}

let replayInProgress = false;
let onReplayComplete = null;

export function setOnReplayComplete(callback) {
  onReplayComplete = callback;
}

async function handleOnline() {
  if (replayInProgress) return;
  replayInProgress = true;
  try {
    const conflicts = await replayQueue();
    if (onReplayComplete) onReplayComplete(conflicts);
  } finally {
    replayInProgress = false;
  }
}

export function startOnlineListener() {
  window.addEventListener("online", handleOnline);
  return () => window.removeEventListener("online", handleOnline);
}
