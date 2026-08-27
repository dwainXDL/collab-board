export default function Spinner({ className = "h-6 w-6" }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`${className} animate-spin rounded-full border-[3px] border-slate-700 border-t-indigo-400`}
    />
  );
}
