import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  UserCog,
  Settings,
} from "lucide-react";

export default function AdminSidebar({ current, setCurrent }) {
  const items = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "doctor", label: "Doctor Verification", icon: Users },
    { id: "admin", label: "Admin Verification", icon: ShieldCheck },
    { id: "control", label: "Control Menu", icon: UserCog },
  ];

  return (
    <aside className="w-72 h-screen bg-white/60 backdrop-blur-xl shadow-xl border-r border-gray-200 fixed left-0 top-0 pt-24">
      <ul className="flex flex-col gap-1 px-4">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setCurrent(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all 
              ${
                current === item.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
