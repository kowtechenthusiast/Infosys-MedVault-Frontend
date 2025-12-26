import {
  LayoutDashboard,
  Calendar,
  Search,
  History,
  User,
  ChevronRight,
  Activity,
  LogOut,
  ShieldCheck, // Added for a "Verified" feel
} from "lucide-react";
import { useAuth } from "../../context/useAuthContext";

export default function PatientSidebar({ current, setCurrent }) {
  // Destructure more details from your auth context
  // Adjust these keys based on what your backend/context actually returns
  const { name, user, logout } = useAuth();

  const patientInfo = {
    name: name || user?.name || "Sarah Chen",
    id: user?.id || "PAT-1004",
    email: user?.email || "sarah.c@example.com",
    role: user?.role || "PATIENT",
    // Adding a fallback for the status/subtitle line
    displayStatus: user?.bloodGroup
      ? `Blood Group: ${user.bloodGroup}`
      : "Verified Patient",
  };

  const items = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "book", label: "Book Appointment", icon: Search },
    { id: "appointment", label: "My Appointments", icon: Calendar },
    { id: "access-requests", label: "Access Requests", icon: User },
  ];

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      try {
        // if logout function exists in context
        if (logout) await logout();
        else alert(`Goodbye, ${patientInfo.name}!`);
      } catch (error) {
        console.error("Logout failed", error);
      }
    }
  };

  return (
    <aside className="w-72 h-screen bg-white border-r border-blue-100 fixed left-0 top-0 flex flex-col justify-between z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="pt-8 px-6 pb-4 flex-1 overflow-y-auto custom-scrollbar">
        {/* Logo Area */}
        <div className="flex items-center gap-3 text-blue-600 mb-8">
          <Activity
            size={32}
            className="drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]"
          />
          <span className="text-xl font-bold tracking-wider text-slate-800 uppercase">
            Med<span className="text-blue-500">Vault</span>
          </span>
        </div>

        {/* User Profile Mini-Card */}
        <div className="mb-8 p-3 flex items-center gap-3 rounded-2xl bg-blue-50/50 border border-blue-100/50 shadow-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all cursor-pointer group">
          <div className="relative w-11 h-11 rounded-full bg-linear-to-tr from-cyan-400 to-blue-500 p-0.5 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              {/* Show initials if no image */}
              <span className="text-blue-600 font-bold text-sm">
                {patientInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white w-4 h-4 rounded-full flex items-center justify-center">
              <ShieldCheck size={10} className="text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
              {patientInfo.name}
            </h4>
            <p className="text-[10px] font-medium text-blue-500 tracking-tight uppercase">
              {patientInfo.id}
            </p>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {patientInfo.displayStatus}
            </p>
          </div>
          <ChevronRight
            size={14}
            className="text-slate-300 group-hover:text-blue-500 transition-all translate-x-0 group-hover:translate-x-1"
          />
        </div>

        {/* Navigation Items */}
        <nav>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrent(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${
                      current === item.id
                        ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-[0_8px_16px_rgba(6,182,212,0.25)] translate-x-1"
                        : "text-slate-500 hover:bg-blue-50/80 hover:text-blue-600"
                    }`}
                >
                  <item.icon
                    size={20}
                    className={`${
                      current === item.id
                        ? "scale-110"
                        : "group-hover:scale-110 transition-transform"
                    }`}
                  />
                  <span
                    className={`font-semibold text-sm ${
                      current === item.id ? "opacity-100" : "opacity-90"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer / Sign Out */}
      <div className="p-6 mt-auto border-t border-slate-50">
        <button
          className="w-full flex items-center gap-2 rounded-xl border border-red-100 text-red-500 font-bold hover:bg-red-50 hover:border-red-200 transition-all duration-300 px-4 py-3 justify-center group"
          onClick={handleLogout}
        >
          <LogOut
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
