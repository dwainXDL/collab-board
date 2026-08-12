import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../api/tasks";
import { useTasks } from "../hooks/useTasks";

export default function NewTaskPage() {
  const { dispatch } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next = {};
    if (title.trim().length < 3) {
      next.title = "Title is required and must be at least 3 characters.";
    }
    if (!dueDate) {
      next.dueDate = "Due date is required.";
    } else if (dueDate < new Date().toISOString().slice(0, 10)) {
      next.dueDate = "Due date can't be in the past.";
    }
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    const task = await createTask({
      title: title.trim(),
      assignee: assignee.trim() || "Unassigned",
      status: "todo",
      dueDate,
    });
    dispatch({ type: "added", task });
    navigate("/");
  }

  return (
    <div>
      <h1>New Task</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p role="alert">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="assignee">Assignee</label>
          <input
            id="assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {errors.dueDate && <p role="alert">{errors.dueDate}</p>}
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add task"}
        </button>
      </form>
    </div>
  );
}
