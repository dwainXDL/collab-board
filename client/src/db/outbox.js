import { getPendingWrites, removePendingWrite } from "./localDB.js";
import { createTask, updateTaskStatus, deleteTask } from "../api/tasks.js";

function isNetworkError(err) {
  return (
    !err.status &&
    (err.message === "Failed to fetch" ||
      err.message === "NetworkError when attempting to fetch resource." ||
      err.message === "Network request failed" ||
      err.message === "Load failed" ||
      !navigator.onLine)
  );
}

export async function replayQueue() {
  const pending = await getPendingWrites();
  const conflicts = [];
  const tempIdMap = new Map();

  for (const entry of pending) {
    try {
      // Resolve temp IDs from earlier creates
      if (entry.type === "move" || entry.type === "delete") {
        const realId = tempIdMap.get(entry.payload.id);
        if (realId) entry.payload.id = realId;
      }

      switch (entry.type) {
        case "create": {
          const created = await createTask(entry.payload);
          if (entry.payload.tempId && created?.id) {
            tempIdMap.set(entry.payload.tempId, created.id);
          }
          break;
        }
        case "move":
          await updateTaskStatus(
            entry.payload.id,
            entry.payload.status,
            entry.payload.version,
          );
          break;
        case "delete":
          await deleteTask(entry.payload.id);
          break;
      }
      await removePendingWrite(entry._id);
    } catch (err) {
      if (isNetworkError(err)) {
        // Network still down — stop replay, keep remaining in queue
        break;
      }
      if (err.status === 409) {
        conflicts.push({ entry, details: err.details });
      }
      // For any HTTP error (409, 404, etc.), remove the entry and continue
      await removePendingWrite(entry._id);
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
