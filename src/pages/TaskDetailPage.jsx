import { useParams, Link } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks } = useTasks();
  const task = tasks.find((t) => t.id === id);

  // TODO: when real API is wired, !task is true during loading — add a loading state to avoid flashing "not found"
  if (!task) {
    return (
      <div className="task-detail">
        <h2>Task not found</h2>
        <p>No task exists with that ID.</p>
        <Link to="/">← Back to board</Link>
      </div>
    );
  }

  return (
    <div className="task-detail">
      <Link to="/">← Back to board</Link>
      <h2>{task.title}</h2>
      <p><strong>Assignee:</strong> {task.assignee}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Due date:</strong> {task.dueDate}</p>
    </div>
  );
}
