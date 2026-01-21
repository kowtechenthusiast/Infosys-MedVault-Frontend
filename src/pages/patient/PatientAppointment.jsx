import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  History,
  ClockAlert,
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
  const [activeTab, setActiveTab] = useState("upcoming");
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
            headers: {
              Authorization: `Bearer ${localStorage.getItem("patientToken")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        console.log("Fetched Appointments:", data);
        setAppointments(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  /* ---------- FILTERING ---------- */
  const upcoming = appointments.filter(
    (a) =>
      isUpcoming(a.appointmentDate, a.appointmentTime) &&
      a.status !== "CANCELLED"
  );

  const history = appointments.filter(
    (a) =>
      !isUpcoming(a.appointmentDate, a.appointmentTime) &&
      a.status !== "REQUESTED"
  );

  const expired = appointments.filter(
    (a) =>
      !isUpcoming(a.appointmentDate, a.appointmentTime) &&
      a.status === "REQUESTED"
  );

  const sectionMap = {
    upcoming,
    history,
    expired,
  };

  const currentList = sectionMap[activeTab];
  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAppointments = currentList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl  shadow-sm">
        <h2 className="text-3xl font-black text-slate-800">
          My <span className="text-blue-600">Appointments</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Track your medical consultations
        </p>

        {/* Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mt-6">
          {[
            { key: "upcoming", label: "Upcoming", icon: CalendarCheck },
            { key: "history", label: "History", icon: History },
            { key: "expired", label: "Expired", icon: ClockAlert },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setCurrentPage(1);
              }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-sm ${
                activeTab === key
                  ? "bg-white text-blue-600 shadow"
                  : "text-slate-500"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Appointment List */}
      <div className="space-y-6 min-h-[400px]">
        {currentAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl ">
            <CalendarDays className="text-slate-300 mb-4" size={40} />
            <p className="text-slate-400 font-bold">
              No {activeTab} appointments
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {currentAppointments.map((appt) => (
              <AppointmentCard
                key={appt.id}
                data={appt}
                showReschedule={activeTab === "upcoming"}
                isExpired={activeTab === "expired"}
                isHistory={activeTab === "history"}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border shadow-sm">
          <p className="text-xs text-slate-400">
            Showing {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, currentList.length)} of{" "}
            {currentList.length}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
