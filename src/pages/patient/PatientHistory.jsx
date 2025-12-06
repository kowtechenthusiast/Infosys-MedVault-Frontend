import AppointmentCard from "../../components/patient/AppointmentCard";

export default function PatientHistory() {
  const history = [
    {
      id: 101,
      doctor: "Dr. Rahul Singh",
      specialization: "Cardiologist",
      date: "10 Jan",
      time: "3:30 PM",
      status: "Completed",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Appointment History</h2>

      <div className="space-y-5">
        {history.map((appt) => (
          <AppointmentCard key={appt.id} data={appt} />
        ))}
      </div>
    </div>
  );
}
