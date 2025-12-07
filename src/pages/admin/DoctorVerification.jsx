import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import VerificationCard from "../../components/admin/VerificationCard";

export default function DoctorVerification() {
  // --- Data Definition (Renamed for clarity) ---
  const ALL_DOCTOR_REQUESTS = [
    {
      id: 1,
      name: "Dr. Rohit Sharma",
      status: "PENDING",
      certificate: "MedicalLicense123.pdf",
      specialization: "Cardiologist",
      experience: "12 years",
    },
    {
      id: 2,
      name: "Dr. Priya Mehta",
      status: "PENDING",
      certificate: "MedCert987.pdf",
      specialization: "Dermatologist",
      experience: "7 years",
    },
    {
      id: 3,
      name: "Dr. Alok Verma",
      status: "PENDING",
      certificate: "DML-90210.pdf",
      specialization: "Neurologist",
      experience: "5 years",
    },
    {
      id: 4,
      name: "Dr. Sarah Khan",
      status: "PENDING",
      certificate: "PKL-74100.pdf",
      specialization: "Pediatrician",
      experience: "10 years",
    },
    // Added more mock data to demonstrate pagination
    {
      id: 5,
      name: "Dr. Vijay Singh",
      status: "PENDING",
      certificate: "VSL-101.pdf",
      specialization: "Orthopedic",
      experience: "8 years",
    },
    {
      id: 6,
      name: "Dr. Neha Rao",
      status: "PENDING",
      certificate: "NRL-202.pdf",
      specialization: "Oncologist",
      experience: "15 years",
    },
    {
      id: 7,
      name: "Dr. Kevin Chen",
      status: "PENDING",
      certificate: "KCL-303.pdf",
      specialization: "Anesthesiologist",
      experience: "4 years",
    },
    {
      id: 8,
      name: "Dr. Maya Devi",
      status: "PENDING",
      certificate: "MDL-404.pdf",
      specialization: "Psychiatrist",
      experience: "9 years",
    },
  ];

  // --- Pagination Logic ---
  const RECORDS_PER_PAGE = 4; // Display 4 requests per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalRecords = ALL_DOCTOR_REQUESTS.length;
  const totalPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);

  // Get current page data
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const endIndex = startIndex + RECORDS_PER_PAGE;
  const currentRequests = ALL_DOCTOR_REQUESTS.slice(startIndex, endIndex);

  // Pagination Handlers
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-8">
      {/* Thematic Header and Controls */}
      <div className="pb-4 border-b border-slate-50">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Doctor Access Requests
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
              placeholder="Search pending requests by name or specialization..."
              className="w-full py-2 pl-10 pr-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-slate-700 shadow-[0_4px_15px_rgba(30,41,59,0.2)] flex-shrink-0">
            <Filter size={18} />
            Filter Status
          </button>
        </div>
      </div>

      {/* Verification List (Using Paginated Data) */}
      <div className="space-y-6">
        {currentRequests.map((doc) => (
          <VerificationCard key={doc.id} data={doc} role="doctor" />
        ))}
      </div>

      {/* Footer / Summary Action & Pagination Controls */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
        {/* Summary Text (Thematic Update) */}
        <p className="text-sm text-slate-500 flex items-center gap-1">
          <span className="text-slate-800 font-semibold tracking-wide">
            Verification Queue:
          </span>
          <span className="text-red-600 font-bold">Reviewing Block</span>
          <span className="text-slate-700">
            **{startIndex + 1} to {Math.min(endIndex, totalRecords)}**
          </span>
          <span className="text-slate-500">
            (Total Pending: **{totalRecords}**)
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
