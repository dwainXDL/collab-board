import React from 'react';
import Column from './Column';
import FilterBar from './FilterBar';

export default function Board({ tasks = [], filters, onFilterChange, onMove, onDelete }) {
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight mb-2">
          Project Board
        </h1>
        <p className="text-slate-400 text-sm">
          Manage and track your team tasks efficiently.
        </p>
      </header>

      <FilterBar filters={filters} onFilterChange={onFilterChange} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <Column
          title="To Do"
          tasks={todoTasks}
          onMove={onMove}
          onDelete={onDelete}
        />
        <Column
          title="In Progress"
          tasks={inProgressTasks}
          onMove={onMove}
          onDelete={onDelete}
        />
        <Column
          title="Done"
          tasks={doneTasks}
          onMove={onMove}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}