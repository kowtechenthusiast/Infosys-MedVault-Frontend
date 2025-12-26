import {
  X,
  User,
  Stethoscope,
  Briefcase,
  GraduationCap,
  Building2,
  Banknote,
  Phone,
  Mail,
  MapPin,
  Globe,
  ShieldCheck,
  Star,
} from "lucide-react";

export default function DoctorDetailsModal({ doctor, onClose }) {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-300">
        {/* LEFT: Identity Sidebar */}
        <div className="md:w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="h-28 w-28 bg-white rounded-[2rem] shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
              <User size={56} className="text-blue-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-slate-50">
              <ShieldCheck size={16} />
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-800 leading-tight">
            Dr. {doctor.name}
          </h2>
          <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-2 flex items-center gap-1 justify-center">
            <Stethoscope size={14} /> {doctor.specialization}
          </p>

          <div className="mt-6 w-full space-y-3">
            <div className="flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-slate-200/60 shadow-xs">
              <span className="text-[10px] font-black text-slate-400 uppercase">
                Rating
              </span>
              <span className="flex items-center gap-1 text-sm font-bold text-slate-700">
                <Star size={14} className="fill-amber-400 text-amber-400" /> 4.9
              </span>
            </div>
            <div className="flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-slate-200/60 shadow-xs">
              <span className="text-[10px] font-black text-slate-400 uppercase">
                Status
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Available
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Professional Details */}
        <div className="flex-1 p-8 md:p-10 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-all"
          >
            <X size={24} />
          </button>

          <div className="mb-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 pb-2">
              Professional Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <DetailIconItem
                icon={<Briefcase size={18} />}
                label="Clinical Experience"
                value={`${doctor.experience} Years`}
                color="text-blue-500"
              />
              <DetailIconItem
                icon={<GraduationCap size={18} />}
                label="Qualifications"
                value={doctor.qualification}
                color="text-indigo-500"
              />
              <DetailIconItem
                icon={<Building2 size={18} />}
                label="Primary Facility"
                value={doctor.clinicHospitalName}
                color="text-slate-600"
              />
              <DetailIconItem
                icon={<Banknote size={18} />}
                label="Consultation Fee"
                value={`₹${doctor.consultationFee}`}
                color="text-emerald-500"
              />
            </div>
          </div>

          <div className="mb-8 mr-10">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 pb-2">
              Contact & Location
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <DetailIconItem
                icon={<Phone size={18} />}
                label="Phone"
                value={doctor.phone}
                color="text-slate-400"
              />
              <DetailIconItem
                icon={<Mail size={18} />}
                label="Email Address"
                value={doctor.email}
                color="text-slate-400"
              />
              <DetailIconItem
                icon={<MapPin size={18} />}
                label="City"
                value={doctor.city}
                color="text-red-400"
              />
              <DetailIconItem
                icon={<Globe size={18} />}
                label="State/Region"
                value={doctor.state}
                color="text-blue-400"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-10 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailIconItem({ icon, label, value, color }) {
  return (
    <div className="w-full flex items-start gap-4">
      <div className={`mt-1 ${color}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="font-bold text-slate-700 text-sm leading-tight">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
