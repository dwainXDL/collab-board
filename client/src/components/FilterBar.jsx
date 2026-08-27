export default function FilterBar({
  filters,
  onFilterChange,
  teamMembers = [],
}) {
  const update = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6 backdrop-blur-md flex flex-wrap gap-4 items-center justify-between">
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.status}
          onChange={(e) => update("status", e.target.value)}
          className="filter-select bg-slate-950 border border-slate-800 rounded-xl pl-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>

        <select
          value={filters.assignee}
          onChange={(e) => update("assignee", e.target.value)}
          className="filter-select bg-slate-950 border border-slate-800 rounded-xl pl-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="all">All Assignees</option>
          {teamMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
