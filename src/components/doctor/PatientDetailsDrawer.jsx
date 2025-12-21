import React from "react";
import { MessageSquare, Activity } from "lucide-react"; // Optional icons for flair

export default function PatientDetailsDrawer({ patient, onClose, reason }) {
  if (!patient) return null;

  const formattedId = patient?.id
    ? `#${patient.id.toString().padStart(5, "0")}`
    : "N/A";

  const bpValue =
    patient?.bpSys && patient?.bpDia
      ? `${patient.bpSys}/${patient.bpDia}`
      : null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end p-4 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full sm:w-[450px] bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden animate-in slide-in-from-right-full duration-500">
        {/* Header Decor */}
        <div className="h-32 bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-500 p-8 relative">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all backdrop-blur-md"
          >
            ✕
          </button>
          <div className="mt-4">
            <h2 className="text-2xl font-black text-white leading-none">
              {patient?.user?.name}
            </h2>
            <p className="text-indigo-100 text-[10px] mt-2 opacity-80 uppercase tracking-[0.2em] font-bold">
              Medical Profile Terminal
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          {/* NEW SECTION: Reason for Visit */}
          <section className="relative">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                Clinical Objective
              </h3>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>
            <div className="bg-slate-900 rounded-4xl p-6 shadow-xl shadow-indigo-100 relative overflow-hidden group">
              {/* Decorative Icon */}
              <MessageSquare className="absolute -right-2 -bottom-2 text-white/5 w-16 h-16 transform -rotate-12" />

              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
                Chief Complaint / Reason
              </p>
              <p className="text-white font-medium leading-relaxed italic">
                "{reason || "No specific reason provided for this session."}"
              </p>
            </div>
          </section>

          {/* Vitals Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                Biometric Vitals
              </h3>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <VitalCard
                label="Blood Sugar"
                value={patient?.sugarLevel}
                unit="mg/dL"
                color="rose"
              />
              <VitalCard
                label="Saturation"
                value={patient?.spo2}
                unit="%"
                color="cyan"
              />
              <VitalCard
                label="Pressure"
                value={bpValue}
                unit="mmHg"
                color="indigo"
              />
              <VitalCard
                label="Heart Rate"
                value={patient?.heartRate}
                unit="BPM"
                color="emerald"
              />
            </div>
          </div>

          {/* Detailed Info Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                Core Identification
              </h3>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <InfoItem label="Registry ID" value={formattedId} />
              <InfoItem label="Electronic Mail" value={patient?.user?.email} />
              <InfoItem label="Primary Contact" value={patient?.phone} />
              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="Blood Group" value={patient?.bloodGroup} />
                <InfoItem label="Gender" value={patient?.gender} />
              </div>
              <InfoItem
                label="Assigned Sector (Location)"
                value={`${patient?.city}, ${patient?.state}`}
              />

              {patient?.address && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Biological Residence
                  </span>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {patient.address}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Action Footer */}
        <div className="p-8 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={onClose}
            className="w-full cursor-pointer py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 active:scale-95 transition-all duration-300"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * VitalCard Helper
 */
function VitalCard({ label, value, unit, color }) {
  const colors = {
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <div
      className={`p-4 rounded-3xl border ${colors[color]} shadow-sm transition-transform hover:scale-[1.02] duration-300`}
    >
      <p className="text-[9px] font-black uppercase opacity-70 tracking-wider mb-1">
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-black">{value || "—"}</span>
        <span className="text-[10px] font-bold opacity-60">{unit}</span>
      </div>
    </div>
  );
}

/**
 * InfoItem Helper
 */
function InfoItem({ label, value }) {
  return (
    <div className="flex flex-col group">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter group-hover:text-indigo-500 transition-colors">
        {label}
      </span>
      <span className="text-slate-700 font-semibold break-all">
        {value || "Pending Record..."}
      </span>
    </div>
  );
}
