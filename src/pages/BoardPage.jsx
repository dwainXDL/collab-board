import { useTasks } from "../hooks/useTasks";
import Board from "../components/Board";

export default function BoardPage() {
  const { tasks, loading, error, retry } = useTasks();

  if (loading) {
    return <p style={{ padding: "16px" }}>Loading tasks…</p>;
  }

  if (error) {
    return (
      <div style={{ padding: "16px" }}>
        <p>Error: {error}</p>
        <button onClick={retry}>Retry</button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return <p style={{ padding: "16px" }}>No tasks yet. Create one to get started!</p>;
  }

  return <Board />;
}
