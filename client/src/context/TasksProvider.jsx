import { useReducer, useEffect, useState, useCallback, useRef } from "react";
import { TasksContext } from "./TasksContext";
import { getTasks } from "../api/tasks";
import { useBoard } from "../hooks/useBoard";
import { getLocalTasks, reconcileTasks } from "../db/localDB";
import {
  startOnlineListener,
  setOnReplayComplete,
} from "../db/outbox";

function tasksReducer(state, action) {
  switch (action.type) {
    case "loaded":
      return action.tasks;
    case "added":
      return [...state, action.task];
    case "moved":
      return state.map((t) =>
        t.id === action.id ? { ...t, status: action.status } : t,
      );
    case "deleted":
      return state.filter((t) => t.id !== action.id);
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function TasksProvider({ children }) {
  const { currentBoard } = useBoard();
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);
  const serverLoaded = useRef(false);

  const boardId = currentBoard?.id;

  const loadTasks = useCallback(() => {
    if (!boardId) {
      dispatch({ type: "loaded", tasks: [] });
      setLoading(false);
      return;
    }

    setError(null);
    setOffline(false);
    serverLoaded.current = false;

    // 1. Read from local cache first (instant render)
    getLocalTasks(boardId)
      .then((cached) => {
        if (cached.length > 0 && !serverLoaded.current) {
          dispatch({ type: "loaded", tasks: cached });
          setLoading(false);
        }
      })
      .catch(() => {});

    // 2. Fetch from server and reconcile
    getTasks(boardId)
      .then((data) => {
        serverLoaded.current = true;
        dispatch({ type: "loaded", tasks: data });
        setOffline(false);
        reconcileTasks(boardId, data);
      })
      .catch((err) => {
        if (!serverLoaded.current) {
          getLocalTasks(boardId)
            .then((cached) => {
              if (cached.length > 0) {
                setOffline(true);
              } else {
                setError(err.message || "Failed to load tasks");
              }
            })
            .catch(() => {
              setError(err.message || "Failed to load tasks");
            });
        }
      })
      .finally(() => setLoading(false));
  }, [boardId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Wire offline queue replay on reconnect
  useEffect(() => {
    setOnReplayComplete((conflicts) => {
      if (conflicts.length > 0) {
        console.warn("Sync conflicts:", conflicts);
      }
      // Refresh tasks from server after replay
      loadTasks();
    });
    const cleanup = startOnlineListener();
    return cleanup;
  }, [loadTasks]);

  function retry() {
    loadTasks();
  }

  return (
    <TasksContext.Provider
      value={{ tasks, dispatch, loading, error, offline, retry, boardId }}
    >
      {children}
    </TasksContext.Provider>
  );
}
