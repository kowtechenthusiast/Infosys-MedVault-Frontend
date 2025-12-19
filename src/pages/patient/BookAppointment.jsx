import { useEffect, useState } from "react";
import DoctorCard from "../../components/patient/DoctorCard";
import BookingModal from "../../components/patient/BookingModal";
import { Search, ChevronLeft, ChevronRight } from "lucide-react"; // Import pagination icons

// Helper component for styled Pagination controls (No changes needed here)
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    // Ensure we render pages only up to totalPages
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

export default function BookAppointment() {
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const itemsPerPage = 3;

  // Mock data for the doctor list (Extended for pagination demonstration)
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/profile/doctor/getDoctors",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch doctor requests");
        }

        const data = await res.json();
        console.log("Doctor Verification Data:", data);

        setDoctors(data.doctors || []);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchDoctors();
  }, []);

  // 1. Filtering Logic
  const filtered = doctors.filter(
    (d) =>
      (d.name && d.name.toLowerCase().includes(search.toLowerCase())) ||
      (d.specialization &&
        d.specialization.toLowerCase().includes(search.toLowerCase()))
  );

  // 2. Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const doctorsToShow = filtered.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
    // FIX: Reset the current page to 1 whenever the search term changes.
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* 1. Themed Header */}
      <h2 className="text-3xl font-extrabold text-slate-800 drop-shadow-sm border-b border-blue-100 pb-2">
        Find & Book{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
          Your Specialist
        </span>
      </h2>

      {/* 2. Themed Search Bar */}
      <div className="relative w-full md:w-2/3 max-w-xl">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          placeholder="Search by Doctor name or Specialization..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-blue-100 rounded-xl text-slate-700 
                     shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          onChange={handleSearchChange} // Use the new handler here
          value={search} // Ensure input value is controlled
        />
      </div>

      {/* 3. Doctor Cards List */}
      <div className="mt-6 space-y-5 min-h-[300px]">
        {doctorsToShow.length > 0 ? (
          doctorsToShow.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBook={() => setSelectedDoctor(doctor)}
            />
          ))
        ) : (
          <p className="text-slate-500 text-center py-10 border border-dashed rounded-xl">
            No doctors found matching "{search}". Try a different name or
            specialty.
          </p>
        )}
      </div>

      {/* 4. Themed Pagination Controls */}
      {filtered.length > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* 5. Booking Modal (Themed) */}
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}
