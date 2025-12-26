import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
  ShieldCheck,
  Inbox,
  ShieldAlert,
} from "lucide-react";

export default function MedicalRecordAccessRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("PENDING"); // Toggle between PENDING and HISTORY

  const patientId = localStorage.getItem("userId");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/patient/medical-records/access-requests?patientId=${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setRequests(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (requestId, action) => {
    await fetch(
      `http://localhost:8080/patient/medical-records/access-requests/${requestId}/${action}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchRequests();
  };

  // Filter logic for tabs
  const filteredRequests = requests.filter((req) =>
    activeTab === "PENDING"
      ? req.status === "PENDING"
      : req.status !== "PENDING"
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 text-blue-600 font-bold animate-pulse">
        Fetching permission requests...
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1 md:p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-slate-800">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
              Control Center
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium flex items-center gap-2">
            <ShieldCheck size={16} className="text-cyan-500" />
            Manage who can view your clinical documentation
          </p>
        </div>

        {/* Professional Tab Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab("PENDING")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "PENDING"
                ? "bg-white text-blue-600 shadow-md"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Inbox size={18} />
            Requests{" "}
            {requests.filter((r) => r.status === "PENDING").length > 0 && (
              <span className="ml-1 bg-blue-600 text-white text-[10px] px-1.5 rounded-full">
                {requests.filter((r) => r.status === "PENDING").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("HISTORY")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "HISTORY"
                ? "bg-white text-blue-600 shadow-md"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Clock size={18} />
            History
          </button>
        </div>
      </div>

      {/* List Container */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
            <ShieldAlert size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold italic">
              No {activeTab.toLowerCase()} requests found.
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <AccessRequestCard
              key={req.requestId}
              data={req}
              onApprove={() => updateStatus(req.requestId, "approve")}
              onReject={() => updateStatus(req.requestId, "reject")}
            />
          ))
        )}
      </div>
    </div>
  );
}

const AccessRequestCard = ({ data, onApprove, onReject }) => {
  const statusConfig = {
    PENDING: "text-amber-600 bg-amber-50 border-amber-100",
    APPROVED: "text-green-600 bg-green-50 border-green-100",
    REJECTED: "text-red-600 bg-red-50 border-red-100",
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-200 hover:shadow-md transition-all duration-300">
      {/* Icon & Details */}
      <div className="flex gap-4 items-start">
        <div className="p-3 bg-blue-50 rounded-xl">
          <FileText className="text-blue-600" size={24} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-lg leading-tight mb-1">
            {data.fileName}
          </h4>
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
              <User size={14} className="text-slate-400" />
              Dr. {data.doctorName}
              <span className="text-[10px] text-slate-500 font-normal uppercase tracking-widest px-2 py-0.5 bg-slate-50 rounded">
                {data.specialization}
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock size={12} />
              {new Date(data.requestedAt).toLocaleDateString(undefined, {
                dateStyle: "long",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Actions / Status */}
      <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 border-slate-50">
        <span
          className={`px-4 py-1.5 text-[10px] font-black tracking-widest rounded-full border ${
            statusConfig[data.status]
          }`}
        >
          {data.status}
        </span>

        {data.status === "PENDING" && (
          <div className="flex gap-2 ml-auto">
            <button
              onClick={onReject}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-bold text-xs"
            >
              <XCircle size={18} />
              Deny
            </button>
            <button
              onClick={onApprove}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all font-bold text-xs shadow-lg shadow-blue-100"
            >
              <CheckCircle size={18} />
              Allow Access
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
