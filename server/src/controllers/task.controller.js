// filled in by task CRUD issue (create/update/remove/listByBoard)
const todo = (req, res) =>
  res.status(501).json({ message: "NOT IMPLEMENTED", code: "NOT_IMPLEMENTED" });

export const create = todo;
export const update = todo;
export const remove = todo;
export const listByBoard = todo; // GET /api/boards/:id/tasks
