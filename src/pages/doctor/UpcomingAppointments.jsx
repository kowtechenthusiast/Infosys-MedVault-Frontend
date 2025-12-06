import AppointmentCard from "../../components/doctor/AppointmentCard";

export default function UpcomingAppointments() {
  const upcoming = [
    {
      id: 1,
      patient: "Ramesh Kumar",
      age: 32,
      time: "10:30 AM",
      date: "14 Jan",
      reason: "Chest Pain",
    },
    {
      id: 2,
      patient: "Priya Narayan",
      age: 27,
      time: "12:00 PM",
      date: "14 Jan",
      reason: "Skin Allergy",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upcoming Appointments</h2>

      <div className="space-y-5">
        {upcoming.map((appt) => (
          <AppointmentCard key={appt.id} data={appt} />
        ))}
      </div>
    </div>
  );
}
