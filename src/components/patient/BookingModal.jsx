import { useEffect, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Stethoscope,
  Briefcase,
  Star,
  MapPin,
  ChevronRight,
  Info,
} from "lucide-react";

const API = "http://localhost:8080";

export default function BookingModal({ doctor, onClose }) {
  const token = localStorage.getItem("token");
  const patientId = localStorage.getItem("userId");

  const {
    userId: doctorId,
    name,
    specialization,
    experience = "N/A",
    rating = "N/A",
    city,
    state,
  } = doctor;

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!date || !doctorId) return;
    setSlots([]);
    setSelectedSlot(null);
    setError("");

    fetch(`${API}/patient/booking/slots?doctorId=${doctorId}&date=${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load slots");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid slot data");
        if (data.length === 0) setError("Doctor is not available on this day.");
        setSlots(data);
      })
      .catch(() => {
        setSlots([]);
        setError("Failed to load slots");
      });
  }, [date, doctorId, token]);

  const confirmBooking = async () => {
    if (!selectedSlot || !reason.trim()) {
      alert("Please complete all fields");
      return;
    }
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
          reason: reason, // ✅ ADD THIS LINE
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      alert("Appointment booked successfully!");
      onClose();
    } catch (err) {
      alert("Slot was just booked. Please try another slot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-[560px] max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 relative flex flex-col">
        {/* Decorative Header */}
        <div className="h-2 w-full bg-linear-to-r from-blue-600 via-cyan-400 to-blue-600" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 overflow-y-auto no-scrollbar">
          <header className="mb-8">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">
              Confirm <span className="text-blue-600">Mission</span>
            </h2>
            <p className="text-slate-500 font-medium">
              Initialize your clinical session.
            </p>
          </header>

          {/* Doctor Profile Card */}
          <div className="mb-8 p-6 rounded-4xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Stethoscope size={80} />
            </div>

            <h3 className="text-xl font-black mb-1 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {name}
            </h3>
            <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-4">
              {specialization}
            </p>

            <div className="flex flex-wrap gap-4 text-[11px] font-bold">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <Briefcase size={14} className="text-blue-400" /> {experience}{" "}
                YRS EXP
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />{" "}
                {rating} RATING
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <MapPin size={14} className="text-rose-400" /> {city}, {state}
              </span>
            </div>
          </div>

          <section className="space-y-6">
            {/* Date Input */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                Session Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                  size={18}
                />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 ring-blue-500/20 transition-all outline-none"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            {/* Slots Grid */}
            {date && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">
                  Available Timelines
                </label>

                {error ? (
                  <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-bold flex items-center gap-2 border border-rose-100">
                    <Info size={16} /> {error}
                  </div>
                ) : slots.length === 0 ? (
                  <div className="flex flex-col items-center py-8 opacity-40">
                    <Clock size={32} />
                    <p className="text-xs font-bold mt-2 italic">
                      Scanning for slots...
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {slots.map((slot) => {
                      const isSelected = selectedSlot?.id === slot.id;
                      return (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot)}
                          className={`group p-3 rounded-2xl border-2 transition-all text-left ${
                            isSelected
                              ? "bg-blue-600 border-transparent text-white shadow-lg shadow-blue-200 scale-[0.98]"
                              : "bg-white border-slate-100 hover:border-blue-200"
                          }`}
                        >
                          <p className="text-[10px] font-black uppercase opacity-60 mb-0.5">
                            Start
                          </p>
                          <p className="text-sm font-black">{slot.startTime}</p>
                          <div
                            className={`h-1 w-full mt-2 rounded-full overflow-hidden ${
                              isSelected ? "bg-white/20" : "bg-slate-100"
                            }`}
                          >
                            <div
                              className={`h-full bg-cyan-400 transition-all duration-500 ${
                                isSelected ? "w-full" : "w-0"
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Reason Input */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                Reason for Visit <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows="3"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-semibold text-slate-700 focus:ring-2 ring-blue-500/20 transition-all outline-none resize-none"
                placeholder="Enter symptoms or medical purpose..."
              />
            </div>
          </section>

          {/* Action Footer */}
          <div className="mt-10 flex gap-4">
            <button
              onClick={confirmBooking}
              disabled={loading || !selectedSlot || !reason}
              className="flex-1 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 disabled:opacity-30 disabled:grayscale transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Commit Booking <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
