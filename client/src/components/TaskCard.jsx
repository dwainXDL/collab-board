import { Link } from "react-router-dom";
import Button from "./Button";

const STATUS_ORDER = ["todo", "doing", "done"];

export default function TaskCard({
  id,
  title,
  assignee,
  dueDate,
  status,
  onMove,
  onDelete,
}) {
  const idx = STATUS_ORDER.indexOf(status);
  const canMoveLeft = idx > 0;
  const canMoveRight = idx < STATUS_ORDER.length - 1;

  function handleDelete() {
    if (window.confirm(`Delete "${title}"?`)) {
      onDelete(id);
    }
  }

  return (
    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700 transition-all shadow-sm flex flex-col justify-between gap-3">
      <div>
        <h4 className="font-medium text-slate-100 text-sm mb-2">
          <Link to={`/tasks/${id}`} className="hover:text-indigo-400">
            {title}
          </Link>
        </h4>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="bg-slate-900 border border-slate-800 rounded-md px-2 py-0.5">
            👤 {assignee || "Unassigned"}
          </span>
          {dueDate && (
            <span className="bg-slate-900 border border-slate-800 rounded-md px-2 py-0.5">
              📅 {dueDate}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/50 mt-1">
        <div className="flex items-center gap-1.5">
          {canMoveLeft && (
            <Button
              variant="secondary"
              onClick={() => onMove(id, STATUS_ORDER[idx - 1])}
            >
              ← Back
            </Button>
          )}
          {canMoveRight && (
            <Button
              variant="primary"
              onClick={() => onMove(id, STATUS_ORDER[idx + 1])}
            >
              Next →
            </Button>
          )}
        </div>

        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
