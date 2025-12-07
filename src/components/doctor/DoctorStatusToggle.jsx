import { useState } from "react";
import { Clock, CircleCheck, AlertTriangle } from "lucide-react"; // Using CircleCheck for "Available"

export default function DoctorStatusToggle() {
  // TRUE = Available to take appointments
  // FALSE = Busy/Unavailable
  const [enabled, setEnabled] = useState(true);

  return (
    // Component wrapper: Professional, slightly wider
    <div className="flex items-center justify-between p-1 bg-white rounded-xl border border-blue-100 shadow-lg max-w-md mx-auto">
      {/* 🟢 Available Button */}
      <button
        onClick={() => setEnabled(true)}
        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-md font-bold transition-all duration-300
            ${
              enabled
                ? // Active (Available): Use the theme's primary gradient
                  "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_4px_15px_rgba(59,130,246,0.5)]"
                : // Inactive (Available): Use muted slate text
                  "text-slate-500 hover:text-blue-600 hover:bg-slate-50"
            }`}
      >
        <CircleCheck
          size={20}
          className={enabled ? "text-white" : "text-blue-500"}
        />
        Available for Appointments
      </button>

      {/* 🟡 Busy Button */}
      <button
        onClick={() => setEnabled(false)}
        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-md font-bold transition-all duration-300
            ${
              !enabled
                ? // Active (Busy): Use a warning/neutral dark color
                  "bg-amber-600 text-white shadow-[0_4px_15px_rgba(245,158,11,0.5)]"
                : // Inactive (Busy): Use muted slate text
                  "text-slate-500 hover:text-amber-600 hover:bg-slate-50"
            }`}
      >
        <Clock
          size={20}
          className={!enabled ? "text-white" : "text-amber-500"}
        />
        Currently Unavailable
      </button>
    </div>
  );
}
