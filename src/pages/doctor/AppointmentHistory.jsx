import AppointmentCard from "../../components/doctor/AppointmentCard";

export default function AppointmentHistory() {
  const history = [
    {
      id: 101,
      patient: "Naveen Gupta",
      age: 40,
      time: "4:30 PM",
      date: "10 Jan",
      reason: "Diabetes Follow-up",
      status: "Completed",
    },
    {
      id: 102,
      patient: "Lakshmi Devi",
      age: 55,
      time: "11:00 AM",
      date: "9 Jan",
      reason: "Blood Pressure",
      status: "Cancelled",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Appointment History</h2>

      <div className="space-y-5">
        {history.map((appt) => (
          <AppointmentCard key={appt.id} data={appt} showStatus />
        ))}
      </div>
    </div>
  );
}
