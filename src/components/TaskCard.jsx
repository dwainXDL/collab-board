import React from 'react';
import Button from './Button';

export default function TaskCard({ id, title, assignee, dueDate, status, onMove, onDelete }) {
  return (
    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700 transition-all shadow-sm group flex flex-col justify-between gap-3">
      <div>
        <h4 className="font-medium text-slate-100 text-sm mb-2">{title}</h4>
        
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="bg-slate-900 border border-slate-800 rounded-md px-2 py-0.5">
            👤 {assignee || 'Unassigned'}
          </span>
          {dueDate && (
            <span className="bg-slate-900 border border-slate-800 rounded-md px-2 py-0.5">
              📅 {dueDate}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/50 mt-1">
        <div className="flex items-center gap-1.5">
          {status !== 'todo' && (
            <Button
              variant="secondary"
              onClick={() => onMove(id, status === 'done' ? 'in_progress' : 'todo')}
            >
              ← Back
            </Button>
          )}
          {status !== 'done' && (
            <Button
              variant="primary"
              onClick={() => onMove(id, status === 'todo' ? 'in_progress' : 'done')}
            >
              Next →
            </Button>
          )}
        </div>

        <Button variant="danger" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}