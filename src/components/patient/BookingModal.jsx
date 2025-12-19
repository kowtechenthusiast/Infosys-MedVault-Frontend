import {
  X,
  Calendar,
  Clock,
  Stethoscope,
  Briefcase,
  Star,
  MapPin,
} from "lucide-react";

export default function BookingModal({ doctor, onClose }) {
  // Destructuring with defaults for enhanced display
  const {
    name,
    specialization,
    experience = "N/A",
    rating = "N/A",
    city,
    state,
  } = doctor;

  return (
    // Overlay with heavy blur for futuristic feel
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
      {/* Modal Container: Elevated, rounded, and uses subtle glow shadow */}
      <div className="bg-white p-8 rounded-3xl w-[500px] max-h-[90vh] overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-blue-50 relative animate-in zoom-in-50 duration-300">
        {/* Decorative Gradient Bar at the Top */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-blue-600 to-cyan-500 rounded-t-3xl"></div>

        {/* Close Button: Styled to match theme */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-3xl font-extrabold text-slate-800 mb-4">
          Finalize Booking
        </h2>

        {/* --- Enhanced Doctor Profile Card --- */}
        <div className="mb-6 p-5 rounded-xl bg-blue-50/70 border border-blue-100/70 shadow-inner">
          <p className="text-xl font-bold text-blue-700">{name}</p>

          {/* Specialization */}
          <p className="text-sm font-medium text-slate-600 flex items-center gap-2 mt-1">
            <Stethoscope size={16} className="text-cyan-600" />
            {specialization}
          </p>

          {/* Additional Details Grid (More necessary details added here) */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-500 mt-3 border-t border-blue-100 pt-3">
            <span className="flex items-center gap-1">
              <Briefcase size={14} className="text-amber-500" />
              <span className="font-semibold text-slate-700">
                {experience}
              </span>{" "}
              years exp.
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-slate-700">
                {rating}
              </span>{" "}
              Rating
            </span>
            <span className="flex items-center gap-1 col-span-2">
              <MapPin size={14} className="text-red-500" />
              <span className="font-semibold text-slate-700">{city}</span>
              {","}
              <span className="font-semibold text-slate-700">{state}</span>
              (Clinic Location)
            </span>
          </div>
        </div>
        {/* ----------------------------------- */}

        {/* Date Input */}
        <label className="block font-semibold text-slate-700 mt-2 mb-1 items-center gap-2">
          <Calendar size={18} className="text-blue-500" /> Select Date
        </label>
        <input
          type="date"
          className="w-full px-4 py-3 border border-slate-300 rounded-xl mt-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
        />

        {/* Time Input */}
        <label className="block font-semibold text-slate-700 mt-4 mb-1 items-center gap-2">
          <Clock size={18} className="text-blue-500" /> Select Time Slot
        </label>
        <input
          type="time"
          className="w-full px-4 py-3 border border-slate-300 rounded-xl mt-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
        />

        {/* Reason for Visit (Added necessary detail) */}
        <label className="block font-semibold text-slate-700 mt-4 mb-1 items-center gap-2">
          <Briefcase size={18} className="text-blue-500" /> Reason for Visit
          <span className="text-red-500 text-xs font-normal ml-1">
            (Required)
          </span>
        </label>
        <textarea
          rows="3"
          placeholder="Briefly describe your symptoms or reason for consulting the doctor..."
          className="w-full px-4 py-3 border border-slate-300 rounded-xl mt-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm resize-none"
        />

        {/* Confirm Button: Gradient and Shadow */}
        <button
          className="mt-8 w-full bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl 
                         shadow-[0_8px_20px_-5px_rgba(6,182,212,0.6)] hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 hover:-translate-y-0.5"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}
