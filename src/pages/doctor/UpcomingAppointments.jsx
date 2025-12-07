import {
  Plus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

// --- Expanded Mock Data for Pagination ---
const ALL_APPOINTMENTS = [
  {
    id: 1,
    patient: "Ramesh Kumar",
    age: 32,
    time: "10:30 AM",
    date: "14 Jan",
    reason: "Chest Pain",
  },
  {
    id: 2,
    patient: "Priya Narayan",
    age: 27,
    time: "12:00 PM",
    date: "14 Jan",
    reason: "Skin Allergy",
  },
  {
    id: 3,
    patient: "Julian Vos",
    age: 45,
    time: "02:00 PM",
    date: "14 Jan",
    reason: "Routine Follow-up",
  },
  {
    id: 4,
    patient: "Anjali Sharma",
    age: 58,
    time: "03:30 PM",
    date: "14 Jan",
    reason: "Post-op Check",
  },
  {
    id: 5,
    patient: "David Lee",
    age: 61,
    time: "04:45 PM",
    date: "14 Jan",
    reason: "Critical Analysis",
  },
  {
    id: 6,
    patient: "Fatima Zahra",
    age: 19,
    time: "09:00 AM",
    date: "15 Jan",
    reason: "Fever",
  },
  {
    id: 7,
    patient: "Chen Wei",
    age: 40,
    time: "10:15 AM",
    date: "15 Jan",
    reason: "Annual Physical",
  },
  {
    id: 8,
    patient: "Maria Garcia",
    age: 22,
    time: "11:30 AM",
    date: "15 Jan",
    reason: "Sports Injury",
  },
];

// --- MODIFIED ThemedAppointmentCard (Smaller and Expandable) ---
const ThemedAppointmentCard = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isUrgent =
    data.reason.toLowerCase().includes("pain") ||
    data.reason.toLowerCase().includes("critical");
  const color = isUrgent
    ? { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" }
    : { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" };

  const ExpandIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div
      className={`relative rounded-2xl border ${color.border} bg-white transition-all duration-300 hover:shadow-md hover:border-blue-300 cursor-pointer`}
    >
      {/* Small/Condensed Block (Always visible) */}
      <div
        className="p-4 flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)} // Toggle on click
      >
        {/* Time - Primary Metric */}
        <div
          className={`flex items-center gap-3 ${
            isUrgent ? "text-red-500" : "text-teal-500"
          }`}
        >
          <Clock size={20} className="shrink-0" />
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
            {data.time}
          </span>
        </div>

        {/* Patient and Reason (Condensed) */}
        <div className="flex-1 min-w-0 mx-4 hidden sm:block">
          <p className="font-semibold text-slate-800 truncate">
            {data.patient}
          </p>
          <p className="text-xs text-slate-500 truncate">{data.reason}</p>
        </div>

        {/* Action Button/Indicator */}
        <div className="flex items-center gap-2 text-blue-600">
          {isUrgent && (
            <AlertTriangle size={18} className="text-red-500 fill-red-500/10" />
          )}
          <span className="text-sm font-semibold hidden md:inline">
            {isExpanded ? "Hide Details" : "View Details"}
          </span>
          <ExpandIcon size={20} className="transition-transform" />
        </div>
      </div>

      {/* Expanded Details (Toggled visibility) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 border-t border-slate-100 p-4" : "max-h-0"
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="flex items-center gap-3">
            <User size={18} className="text-blue-500" />
            <div>
              <p className="text-xs text-slate-400">Patient</p>
              <p className="font-semibold text-slate-700">{data.patient}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`p-1 rounded-full ${color.bg} ${color.text} text-xs font-bold w-6 h-6 flex items-center justify-center`}
            >
              {data.age}
            </span>
            <div>
              <p className="text-xs text-slate-400">Age</p>
              <p className="font-semibold text-slate-700">{data.age} yrs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-teal-500" />
            <div>
              <p className="text-xs text-slate-400">Date</p>
              <p className="font-semibold text-slate-700">{data.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-2 md:col-span-1">
            <AlertTriangle
              size={18}
              className={isUrgent ? "text-red-500" : "text-amber-500"}
            />
            <div>
              <p className="text-xs text-slate-400">Reason</p>
              <p className="font-semibold text-slate-700">{data.reason}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN UpcomingAppointments Component ---
export default function UpcomingAppointments() {
  const APPOINTMENTS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalAppointments = ALL_APPOINTMENTS.length;
  const totalPages = Math.ceil(totalAppointments / APPOINTMENTS_PER_PAGE);

  // Get current page data
  const startIndex = (currentPage - 1) * APPOINTMENTS_PER_PAGE;
  const endIndex = startIndex + APPOINTMENTS_PER_PAGE;
  const currentAppointments = ALL_APPOINTMENTS.slice(startIndex, endIndex);

  // Pagination Handlers
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)]">
      {/* Header (New Booking Button Removed) */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Today's Schedule
          </span>
        </h2>
        {/* Removed 'New Booking' Button */}
      </div>

      {/* Appointment List - Using the Themed Card */}
      <div className="space-y-3">
        {" "}
        {/* Reduced space-y for higher density */}
        {currentAppointments.map((appt) => (
          <ThemedAppointmentCard key={appt.id} data={appt} />
        ))}
      </div>

      {/* Footer / Pagination & Summary Action */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
        {/* Summary Text */}
        <p className="text-sm text-slate-500">
          Displaying **{startIndex + 1}-{Math.min(endIndex, totalAppointments)}
          ** of **{totalAppointments}** sessions.
        </p>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-sm font-semibold text-slate-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          {/* View Full Calendar Button */}
          <a
            href="#"
            className="ml-4 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors hidden sm:inline-flex"
          >
            View Full Calendar
          </a>
        </div>
      </div>
    </div>
  );
}
