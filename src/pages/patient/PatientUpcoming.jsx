import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppointmentCard from "../../components/patient/AppointmentCard";

/* ================= PAGINATION CONTROLS ================= */
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full text-slate-500 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl font-semibold transition-all
            ${
              currentPage === page
                ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full text-slate-500 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
export default function PatientUpcoming() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  /* ---------- FETCH FROM BACKEND (NO PAGINATION) ---------- */
  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/patient/booking/upcoming?userId=${localStorage.getItem(
            "userId"
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("patientToken")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        console.log("Fetched appointments:", data);
        setAppointments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  /* ---------- FRONTEND PAGINATION ---------- */
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = appointments.slice(startIndex, endIndex);

  if (loading) {
    return <p className="text-center text-slate-500">Loading appointments…</p>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-extrabold text-slate-800 border-b border-blue-100 pb-2">
        Your Next{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
          Upcoming Sessions
        </span>
      </h2>

      {/* Appointment List */}
      <div className="space-y-6 min-h-[300px]">
        {currentAppointments.length === 0 ? (
          <p className="text-center text-slate-500">No upcoming appointments</p>
        ) : (
          currentAppointments.map((appt) => (
            <AppointmentCard key={appt.id} data={appt} />
          ))
        )}
      </div>

      {/* Pagination */}
      {appointments.length > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Summary */}
      {appointments.length > 0 && (
        <p className="text-center text-sm text-slate-500 pt-4">
          Showing {startIndex + 1}–{Math.min(endIndex, appointments.length)} of{" "}
          {appointments.length} appointments
        </p>
      )}
    </div>
  );
}
