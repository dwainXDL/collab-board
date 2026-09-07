import { useState, useEffect } from "react";
import { getBoardStats } from "../api/boards";

export default function OverdueStats({ boardId, refreshKey }) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!boardId) return;

    setLoading(true);
    setError(null);

    getBoardStats(boardId)
      .then((data) => {
        const sorted = [...data].sort((a, b) => b.overdueCount - a.overdueCount);
        setStats(sorted);
      })
      .catch((err) => {
        setError(err.message || "Failed to load stats");
      })
      .finally(() => setLoading(false));
  }, [boardId, refreshKey]);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-6">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">
        Overdue by Assignee
      </h3>

      {loading && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
          Loading...
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      {!loading && !error && stats.length === 0 && (
        <p className="text-xs text-slate-500">No overdue tasks</p>
      )}

      {!loading && !error && stats.length > 0 && (
        <ul className="space-y-1.5">
          {stats.map((s) => (
            <li
              key={s.assignee}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-300">{s.assignee}</span>
              <span className="bg-red-950 text-red-400 border border-red-900 rounded-md px-2 py-0.5 text-xs font-medium">
                {s.overdueCount} overdue
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
