import { useState, useEffect } from "react";
import {
  AlertCircle,
  User,
  Clock,
  Check,
  X,
  MessageSquare,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../context/useAuthContext";

// --- Sub-component: Emergency Request Card ---
const RequestCard = ({ request, onAccept, onIgnore, type }) => (
  <div className="group relative p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    {/* Status Indicator Glow */}
    <div
      className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${
        type === "pending"
          ? "bg-rose-500 shadow-[2px_0_15px_rgba(244,63,94,0.4)]"
          : "bg-teal-500"
      }`}
    />

    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-start gap-4">
        <div
          className={`p-4 rounded-2xl ${
            type === "pending"
              ? "bg-rose-50 text-rose-600"
              : "bg-teal-50 text-teal-600"
          }`}
        >
          <User size={28} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-800">
              {request.patientName}
            </h3>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
              ID: {request.patientId}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Clock size={14} /> {request.timestamp}
            </span>
            <span className="flex items-center gap-1">
              <Phone size={14} /> {request.phone}
            </span>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 italic text-slate-600 text-sm flex gap-2">
            <MessageSquare
              size={16}
              className="shrink-0 mt-0.5 text-slate-400"
            />
            "{request.message}"
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {type === "pending" ? (
          <>
            <button
              onClick={() => onIgnore(request.id)}
              className="p-3 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"
            >
              <X size={24} />
            </button>
            <button
              onClick={() => onAccept(request.id)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-200 hover:bg-blue-600 transition-all"
            >
              <Check size={20} />
              Accept Case
            </button>
          </>
        ) : (
          <button className="flex items-center gap-2 px-6 py-3 bg-teal-50 text-teal-600 rounded-xl font-semibold cursor-default">
            <Check size={20} />
            Accepted
          </button>
        )}
      </div>
    </div>
  </div>
);

export default function EmergencyRequests() {
  const [view, setView] = useState("pending"); // 'pending' or 'accepted'
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Backend Connection Logic ---
  useEffect(() => {
    fetchEmergencyRequests();
  }, []);

  const fetchEmergencyRequests = async () => {
    setLoading(true);
    try {
      // Replace with: const response = await axios.get('/api/emergencies');
      // Simulated Mock Data
      const mockData = [
        {
          id: 1,
          patientName: "Sarah Connor",
          patientId: "PX-204",
          phone: "+1 555-0123",
          message:
            "Severe chest pain and shortness of breath for the last 20 minutes.",
          timestamp: "2 mins ago",
          status: "pending",
        },
        {
          id: 2,
          patientName: "Marcus Wright",
          patientId: "PX-992",
          phone: "+1 555-0199",
          message: "High fever (103°F) and persistent vomiting.",
          timestamp: "15 mins ago",
          status: "pending",
        },
        {
          id: 3,
          patientName: "Kyle Reese",
          patientId: "PX-110",
          phone: "+1 555-0144",
          message: "Post-surgery incision site looks inflamed and bleeding.",
          timestamp: "1 hour ago",
          status: "accepted",
        },
      ];
      setRequests(mockData);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    // API Call: await axios.patch(`/api/emergencies/${id}`, { status: 'accepted' });
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "accepted" } : req))
    );
  };

  const handleIgnore = async (id) => {
    // API Call: await axios.delete(`/api/emergencies/${id}`);
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const filteredRequests = requests.filter((req) => req.status === view);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <div className="relative p-8 rounded-3xl bg-white border border-rose-50 shadow-[0_0_40px_-10px_rgba(244,63,94,0.1)] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-rose-100 to-orange-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-40"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500 rounded-lg animate-pulse">
                <AlertCircle className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-slate-800">
                Emergency Queue
              </h1>
            </div>
            <p className="text-slate-500 mt-2">
              High-priority medical requests requiring immediate clinical
              review.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-4xl font-black text-rose-500 drop-shadow-sm">
              {requests.filter((r) => r.status === "pending").length}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Active Alerts
            </span>
          </div>
        </div>
      </div>

      {/* 2. Switcher (Cyber Style) */}
      <div className="flex items-center p-1 bg-slate-100/50 rounded-2xl border border-slate-100 w-full max-w-md">
        <button
          onClick={() => setView("pending")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300
              ${
                view === "pending"
                  ? "bg-white text-rose-600 shadow-sm border border-rose-100"
                  : "text-slate-400 hover:text-slate-600"
              }`}
        >
          Pending Requests
          <span
            className={`ml-1 px-2 py-0.5 rounded-md text-[10px] ${
              view === "pending"
                ? "bg-rose-500 text-white"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            {requests.filter((r) => r.status === "pending").length}
          </span>
        </button>
        <button
          onClick={() => setView("accepted")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300
              ${
                view === "accepted"
                  ? "bg-white text-teal-600 shadow-sm border border-teal-100"
                  : "text-slate-400 hover:text-slate-600"
              }`}
        >
          Accepted Cases
        </button>
      </div>

      {/* 3. List Section */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center text-slate-400 animate-pulse">
            Establishing secure uplink to emergency server...
          </div>
        ) : filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              type={view}
              onAccept={handleAccept}
              onIgnore={handleIgnore}
            />
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/50">
            <div className="p-4 bg-white rounded-full shadow-sm text-slate-300 mb-4">
              <Check size={40} />
            </div>
            <h3 className="text-slate-500 font-medium">
              No {view} requests at this time.
            </h3>
            <p className="text-slate-400 text-sm">System is currently clear.</p>
          </div>
        )}
      </div>
    </div>
  );
}
