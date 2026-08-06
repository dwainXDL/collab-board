import { useReducer } from "react";
import { TasksContext } from "./TasksContext";
import { mockTasks } from "../data/mockTasks";

function tasksReducer(state, action) {
  switch (action.type) {
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
  const [tasks, dispatch] = useReducer(tasksReducer, mockTasks);
  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}
