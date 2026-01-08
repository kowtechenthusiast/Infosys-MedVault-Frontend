import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Send,
  MapPin,
  Clock,
  CheckCircle2,
  History,
  Activity,
  X,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "../../context/useAuthContext";
import { DoctorDetailModalEmergency } from "../../components/patient/DoctorDetailModalEmergency";

/* ================= SEVERITY BADGE ================= */
const SeverityBadge = ({ level }) => {
  const styles = {
    CRITICAL: "bg-rose-100 text-rose-600 border-rose-200 animate-pulse",
    HIGH: "bg-orange-50 text-orange-600 border-orange-100",
    MEDIUM: "bg-amber-50 text-amber-600 border-amber-100",
    LOW: "bg-blue-50 text-blue-600 border-blue-100",
  };

  return (
    <span
      className={`text-[10px] font-black px-2 py-0.5 rounded-md border uppercase tracking-wider ${
        styles[level] || styles.LOW
      }`}
    >
      {level}
    </span>
  );
};

/* ================= MAIN COMPONENT ================= */
export default function EmergencyRequestPatient() {
  const { user } = useAuth();
  const [view, setView] = useState("active");
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [availableDoctors, setAvailableDoctors] = useState(null);

  const SOUTH_INDIA_CITIES = [
    // Karnataka
    { name: "Bengaluru", doctors: 28 },
    { name: "Mysuru", doctors: 12 },
    { name: "Mangaluru", doctors: 10 },
    { name: "Udupi", doctors: 6 },
    { name: "Hubballi", doctors: 9 },
    { name: "Belagavi", doctors: 8 },
    { name: "Shivamogga", doctors: 7 },
    { name: "Kundapura", doctors: 1 },

    // Tamil Nadu
    { name: "Chennai", doctors: 24 },
    { name: "Coimbatore", doctors: 14 },
    { name: "Madurai", doctors: 11 },
    { name: "Tiruchirappalli", doctors: 10 },
    { name: "Salem", doctors: 9 },
    { name: "Erode", doctors: 8 },
    { name: "Tiruppur", doctors: 9 },
    { name: "Vellore", doctors: 10 },
    { name: "Thanjavur", doctors: 7 },
    { name: "Tirunelveli", doctors: 8 },

    // Kerala
    { name: "Kochi", doctors: 16 },
    { name: "Thiruvananthapuram", doctors: 14 },
    { name: "Kozhikode", doctors: 12 },
    { name: "Thrissur", doctors: 11 },
    { name: "Kannur", doctors: 7 },
    { name: "Palakkad", doctors: 6 },
    { name: "Alappuzha", doctors: 6 },
    { name: "Kollam", doctors: 7 },
    { name: "Pathanamthitta", doctors: 5 },
    { name: "Wayanad", doctors: 4 },

    // Andhra Pradesh
    { name: "Hyderabad", doctors: 26 },
    { name: "Vijayawada", doctors: 13 },
    { name: "Visakhapatnam", doctors: 15 },
    { name: "Guntur", doctors: 9 },
    { name: "Nellore", doctors: 7 },
    { name: "Tirupati", doctors: 8 },
    { name: "Rajahmundry", doctors: 8 },
    { name: "Kurnool", doctors: 7 },
    { name: "Chittoor", doctors: 6 },
    { name: "Kadapa", doctors: 6 },

    // Maharashtra
    { name: "Mumbai", doctors: 30 },
    { name: "Pune", doctors: 18 },
    { name: "Nagpur", doctors: 12 },
  ];

  const [formData, setFormData] = useState({
    message: "",
    severityLevel: "MEDIUM",
    location: "",
  });

  const API_BASE = "http://localhost:8080/api/emergencies";

  useEffect(() => {
    fetchRequests();
  }, [view]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const statusParam = view === "active" ? "PENDING" : "ACCEPTED";
      const response = await fetch(`${API_BASE}?status=${statusParam}`);
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          patientId: user.userId,
        }),
      });

      if (response.ok) {
        setShowForm(false);
        setFormData({
          message: "",
          severityLevel: "MEDIUM",
          location: user?.city || "",
        });
        fetchRequests();
      }
    } catch (error) {
      console.error("Broadcast failed", error);
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 bg-slate-50/30 rounded-[3rem] border border-white shadow-2xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
            <ShieldAlert size={12} /> Emergency System
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">
            Help <span className="text-rose-600">Requests</span>
          </h2>
          <p className="text-slate-400 font-medium mt-1">
            Alerting available doctors now for immediate medical assistance.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-all shadow-lg shadow-rose-100"
        >
          <AlertTriangle size={18} />
          Create Request
        </button>
      </div>

      {/* Switcher Tab */}
      <div className="flex p-1 bg-slate-100 rounded-2xl w-full max-w-md">
        <button
          onClick={() => setView("active")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${
            view === "active"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Activity size={14} /> Active Request
        </button>
        <button
          onClick={() => setView("history")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${
            view === "history"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <History size={14} /> Accepted
        </button>
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="py-20 text-center text-slate-400 animate-pulse font-bold uppercase tracking-widest text-xs">
            Syncing Status...
          </div>
        ) : requests.length > 0 ? (
          requests.map((req) => (
            <div
              key={req.id}
              className="group bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-rose-50/50 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Status & Main Info */}
                <div className="flex items-center gap-5">
                  <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-all ${
                      req.status === "ACCEPTED"
                        ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                        : "bg-rose-50 border-rose-100 text-rose-600 animate-pulse"
                    }`}
                  >
                    {req.status === "ACCEPTED" ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <Activity size={24} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <SeverityBadge level={req.severityLevel} />
                      <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                        {req.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">
                      {req.message}
                    </h3>
                    <div className="flex items-center gap-4 text-slate-400 text-xs mt-1">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} /> {req.timestamp || "Just now"}
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-rose-400">
                        <MapPin size={12} /> {req.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Doctor/Responder Action */}
                <div className="flex items-center gap-3">
                  {req.doctor ? (
                    <button
                      onClick={() => {
                        setSelectedDoctor(req.doctor);
                        setIsDoctorModalOpen(true);
                      }}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white font-bold text-sm transition-all border border-emerald-100"
                    >
                      <CheckCircle2 size={18} />
                      Dr. {req.doctor.name}
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <div className="px-5 py-3 rounded-2xl bg-slate-50 text-slate-400 font-bold text-xs border border-slate-100 italic">
                      Waiting for responder...
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
              <ShieldAlert size={40} />
            </div>
            <p className="text-slate-400 font-bold text-lg">No Active Alerts</p>
            <p className="text-slate-300 text-sm">
              System is standing by for your safety.
            </p>
          </div>
        )}
      </div>

      {/* Modern Request Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-rose-50/50">
              <h2 className="text-xl font-black text-rose-600 flex items-center gap-2">
                <AlertTriangle size={20} /> New Request
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-rose-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Current Location
                </label>

                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400 z-10"
                    size={18}
                  />

                  <input
                    type="text"
                    required
                    value={formData.location}
                    onFocus={() => setShowCityDropdown(true)}
                    onChange={(e) => {
                      setFormData({ ...formData, location: e.target.value });
                      setAvailableDoctors(null);
                      setShowCityDropdown(true);
                    }}
                    placeholder="Search your city..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-rose-500 transition-all font-medium"
                  />

                  {/* Dropdown */}
                  {showCityDropdown && (
                    <div className="absolute z-20 mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-100 max-h-56 overflow-y-auto">
                      {SOUTH_INDIA_CITIES.filter((city) =>
                        city.name
                          .toLowerCase()
                          .includes(formData.location.toLowerCase())
                      ).length > 0 ? (
                        SOUTH_INDIA_CITIES.filter((city) =>
                          city.name
                            .toLowerCase()
                            .includes(formData.location.toLowerCase())
                        ).map((city) => (
                          <button
                            type="button"
                            key={city.name}
                            onClick={() => {
                              setFormData({ ...formData, location: city.name });
                              setAvailableDoctors(city.doctors);
                              setShowCityDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-rose-50 text-slate-700 font-medium transition-all"
                          >
                            {city.name}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-slate-400 text-sm">
                          No matching city found
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {availableDoctors !== null && (
                  <p className="mt-2 pl-3 text-xs text-slate-500 font-medium">
                    <span className="text-rose-500 font-bold">
                      {availableDoctors}
                    </span>{" "}
                    {availableDoctors == 1 ? "doctor is" : "doctors are"}{" "}
                    currently available to respond.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Severity Level
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, severityLevel: lvl })
                      }
                      className={`py-2.5 rounded-xl text-[10px] font-black transition-all border-2 ${
                        formData.severityLevel === lvl
                          ? "bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-200"
                          : "bg-white border-slate-100 text-slate-400 hover:border-rose-200"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Emergency Message
                </label>
                <textarea
                  required
                  rows="3"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-rose-500 transition-all font-medium"
                  placeholder="Describe your symptoms or situation..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-black flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95"
              >
                Broadcast Request <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <DoctorDetailModalEmergency
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
        doctor={selectedDoctor}
      />
    </div>
  );
}
