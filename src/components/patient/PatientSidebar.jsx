import {
  LayoutDashboard,
  Calendar,
  Search,
  History,
  User,
  ChevronRight,
  Activity, // Used for the Logo
  LogOut,
} from "lucide-react";

export default function PatientSidebar({ current, setCurrent, userInfo }) {
  // Mock data for the logo/header (assuming userInfo exists for profile)
  const patientInfo = userInfo || {
    name: "Patient A. User",
    status: "Active Status",
  };

  const items = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "book", label: "Book Appointment", icon: Search },
    { id: "upcoming", label: "Upcoming Schedule", icon: Calendar },
    { id: "history", label: "Appointment History", icon: History },
  ];

  return (
    <aside className="w-72 h-screen bg-white border-r border-blue-100 fixed left-0 top-0 flex flex-col justify-between z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Header / Navigation Area */}
      <div className="pt-8 px-6 pb-4">
        {/* Header / Logo Area - Directly copied from DoctorSidebar for branding consistency */}
        <div className="flex items-center gap-3 text-blue-600 mb-8">
          <Activity
            size={32}
            className="drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]"
          />
          <span className="text-xl font-bold tracking-wider text-slate-800">
            MED<span className="text-blue-500">VAULT</span>
          </span>
        </div>

        {/* New: User Profile Mini-Card (Patient Version) */}
        <div className="mb-8 p-3 flex items-center gap-3 rounded-2xl bg-blue-50/50 border border-blue-100/50 shadow-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-cyan-400 to-blue-500 p-0.5 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <User size={20} className="text-cyan-500" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
              {patientInfo.name}
            </h4>
            <p className="text-xs text-slate-500 truncate">
              {patientInfo.status}
            </p>
          </div>
          <ChevronRight
            size={16}
            className="text-slate-300 group-hover:text-blue-500 transition-colors"
          />
        </div>

        {/* Navigation Items (Themed) */}
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrent(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group
                  ${
                    current === item.id
                      ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-[0_4px_20px_rgba(6,182,212,0.4)] translate-x-1" // Active Glow Styling
                      : "text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]" // Hover Styling
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

      {/* Sign Out Button (Themed) */}
      <div className="p-6 mb-4">
        <button
          className="w-full flex items-center gap-2 rounded-xl border border-red-100 text-red-500 font-medium hover:bg-red-50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300 overflow-hidden
            px-4 py-3 justify-center"
          onClick={() => alert(`Goodbye, ${patientInfo.name}!`)}
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
