import { useReducer, useEffect, useState, useCallback } from "react";
import { TasksContext } from "./TasksContext";
import { getTasks } from "../api/tasks";
import { useBoard } from "../hooks/useBoard";

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

  const boardId = currentBoard?.id;

  const loadTasks = useCallback(() => {
    if (!boardId) {
      dispatch({ type: "loaded", tasks: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getTasks(boardId)
      .then((data) => {
        dispatch({ type: "loaded", tasks: data });
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
