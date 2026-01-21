import { useEffect, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Stethoscope,
  ChevronRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";

const API = "http://localhost:8080";

export default function BookingModal({ doctor, onClose }) {
  const token = localStorage.getItem("token");
  const patientId = localStorage.getItem("userId");

  const { userId: doctorId, name, specialization } = doctor;

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate the next 14 days for the calendar scroller
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  useEffect(() => {
    if (!selectedDate || !doctorId) return;
    setSlots([]);
    setSelectedSlot(null);
    setError("");

    fetch(
      `${API}/patient/booking/slots?doctorId=${doctorId}&date=${selectedDate}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load slots");
        return res.json();
      })
      .then((data) => {
        if (data.length === 0) setError("No availability on this timeline.");
        setSlots(data);
      })
      .catch(() => setError("Failed to sync slots"));
  }, [selectedDate, doctorId, token]);

  const confirmBooking = async () => {
    if (!selectedSlot || !reason.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/patient/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId,
          doctorId,
          slotId: selectedSlot.id,
          reason,
        }),
      });

      if (!res.ok) throw new Error("Booking failed");
      toast.success("Appointment booked successfully");
      onClose();
    } catch (err) {
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-4xl w-full max-w-[480px] max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200">
        {/* Compact Clinical Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-cyan-400">
              <Stethoscope size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight italic">
                {name}
              </h3>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                {specialization}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          {/* Mission Date Scroller */}
          <section>
            <header className="flex justify-between items-center mb-4 px-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Select Mission Date
              </label>
              <Calendar size={14} className="text-blue-500" />
            </header>

            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x">
              {dateOptions.map((dateObj) => {
                const dateISO = dateObj.toISOString().split("T")[0];
                const isSelected = selectedDate === dateISO;
                const dayName = dateObj.toLocaleDateString("en-US", {
                  weekday: "short",
                });
                const dayNum = dateObj.getDate();

                return (
                  <button
                    key={dateISO}
                    onClick={() => setSelectedDate(dateISO)}
                    className={`shrink-0 w-16 py-4 rounded-2xl border-2 transition-all snap-start flex flex-col items-center gap-1 ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-slate-50 border-transparent text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-black uppercase ${
                        isSelected ? "text-blue-100" : "text-slate-400"
                      }`}
                    >
                      {dayName}
                    </span>
                    <span className="text-xl font-black leading-none">
                      {dayNum}
                    </span>
                    <div
                      className={`w-1 h-1 rounded-full mt-1 ${
                        isSelected ? "bg-white" : "bg-blue-400/30"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Timeline Slots */}
          <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-4 block">
              Available Timelines
            </label>

            {!selectedDate ? (
              <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                <p className="text-xs font-bold text-slate-300 italic uppercase">
                  Initialize date to scan slots
                </p>
              </div>
            ) : error ? (
              <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-[11px] font-bold flex items-center gap-2 border border-rose-100">
                <Info size={14} /> {error}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 rounded-xl border-2 transition-all text-center ${
                        isSelected
                          ? "bg-cyan-500 border-cyan-500 text-white shadow-md shadow-cyan-100 scale-[0.98]"
                          : "bg-white border-slate-100 text-slate-600 hover:border-blue-200 font-bold"
                      }`}
                    >
                      <p className="text-xs font-black">{slot.startTime}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* Clinical Reason */}
          <section>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
              Reason for Visit <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows="2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl font-semibold text-sm text-slate-700 focus:ring-2 ring-blue-500/20 transition-all outline-none resize-none"
              placeholder="Symptoms or purpose..."
            />
          </section>
        </div>

        {/* Footer Action */}
        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <button
            onClick={confirmBooking}
            disabled={loading || !selectedSlot || !reason}
            className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl disabled:opacity-20 transition-all active:scale-[0.97] flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-xl shadow-slate-200"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Commit Booking <CheckCircle2 size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
