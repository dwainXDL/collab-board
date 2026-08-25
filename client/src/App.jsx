import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { TasksProvider } from "./context/TasksProvider";
import BoardPage from "./pages/BoardPage";
import NewTaskPage from "./pages/NewTaskPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <TasksProvider>
      <BrowserRouter>
        <nav className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
            >
              Board
            </Link>
            <Link
              to="/tasks/new"
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              New task
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/tasks/new" element={<NewTaskPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TasksProvider>
  );
}
