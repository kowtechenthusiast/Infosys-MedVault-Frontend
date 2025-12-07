import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Clock3, // Using Clock3 for past time
  FileText,
} from "lucide-react";

export default function AppointmentCard({ data, showStatus }) {
  // Determine status styling
  const isCompleted = data.status === "Completed";
  const isCancelled = data.status === "Cancelled";

  const statusColors = isCompleted
    ? {
        bg: "bg-green-50",
        text: "text-green-600",
        icon: CheckCircle,
        hoverShadow: "hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.15)]",
      }
    : isCancelled
    ? {
        bg: "bg-red-50",
        text: "text-red-600",
        icon: XCircle,
        hoverShadow: "hover:shadow-[0_0_30px_-10px_rgba(239,68,68,0.15)]",
      }
    : {
        bg: "bg-amber-50",
        text: "text-amber-600",
        icon: Clock3,
        hoverShadow: "hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.15)]",
      };

  return (
    <div
      className={`relative group p-5 bg-white rounded-2xl border border-slate-100 transition-all duration-300 hover:-translate-y-0.5 shadow-sm 
        ${statusColors.hoverShadow}
        hover:border-blue-300 cursor-pointer
      `}
    >
      <div className="flex justify-between items-start">
        {/* Left Side: Patient & Reason */}
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <User size={20} className="text-blue-500" />
            {data.patient}
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            <span className="font-medium text-slate-700">Reason:</span>{" "}
            {data.reason}
          </p>
          <p className="text-slate-400 text-xs mt-0.5">
            Appointment ID: {data.id} | Age: {data.age}
          </p>
        </div>

        {/* Right Side: Date/Time and Status Block */}
        <div className="flex-shrink-0 text-right space-y-2">
          {/* Status Badge (Thematic Gradient) */}
          {showStatus && (
            <div className="flex items-center justify-end">
              <span
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider 
                        ${statusColors.bg} ${statusColors.text}
                    `}
              >
                <statusColors.icon size={14} />
                {data.status}
              </span>
            </div>
          )}

          {/* Time & Date (Using soft blue accent) */}
          <div className="text-sm font-semibold text-slate-600 flex items-center justify-end gap-2 pt-1">
            <Calendar size={16} className="text-teal-500" />
            {data.date}
          </div>
          <div className="text-sm font-semibold text-slate-600 flex items-center justify-end gap-2">
            <Clock size={16} className="text-cyan-500" />
            {data.time}
          </div>
        </div>
      </div>

      {/* Action Hover Button */}
      <button
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-4 py-1 text-xs font-semibold rounded-full bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:scale-105`}
      >
        <FileText size={14} className="inline-block mr-1" /> View Report
      </button>
    </div>
  );
}
