import { useEffect, useState } from "react";
import PatientDetailsDrawer from "../../components/doctor/PatientDetailsDrawer";

const API = "http://localhost:8080";

export default function SlotManager() {
  const doctorId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dayBlocked, setDayBlocked] = useState(false);

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("13:00");
  const [duration, setDuration] = useState(30);

  /* ================= NEXT 7 DAYS ================= */
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const formatDate = (date) => date.toISOString().split("T")[0];

  /* ================= FETCH SLOTS ================= */
  const fetchSlots = async (date) => {
    const res = await fetch(
      `${API}/doctor/schedule?doctorId=${doctorId}&date=${date}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setSlots(data.slots);
    setDayBlocked(!data.dayBlocked);
  };

  useEffect(() => {
    if (selectedDate) fetchSlots(selectedDate);
  }, [selectedDate]);

  /* ================= GENERATE SLOTS ================= */
  const generateSlots = async () => {
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
    fetchSlots(selectedDate);
  };

  /* ================= BLOCK / UNBLOCK DAY ================= */
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
    fetchSlots(selectedDate);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Weekly Schedule</h1>

      {/* WEEK SELECTOR */}
      <div className="flex gap-3 mb-8 overflow-x-auto">
        {next7Days?.map((date) => {
          const d = formatDate(date);
          return (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`min-w-[110px] p-4 rounded-xl border ${
                selectedDate === d
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              <p className="text-sm">
                {date.toLocaleDateString("en-IN", { weekday: "short" })}
              </p>
              <p className="text-lg font-semibold">{date.getDate()}</p>
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* CONFIG PANEL */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold">Configure Day</h2>

            <button
              onClick={toggleDayBlock}
              className={`w-full py-2 rounded-lg ${
                dayBlocked ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {dayBlocked ? "Make Available" : "Block Entire Day"}
            </button>

            {!dayBlocked && (
              <>
                <input
                  type="time"
                  className="input"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                  type="time"
                  className="input"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
                <select
                  className="input"
                  value={duration}
                  onChange={(e) => setDuration(+e.target.value)}
                >
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={45}>45 min</option>
                </select>

                <button
                  onClick={generateSlots}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                  Generate Slots
                </button>
              </>
            )}
          </div>

          {/* SLOT GRID */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              Slots on {selectedDate}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots?.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() =>
                    slot.status === "BOOKED" &&
                    setSelectedPatient(slot.appointment.patient)
                  }
                  className={`rounded-xl p-4 border cursor-pointer ${
                    slot.status === "OPEN"
                      ? "bg-white"
                      : slot.status === "BOOKED"
                      ? "bg-gray-100 hover:border-blue-400"
                      : "bg-red-100"
                  }`}
                >
                  <p className="font-medium">
                    {slot.startTime} – {slot.endTime}
                  </p>

                  <p className="text-sm mt-2">
                    {slot.status === "OPEN"
                      ? "Available"
                      : slot.status === "BOOKED"
                      ? "Booked"
                      : "Blocked"}
                  </p>

                  {slot.status === "BOOKED" && (
                    <p className="text-sm text-gray-600">
                      {slot.appointment.patient.user.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedPatient && (
        <PatientDetailsDrawer
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}
