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
        <nav>
          <Link to="/">Board</Link> · <Link to="/tasks/new">New task</Link>
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
