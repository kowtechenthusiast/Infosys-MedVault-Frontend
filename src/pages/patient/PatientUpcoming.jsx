import AppointmentCard from "../../components/patient/AppointmentCard";

export default function PatientUpcoming() {
  const upcoming = [
    {
      id: 1,
      doctor: "Dr. Mehul Varma",
      specialization: "Orthopedic",
      date: "18 Jan",
      time: "11:00 AM",
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
