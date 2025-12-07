import {
  Stethoscope,
  Calendar,
  Clock,
  MapPin,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

export default function AppointmentCard({ data }) {
  // Use a status color for visual prominence
  const statusColor = "text-green-600"; // Assuming appointments are confirmed

  return (
    // THEMED WRAPPER: Elevated card styling with hover glow and lift
    <div
      className="p-6 bg-white rounded-2xl border border-slate-100 
                 transition-all duration-300 hover:-translate-y-0.5 group
                 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] 
                 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] 
                 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
    >
      {/* 1. Doctor and Specialty Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-2xl font-extrabold text-slate-800 drop-shadow-sm group-hover:text-blue-600 transition-colors truncate">
          {data.doctor}
        </h3>

        <p
          className={`text-lg font-medium ${statusColor} flex items-center gap-2 mt-1`}
        >
          <Stethoscope size={18} className="text-cyan-500" />
          Specialist: {data.specialization}
        </p>

        <p className="text-sm text-slate-500 flex items-center gap-2 mt-2">
          <MapPin size={14} className="text-red-500" />
          Location: {data.location}
        </p>
      </div>

      {/* 2. Date and Time (Gradient Accent) */}
      <div className="text-center md:text-right shrink-0 md:ml-6">
        {/* Date and Time highlighted with theme gradient */}
        <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
          {data.date}
        </p>
        <p className="text-xl font-bold text-slate-700 flex items-center gap-1 justify-center md:justify-end">
          <Clock size={18} className="text-blue-500" />
          {data.time}
        </p>
      </div>

      {/* 3. Actions */}
      <div className="flex flex-col gap-2 w-full md:w-auto md:ml-8 shrink-0">
        {/* View Details Button (Primary Action) */}
        {/* <button
          className="px-4 py-2.5 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl 
                       shadow-[0_4px_15px_rgba(6,182,212,0.4)] hover:shadow-[0_8px_25px_rgba(6,182,212,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
        >
          View Details <ChevronRight size={16} />
        </button> */}

        {/* Cancel Button (Secondary/Warning Action) */}
        <button
          className="px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 font-medium rounded-xl 
                       hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <AlertTriangle size={16} /> Cancel
        </button>
      </div>
    </div>
  );
}
