import {
  LayoutDashboard,
  Users,
  Stethoscope,
  ShieldCheck,
  UserCog,
  Settings,
  LogOut,
  Activity, // Used for Logo
  User, // Used for User Profile Icon
  ChevronRight,
} from "lucide-react";

export default function AdminSidebar({ current, setCurrent }) {
  // Mock Admin Info for the profile card
  const adminInfo = {
    name: "System Admin",
    role: "Global Control",
  };

  const items = [
    { id: "overview", label: "System Overview", icon: LayoutDashboard }, // Updated Label
    { id: "patient", label: "Patient Verification", icon: Users },
    { id: "doctor", label: "Doctor Verification", icon: Stethoscope },
    { id: "admin", label: "Role Management", icon: ShieldCheck }, // Updated Label
    { id: "control", label: "Module Control", icon: UserCog }, // Updated Label
  ];

  return (
    <aside className="w-72 h-screen bg-white border-r border-blue-100 fixed left-0 top-0 flex flex-col justify-between z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Top Section: Logo, Profile, and Navigation */}
      <div>
        {/* Header / Logo Area (Copied from DoctorSidebar) */}
        <div className="pt-8 px-6 pb-4">
          <div className="flex items-center gap-3 text-blue-600 mb-8">
            <Activity
              size={32}
              className="drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]"
            />
            <span className="text-xl font-bold tracking-wider text-slate-800">
              MED<span className="text-blue-500">VAULT</span>
            </span>
          </div>

          {/* User Profile Mini-Card (Thematic Copy) */}
          <div className="mb-8 p-3 flex items-center gap-3 rounded-2xl bg-blue-50/50 border border-blue-100/50 shadow-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-cyan-400 p-0.5 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                {/* Admin icon is dark to signify system control */}
                <UserCog size={20} className="text-cyan-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                {adminInfo.name}
              </h4>
              <p className="text-xs text-slate-500 truncate">
                {adminInfo.role}
              </p>
            </div>
            <ChevronRight
              size={16}
              className="text-slate-300 group-hover:text-blue-500 transition-colors"
            />
          </div>

          {/* Navigation Items (Thematic Copy) */}
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrent(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group
                    ${
                      current === item.id
                        ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-[0_4px_20px_rgba(6,182,212,0.4)] translate-x-1"
                        : "text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                    }`}
                >
                  <item.icon
                    size={20}
                    className={current === item.id ? "animate-pulse" : ""}
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Section: Settings and Logout */}
      <div className="p-6 mb-4 space-y-3 border-t border-slate-100/70">
        {/* Sign Out Button (Thematic Copy) */}
        <button
          className="w-full flex items-center gap-2 rounded-xl border border-red-100 text-red-500 font-medium hover:bg-red-50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300 overflow-hidden
            px-4 py-3 justify-center"
          onClick={() => alert(`Admin logging out...`)}
        >
          <LogOut size={18} className="shrink-0" />
          <span className="whitespace-nowrap transition-all duration-300 opacity-100">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
}
