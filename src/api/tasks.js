import mockTasks from "../data/mockTasks";

let tasks = [...mockTasks];

const delay = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 500));

export function getTasks() {
  return delay([...tasks]);
}

export function createTask(data) {
  const newTask = { id: Date.now(), ...data };
  tasks.push(newTask);
  return delay(newTask);
}

export function updateTaskStatus(id, status) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, status } : t));
  return delay(tasks.find((t) => t.id === id));
}

export function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  return delay({ success: true });
}