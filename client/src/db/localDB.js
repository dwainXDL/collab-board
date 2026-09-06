import PouchDB from "pouchdb-browser";

let db = new PouchDB("collabboard");

// --- Boards ---

export async function getLocalBoards() {
  const result = await db.allDocs({
    startkey: "board:",
    endkey: "board:\ufff0",
    include_docs: true,
  });
  return result.rows.map((r) => r.doc.data);
}

export async function putBoards(boards) {
  for (const board of boards) {
    const doc = { _id: `board:${board.id}`, data: board };
    try {
      const existing = await db.get(doc._id);
      doc._rev = existing._rev;
    } catch {
      // new doc
    }
    await db.put(doc);
  }
}

// --- Tasks ---

export async function getLocalTasks(boardId) {
  const result = await db.allDocs({
    startkey: "task:",
    endkey: "task:\ufff0",
    include_docs: true,
  });
  const tasks = result.rows.map((r) => r.doc.data);
  return boardId ? tasks.filter((t) => t.boardId === boardId) : tasks;
}

export async function putTasks(tasks) {
  for (const task of tasks) {
    const doc = { _id: `task:${task.id}`, data: task };
    try {
      const existing = await db.get(doc._id);
      doc._rev = existing._rev;
    } catch {
      // new doc
    }
    await db.put(doc);
  }
}

export async function putTask(task) {
  const doc = { _id: `task:${task.id}`, data: task };
  try {
    const existing = await db.get(doc._id);
    doc._rev = existing._rev;
  } catch {
    // new doc
  }
  await db.put(doc);
}

export async function removeTask(id) {
  try {
    const doc = await db.get(`task:${id}`);
    await db.remove(doc);
  } catch {
    // already deleted or not found
  }
}

// --- Cleanup ---

export async function clearAll() {
  await db.destroy();
  db = new PouchDB("collabboard");
}
