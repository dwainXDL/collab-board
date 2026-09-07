import Button from "./Button";

export default function ConflictDialog({ conflict, onAcceptServer, onForce }) {
  if (!conflict) return null;

  const { current, yourChange } = conflict;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-lg font-bold text-slate-100 mb-2">
          Conflict Detected
        </h2>
        <p className="text-sm text-slate-400 mb-4">
          This task was updated by someone else. Choose which version to keep.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase mb-2">
              Server (current)
            </h3>
            <p className="text-sm text-slate-200">
              Status: <span className="font-medium">{current.status}</span>
            </p>
            {current.assignee && (
              <p className="text-sm text-slate-200">
                Assignee: {current.assignee}
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              Version {current.version}
            </p>
          </div>

          <div className="bg-slate-950 border border-indigo-800 rounded-xl p-3">
            <h3 className="text-xs font-semibold text-indigo-400 uppercase mb-2">
              Your change
            </h3>
            <p className="text-sm text-slate-200">
              Status: <span className="font-medium">{yourChange.status}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onAcceptServer}>
            Keep server
          </Button>
          <Button variant="primary" onClick={onForce}>
            Force mine
          </Button>
        </div>
      </div>
    </div>
  );
}
