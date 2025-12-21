import { useEffect, useState, useCallback } from "react";
import {
  Calendar,
  Clock,
  Lock,
  Unlock,
  Zap,
  ChevronRight,
  User,
} from "lucide-react";
import PatientDetailsDrawer from "../../components/doctor/PatientDetailsDrawer";

const API = "http://localhost:8080";

export default function SlotManager() {
  const token = localStorage.getItem("token");
  const doctorId = localStorage.getItem("userId");

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedAppointmentId, setselectedAppointmentId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dayBlocked, setDayBlocked] = useState(false);
  const [reasonForVisit, setReasonForVisit] = useState("");

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("13:00");
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    if (!selectedAppointmentId) return;
    fetch(`${API}/patient/booking/appointment/${selectedAppointmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedPatient(data.patient);
        setReasonForVisit(data.reason);
        console.log("Fetched Patient Data:", data);
      });
  }, [selectedAppointmentId, token]);

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setHours(12, 0, 0, 0); // force midday to avoid edge cases
    d.setDate(d.getDate() + i);
    return d;
  });

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const loadSlots = useCallback(async () => {
    if (!selectedDate) return;
    try {
      const res = await fetch(
        `${API}/doctor/schedule?doctorId=${doctorId}&date=${selectedDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setSlots(data.slots || []);
      setDayBlocked(data.dayBlocked);
    } catch (err) {
      console.error("Failed to load slots", err);
    }
  }, [selectedDate, token, doctorId]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  const generateSlots = async () => {
    console.log(
      "Generating slots on",
      selectedDate,
      startTime,
      endTime,
      duration
    );
    await fetch(`${API}/doctor/schedule/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        doctorId,
        date: selectedDate,
        startTime,
        endTime,
        durationMinutes: duration,
      }),
    });
    loadSlots();
  };

  const toggleDayBlock = async () => {
    await fetch(
      `${API}/doctor/schedule/${dayBlocked ? "unblock-day" : "block-day"}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorId, date: selectedDate }),
      }
    );
    loadSlots();
  };

  const toggleSlotBlock = async (slot) => {
    if (slot.status === "BOOKED") return;
    await fetch(`${API}/doctor/schedule/slot/${slot.id}/toggle`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadSlots();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-6 lg:p-10 overflow-x-hidden">
      {/* Header Section */}
      <header className="max-w-[1400px] mx-auto mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Schedule{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
              Terminal
            </span>
          </h2>
          <p className="text-slate-500 font-medium">
            Manage your daily availability and appointments.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm w-fit">
          <Calendar size={18} className="text-blue-500" />
          {new Date().toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })}
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto space-y-8">
        {/* Date Selector - Full Width Scroll */}
        <section className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x touch-pan-x">
            {next7Days.map((date) => {
              const d = formatDate(date);
              const isSelected = selectedDate === d;
              return (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDate(d);
                    console.log("Selected Date:", d);
                  }}
                  className={`shrink-0 snap-start w-24 h-32 rounded-4xl flex flex-col items-center justify-center transition-all duration-300 border-2 ${
                    isSelected
                      ? "bg-linear-to-br from-blue-600 to-cyan-500 border-transparent text-white shadow-xl shadow-blue-200 scale-105"
                      : "bg-white border-slate-100 cursor-pointer text-slate-400 hover:border-blue-200 hover:text-blue-500"
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest mb-1">
                    {date.toLocaleDateString("en-IN", { weekday: "short" })}
                  </span>
                  <span className="text-3xl font-black">{date.getDate()}</span>
                </button>
              );
            })}
          </div>
        </section>

        {selectedDate ? (
          <div className="flex flex-row lg:grid gap-8">
            {/* Control Deck (Sidebar) */}
            <aside className="lg:sticky lg:top-8 h-fit space-y-6">
              <div className="w-3/5 mx-auto bg-white rounded-[2.5rem] p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-bold text-lg">Configuration</h3>
                </div>

                <div className="space-y-6">
                  <button
                    onClick={toggleDayBlock}
                    className={`w-full py-4 rounded-2xl font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 ${
                      dayBlocked
                        ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                    }`}
                  >
                    {dayBlocked ? <Unlock size={18} /> : <Lock size={18} />}
                    {dayBlocked ? "Resume Bookings" : "Block Entire Day"}
                  </button>

                  {!dayBlocked && (
                    <div className="space-y-6 pt-6 border-t border-slate-100">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                          Shift Window
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-xl p-3 font-semibold text-sm focus:ring-2 ring-blue-500/20"
                          />
                          <span className="text-slate-300">→</span>
                          <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-xl p-3 font-semibold text-sm focus:ring-2 ring-blue-500/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                          Session Duration
                        </label>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(+e.target.value)}
                          className="w-full bg-slate-50 border-none rounded-xl p-3 font-semibold text-sm focus:ring-2 ring-blue-500/20 appearance-none"
                        >
                          <option value={15}>15 Minutes</option>
                          <option value={30}>30 Minutes</option>
                          <option value={45}>45 Minutes</option>
                        </select>
                      </div>

                      <button
                        onClick={generateSlots}
                        className="w-full bg-linear-to-r cursor-pointer from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        <Zap size={18} fill="currentColor" />
                        Generate Timeline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Slots Grid */}
            <section className="flex-1 min-w-0">
              {slots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {slots.map((slot) => {
                    const isBooked = slot.status === "BOOKED";
                    const isBlocked = slot.status === "BLOCKED";

                    return (
                      <div
                        key={slot.id}
                        className={`group p-6 rounded-[2.5rem] border transition-all duration-300 relative ${
                          isBooked
                            ? "bg-blue-600 border-transparent text-white shadow-xl shadow-blue-100"
                            : isBlocked
                            ? "bg-slate-100 border-slate-200 opacity-60"
                            : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-slate-200/50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <span
                            className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                              isBooked
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {slot.status}
                          </span>
                          <Clock
                            size={16}
                            className={
                              isBooked ? "text-white/60" : "text-slate-300"
                            }
                          />
                        </div>

                        <h4 className="text-2xl font-black mb-6">
                          {slot.startTime}
                          <span className="opacity-30 text-base mx-2">/</span>
                          {slot.endTime}
                        </h4>

                        <div className="flex items-center">
                          {isBooked ? (
                            <button
                              onClick={() =>
                                setselectedAppointmentId(slot.appointmentId)
                              }
                              className="w-full cursor-pointer py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-[11px] font-bold flex items-center justify-center gap-2 transition-all border border-white/10"
                            >
                              <User size={14} /> View Patient Profile
                              <ChevronRight size={14} />
                            </button>
                          ) : (
                            <button
                              onClick={() => toggleSlotBlock(slot)}
                              className={`text-[11px] font-black cursor-pointer uppercase tracking-widest flex items-center gap-2 transition-colors ${
                                isBlocked
                                  ? "text-blue-600 hover:text-blue-700"
                                  : "text-rose-500 hover:text-rose-600"
                              }`}
                            >
                              {isBlocked ? (
                                <Unlock size={14} />
                              ) : (
                                <Lock size={14} />
                              )}
                              {isBlocked ? "Enable Slot" : "Disable Slot"}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-[400px] flex flex-col items-center justify-center bg-white rounded-[3.5rem] border border-dashed border-slate-200">
                  <div className="p-5 bg-slate-50 rounded-full mb-4 text-slate-300">
                    <Calendar size={48} />
                  </div>
                  <p className="text-slate-500 font-bold">
                    No timeline generated
                  </p>
                  <p className="text-slate-400 text-sm">
                    Use the configuration deck to begin.
                  </p>
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="h-[500px] flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-[3.5rem] border-2 border-dashed border-slate-200">
            <div className="animate-bounce p-6 bg-blue-50 text-blue-500 rounded-3xl mb-6">
              <Calendar size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-800">System Ready</h3>
            <p className="text-slate-500 font-medium">
              Select a date from the timeline above to manage availability.
            </p>
          </div>
        )}
      </main>

      {selectedPatient && (
        <PatientDetailsDrawer
          patient={selectedPatient}
          reason={reasonForVisit}
          onClose={() => {
            setSelectedPatient(null);
            setselectedAppointmentId(null);
          }}
        />
      )}
    </div>
  );
}
