import { useState } from "react";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function toDateStr(year, month, day) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export default function DueDateCalendar({ value, onChange, taskByDate }) {
  const initial = value ? new Date(value) : new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const todayStr = new Date().toLocaleDateString("en-CA"); // local YYYY-MM-DD

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  function goToPrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  const cells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  return (
    <div className="due-date-calendar bg-slate-950 border border-slate-800 rounded-xl p-4">
      <div className="due-date-calendar-header flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={goToPrevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          &lt;
        </button>
        <span className="text-sm font-medium text-slate-200">
          {new Date(viewYear, viewMonth).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          type="button"
          onClick={goToNextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          &gt;
        </button>
      </div>

      <div className="due-date-calendar-grid grid grid-cols-7 gap-1">
        {WEEKDAYS.map((wd, i) => (
          <div
            key={i}
            className="due-date-calendar-weekday text-xs font-medium text-slate-500 text-center py-1"
          >
            {wd}
          </div>
        ))}

        {cells.map((day, i) => {
          if (day === null) {
            return <div key={i} className="due-date-calendar-cell empty" />;
          }

          const dateStr = toDateStr(viewYear, viewMonth, day);
          const tasksOnDay = taskByDate[dateStr] || [];
          const isMarked = tasksOnDay.length > 0;
          const isSelected = dateStr === value;
          const isPast = dateStr < todayStr;

          const tooltip = isMarked
            ? tasksOnDay.map((t) => `${t.title} (${t.assignee})`).join(", ")
            : undefined;

          return (
            <button
              key={i}
              type="button"
              disabled={isPast}
              title={tooltip}
              onClick={() => onChange(dateStr)}
              className={`due-date-calendar-cell relative aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                isPast
                  ? "text-slate-700 cursor-not-allowed"
                  : isSelected
                    ? "marked selected bg-indigo-500 text-white font-semibold"
                    : isMarked
                      ? "marked text-indigo-300 hover:bg-slate-800"
                      : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {day}
              {isMarked && !isSelected && !isPast && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
