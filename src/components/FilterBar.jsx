import { useState } from 'react';

function FilterBar({ onFilterChange, teamMembers }) {
  const [status, setStatus] = useState('all');
  const [assignee, setAssignee] = useState('all');
  const [search, setSearch] = useState('');

  function handleStatusChange(e) {
    const value = e.target.value;
    setStatus(value);
    onFilterChange({ status: value, assignee, search });
  }

  function handleAssigneeChange(e) {
    const value = e.target.value;
    setAssignee(value);
    onFilterChange({ status, assignee: value, search });
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ status, assignee, search: value });
  }

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={handleSearchChange}
      />

      <select value={status} onChange={handleStatusChange}>
        <option value="all">All Status</option>
        <option value="todo">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>

      <select value={assignee} onChange={handleAssigneeChange}>
        <option value="all">All Assignees</option>
        {teamMembers.map((member) => (
          <option key={member} value={member}>
            {member}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;