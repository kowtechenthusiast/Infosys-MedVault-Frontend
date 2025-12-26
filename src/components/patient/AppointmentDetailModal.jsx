import {
  Star,
  ShieldCheck,
  Banknote,
  Phone,
  Briefcase,
  X,
  Calendar,
  User,
  Clock,
  MapPin,
  AlertCircle,
  Stethoscope,
  ChevronRight,
} from "lucide-react";

export default function AppointmentDetailModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* LEFT PANEL: Provider Identity */}
          <div className="md:w-2/5 bg-slate-50 border-r border-slate-100 p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="h-24 w-24 bg-white rounded-3xl shadow-sm border border-slate-200 flex items-center justify-center">
                <User size={44} className="text-blue-600" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                    Dr. {data.doctorName}
                  </h2>
                </div>
                <p className="text-blue-600 font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                  <Stethoscope size={16} /> {data.specialization}
                </p>
                <p className="text-slate-400 text-sm mt-1 font-medium">
                  {data.qualification}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <BadgeItem
                  icon={
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                  }
                  text={`${data.averageRating || "New"} Rating`}
                />
                <BadgeItem
                  icon={<Briefcase size={14} className="text-slate-400" />}
                  text={`${data.experience} Years of Experience`}
                />
                <BadgeItem
                  icon={<ShieldCheck size={14} className="text-emerald-500" />}
                  text="Verified Medical Provider"
                />
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                Support
              </p>
              <div className="flex items-center gap-4 text-slate-600">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200">
                  <Phone size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-bold">{data.phone}</p>
                  <p className="text-[10px] text-slate-400">Clinic Helpline</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Appointment Details */}
          <div className="flex-1 p-10 flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black tracking-widest uppercase border border-blue-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                  {data.status}
                </span>
                <h3 className="text-xl font-bold text-slate-800 mt-2">
                  Appointment Summary
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
                icon={<Calendar className="text-blue-500" size={20} />}
                label="Scheduled Date"
                value={data.appointmentDate}
              />
              <DetailRow
                icon={<Clock className="text-blue-500" size={20} />}
                label="Arrival Time"
                value={data.appointmentTime}
              />
              <DetailRow
                icon={<MapPin className="text-red-500" size={20} />}
                label="Clinical Facility"
                value={data.clinicHospitalName}
                subtext={data.city}
              />
              <DetailRow
                icon={<Banknote className="text-emerald-500" size={20} />}
                label="Consultation Fee"
                value={`₹${data.consultationFee}`}
              />

              <div className="col-span-full bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Chief Complaint
                </p>
                <p className="text-slate-700 font-medium italic leading-relaxed">
                  "
                  {data.reason ||
                    "Patient requested a general health checkup and consultation."}
                  "
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-12 flex items-center justify-between pt-6 border-t border-slate-100">
              <button className="group flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                <AlertCircle size={16} />
                Cancel Session
              </button>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
                >
                  Confirm Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function BadgeItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white/50 px-3 py-2 rounded-xl border border-slate-200/60 shadow-sm">
      {icon} {text}
    </div>
  );
}

function DetailRow({ icon, label, value, subtext }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-base font-bold text-slate-800 leading-none">
          {value}
        </p>
        {subtext && (
          <p className="text-xs text-slate-400 mt-1 font-medium">{subtext}</p>
        )}
      </div>
    </div>
  );
}
