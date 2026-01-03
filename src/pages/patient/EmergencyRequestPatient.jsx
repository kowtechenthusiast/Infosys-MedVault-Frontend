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
} from "lucide-react";
import { useAuth } from "../../context/useAuthContext";

// --- Sub-component: Severity Badge ---
const SeverityBadge = ({ level }) => {
  const styles = {
    CRITICAL:
      "bg-red-500 text-white animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    HIGH: "bg-orange-500 text-white",
    MEDIUM: "bg-amber-400 text-white",
    LOW: "bg-blue-500 text-white",
  };
  return (
    <span
      className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
        styles[level] || styles.LOW
      }`}
    >
      {level}
    </span>
  );
};

export default function EmergencyRequestPatient() {
  const { user } = useAuth();
  const [view, setView] = useState("active"); // 'active' or 'history'
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    message: "",
    severity: "MEDIUM",
    city: user?.city || "",
  });

  // Mock Data (Replace with your useEffect API fetch)
  const [requests, setRequests] = useState([
    {
      id: 101,
      message: "Severe allergic reaction, throat closing.",
      city: "New York",
      severity: "CRITICAL",
      status: "PENDING",
      createdAt: "2 mins ago",
    },
    {
      id: 102,
      message: "Sprained ankle, cannot walk.",
      city: "New York",
      severity: "LOW",
      status: "ACCEPTED",
      doctorName: "Dr. Smith",
      createdAt: "1 hour ago",
    },
    {
      id: 99,
      message: "High fever and chills.",
      city: "New York",
      severity: "MEDIUM",
      status: "COMPLETED",
      createdAt: "2 days ago",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API CALL: await axios.post('/api/emergencies', { ...formData, patientId: user.id });
    const newReq = {
      id: Date.now(),
      ...formData,
      status: "PENDING",
      createdAt: "Just now",
    };
    setRequests([newReq, ...requests]);
    setShowForm(false);
    setFormData({ message: "", severity: "MEDIUM", city: user?.city || "" });
  };

  const filteredRequests = requests.filter((req) =>
    view === "active"
      ? req.status === "PENDING" || req.status === "ACCEPTED"
      : req.status === "COMPLETED"
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* 1. Hero / Action Section */}
      <div className="relative p-8 rounded-3xl bg-slate-900 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full blur-[100px] -mr-20 -mt-20 opacity-40 animate-pulse"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">
              Emergency Assistance
            </h1>
            <p className="text-slate-400 max-w-sm">
              Your request will be broadcasted to all available doctors in{" "}
              <span className="text-rose-400 font-bold">
                {formData.city || "your city"}
              </span>
              .
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-3 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-rose-500/25"
          >
            <AlertTriangle
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            Create Request
          </button>
        </div>
      </div>

      {/* 2. Cyber Switcher */}
      <div className="flex items-center p-1 bg-white rounded-2xl border border-slate-100 shadow-sm w-full max-w-md mx-auto">
        <button
          onClick={() => setView("active")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300
              ${
                view === "active" ? "bg-slate-800 text-white" : "text-slate-400"
              }`}
        >
          <Activity size={16} />
          Active Alerts
        </button>
        <button
          onClick={() => setView("history")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300
              ${
                view === "history"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400"
              }`}
        >
          <History size={16} />
          History
        </button>
      </div>

      {/* 3. Request List */}
      <div className="space-y-4">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <SeverityBadge level={req.severity} />
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> {req.createdAt}
                </span>
              </div>
              <div
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  req.status === "ACCEPTED"
                    ? "bg-teal-50 text-teal-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {req.status}
              </div>
            </div>

            <p className="text-slate-700 font-medium mb-4">"{req.message}"</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={14} className="text-rose-500" />
                {req.city}
              </div>
              {req.doctorName && (
                <div className="flex items-center gap-2 text-sm font-semibold text-teal-600">
                  <CheckCircle2 size={16} />
                  Assigned: {req.doctorName}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Request Modal (The Form) */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-rose-50">
              <h2 className="text-xl font-bold text-rose-700 flex items-center gap-2">
                <AlertTriangle size={20} /> New Emergency Broadcast
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  City Name
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                    placeholder="e.g. New York"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Severity Level
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, severity: lvl })
                      }
                      className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                        formData.severity === lvl
                          ? "bg-rose-500 border-rose-500 text-white shadow-md"
                          : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Describe your situation
                </label>
                <textarea
                  required
                  rows="4"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                  placeholder="Tell the doctor what is happening..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all"
              >
                Broadcast to Doctors <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
