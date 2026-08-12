import { useTasks } from "../hooks/useTasks";
import Column from "./Column";

const COLUMNS = [
  { key: "todo", label: "To Do" },
  { key: "doing", label: "Doing" },
  { key: "done", label: "Done" },
];

export default function Board() {
  const { tasks, dispatch } = useTasks();

  const handleMove = (id, status) => dispatch({ type: "moved", id, status });
  const handleDelete = (id) => dispatch({ type: "deleted", id });

  return (
    <div style={{ display: "flex", gap: "24px", padding: "16px" }}>
      {COLUMNS.map((col) => (
        <Column
          key={col.key}
          title={col.label}
          tasks={tasks.filter((t) => t.status === col.key)}
          onMove={handleMove}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
