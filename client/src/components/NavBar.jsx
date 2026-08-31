import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
        {token && (
          <>
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              Board
            </Link>
            <Link
              to="/tasks/new"
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              New task
            </Link>
          </>
        )}
        <div className="ml-auto flex items-center gap-2">
          {token ? (
            <>
              {user?.email && (
                <span className="text-sm text-slate-400">{user.email}</span>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
