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

// Renamed component for Admin context (AdminVerificationCard)
export default function PatientVerificationCard({ data, role }) {
  const [open, setOpen] = useState(false);

  // --- Dynamic Styling based on Status ---
  const isPending = data.status === "PENDING";

  // Set colors based on status (PENDING uses amber/yellow, others use slate/gray)
  const statusColors = isPending
    ? {
        border: "border-amber-200",
        bg: "bg-amber-50",
        text: "text-amber-600",
        shadow: "shadow-[0_0_20px_rgba(245,158,11,0.1)]",
      }
    : {
        border: "border-green-200", // Changed approved state to green for positive confirmation
        bg: "bg-green-50",
        text: "text-green-600",
        shadow: "shadow-sm",
      };

  const StatusIcon = isPending ? Clock : Check;

  // Helper function to format date/time
  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      return new Date(timestamp).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      console.error(e);
      return timestamp;
    }
  };

  // --- Handler functions for Admin actions ---
  // NOTE: You need to implement the actual API calls in these functions
  const handleGrantAccess = () => {
    console.log(`Granting access for user: ${data.email}`);
    // Implement API call to update user status to APPROVED/ACTIVE
  };

  const handleDenyRequest = () => {
    console.log(`Denying request for user: ${data.email}`);
    // Implement API call to update user status to REJECTED/DENIED
  };

  return (
    <div
      className={`p-1 rounded-3xl bg-white transition-all duration-300 ${statusColors.shadow} hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]`}
    >
      <div
        className={`p-5 flex justify-between items-center rounded-2xl border ${statusColors.border} transition-all duration-300 cursor-pointer 
          hover:border-blue-300 hover:bg-blue-50/20`}
        onClick={() => setOpen(!open)}
      >
        {/* Left Section: Name and Role */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div
            className={`p-3 rounded-full ${statusColors.bg} ${statusColors.text} flex-shrink-0`}
          >
            <User size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-slate-800 truncate">
              {data.name}
            </h3>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              {role}
            </p>
          </div>
        </div>

        {/* Right Section: Status and Toggle Button */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase ${statusColors.bg} ${statusColors.text}`}
          >
            <StatusIcon size={14} />
            {data.status}
          </div>
          <ChevronDown
            size={24}
            className={`text-slate-400 transition-transform ${
              open ? "rotate-180 text-blue-600" : ""
            }`}
          />
        </div>
      </div>

      {/* Expandable details */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open
            ? "max-h-96 border-t border-slate-100 mt-2 pt-4 px-5 pb-5"
            : "max-h-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 mb-6 text-sm text-slate-600">
          {/* Email Address */}
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-blue-500 shrink-0" />
            <p>
              <span className="font-semibold text-slate-700">Email:</span>{" "}
              {data.email}
            </p>
          </div>

          {/* Creation Time */}
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-teal-500 shrink-0" />
            <p>
              <span className="font-semibold text-slate-700">
                Registration Date:
              </span>{" "}
              {formatTime(data.createdAt)}
            </p>
          </div>

          {/* Empty column for layout balance */}
          <div className="hidden md:block"></div>
        </div>

        {/* Action Buttons (Visible only if status is PENDING) */}
        {isPending ? (
          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={handleGrantAccess}
              className="px-5 py-2 bg-linear-to-r from-green-500 to-teal-500 text-white rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 active:scale-[0.98]"
            >
              <Check size={18} /> Grant Access
            </button>

            <button
              onClick={handleDenyRequest}
              className="px-5 py-2 bg-linear-to-r from-red-600 to-pink-500 text-white rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 active:scale-[0.98]"
            >
              <X size={18} /> Deny Request
            </button>
          </div>
        ) : (
          // Message when the request has already been processed (e.g., APPROVED or REJECTED)
          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <p className={`text-sm font-semibold ${statusColors.text} italic`}>
              User status is **{data.status}**. No further action required.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
