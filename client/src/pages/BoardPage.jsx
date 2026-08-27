import { useTasks } from "../hooks/useTasks";
import Board from "../components/Board";
import Button from "../components/Button";

export default function BoardPage() {
  const { tasks, loading, error, retry } = useTasks();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-slate-400 font-medium animate-pulse">
          Loading tasks...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-6 text-center max-w-md w-full shadow-sm">
          <p className="text-red-400 font-medium mb-4">Error: {error}</p>
          <Button variant="danger" onClick={retry}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-4">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center max-w-md w-full shadow-sm">
          <p className="text-slate-300 font-medium text-lg mb-2">
            No tasks yet
          </p>
          <p className="text-slate-500 text-sm">Create one to get started!</p>
        </div>
      </div>
    );
  }

  return <Board />;
}
