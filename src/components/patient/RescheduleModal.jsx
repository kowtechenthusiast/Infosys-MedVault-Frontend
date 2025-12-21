import { useEffect, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  RefreshCw,
  Info,
  ChevronRight,
} from "lucide-react";

const API = "http://localhost:8080";

export default function RescheduleModal({ appointment, onClose }) {
  console.log("Rescheduling appointment:", appointment);
  const token = localStorage.getItem("token");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Slots when date changes
  useEffect(() => {
    if (!date) return;
    setSlots([]);
    setSelectedSlot(null);
    setError("");

    fetch(
      `${API}/patient/booking/slots?doctorId=${appointment.doctorId}&date=${date}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) setError("No slots available for this date.");
        setSlots(data);
      })
      .catch(() => setError("Failed to load slots"));
  }, [date, appointment.doctorId, token]);

  const handleReschedule = async () => {
    if (!selectedSlot) return alert("Please select a new time slot");
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
            newDate: date,
            userId: localStorage.getItem("userId"),
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      alert("Appointment successfully rescheduled!");
      window.location.reload(); // Refresh to show changes
      onClose();
    } catch (err) {
      alert("This slot is no longer available.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-[500px] overflow-hidden shadow-2xl relative flex flex-col animate-in zoom-in duration-300">
        <div className="h-2 w-full bg-amber-500" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-slate-50 text-slate-400 hover:text-rose-500 transition-all"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <header className="mb-6">
            <h2 className="text-2xl font-black text-slate-800 italic uppercase">
              Reschedule <span className="text-amber-500">Slot</span>
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Changing appointment with Dr. {appointment.doctorName}
            </p>
          </header>

          <div className="space-y-6">
            {/* New Date Select */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                Select New Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500"
                  size={18}
                />
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 ring-amber-500/20 transition-all"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            {/* Slots Grid */}
            {date && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">
                  Available Timelines
                </label>
                {error ? (
                  <div className="p-4 bg-amber-50 text-amber-700 rounded-2xl text-xs font-bold border border-amber-100 flex items-center gap-2">
                    <Info size={16} /> {error}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border-2 transition-all text-center ${
                          selectedSlot?.id === slot.id
                            ? "bg-amber-500 border-transparent text-white shadow-lg shadow-amber-200"
                            : "bg-white border-slate-100 hover:border-amber-200 text-slate-600 font-bold text-sm"
                        }`}
                      >
                        {slot.startTime.slice(0, 5)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleReschedule}
            disabled={loading || !selectedSlot}
            className="w-full mt-8 bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl disabled:opacity-30 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
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
    </div>
  );
}
