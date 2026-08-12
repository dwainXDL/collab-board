export function filterTasks(tasks, { status, assignee, search }) {
  return tasks.filter((task) => {
    const statusMatch = status === 'all' || task.status === status;
    const assigneeMatch = assignee === 'all' || task.assignee === assignee;
    const searchMatch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return statusMatch && assigneeMatch && searchMatch;
  });
}