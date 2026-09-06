import { useReducer, useEffect, useState, useCallback } from "react";
import { TasksContext } from "./TasksContext";
import { getTasks } from "../api/tasks";
import { useBoard } from "../hooks/useBoard";
import { getLocalTasks, putTasks, putTask, removeTask } from "../db/localDB";

function tasksReducer(state, action) {
  switch (action.type) {
    case "loaded":
      return action.tasks;
    case "added":
      putTask(action.task);
      return [...state, action.task];
    case "moved": {
      const updated = state.find((t) => t.id === action.id);
      if (updated) putTask({ ...updated, status: action.status });
      return state.map((t) =>
        t.id === action.id ? { ...t, status: action.status } : t,
      );
    }
    case "deleted":
      removeTask(action.id);
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

  const boardId = currentBoard?.id;

  const loadTasks = useCallback(() => {
    if (!boardId) {
      dispatch({ type: "loaded", tasks: [] });
      setLoading(false);
      return;
    }

    setError(null);

    // 1. Read from local cache first (instant render)
    getLocalTasks(boardId)
      .then((cached) => {
        if (cached.length > 0) {
          dispatch({ type: "loaded", tasks: cached });
          setLoading(false);
        }
      })
      .catch(() => {});

    // 2. Fetch from server and reconcile
    getTasks(boardId)
      .then((data) => {
        dispatch({ type: "loaded", tasks: data });
        putTasks(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to load tasks");
      })
      .finally(() => setLoading(false));
  }, [boardId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  function retry() {
    loadTasks();
  }

  return (
    <TasksContext.Provider
      value={{ tasks, dispatch, loading, error, retry, boardId }}
    >
      {children}
    </TasksContext.Provider>
  );
}
