export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center shadow-sm">
        <h1 className="text-6xl font-bold text-slate-100 mb-4">404</h1>
        <p className="text-lg text-slate-400 font-medium">
          Oops! The page you are looking for was not found.
        </p>
      </div>
    </div>
  );
}
