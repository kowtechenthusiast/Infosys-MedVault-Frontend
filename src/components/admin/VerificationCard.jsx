import { useState } from "react";
import {
  ChevronDown,
  Check,
  X,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function VerificationCard({ data, role }) {
  const [open, setOpen] = useState(false);

  // --- Dynamic Styling based on Status ---
  const isPending = data.status === "PENDING";
  const statusColors = isPending
    ? {
        border: "border-amber-200",
        bg: "bg-amber-50",
        text: "text-amber-600",
        shadow: "shadow-[0_0_20px_rgba(245,158,11,0.1)]",
      }
    : {
        border: "border-slate-200",
        bg: "bg-slate-50",
        text: "text-slate-500",
        shadow: "shadow-sm",
      };

  const StatusIcon = isPending ? Clock : Check;

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
          {/* Specialization */}
          {data.specialization && (
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-blue-500 shrink-0" />
              <p>
                <span className="font-semibold text-slate-700">
                  Specialization:
                </span>{" "}
                {data.specialization}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience && (
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-teal-500 shrink-0" />
              <p>
                <span className="font-semibold text-slate-700">
                  Experience:
                </span>{" "}
                {data.experience}
              </p>
            </div>
          )}

          {/* Certificate Link */}
          <div className="flex items-center gap-2 col-span-1 md:col-span-1">
            <FileText size={18} className="text-purple-500 shrink-0" />
            <a
              href={`/certificates/${data.certificate}`}
              target="_blank"
              className="font-medium text-blue-600 hover:text-blue-700 underline flex items-center gap-1"
            >
              {data.certificate} <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Action Buttons (Thematic Gradient Style) */}
        <div className="flex gap-4 pt-4 border-t border-slate-100">
          <button className="px-5 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30">
            <Check size={18} /> Grant Access
          </button>

          <button className="px-5 py-2 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30">
            <X size={18} /> Deny Request
          </button>
        </div>
      </div>
    </div>
  );
}
