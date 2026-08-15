import { useParams, Link } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks } = useTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div style={{ padding: "16px" }}>
        <h2>Task not found</h2>
        <p>No task exists with that ID.</p>
        <Link to="/">← Back to board</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <Link to="/">← Back to board</Link>
      <h2>{task.title}</h2>
      <p><strong>Assignee:</strong> {task.assignee}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Due date:</strong> {task.dueDate}</p>
    </div>
  );
}
