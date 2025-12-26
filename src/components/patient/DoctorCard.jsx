import { Stethoscope, Star, MapPin, Eye, ShieldCheck } from "lucide-react";

export default function DoctorCard({ doctor, onBook, onView }) {
  const {
    name,
    specialization,
    experience,
    rating = 0,
    ratingCount = 0,
    city,
    consultationFee,
  } = doctor;

  return (
    <div
      className="group px-5 py-4 bg-white rounded-2xl border border-slate-100/80
                 flex items-center justify-between gap-4
                 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                 hover:border-blue-200/60 hover:-translate-y-0.5"
    >
      {/* LEFT: Provider Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-black text-slate-800 tracking-tight truncate group-hover:text-blue-600 transition-colors">
            Dr. {name}
          </h3>
          <ShieldCheck size={14} className="text-blue-500 shrink-0" />
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 rounded-md">
            <Stethoscope size={12} className="text-blue-600" />
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
              {specialization}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-600 font-semibold text-xs">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span>{rating > 0 ? rating.toFixed(1) : "New"}</span>
            <span className="text-slate-400 font-medium">({ratingCount})</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-slate-500 text-xs">
            <MapPin size={12} className="text-slate-400" />
            <span className="truncate">{city}</span>
          </div>
        </div>

        {/* Details line */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {experience} Yrs Exp
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-200"></span>
          <span className="text-[13px] font-black text-slate-700">
            ₹{consultationFee}
          </span>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onView}
          className="p-2.5 text-slate-400 rounded-xl bg-slate-50 
                     border border-slate-100 hover:bg-white hover:text-blue-600 
                     hover:border-blue-200 hover:shadow-sm transition-all group/eye"
          title="View Details"
        >
          <Eye
            size={18}
            className="transition-transform group-hover/eye:scale-110"
          />
        </button>

        <button
          onClick={onBook}
          className="px-5 py-2.5 text-xs font-black uppercase tracking-[0.1em]
                     rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-200
                     hover:bg-blue-600 hover:shadow-blue-100 hover:-translate-y-0.5 
                     active:translate-y-0 transition-all"
        >
          Book
        </button>
      </div>
    </div>
  );
}
