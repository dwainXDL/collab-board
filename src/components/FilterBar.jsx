function FilterBar({ filters, onFilterChange, teamMembers }) {
  const update = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by title..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
      />

      <select
        value={filters.status}
        onChange={(e) => update("status", e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="todo">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>

      <select
        value={filters.assignee}
        onChange={(e) => update("assignee", e.target.value)}
      >
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
