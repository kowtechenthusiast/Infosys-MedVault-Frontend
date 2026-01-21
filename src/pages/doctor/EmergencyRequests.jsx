import { useState, useEffect } from "react";
import {
  AlertCircle,
  User,
  Clock,
  Check,
  X,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../context/useAuthContext";
import PatientDetailsModal from "../../components/doctor/PatientDetailsModal";
import { toast } from "react-toastify";

/* ================= SEVERITY STYLES ================= */
const severityStyles = {
  CRITICAL: "bg-rose-600 text-white shadow-[0_0_10px_rgba(244,63,94,0.5)]",
  HIGH: "bg-orange-500 text-white",
  MEDIUM: "bg-amber-400 text-white",
  LOW: "bg-indigo-500 text-white",
};

/* ================= REQUEST CARD ================= */
const RequestCard = ({ request, onAccept, onIgnore, onViewDetails, type }) => {
  return (
    <div className="group relative bg-white rounded-[2rem] p-6 border border-slate-100 hover:shadow-xl transition-all">
      {/* Side indicator */}
      <div
        className={`absolute inset-y-0 left-0 w-1.5 rounded-l-[2rem] ${
          type === "pending" ? "bg-rose-500" : "bg-emerald-500"
        }`}
      />

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* LEFT */}
        <div className="flex gap-4">
          <div
            className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
              type === "pending"
                ? "bg-rose-50 text-rose-600"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            <User size={26} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-black text-slate-800">
                {request.patientName}
              </h3>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${
                  severityStyles[request.severityLevel] || severityStyles.LOW
                }`}
              >
                {request.severityLevel}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <Clock size={14} /> {request.timestamp}
              </span>
              <button
                onClick={() => onViewDetails(request)}
                className="flex items-center gap-1 text-indigo-600 font-bold text-xs uppercase tracking-wider hover:text-indigo-700"
              >
                Inspect Vitals <ArrowRight size={12} />
              </button>
            </div>

            <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-600 italic flex gap-2">
              <MessageSquare size={16} className="text-slate-400 mt-0.5" />“
              {request.message}”
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {type === "pending" ? (
            <>
              <button
                onClick={() => onIgnore(request.id)}
                className="p-3 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
              >
                <X size={22} />
              </button>
              <button
                onClick={() => onAccept(request.id)}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-black flex items-center gap-2 transition-all shadow-lg"
              >
                <Check size={18} /> Accept Case
              </button>
            </>
          ) : (
            <div className="flex flex-col items-end">
              {request.status === "ACCEPTED" ? (
                <span className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 font-black text-sm flex items-center gap-2">
                  <Check size={16} /> Accepted
                </span>
              ) : (
                <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-500 font-black text-sm flex items-center gap-2">
                  <X size={16} /> Ignored
                </span>
              )}

              <span className="text-[10px] text-slate-400 mt-1 font-medium">
                Responded by you
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN ================= */
export default function EmergencyRequests() {
  const [view, setView] = useState("PENDING");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { user } = useAuth();
  console.log("Logged in doctor:", user);

  const API_BASE = "http://localhost:8080/api/emergencies";

  useEffect(() => {
    fetchEmergencyRequests();
  }, [view]);

  const fetchEmergencyRequests = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE}?city=${user.city}`;

      if (view === "PENDING") {
        url += `&status=PENDING`;
      } else {
        // My Responses = ACCEPTED + IGNORED
        url += `&status=ACCEPTED,IGNORED`;
      }

      const res = await fetch(url);
      if (res.ok) setRequests(await res.json());
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    await fetch(`${API_BASE}/${id}/accept?doctorId=${user.userId}`, {
      method: "PATCH",
    });
    fetchEmergencyRequests();
    setSelectedRequest(null);
    toast.success("Emergency request accepted successfully");
  };

  const handleIgnore = async (id) => {
    await fetch(`${API_BASE}/${id}/ignore`, { method: "PATCH" });
    fetchEmergencyRequests();
    toast.info("Emergency request ignored");
  };

  return (
    <div className="space-y-8 p-6 md:p-8 bg-slate-50/30 rounded-[3rem] border border-white shadow-2xl max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-rose-600 rounded-2xl shadow-lg shadow-rose-300/40 animate-pulse">
            <AlertCircle size={30} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800">
              Emergency Queue
            </h1>
            <p className="text-slate-400">Real-time patient distress signals</p>
          </div>
        </div>

        <div className="text-center px-8 py-4 rounded-3xl bg-slate-50 border border-slate-100">
          <div className="text-4xl font-black text-rose-600">
            {requests.length}
          </div>
          <div className="text-[10px] uppercase tracking-widest font-black text-slate-400">
            Active Alerts
          </div>
        </div>
      </div>

      {/* SWITCHER */}
      <div className="flex p-1 bg-white rounded-2xl border border-slate-100 max-w-sm">
        {["PENDING", "ACCEPTED"].map((s) => (
          <button
            key={s}
            onClick={() => setView(s)}
            className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${
              view === s ? "bg-slate-900 text-white" : "text-slate-400"
            }`}
          >
            {s === "PENDING" ? "Incoming" : "My Responses"}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center text-slate-400 animate-pulse">
            Scanning emergency network…
          </div>
        ) : requests.length ? (
          requests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              type={view.toLowerCase()}
              onAccept={handleAccept}
              onIgnore={handleIgnore}
              onViewDetails={setSelectedRequest}
            />
          ))
        ) : (
          <div className="py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400">
            No emergency requests found.
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedRequest && (
        <PatientDetailsModal
          patient={{
            ...selectedRequest.patient,
            patientId: selectedRequest.patient.id,
            message: selectedRequest.message,
            severity: selectedRequest.severityLevel,
          }}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}
