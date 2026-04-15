import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/tracker", label: "Placement Tracker", icon: "💼" },
  { path: "/resume-analyzer", label: "Resume Analyzer", icon: "📄" },
  { path: "/mock-questions", label: "Mock Questions", icon: "🎯" },
];

const Layout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-3 sm:p-5">
      <div className="mx-auto max-w-7xl">
        <header className="glass-card mb-4 flex flex-col gap-3 px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">PlaceMate AI</p>
            <h1 className="text-xl font-semibold">AI Placement & Career Readiness Platform</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-indigo-100">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-full border border-rose-300/40 bg-rose-500/20 px-4 py-1.5 text-sm text-rose-100 transition hover:bg-rose-500/40"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-[260px_1fr]">
          <aside className="glass-card h-fit p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
              Navigation
            </p>
            <nav className="space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2.5 text-sm text-white transition ${
                    isActive
                      ? "bg-indigo-500/30 shadow-[0_0_0_1px_rgba(165,180,252,0.35)]"
                      : "bg-white/5 hover:bg-white/10"
                  }`
                }
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
            </nav>
          </aside>

          <main className="glass-card p-4 sm:p-6">
            <Outlet />
          </main>
        </div>

        <footer className="mt-4 px-2 text-center text-xs text-slate-300">
          PlaceMate AI - AI Placement & Career Readiness Platform
        </footer>
      </div>
    </div>
  );
};

export default Layout;
