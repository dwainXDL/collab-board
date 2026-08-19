import { useParams, Link } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks } = useTasks();
  const task = tasks.find((t) => t.id === id);

  // TODO: when real API is wired, !task is true during loading — add a loading state to avoid flashing "not found"
  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center max-w-md w-full shadow-sm">
          <h2 className="text-xl font-bold text-slate-100 mb-2">
            Task not found
          </h2>
          <p className="text-slate-400 mb-6">No task exists with that ID.</p>
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            &larr; Back to board
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors mb-6"
      >
        &larr; Back to board
      </Link>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-100 mb-6 tracking-tight">
          {task.title}
        </h2>

        <div className="flex flex-col gap-4 border-t border-slate-800/50 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm font-medium">Assignee</span>
            <span className="text-slate-200 font-medium bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800/80">
              {task.assignee || "Unassigned"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm font-medium">Status</span>
            <span className="text-slate-200 font-medium bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800/80 uppercase text-xs tracking-wider">
              {task.status.replace("_", " ")}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm font-medium">Due date</span>
            <span className="text-slate-200 font-medium bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800/80">
              {task.dueDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
