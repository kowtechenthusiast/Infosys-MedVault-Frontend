import {
  Star,
  ShieldCheck,
  Banknote,
  Phone,
  Briefcase,
  X,
  Calendar,
  User,
  Info,
  Clock,
  MapPin,
  AlertTriangle,
} from "lucide-react";

export default function AppointmentDetailModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        {/* Top Section: Profile Header */}
        <div className="relative bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="h-24 w-24 bg-white/20 rounded-3xl backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
              <User size={48} className="text-white" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-black tracking-tight">
                  Dr. {data.doctorName}
                </h2>
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold">
                    {data.averageRating || "New"}
                  </span>
                </div>
              </div>
              <p className="text-blue-100 font-medium text-lg mt-1">
                {data.specialization} • {data.qualification}
              </p>

              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-400/30">
                  <ShieldCheck size={14} /> Verified Provider
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold bg-blue-400/20 px-3 py-1.5 rounded-lg border border-blue-300/30">
                  <Briefcase size={14} /> {data.experience} Years Exp.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Appointment Context */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Visit Logistics
            </h4>
            <div className="space-y-4">
              <Info
                icon={<Calendar size={18} className="text-blue-500" />}
                label="Date"
                value={data.appointmentDate}
              />
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-blue-500" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      Time Slot
                    </p>
                    <p className="font-bold text-slate-700">
                      {data.appointmentTime}
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-white rounded-lg shadow-sm border border-slate-200 text-xs font-black text-blue-600">
                  {data.status}
                </div>
              </div>
              <Info
                icon={<MapPin size={18} className="text-red-500" />}
                label="Facility"
                value={data.clinicHospitalName}
              />
              <p className="text-[10px] text-slate-400 ml-8 -mt-3 italic">
                {data.city}
              </p>
            </div>
          </div>

          {/* Professional Details */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Pricing & Contact
            </h4>
            <div className="space-y-4">
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                    <Banknote size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase">
                      Consultation Fee
                    </p>
                    <p className="text-xl font-black text-slate-800">
                      ₹{data.consultationFee}
                    </p>
                  </div>
                </div>
              </div>

              <Info
                icon={<Phone size={18} className="text-indigo-500" />}
                label="Support Line"
                value={data.phone}
              />
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                  Reason for visit
                </p>
                <p className="text-sm font-semibold text-slate-700 italic">
                  "{data.reason || "General Consultation"}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-6 border-t bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button className="text-red-600 text-sm font-bold flex items-center gap-2 hover:underline">
            <AlertTriangle size={16} /> Cancel Appointment
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-10 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
