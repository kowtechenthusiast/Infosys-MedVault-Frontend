import { Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
// Assuming the AppointmentCard import now uses the styled component above
import AppointmentCard from "../../components/doctor/AppointmentCard";

export default function AppointmentHistory() {
  // --- Data Definition (Moved to top for clarity) ---
  const ALL_HISTORY = [
    {
      id: 101,
      patient: "Naveen Gupta",
      age: 40,
      time: "4:30 PM",
      date: "10 Jan",
      reason: "Diabetes Follow-up",
      status: "Completed",
    },
    {
      id: 102,
      patient: "Lakshmi Devi",
      age: 55,
      time: "11:00 AM",
      date: "9 Jan",
      reason: "Blood Pressure",
      status: "Cancelled",
    },
    {
      id: 103,
      patient: "Vikram Sen",
      age: 28,
      time: "2:00 PM",
      date: "8 Jan",
      reason: "Routine Checkup",
      status: "Completed",
    },
    {
      id: 104,
      patient: "Geeta Rao",
      age: 72,
      time: "10:00 AM",
      date: "8 Jan",
      reason: "Cardiac Review",
      status: "Completed",
    },
    {
      id: 105,
      patient: "Hema Reddy",
      age: 35,
      time: "3:00 PM",
      date: "7 Jan",
      reason: "Migraine Consultation",
      status: "No Show",
    },
    {
      id: 106,
      patient: "Arjun Singh",
      age: 44,
      time: "2:00 PM",
      date: "6 Jan",
      reason: "Thyroid Check",
      status: "Completed",
    },
    {
      id: 107,
      patient: "Meera Patel",
      age: 72,
      time: "10:00 AM",
      date: "6 Jan",
      reason: "Follow-up Scan",
      status: "Completed",
    },
    {
      id: 108,
      patient: "Rohan Varma",
      age: 35,
      time: "3:00 PM",
      date: "5 Jan",
      reason: "Initial Consultation",
      status: "Completed",
    },
  ];

  // --- Pagination Logic ---
  const RECORDS_PER_PAGE = 4; // Display 4 records per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalRecords = ALL_HISTORY.length;
  const totalPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);

  // Get current page data
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const endIndex = startIndex + RECORDS_PER_PAGE;
  const currentHistory = ALL_HISTORY.slice(startIndex, endIndex);

  // Pagination Handlers
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    // Main Wrapper Card: Consistent futuristic theme
    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)]">
      {/* Header and Controls */}
      <div className="mb-6 border-b border-slate-50 pb-4">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Historical Consultations
          </span>
        </h2>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by Patient Name, ID, or Reason..."
              className="w-full py-2 pl-10 pr-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-slate-700 shadow-[0_4px_15px_rgba(30,41,59,0.2)] flex-shrink-0">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Appointment History List (Using Paginated Data) */}
      <div className="space-y-4">
        {currentHistory.map((appt) => (
          <AppointmentCard key={appt.id} data={appt} showStatus />
        ))}
      </div>

      {/* Footer / Summary Action & Pagination Controls */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
        {/* Summary Text (Thematic Update) */}
        <p className="text-sm text-slate-500 flex items-center gap-1">
          <span className="text-slate-800 font-semibold tracking-wide">
            Archival Status:
          </span>
          <span className="text-blue-600 font-bold">Accessing Block</span>
          <span className="text-slate-700">
            **{startIndex + 1} to {Math.min(endIndex, totalRecords)}**
          </span>
          <span className="text-slate-500">
            (Total Records: **{totalRecords}**)
          </span>
        </p>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-slate-700 mr-2 hidden sm:inline">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
