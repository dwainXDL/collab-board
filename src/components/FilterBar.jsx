import React from 'react';

export default function FilterBar({ filters = { search: '', status: '', assignee: '' }, onFilterChange }) {
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
          onChange={(e) => update('search', e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.status}
          onChange={(e) => update('status', e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={filters.assignee}
          onChange={(e) => update('assignee', e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="">All Assignees</option>
          <option value="Unassigned">Unassigned</option>
        </select>
      </div>
    </div>
  );
}