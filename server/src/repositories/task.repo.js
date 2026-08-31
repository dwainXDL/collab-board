// In-memory store (M2 stage - swapped for Mongoose in M3).
const tasks = [];

export const taskRepository = {
  findByBoard(boardId) {
    return tasks.filter((t) => t.boardId === boardId);
  },

  findById(id) {
    return tasks.find((t) => t.id === id) ?? null;
  },

  // receives a fully-formed task
  create(task) {
    tasks.push(task);
    return task;
  },

  update(id, patch) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;
    Object.assign(task, patch);
    return task;
  },

  remove(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};
