import TaskCard from "./TaskCard";
function Column({ title, tasks }) {
  return (
    <div style={{ background: "#f4f4f4", color: "#222", borderRadius: "8px", padding: "12px", minWidth: "220px" }}>
      <h2 style={{ color: "#222" }}>{title} ({tasks.length})</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          assignee={task.assignee}
          dueDate={task.dueDate}
        />
      ))}
    </div>
  );
}

export default Column;