import { useState } from "react";
import { Search, UserMinus, User, UserCog, AlertTriangle } from "lucide-react";

export default function ControlMenu() {
  const [query, setQuery] = useState("");

  const data = [
    { id: 1, name: "Dr. Ajay Kumar", role: "doctor" },
    { id: 2, name: "Dr. Neha Singh", role: "doctor" },
    { id: 3, name: "Admin Raghav Sharma", role: "admin" },
    { id: 4, name: "Dr. Sumit Patel", role: "doctor" },
    { id: 5, name: "Admin Meera Desai", role: "admin" },
  ];

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Thematic Header */}
      <div className="pb-4 border-b border-slate-50">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            System Access Control
          </span>
        </h2>
        <p className="text-sm text-slate-500 flex items-center gap-1">
          <AlertTriangle size={16} className="text-red-500" />
          **Caution:** Management changes take effect immediately.
        </p>
      </div>

      {/* Thematic Search Bar */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search doctor or admin by name..."
          className="w-full py-3 pl-12 pr-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm shadow-sm hover:shadow-md"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search
          className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
          size={20}
        />
      </div>

      {/* Filtered User List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((item) => {
            const isDoctor = item.role === "doctor";
            const Icon = isDoctor ? User : UserCog;
            const roleColors = isDoctor
              ? { bg: "bg-blue-50", text: "text-blue-600" }
              : { bg: "bg-purple-50", text: "text-purple-600" };

            return (
              <div
                key={item.id}
                className="p-4 bg-white rounded-2xl border border-slate-100 flex justify-between items-center transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  {/* Role Icon */}
                  <div
                    className={`p-3 rounded-full ${roleColors.bg} ${roleColors.text} flex-shrink-0`}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Name and Role */}
                  <div>
                    <p className="text-lg font-bold text-slate-800">
                      {item.name}
                    </p>
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider ${roleColors.text}`}
                    >
                      {item.role.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Remove Button (Thematic Gradient Style) */}
                <button
                  className="px-5 py-2 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/40 hover:scale-[1.02]"
                  onClick={() =>
                    console.log(`Attempting to remove ${item.name}`)
                  }
                >
                  <UserMinus size={18} />
                  Deactivate
                </button>
              </div>
            );
          })
        ) : (
          <div className="p-6 text-center text-slate-500 bg-white rounded-xl border border-slate-100">
            No users found matching "{query}".
          </div>
        )}
      </div>
    </div>
  );
}
