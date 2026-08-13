import { useSearchParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import Column from "./Column";
import FilterBar from "./FilterBar";
import { filterTasks } from "../utils/filterTasks";

const COLUMNS = [
  { key: "todo", label: "To Do" },
  { key: "doing", label: "Doing" },
  { key: "done", label: "Done" },
];

export default function Board() {
  const { tasks, dispatch } = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();

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

  const handleMove = (id, status) => dispatch({ type: "moved", id, status });
  const handleDelete = (id) => dispatch({ type: "deleted", id });

  const filteredTasks = filterTasks(tasks, filters);
  const teamMembers = [...new Set(tasks.map((t) => t.assignee))];

  return (
    <div style={{ padding: "16px" }}>
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        teamMembers={teamMembers}
      />

      {filteredTasks.length === 0 ? (
        <p style={{ marginTop: "24px", color: "#666" }}>
          No tasks match your filters
        </p>
      ) : (
        <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
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
    </div>
  );
}
