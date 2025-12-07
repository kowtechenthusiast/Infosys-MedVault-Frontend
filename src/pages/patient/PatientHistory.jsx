import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppointmentCard from "../../components/patient/AppointmentCard";

// Helper component for styled Pagination controls
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full text-slate-500 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300
              ${
                currentPage === page
                  ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-[0_4px_15px_rgba(6,182,212,0.4)]"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full text-slate-500 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default function PatientHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of appointments per page

  // --- Placeholder History Data (Extended for Pagination Demo) ---
  const history = [
    {
      id: 101,
      doctor: "Dr. Rahul Singh",
      specialization: "Cardiologist",
      date: "10 Jan",
      time: "3:30 PM",
      status: "Completed",
      location: "City Hospital",
    },
    {
      id: 102,
      doctor: "Dr. Anya Sharma",
      specialization: "Neurologist",
      date: "01 Dec",
      time: "10:00 AM",
      status: "Completed",
      location: "City Hospital",
    },
    {
      id: 103,
      doctor: "Dr. Chen Li",
      specialization: "Pediatrician",
      date: "25 Nov",
      time: "2:00 PM",
      status: "Completed",
      location: "Metro Health Z",
    },
    {
      id: 104,
      doctor: "Dr. Omar Khan",
      specialization: "Dermatologist",
      date: "15 Oct",
      time: "4:00 PM",
      status: "Completed",
      location: "Private Clinic",
    },
    {
      id: 105,
      doctor: "Dr. Priya Sinha",
      specialization: "Dermatologist",
      date: "05 Sep",
      time: "9:30 AM",
      status: "Cancelled",
      location: "City Hospital",
    },
    {
      id: 106,
      doctor: "Dr. Rohan Sharma",
      specialization: "Cardiologist",
      date: "20 Aug",
      time: "11:00 AM",
      status: "Completed",
      location: "Central Clinic A",
    },
    {
      id: 107,
      doctor: "Dr. Mei Ling",
      specialization: "Orthopedic",
      date: "01 Aug",
      time: "1:00 PM",
      status: "Completed",
      location: "Metro Health Z",
    },
  ];
  // -------------------------------------------------------------

  const totalPages = Math.ceil(history.length / itemsPerPage);

  // Calculate which items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = history.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-8">
      {/* Themed Header (Matching previous pages) */}
      <h2 className="text-3xl font-extrabold text-slate-800 drop-shadow-sm border-b border-blue-100 pb-2">
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
          Appointment
        </span>{" "}
        History
      </h2>

      {/* Appointment Cards List */}
      <div className="space-y-6 min-h-[300px]">
        {" "}
        {/* Added min-height to prevent layout shift */}
        {currentAppointments.map((appt) => (
          <AppointmentCard key={appt.id} data={appt} />
        ))}
      </div>

      {/* Themed Pagination Controls */}
      {history.length > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Optional: Results Summary */}
      <p className="text-center text-sm text-slate-500 pt-4">
        Showing appointments {startIndex + 1} to{" "}
        {Math.min(endIndex, history.length)} of {history.length} results.
      </p>
    </div>
  );
}
