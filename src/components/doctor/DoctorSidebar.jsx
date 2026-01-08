import {
  Calendar,
  BarChart3,
  TrendingUp,
  LogOut,
  Activity,
  User,
  ChevronRight,
  LayoutDashboard, // For Overview
  CalendarCheck2, // For Upcoming Sessions
  Clock9, // For Manage Slots
  ClipboardList, // For Booking Requests
  ShieldAlert, // For Emergency Requests
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";

export default function DoctorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const doctorInfo = {
    name: user?.name || "Dr. Eleanor Vance",
    specialty: user?.specialization || "Specialist",
  };

  const items = [
    {
      path: "/doctor/dashboard",
      label: "Dashboard Overview",
      icon: LayoutDashboard, // Standard professional dashboard icon
    },
    {
      path: "/doctor/dashboard/appointments",
      label: "Upcoming Sessions",
      icon: CalendarCheck2, // More specific than a plain calendar
    },
    {
      path: "/doctor/dashboard/slots",
      label: "Manage Slots",
      icon: Clock9, // Represents time availability
    },
    {
      path: "/doctor/dashboard/booking-requests",
      label: "Booking Requests",
      icon: ClipboardList, // Represents a list of pending tasks/forms
    },
    {
      path: "/doctor/dashboard/emergency-requests",
      label: "Emergency Requests",
      icon: ShieldAlert, // Matches the 'Emergency Signal' branding we created
    },
  ];

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-white border-r border-blue-100 flex flex-col justify-between z-50">
      <div className="pt-8 px-6 pb-4">
        {/* Logo */}
        <div className="flex items-center gap-3 text-blue-600 mb-8">
          <Activity size={32} />
          <span className="text-xl font-bold tracking-wider text-slate-800">
            MED<span className="text-blue-500">VAULT</span>
          </span>
        </div>

        {/* Profile Card */}
        <div className="mb-8 p-3 flex items-center gap-3 rounded-2xl bg-blue-50 border">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User size={20} />
          </div>

          <div className="flex-1">
            <h4 className="text-sm font-bold">{doctorInfo.name}</h4>
            <p className="text-xs text-slate-500">{doctorInfo.specialty}</p>
          </div>

          <ChevronRight size={16} className="text-slate-400" />
        </div>

        {/* Navigation */}
        <ul className="flex flex-col gap-3">
          {items.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg translate-x-1"
                        : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout */}
      <div className="p-6">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 border border-red-100 text-red-500 rounded-xl py-3 hover:bg-red-50"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
