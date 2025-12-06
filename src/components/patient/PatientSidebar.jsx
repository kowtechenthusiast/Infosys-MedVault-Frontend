import { LayoutDashboard, Calendar, Search, History, User } from "lucide-react";

export default function PatientSidebar({ current, setCurrent }) {
  const items = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "book", label: "Book Appointment", icon: Search },
    { id: "upcoming", label: "Upcoming Appointments", icon: Calendar },
    { id: "history", label: "Appointment History", icon: History },
    // { id: "profile", label: "My Profile", icon: User },
  ];

  return (
    <aside className="w-72 h-screen fixed top-0 left-0 pt-24 bg-white/60 backdrop-blur-xl border-r shadow-xl">
      <ul className="flex flex-col gap-2 px-4">
        {items.map((item) => (
          <li key={item.id}>
            <button
              className={`w-full flex gap-3 items-center px-4 py-3 rounded-xl transition-all
                ${
                  current === item.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              onClick={() => setCurrent(item.id)}
            >
              <item.icon size={20} /> {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
