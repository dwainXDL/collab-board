import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../api/tasks";
import { useTasks } from "../hooks/useTasks";
import Button from "../components/Button";
import DueDateCalendar from "../components/DueDateCalendar";

export default function NewTaskPage() {
  const { tasks, dispatch, boardId } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const today = new Date().toLocaleDateString("en-CA"); // local YYYY-MM-DD

  function validate() {
    const next = {};
    if (title.trim().length < 3) {
      next.title = "Title is required and must be at least 3 characters.";
    }
    if (!dueDate) {
      next.dueDate = "Due date is required.";
    } else if (dueDate < today) {
      next.dueDate = "Due date can't be in the past.";
    }
    return next;
  }

  const taskByDate = tasks.reduce((acc, task) => {
    if (!task.dueDate) return acc; 
    const key = task.dueDate.slice(0, 10); // "YYYY-MM-DD" from a string or a Date's ISO
    (acc[key] ||= []).push(task);
    return acc;
  }, {});

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    const task = await createTask({
      boardId,
      title: title.trim(),
      assignee: assignee.trim() || "Unassigned",
      status: "todo",
      dueDate,
    });
    dispatch({ type: "added", task });
    navigate("/");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-100 tracking-tight mb-6">
        New Task
      </h1>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full bg-slate-950 border ${
                errors.title
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-slate-800 focus:border-indigo-500"
              } rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors`}
              placeholder="E.g., Update user documentation"
            />
            {errors.title && (
              <p role="alert" className="text-red-400 text-xs mt-1.5">
                {errors.title}
              </p>
            )}
          </div>

          {/* Assignee Input */}
          <div>
            <label
              htmlFor="assignee"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Assignee
            </label>
            <input
              id="assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="E.g., Nisith"
            />
          </div>

          {/* Due Date Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Due date
            </label>
            <DueDateCalendar
              value={dueDate}
              onChange={setDueDate}
              taskByDate={taskByDate}
            />
            {errors.dueDate && (
              <p role="alert" className="text-red-400 text-xs mt-1.5">
                {errors.dueDate}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-end">
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Adding..." : "Add task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
