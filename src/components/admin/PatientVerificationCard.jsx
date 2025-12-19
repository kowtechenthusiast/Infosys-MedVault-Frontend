import { useState } from "react";
import {
  ChevronDown,
  Check,
  X,
  User,
  Clock,
  Mail,
  Calendar,
} from "lucide-react";

export default function PatientVerificationCard({ data, role }) {
  console.log("Patient Verification Card Data:", data);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(data.status);
  const [actionLoading, setActionLoading] = useState(false);

  const isPending = status === "PENDING";

  const statusColors = isPending
    ? {
        border: "border-amber-200",
        bg: "bg-amber-50",
        text: "text-amber-600",
        shadow: "shadow-[0_0_20px_rgba(245,158,11,0.1)]",
      }
    : status === "APPROVED"
    ? {
        border: "border-green-200",
        bg: "bg-green-50",
        text: "text-green-600",
        shadow: "shadow-sm",
      }
    : {
        border: "border-red-200",
        bg: "bg-red-50",
        text: "text-red-600",
        shadow: "shadow-sm",
      };

  const StatusIcon = isPending ? Clock : Check;

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString();
  };

  // ---------------- API CALLS ----------------

  const updateStatus = async (action) => {
    try {
      setActionLoading(true);

      const res = await fetch(
        `http://localhost:8080/api/admin/users/${data.userId}/${action}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Action failed");
      }

      const updated = await res.json();
      setStatus(updated.status);
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };

  const handleGrantAccess = (e) => {
    e.stopPropagation();
    updateStatus("approve");
  };

  const handleDenyRequest = (e) => {
    e.stopPropagation();
    updateStatus("reject");
  };

  // ---------------- UI ----------------

  return (
    <div
      className={`p-1 rounded-3xl bg-white transition-all duration-300 ${statusColors.shadow}`}
    >
      <div
        className={`p-5 flex justify-between items-center rounded-2xl border ${statusColors.border}
        cursor-pointer hover:border-blue-300`}
        onClick={() => setOpen(!open)}
      >
        {/* Left */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div
            className={`p-3 rounded-full ${statusColors.bg} ${statusColors.text}`}
          >
            <User size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 truncate">
              {data.name}
            </h3>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              {role}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase ${statusColors.bg} ${statusColors.text}`}
          >
            <StatusIcon size={14} />
            {status}
          </div>
          <ChevronDown
            size={22}
            className={`transition-transform ${
              open ? "rotate-180 text-blue-600" : ""
            }`}
          />
        </div>
      </div>

      {/* Expandable */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 mt-2 pt-4 px-5 pb-5" : "max-h-0"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600 mb-6">
          <div className="flex gap-2">
            <Mail size={18} className="text-blue-500" />
            {data.email}
          </div>

          <div className="flex gap-2">
            <Calendar size={18} className="text-teal-500" />
            {formatTime(data.updated_at)}
          </div>
        </div>

        {isPending ? (
          <div className="flex gap-4 pt-4 border-t">
            <button
              onClick={handleGrantAccess}
              disabled={actionLoading}
              className="px-5 py-2 bg-green-600 text-white rounded-xl font-semibold disabled:opacity-50"
            >
              <Check size={16} /> Approve
            </button>

            <button
              onClick={handleDenyRequest}
              disabled={actionLoading}
              className="px-5 py-2 bg-red-600 text-white rounded-xl font-semibold disabled:opacity-50"
            >
              <X size={16} /> Reject
            </button>
          </div>
        ) : (
          <p className={`pt-4 border-t font-semibold ${statusColors.text}`}>
            Status is {status}. No further action required.
          </p>
        )}
      </div>
    </div>
  );
}
