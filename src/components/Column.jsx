import TaskCard from "./TaskCard";

export default function Column({ title, tasks, onMove, onDelete }) {
  return (
    <div
      style={{
        background: "#f4f4f4",
        color: "#222",
        borderRadius: "8px",
        padding: "12px",
        minWidth: "220px",
      }}
    >
      <h2 style={{ color: "#222" }}>
        {title} ({tasks.length})
      </h2>
      {tasks.map((task) => (
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
      ))}
    </div>
  );
}
