import { useState, useEffect, useCallback } from "react";
import { BoardContext } from "./BoardContext";
import { getBoards } from "../api/boards";
import { useAuth } from "../hooks/useAuth";

export function BoardProvider({ children }) {
  const { token } = useAuth();
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
    if (token) {
      loadBoards();
    } else {
      setBoards([]);
      setCurrentBoard(null);
      setLoading(false);
    }
  }, [token, loadBoards]);

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
