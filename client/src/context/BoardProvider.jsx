import { useState, useEffect, useCallback, useRef } from "react";
import { BoardContext } from "./BoardContext";
import { getBoards } from "../api/boards";
import { useAuth } from "../hooks/useAuth";
import { getLocalBoards, reconcileBoards, clearAll } from "../db/localDB";

export function BoardProvider({ children }) {
  const { token } = useAuth();
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);
  const serverLoaded = useRef(false);

  const loadBoards = useCallback(() => {
    setError(null);
    setOffline(false);
    serverLoaded.current = false;

    // 1. Read from local cache first (instant render)
    getLocalBoards()
      .then((cached) => {
        if (cached.length > 0 && !serverLoaded.current) {
          setBoards(cached);
          setCurrentBoard((prev) => prev ?? cached[0]);
          setLoading(false);
        }
      })
      .catch(() => {});

    // 2. Fetch from server and reconcile
    getBoards()
      .then((data) => {
        serverLoaded.current = true;
        setBoards(data);
        setCurrentBoard((prev) => prev ?? data[0] ?? null);
        setOffline(false);
        reconcileBoards(data);
      })
      .catch((err) => {
        if (!serverLoaded.current) {
          // If cache was rendered, show offline indicator instead of blocking error
          getLocalBoards()
            .then((cached) => {
              if (cached.length > 0) {
                setOffline(true);
              } else {
                setError(err.message || "Failed to load boards");
              }
            })
            .catch(() => {
              setError(err.message || "Failed to load boards");
            });
        }
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
      setOffline(false);
      clearAll();
    }
  }, [token, loadBoards]);

  function retry() {
    loadBoards();
  }

  return (
    <BoardContext.Provider
      value={{
        boards,
        currentBoard,
        setCurrentBoard,
        loading,
        error,
        offline,
        retry,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
