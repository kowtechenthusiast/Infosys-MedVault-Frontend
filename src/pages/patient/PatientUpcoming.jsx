import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppointmentCard from "../../components/patient/AppointmentCard";

// Helper component for styled Pagination controls (Reused from PatientHistory)
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

export default function PatientUpcoming() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Setting a consistent number of cards per page

  // --- Extended Upcoming Data (for Pagination Demo) ---
  const allUpcoming = [
    {
      id: 1,
      doctor: "Dr. Mehul Varma",
      specialization: "Orthopedic",
      date: "Mon, 18 Jan",
      time: "11:00 AM",
      location: "Central Clinic A",
      details: "Post-surgery follow-up check.",
    },
    {
      id: 2,
      doctor: "Dr. Liana Kim",
      specialization: "Dermatologist",
      date: "Fri, 22 Jan",
      time: "02:30 PM",
      location: "Metro Health Z",
      details: "Routine skin check.",
    },
    {
      id: 3,
      doctor: "Dr. Anya Sharma",
      specialization: "Neurologist",
      date: "Wed, 27 Jan",
      time: "10:00 AM",
      location: "City Hospital",
      details: "Initial consultation for migraines.",
    },
    {
      id: 4,
      doctor: "Dr. Chen Li",
      specialization: "Pediatrician",
      date: "Tue, 02 Feb",
      time: "2:00 PM",
      location: "Metro Health Z",
      details: "Vaccination schedule review.",
    },
    {
      id: 5,
      doctor: "Dr. Omar Khan",
      specialization: "Dermatologist",
      date: "Mon, 08 Feb",
      time: "4:00 PM",
      location: "Private Clinic",
      details: "Acne treatment follow-up.",
    },
  ];
  // --------------------------------------------------

  const totalPages = Math.ceil(allUpcoming.length / itemsPerPage);

  // Calculate which items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = allUpcoming.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-8">
      {/* Themed Header */}
      <h2 className="text-3xl font-extrabold text-slate-800 drop-shadow-sm border-b border-blue-100 pb-2">
        Your Next{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
          Upcoming Sessions
        </span>
      </h2>

      {/* Appointment Cards List */}
      <div className="space-y-6 min-h-[300px]">
        {" "}
        {/* Added min-height to maintain layout */}
        {currentAppointments.map((appt) => (
          <AppointmentCard key={appt.id} data={appt} />
        ))}
      </div>

      {/* Themed Pagination Controls */}
      {allUpcoming.length > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Results Summary */}
      <p className="text-center text-sm text-slate-500 pt-4">
        Showing appointments {startIndex + 1} to{" "}
        {Math.min(endIndex, allUpcoming.length)} of {allUpcoming.length} total.
      </p>
    </div>
  );
}
