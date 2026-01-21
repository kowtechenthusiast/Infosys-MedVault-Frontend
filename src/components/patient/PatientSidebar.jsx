import {
  LayoutDashboard,
  Calendar,
  Search,
  User,
  ChevronRight,
  Activity,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function PatientSidebar() {
  const { name, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const patientInfo = {
    name: name || user?.name || "Sarah Chen",
    id: user?.id || "PAT-1004",
    email: user?.email || "sarah.c@example.com",
    role: "PATIENT",
  };

  const items = [
    { path: "/patient/dashboard", label: "Overview", icon: LayoutDashboard },
    {
      path: "/patient/dashboard/book",
      label: "Book Appointment",
      icon: Search,
    },
    {
      path: "/patient/dashboard/appointments",
      label: "My Appointments",
      icon: Calendar,
    },
    {
      path: "/patient/dashboard/access-requests",
      label: "Access Requests",
      icon: User,
    },
    {
      path: "/patient/dashboard/emergency-requests",
      label: "Emergency Requests",
      icon: Activity,
    },
  ];

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      if (logout) await logout();
    }
  };

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-white border-r border-blue-100 flex flex-col justify-between z-50">
      <div className="pt-8 px-6 flex-1">
        {/* Logo */}
        <div className="flex items-center gap-3 text-blue-600 mb-8">
          <Activity size={32} />
          <span className="text-xl font-bold uppercase">
            Med<span className="text-blue-500">Vault</span>
          </span>
        </div>

        {/* Profile */}
        <div className="mb-8 p-3 flex items-center gap-3 rounded-2xl bg-blue-50">
          <div className="relative w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {patientInfo.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full flex items-center justify-center">
              <ShieldCheck size={10} className="text-white" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold">{patientInfo.name}</h4>
            <p className="text-xs text-blue-500">{patientInfo.id}</p>
            <p className="text-xs bolder text-blue-800 font-bold">
              {patientInfo.role}
            </p>
          </div>
          <ChevronRight size={14} className="ml-auto text-slate-400" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-500 hover:bg-blue-50"
                  }`}
              >
                <item.icon size={18} />
                <span className="font-semibold text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6 ">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-red-500 font-bold border border-red-100 rounded-xl py-3 hover:bg-red-50"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
