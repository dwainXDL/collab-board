import TaskCard from "./TaskCard";

export default function Column({ title, tasks = [], onMove, onDelete }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex flex-col min-w-[300px] w-full">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <h3 className="font-semibold text-slate-200 text-sm uppercase tracking-wider">
          {title}
        </h3>
        <span className="bg-slate-800 text-slate-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-slate-700">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="text-center text-xs text-slate-600 py-6">No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              assignee={task.assignee}
              dueDate={task.dueDate}
              status={task.status}
              onMove={onMove}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
