import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { updateTaskStatus, deleteTask } from "../api/tasks";
import { putTask, removeTask } from "../db/localDB";
import Column from "./Column";
import FilterBar from "./FilterBar";
import ConflictDialog from "./ConflictDialog";
import { filterTasks } from "../utils/filterTasks";

const COLUMNS = [
  { key: "todo", label: "To Do" },
  { key: "doing", label: "Doing" },
  { key: "done", label: "Done" },
];

export default function Board() {
  const { tasks, dispatch, retry } = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [actionError, setActionError] = useState(null);
  const [conflict, setConflict] = useState(null);

  const filters = {
    status: searchParams.get("status") || "all",
    assignee: searchParams.get("assignee") || "all",
    search: searchParams.get("search") || "",
  };

  const setFilters = (next) => {
    const params = {};
    if (next.status !== "all") params.status = next.status;
    if (next.assignee !== "all") params.assignee = next.assignee;
    if (next.search !== "") params.search = next.search;
    setSearchParams(params);
  };

  const handleMove = async (id, status) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const updated = await updateTaskStatus(id, status, task?.version);
      dispatch({ type: "moved", id, status });
      if (task) putTask({ ...task, status, version: updated?.version ?? task.version });
    } catch (err) {
      if (err.status === 409 && err.details) {
        setConflict({
          taskId: id,
          current: err.details.current,
          yourChange: { status },
        });
      } else {
        setActionError(err.message || "Failed to move task");
      }
    }
  };

  const handleAcceptServer = () => {
    const { current } = conflict;
    dispatch({ type: "moved", id: current.id, status: current.status });
    putTask(current);
    setConflict(null);
    retry();
  };

  const handleForce = async () => {
    const { taskId, current, yourChange } = conflict;
    setConflict(null);
    try {
      const updated = await updateTaskStatus(taskId, yourChange.status, current.version);
      dispatch({ type: "moved", id: taskId, status: yourChange.status });
      const task = tasks.find((t) => t.id === taskId);
      if (task) putTask({ ...task, status: yourChange.status, version: updated?.version ?? current.version + 1 });
    } catch (err) {
      setActionError(err.message || "Failed to force update");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      dispatch({ type: "deleted", id });
      removeTask(id);
    } catch (err) {
      setActionError(err.message || "Failed to delete task");
    }
  };

  const filteredTasks = filterTasks(tasks, filters);
  const teamMembers = [...new Set(tasks.map((t) => t.assignee))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight mb-2">
          CollabBoard
        </h1>
        <p className="text-slate-400 text-sm">
          Manage and track your team tasks efficiently.
        </p>
      </header>

      {actionError && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-red-900 bg-red-950/50 p-3 text-sm text-red-400">
          <span>{actionError}</span>
          <button
            onClick={() => setActionError(null)}
            className="ml-4 rounded px-2 py-0.5 text-red-300 hover:bg-red-900/50"
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        teamMembers={teamMembers}
      />

      {filteredTasks.length === 0 ? (
        <p className="mt-10 text-center text-slate-500">
          No tasks match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {COLUMNS.map((col) => (
            <Column
              key={col.key}
              title={col.label}
              tasks={filteredTasks.filter((t) => t.status === col.key)}
              onMove={handleMove}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ConflictDialog
        conflict={conflict}
        onAcceptServer={handleAcceptServer}
        onForce={handleForce}
      />
    </div>
  );
}
