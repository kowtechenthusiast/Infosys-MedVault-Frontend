import { useState } from "react";
import { Stethoscope, CalendarDays, Eye } from "lucide-react";
import AppointmentDetailModal from "./AppointmentDetailModal";
import RescheduleModal from "./RescheduleModal"; // Import the new modal

export default function AppointmentCard({ data }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openReschedule, setOpenReschedule] = useState(false);

  const statusStyles = {
    REQUESTED: "bg-amber-50 text-amber-600 border-amber-100",
    CONFIRMED: "bg-emerald-50 text-emerald-600 border-emerald-100",
    CANCELLED: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <>
      <div className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 group">
        {/* Date Badge */}
        <div className="flex flex-col items-center justify-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 min-w-[100px]">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-tighter">
            {new Date(data.appointmentDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="text-sm font-black text-slate-700">
            {data.appointmentTime.slice(0, 5)}
          </span>
        </div>

        {/* Doctor Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 truncate">
              Dr. {data.doctorName}
            </h3>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
                statusStyles[data.status] || statusStyles.REQUESTED
              }`}
            >
              {data.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <Stethoscope size={12} className="text-blue-400" />{" "}
            {data.specialization}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenReschedule(true)}
            className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all shadow-sm"
            title="Reschedule Appointment"
          >
            <CalendarDays size={18} />
          </button>

          <button
            onClick={() => setOpenDetail(true)}
            className="group p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center gap-2"
            title="View Details"
          >
            <Eye
              size={18}
              className="transition-transform group-hover:scale-110"
            />
          </button>
        </div>
      </div>

      <AppointmentDetailModal
        isOpen={openDetail}
        onClose={() => setOpenDetail(false)}
        data={data}
      />

      {openReschedule && (
        <RescheduleModal
          appointment={data}
          onClose={() => setOpenReschedule(false)}
        />
      )}
    </>
  );
}
