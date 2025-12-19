import { Calendar, Stethoscope, Briefcase, Star, MapPin } from "lucide-react";

export default function DoctorCard({ doctor, onBook }) {
  const {
    name,
    specialization,
    experience,
    rating = "4.7",
    city = "Remote/Clinic",
  } = doctor;

  return (
    // THEMED WRAPPER: Elevated card styling with hover glow and lift
    <div
      className="p-6 bg-white rounded-2xl border border-slate-100 
                 transition-all duration-300 hover:-translate-y-0.5 group
                 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] 
                 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)] 
                 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
    >
      {/* 1. Doctor Details Section */}
      <div className="flex-1">
        <h3 className="text-2xl font-extrabold text-slate-800 drop-shadow-sm group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        {/* Specialization with Accent Color and Icon */}
        <p className="text-lg font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500 flex items-center gap-2 mt-1">
          <Stethoscope size={18} /> {specialization}
        </p>

        {/* Additional Info Row */}
        <div className="text-slate-500 text-sm grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          <span className="flex items-center gap-1 font-medium">
            <Briefcase size={14} className="text-amber-500" />
            {experience} years exp.
          </span>
          <span className="flex items-center gap-1 font-medium">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            {rating} Rating
          </span>
          <span className="flex items-center gap-1 font-medium col-span-2 md:col-span-1">
            <MapPin size={14} className="text-red-500" />
            {city}
          </span>
        </div>
      </div>

      {/* 2. Book Button (Gradient and Shadow) */}
      <button
        onClick={onBook}
        className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl 
                   flex gap-2 items-center transition-all duration-300 whitespace-nowrap
                   shadow-[0_4px_15px_rgba(6,182,212,0.4)] 
                   hover:shadow-[0_8px_25px_rgba(6,182,212,0.6)] 
                   hover:-translate-y-0.5"
      >
        <Calendar size={18} /> Book Session
      </button>
    </div>
  );
}
