import { useState } from "react";
import { Search, UserMinus } from "lucide-react";

export default function ControlMenu() {
  const [query, setQuery] = useState("");

  const data = [
    { id: 1, name: "Dr. Ajay Kumar", role: "doctor" },
    { id: 2, name: "Dr. Neha Singh", role: "doctor" },
    { id: 3, name: "Admin Raghav", role: "admin" },
  ];

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Control Menu</h2>

      <div className="relative w-96">
        <input
          type="text"
          placeholder="Search doctor or admin..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute top-3 right-3 text-gray-500" size={20} />
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white/70 backdrop-blur-xl border rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.role.toUpperCase()}</p>
            </div>

            <button className="px-4 py-2 bg-red-600 text-white rounded-xl flex items-center gap-2 hover:bg-red-700">
              <UserMinus size={18} /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
