import { Search, Filter, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState } from "react";
// Assuming VerificationCard is the stylized component we updated earlier
import VerificationCard from "../../components/admin/VerificationCard";

export default function PatientVerification() {
  // --- Data Definition ---
  const ALL_PATIENT_REQUESTS = [
    {
      id: 201,
      name: "Suresh Gupta",
      status: "PENDING",
      certificate: "Aadhar_9876.pdf",
      specialization: "Proof of Identity",
      experience: "DOB: 1985-04-12",
    },
    {
      id: 202,
      name: "Alia Bhatt",
      status: "PENDING",
      certificate: "License_4567.pdf",
      specialization: "Proof of Residence",
      experience: "DOB: 1999-11-20",
    },
    {
      id: 203,
      name: "Ravi Kishan",
      status: "PENDING",
      certificate: "VoterID_1234.pdf",
      specialization: "Proof of Identity",
      experience: "DOB: 1975-01-01",
    },
    {
      id: 204,
      name: "Deepika Padukone",
      status: "PENDING",
      certificate: "Passport_5678.pdf",
      specialization: "Proof of Residence",
      experience: "DOB: 1986-07-06",
    },
    {
      id: 205,
      name: "Rahul Singh",
      status: "PENDING",
      certificate: "Aadhar_0011.pdf",
      specialization: "Proof of Identity",
      experience: "DOB: 2001-05-15",
    },
  ];

  // --- Pagination Logic ---
  const RECORDS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalRecords = ALL_PATIENT_REQUESTS.length;
  const totalPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);

  // Get current page data
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const endIndex = startIndex + RECORDS_PER_PAGE;
  const currentRequests = ALL_PATIENT_REQUESTS.slice(startIndex, endIndex);

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
            Patient Identity Verification
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
              placeholder="Search patients by name or ID proof..."
              className="w-full py-2 pl-10 pr-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-slate-700 shadow-[0_4px_15px_rgba(30,41,59,0.2)] flex-shrink-0">
            <Filter size={18} />
            Filter Proof Type
          </button>
        </div>
      </div>

      {/* Verification List (Using Paginated Data) */}
      <div className="space-y-6">
        {currentRequests.map((patient) => (
          <VerificationCard
            key={patient.id}
            data={patient}
            // Using 'patient' as the role for dynamic card rendering
            role="patient"
          />
        ))}
      </div>

      {/* Footer / Summary Action & Pagination Controls */}
      {totalRecords > 0 && (
        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
          {/* Summary Text (Thematic Update) */}
          <p className="text-sm text-slate-500 flex items-center gap-1">
            <span className="text-slate-800 font-semibold tracking-wide">
              Identity Queue:
            </span>
            <span className="text-red-600 font-bold">Reviewing Block</span>
            <span className="text-slate-700">
              **{startIndex + 1} to {Math.min(endIndex, totalRecords)}**
            </span>
            <span className="text-slate-500">
              (Total Patients: **{totalRecords}**)
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
      )}
    </div>
  );
}
