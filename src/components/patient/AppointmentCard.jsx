import { useState } from "react";
import {
  Stethoscope,
  CalendarDays,
  Eye,
  ClockAlert,
  Star,
  Share2,
} from "lucide-react";
import AppointmentDetailModal from "./AppointmentDetailModal";
import RescheduleModal from "./RescheduleModal";
import RatingReviewModal from "./RatingReviewModal";

export default function AppointmentCard({
  data,
  showReschedule,
  isExpired,
  isHistory, // <-- pass this from parent ONLY for history tab
}) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [openRating, setOpenRating] = useState(false);

  const statusStyles = {
    REQUESTED: "bg-amber-50 text-amber-600 border-amber-100",
    CONFIRMED: "bg-emerald-50 text-emerald-600 border-emerald-100",
    CANCELLED: "bg-red-50 text-red-600 border-red-100",
    REJECTED: "bg-red-100 text-red-400 border-red-200",
    EXPIRED: "bg-slate-100 text-slate-500 border-slate-200",
  };

  const displayStatus = isExpired ? "EXPIRED" : data.status;

  const showFeedbackSection = isHistory && data.status === "CONFIRMED";

  return (
    <>
      <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4">
        {/* MAIN CARD */}
        <div className="flex justify-between items-center">
          {/* Date */}
          <div className="bg-slate-50 px-4 py-2 rounded-xl text-center">
            <span className="text-xs text-blue-600 font-bold">
              {new Date(data.appointmentDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <p className="text-sm font-black">
              {data.appointmentTime.slice(0, 5)}
            </p>
          </div>

          {/* Doctor */}
          <div className="flex-1 px-4">
            <div className="flex items-center gap-2">
              <h3 className="font-bold truncate">Dr. {data.doctorName}</h3>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${statusStyles[displayStatus]}`}
              >
                {displayStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Stethoscope size={12} /> {data.specialization}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {showReschedule && (
              <button
                onClick={() => setOpenReschedule(true)}
                className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white"
                title="Reschedule"
              >
                <CalendarDays size={18} />
              </button>
            )}

            {isExpired && (
              <div className="p-2.5 bg-slate-100 text-slate-400 rounded-xl">
                <ClockAlert size={18} />
              </div>
            )}

            <button
              onClick={() => setOpenDetail(true)}
              className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white"
              title="View Details"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>

        {/* ⭐ SHARE & RATE SECTION (HISTORY + CONFIRMED ONLY) */}
        {showFeedbackSection && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-2">
            {!data.rated ? (
              /* ===== NOT RATED ===== */
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-600">
                  Share & rate your experience
                </p>

                <button
                  onClick={() => setOpenRating(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-500 hover:text-white text-xs font-bold transition"
                >
                  <Star size={14} />
                  Rate
                </button>
              </div>
            ) : (
              /* ===== ALREADY RATED ===== */
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-600">
                  Your feedback
                </p>

                {/* ⭐ Stars */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        data.rating >= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }
                    />
                  ))}
                </div>

                {/* 📝 Review */}
                {data.review && (
                  <p className="text-xs text-slate-500 italic">
                    “{data.review}”
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODALS */}
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

      {openRating && (
        <RatingReviewModal
          isOpen={openRating}
          onClose={() => setOpenRating(false)}
          appointment={data}
        />
      )}
    </>
  );
}
