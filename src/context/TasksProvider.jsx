import { useReducer, useEffect, useState, useCallback } from "react";
import { TasksContext } from "./TasksContext";
import { getTasks } from "../api/tasks";

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
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(() => {
    getTasks()
      .then((data) => {
        dispatch({ type: "loaded", tasks: data });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load tasks");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  function retry() {
    setLoading(true);
    setError(null);
    loadTasks();
  }

  return (
    <TasksContext.Provider value={{ tasks, dispatch, loading, error, retry }}>
      {children}
    </TasksContext.Provider>
  );
}
