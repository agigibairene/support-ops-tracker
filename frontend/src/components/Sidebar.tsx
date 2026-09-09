import { NavLink } from "react-router-dom";
import { Activity, BarChart3, ChevronDown, ClipboardList, Home, LogOut, Settings, ShieldCheck, User, } from "lucide-react";

interface SidebarLink {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number, className?: string }>;
}

const links: SidebarLink[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    label: "Activities",
    path: "/activities",
    icon: Activity,
  },
  {
    label: "Daily Log",
    path: "/daily-log",
    icon: ClipboardList,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 text-slate-300">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
          <ShieldCheck size={22} className="text-white" />
        </div>

        <div>
          <h1 className="text-sm font-bold tracking-wide text-white">
            AppSupport
          </h1>
          <p className="text-[11px] text-slate-500">Support Team</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
          Workspace
        </p>

        {links.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              [
                "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.4 : 2}
                  className="shrink-0"
                />
                <span>{label}</span>

                {label === "Activities" && (
                  <span
                    className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-amber-400/10 text-amber-400"
                    }`}
                  >
                    5
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}

        <div className="my-6 border-t border-white/10" />

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
          Account
        </p>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
              isActive
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <User size={19} />
          Profile
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
              isActive
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Settings size={19} />
          Settings
        </NavLink>
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
            JD
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              Jane Doe
            </p>
            <p className="truncate text-[11px] text-slate-500">
              Support Team
            </p>
          </div>

          <button
            type="button"
            aria-label="Open profile menu"
            className="rounded-lg p-1 text-slate-500 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronDown size={16} />
          </button>
        </div>

        <button
          type="button"
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
