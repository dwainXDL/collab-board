import { mockTasks } from "../data/mockTasks";
import Column from "./Column";

function Board() {
  const todoTasks = mockTasks.filter((task) => task.status === "todo");
  const doingTasks = mockTasks.filter((task) => task.status === "doing");
  const doneTasks = mockTasks.filter((task) => task.status === "done");

  return (
    <div style={{ display: "flex", gap: "24px", padding: "16px" }}>
      <Column title="To Do" tasks={todoTasks} />
      <Column title="Doing" tasks={doingTasks} />
      <Column title="Done" tasks={doneTasks} />
    </div>
  );
}

export default Board;