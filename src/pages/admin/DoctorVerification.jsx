import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import VerificationCard from "../../components/admin/VerificationCard";

export default function DoctorVerification() {
  // --- State ---
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- Pagination ---
  const RECORDS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // --- Fetch from backend ---
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/profile/doctor/getPending",
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // --- Pagination calculations ---
  const totalRecords = doctors.length;
  const totalPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);

  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const endIndex = startIndex + RECORDS_PER_PAGE;
  const currentRequests = doctors.slice(startIndex, endIndex);

  // --- Pagination handlers ---
  const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  // --- UI States ---
  if (loading) {
    return <p className="text-slate-500">Loading doctors...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-50">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
            Doctor Verification Requests
          </span>
        </h2>

        {/* Search & Filter (UI only for now) */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search doctors..."
              className="w-full py-2 pl-10 pr-4 border rounded-xl text-sm"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-sm">
            <Filter size={18} />
            Filter Specialization
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-6">
        {currentRequests.map((doctor) => (
          <VerificationCard key={doctor.userId} data={doctor} role="doctor" />
        ))}
      </div>

      {/* Pagination */}
      {totalRecords > 0 && (
        <div className="mt-8 pt-4 border-t flex justify-between items-center">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <strong>
              {startIndex + 1}–{Math.min(endIndex, totalRecords)}
            </strong>{" "}
            of <strong>{totalRecords}</strong>
          </p>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
