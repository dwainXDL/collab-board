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
      <h3>{title}</h3>
      <p>
        {assignee} · Due {dueDate}
      </p>
      <div className="task-card-actions">
        {canMoveLeft && (
          <button onClick={() => onMove(id, STATUS_ORDER[idx - 1])}>
            ← Move
          </button>
        )}
        {canMoveRight && (
          <button onClick={() => onMove(id, STATUS_ORDER[idx + 1])}>
            Move →
          </button>
        )}
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}
