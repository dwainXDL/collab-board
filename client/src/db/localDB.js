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

export async function reconcileBoards(serverBoards) {
  const serverIds = new Set(serverBoards.map((b) => b.id));

  // Remove local boards not on server
  const local = await db.allDocs({
    startkey: "board:",
    endkey: "board:\ufff0",
    include_docs: true,
  });
  for (const row of local.rows) {
    const localId = row.doc.data?.id;
    if (localId && !serverIds.has(localId)) {
      await db.remove(row.doc);
    }
  }

  // Upsert server boards
  await putBoards(serverBoards);
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

export async function reconcileTasks(boardId, serverTasks) {
  const serverIds = new Set(serverTasks.map((t) => t.id));

  // Remove local tasks for this board not on server
  const local = await db.allDocs({
    startkey: "task:",
    endkey: "task:\ufff0",
    include_docs: true,
  });
  for (const row of local.rows) {
    const task = row.doc.data;
    if (task?.boardId === boardId && !serverIds.has(task.id)) {
      await db.remove(row.doc);
    }
  }

  // Upsert server tasks
  await putTasks(serverTasks);
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

// --- Outbox (offline write queue) ---

export async function enqueueWrite(intent) {
  const doc = {
    _id: `pending:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
    data: intent,
  };
  await db.put(doc);
}

export async function getPendingWrites() {
  const result = await db.allDocs({
    startkey: "pending:",
    endkey: "pending:\ufff0",
    include_docs: true,
  });
  return result.rows.map((r) => ({ _id: r.doc._id, _rev: r.doc._rev, ...r.doc.data }));
}

export async function removePendingWrite(id) {
  try {
    const doc = await db.get(id);
    await db.remove(doc);
  } catch {
    // already removed
  }
}

// --- Cleanup ---

export async function clearAll() {
  await db.destroy();
  db = new PouchDB("collabboard");
}
