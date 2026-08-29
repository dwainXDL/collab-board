import { useState, useEffect, useCallback } from "react";
import { BoardContext } from "./BoardContext";
import { getBoards } from "../api/boards";

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBoards = useCallback(() => {
    setLoading(true);
    setError(null);

    getBoards()
      .then((data) => {
        setBoards(data);
        setCurrentBoard((prev) => prev ?? data[0] ?? null);
      })
      .catch((err) => {
        setError(err.message || "Failed to load boards");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadBoards();
    } else {
      setLoading(false);
    }
  }, [loadBoards]);

  function retry() {
    loadBoards();
  }

  return (
    <BoardContext.Provider
      value={{ boards, currentBoard, setCurrentBoard, loading, error, retry }}
    >
      {children}
    </BoardContext.Provider>
  );
}
