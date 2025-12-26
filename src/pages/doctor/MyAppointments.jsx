import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Calendar,
  AlertTriangle,
  Eye,
  History,
  CalendarDays,
} from "lucide-react";
import { useEffect, useState } from "react";
import PatientDetailsModal from "../../components/doctor/PatientDetailsModal";

/* ================= UTIL ================= */
const isUpcoming = (date, time) => {
  const appointmentDateTime = new Date(`${date}T${time}`);
  return appointmentDateTime >= new Date();
};

const formatTime = (time) => time?.slice(0, 5); // HH:mm

/* ================= APPOINTMENT CARD ================= */
const AppointmentCard = ({ data, onViewPatient }) => {
  const [expanded, setExpanded] = useState(false);

  const urgent =
    data.reason?.toLowerCase().includes("pain") ||
    data.reason?.toLowerCase().includes("critical");

  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 ${
        expanded
          ? "border-blue-400 shadow-lg ring-1 ring-blue-50"
          : "border-slate-100 hover:border-blue-200 hover:shadow-md"
      } bg-white overflow-hidden`}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className="p-5 flex justify-between items-center cursor-pointer select-none"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
            <Clock className="text-blue-600" size={20} />
          </div>
          <div>
            <span className="block font-bold text-slate-800 text-lg leading-none">
              {formatTime(data.time)}
            </span>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-tighter">
              {data.date}
            </span>
          </div>
        </div>

        <div className="flex-1 mx-6 hidden sm:block">
          <p className="font-bold text-slate-800 flex items-center gap-2">
            {data.patient.name}
            {urgent && (
              <span className="flex items-center gap-1 text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-bold animate-pulse">
                <AlertTriangle size={10} /> URGENT
              </span>
            )}
          </p>
          <p className="text-sm text-slate-500 truncate max-w-[200px]">
            {data.reason}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewPatient(data.patient);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all text-xs font-bold shadow-sm shadow-blue-200"
          >
            <Eye size={14} />
            View
          </button>
          <div
            className={`p-1 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="text-slate-300" size={20} />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="bg-slate-50/50 border-t border-slate-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2">
          <Info label="Patient" value={data.patient.name} icon={User} />
          <Info label="Age" value={`${data.patient.age} yrs`} />
          <Info label="Scheduled Date" value={data.date} icon={Calendar} />
          <Info label="Reason for Visit" value={data.reason} />
        </div>
      )}
    </div>
  );
};

const Info = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-3">
    {Icon && (
      <div className="mt-1 text-blue-500">
        <Icon size={16} />
      </div>
    )}
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
        {label}
      </p>
      <p className="font-semibold text-slate-700 text-sm">{value}</p>
    </div>
  </div>
);

/* ================= MAIN COMPONENT ================= */
export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [viewPatient, setViewPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' or 'history'

  const PER_PAGE = 5;
  const [upPage, setUpPage] = useState(1);
  const [histPage, setHistPage] = useState(1);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/patient/booking/getAllAppointment?userId=${localStorage.getItem(
            "userId"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
            },
          }
        );
        const data = await res.json();
        setAppointments(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchAppointments();
  }, []);

  // Filtering Logic
  const upcoming = appointments.filter((a) =>
    isUpcoming(a.appointmentDate, a.appointmentTime)
  );
  const history = appointments.filter(
    (a) => !isUpcoming(a.appointmentDate, a.appointmentTime)
  );

  // Determine current display data
  const isUp = activeTab === "upcoming";
  const currentList = isUp ? upcoming : history;
  const currentPage = isUp ? upPage : histPage;
  const setPage = isUp ? setUpPage : setHistPage;

  const paginatedData = currentList.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );
  const totalPages = Math.ceil(currentList.length / PER_PAGE);

  return (
    <div className="space-y-6 p-4 md:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
      {/* Header & Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-50 pb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800">
            My{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
              Schedule
            </span>
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            Total Appointments: {appointments.length}
          </p>
        </div>

        {/* Professional Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "upcoming"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <CalendarDays size={18} /> Upcoming
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "history"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <History size={18} /> History
          </button>
        </div>
      </div>

      {/* Appointment List */}
      <div className="space-y-4 min-h-[400px]">
        {paginatedData.length > 0 ? (
          paginatedData.map((appt) => (
            <AppointmentCard
              key={appt.id}
              onViewPatient={setViewPatient}
              data={{
                // RESTORED ORIGINAL MAPPING
                patient: {
                  id: appt.patientId,
                  name: appt.patientName,
                  email: appt.email,
                  age: appt.patientAge,
                  gender: appt.gender,
                  bloodGroup: appt.bloodGroup,
                  phone: appt.phone,
                  address: appt.address,
                  city: appt.city,
                  state: appt.state,
                  country: appt.country,
                  pincode: appt.pincode,
                  sleepHours: appt.sleepHours,
                  diet: appt.diet,
                  smoking: appt.smoking,
                  alcohol: appt.alcohol,
                  sugarLevel: appt.sugarLevel,
                  bpSys: appt.bpSys,
                  bpDia: appt.bpDia,
                  spo2: appt.spo2,
                  heartRate: appt.heartRate,
                  registrationDate: appt.registrationDate,
                },
                date: appt.appointmentDate,
                time: appt.appointmentTime,
                reason: appt.reason,
              }}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
            <p className="text-slate-400 font-bold italic">
              No records found for this section
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {currentList.length > PER_PAGE && (
        <div className="flex justify-between items-center pt-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-slate-100 hover:bg-blue-600 hover:text-white disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() =>
                setPage((p) => (p * PER_PAGE < currentList.length ? p + 1 : p))
              }
              disabled={currentPage >= totalPages}
              className="p-3 rounded-xl border border-slate-100 hover:bg-blue-600 hover:text-white disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Patient Modal */}
      {viewPatient && (
        <PatientDetailsModal
          patient={viewPatient}
          onClose={() => setViewPatient(null)}
        />
      )}
    </div>
  );
}
