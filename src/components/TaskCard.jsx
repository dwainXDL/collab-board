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
    <article className="task-card">
      <h3><Link to={`/tasks/${id}`}>{title}</Link></h3>
      <p>
        {assignee} · Due {dueDate}
      </p>
      <div className="task-card-actions">
        {canMoveLeft && (
          <Button variant="secondary" onClick={() => onMove(id, STATUS_ORDER[idx - 1])}>
            ← Move
          </Button>
        )}
        {canMoveRight && (
          <Button variant="secondary" onClick={() => onMove(id, STATUS_ORDER[idx + 1])}>
            Move →
          </Button>
        )}
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </article>
  );
}
