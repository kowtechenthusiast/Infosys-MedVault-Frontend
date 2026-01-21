import React from "react";
import {
  X,
  User,
  Stethoscope,
  Briefcase,
  ShieldCheck,
  Phone,
  Building2,
  ChevronRight,
  Activity,
  Star,
  GraduationCap,
  MapPin,
  Wallet,
} from "lucide-react";

export function DoctorDetailModalEmergency({ isOpen, onClose, doctor }) {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* LEFT PANEL: Identity & Credentials */}
          <div className="md:w-2/5 bg-slate-50 border-r border-slate-100 p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="relative inline-block">
                <div className="h-28 w-28 bg-white rounded-[2rem] shadow-md border border-slate-200 flex items-center justify-center">
                  <User size={56} className="text-teal-600" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-slate-50">
                  <ShieldCheck size={18} />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                  Dr. {doctor.name}
                </h2>
                <p className="text-teal-600 font-bold flex items-center gap-2 text-sm uppercase tracking-widest mt-3">
                  <Stethoscope size={16} /> {doctor.specialization}
                </p>
                <p className="text-slate-500 text-sm mt-1 font-medium flex items-center gap-1">
                  <GraduationCap size={16} />{" "}
                  {doctor.qualification || "Medical Professional"}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <BadgeItem
                  icon={
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                  }
                  text={`${
                    doctor.averageRating?.toFixed(1) || "New"
                  } Responder Rating`}
                />
                <BadgeItem
                  icon={<Briefcase size={14} className="text-slate-400" />}
                  text={`${doctor.experience || "5+"} Years Experience`}
                />
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                Emergency Hotline
              </p>
              <div className="flex items-center gap-4 text-slate-600">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200">
                  <Phone size={20} className="text-teal-500" />
                </div>
                <div>
                  <p className="text-base font-bold text-slate-800">
                    {doctor.phone}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase">
                    Available via Call/SMS
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Location & Details */}
          <div className="flex-1 p-10 flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black tracking-widest uppercase border border-emerald-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Active Responder
                </span>
                <h3 className="text-xl font-bold text-slate-800 mt-2">
                  Facility & Response Info
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 flex-1">
              <DetailRow
                icon={<Building2 className="text-teal-500" size={20} />}
                label="Clinic / Hospital"
                value={doctor.clinicName || "Private Clinical Facility"}
              />
              <DetailRow
                icon={<MapPin className="text-rose-500" size={20} />}
                label="Response Area"
                value={doctor.city}
                subtext={doctor.state}
              />
              <DetailRow
                icon={<Wallet className="text-emerald-500" size={20} />}
                label="Consultation Fee"
                value={`₹${doctor.consultationFee || "500"}`}
                subtext="Payable after checkup"
              />
              <DetailRow
                icon={<Activity className="text-blue-500" size={20} />}
                label="Current Status"
                value="En Route"
                subtext="Preparing Medical Kit"
              />

              <div className="col-span-full bg-amber-50 p-6 rounded-[2rem] border border-amber-100/50">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={18} className="text-amber-600" />
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">
                    Patient Instructions
                  </p>
                </div>
                <p className="text-slate-700 text-sm font-medium italic leading-relaxed">
                  "Dr. {doctor.name} has accepted your signal. Please remain at
                  your current location. Keep your phone line clear for
                  potential incoming coordination calls."
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-10 flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                onClick={() => (window.location.href = `tel:${doctor.phone}`)}
                className="flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors"
              >
                <Phone size={18} />
                Call Doctor Now
              </button>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
              >
                Close Profile <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function BadgeItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white/80 px-3 py-2.5 rounded-xl border border-slate-200/60 shadow-sm">
      {icon} {text}
    </div>
  );
}

function DetailRow({ icon, label, value, subtext }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 p-2 bg-slate-50 rounded-lg h-fit">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-base font-bold text-slate-800 leading-tight">
          {value}
        </p>
        {subtext && (
          <p className="text-xs text-slate-400 mt-1 font-medium">{subtext}</p>
        )}
      </div>
    </div>
  );
}
