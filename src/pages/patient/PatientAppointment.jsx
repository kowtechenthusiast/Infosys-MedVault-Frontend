import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  History,
  Search,
  CalendarDays,
} from "lucide-react";
import AppointmentCard from "../../components/patient/AppointmentCard";

/* ================= UTIL ================= */
const isUpcoming = (date, time) => {
  const appointmentDateTime = new Date(`${date}T${time}`);
  return appointmentDateTime >= new Date();
};

/* ================= MAIN COMPONENT ================= */
export default function PatientAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' or 'history'
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchAppointments = async () => {
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

        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAppointments(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  /* ---------- FILTER & PAGINATION LOGIC ---------- */
  const upcoming = appointments.filter((a) =>
    isUpcoming(a.appointmentDate, a.appointmentTime)
  );

  const history = appointments.filter(
    (a) => !isUpcoming(a.appointmentDate, a.appointmentTime)
  );

  const currentList = activeTab === "upcoming" ? upcoming : history;

  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAppointments = currentList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Syncing your health records...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
              Appointments
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            View and manage your clinical sessions
          </p>
        </div>

        {/* Professional Segmented Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto">
          <button
            onClick={() => {
              setActiveTab("upcoming");
              setCurrentPage(1);
            }}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "upcoming"
                ? "bg-white text-blue-600 shadow-md"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <CalendarCheck size={18} />
            Upcoming
          </button>
          <button
            onClick={() => {
              setActiveTab("history");
              setCurrentPage(1);
            }}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "history"
                ? "bg-white text-blue-600 shadow-md"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <History size={18} />
            History
          </button>
        </div>
      </div>

      {/* Appointment List Section */}
      <div className="space-y-6 min-h-[400px]">
        {currentAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <div className="p-4 bg-slate-50 rounded-full mb-4">
              <CalendarDays className="text-slate-300" size={40} />
            </div>
            <p className="text-slate-400 font-bold italic text-lg">
              No {activeTab} sessions found
            </p>
            <p className="text-slate-400 text-sm">
              Your scheduled visits will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 animate-in fade-in duration-500">
            {currentAppointments.map((appt) => (
              <AppointmentCard key={appt.id} data={appt} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination & Summary Footer */}
      {currentList.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Showing {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, currentList.length)} of{" "}
            {currentList.length} Records
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white disabled:opacity-20 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
