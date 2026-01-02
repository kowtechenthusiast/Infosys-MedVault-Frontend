import { useEffect, useState } from "react";
import { X, RefreshCw } from "lucide-react";

const API = "http://localhost:8080";

export default function RescheduleModal({ appointment, onClose }) {
  const token = localStorage.getItem("token");

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH SLOTS ================= */
  useEffect(() => {
    if (!selectedDate) return;

    setSlots([]);
    setSelectedSlot(null);

    fetch(
      `${API}/patient/booking/slots?doctorId=${appointment.doctorId}&date=${selectedDate}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => res.json())
      .then(setSlots)
      .catch(() => setSlots([]));
  }, [selectedDate, appointment.doctorId, token]);

  /* ================= RESCHEDULE ================= */
  const handleReschedule = async () => {
    if (!selectedSlot) return alert("Select a slot");

    setLoading(true);
    try {
      const res = await fetch(
        `${API}/patient/booking/${appointment.id}/reschedule`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            slotId: selectedSlot.id,
            newDate: selectedDate,
            userId: localStorage.getItem("userId"),
          }),
        }
      );

      if (!res.ok) throw new Error();
      alert("Appointment rescheduled successfully");
      window.location.reload();
    } catch {
      alert("Slot already booked. Try another.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= 7 DAY CALENDAR ================= */
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      value: d.toISOString().split("T")[0],
    };
  });

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-slate-800 uppercase italic">
            Reschedule
          </h2>
          <p className="text-sm text-slate-500">Dr. {appointment.doctorName}</p>
        </div>

        {/* ================= 7 DAY SELECTOR ================= */}
        <h3 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
          Select New Date
        </h3>

        <div className="grid grid-cols-7 gap-2 mb-6">
          {next7Days.map((d) => {
            const isSelected = selectedDate === d.value;

            return (
              <button
                key={d.value}
                onClick={() => setSelectedDate(d.value)}
                className={`rounded-xl py-3 transition-all font-bold text-xs
                  ${
                    isSelected
                      ? "bg-amber-500 text-white scale-95"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }
                `}
              >
                <div className="text-[10px] uppercase opacity-70">
                  {d.label}
                </div>
                <div className="text-sm">{d.day}</div>
              </button>
            );
          })}
        </div>

        {/* ================= SLOTS ================= */}
        {selectedDate && (
          <>
            <h3 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
              Available Slots
            </h3>

            {slots.length === 0 ? (
              <p className="text-sm text-slate-400 italic">
                No slots available
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {slots.map((slot) => {
                  const isBooked = slot.status !== "OPEN";
                  const isSelected = selectedSlot?.id === slot.id;

                  return (
                    <button
                      key={slot.id}
                      disabled={isBooked}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all
                        ${
                          isBooked
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                            : isSelected
                            ? "bg-amber-500 text-white scale-95"
                            : "bg-slate-100 hover:bg-slate-200"
                        }
                      `}
                    >
                      {slot.startTime.slice(0, 5)}
                      <div className="text-[10px] opacity-70">
                        {isBooked ? "BOOKED" : "OPEN"}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ================= ACTION ================= */}
        <button
          onClick={handleReschedule}
          disabled={!selectedSlot || loading}
          className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black tracking-widest text-sm uppercase disabled:opacity-30 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Update Appointment <RefreshCw size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
