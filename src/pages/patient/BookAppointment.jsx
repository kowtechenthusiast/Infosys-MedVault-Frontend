import { useState } from "react";
import DoctorCard from "../../components/patient/DoctorCard";
import BookingModal from "../../components/patient/BookingModal";

export default function BookAppointment() {
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. Rohan Sharma",
      specialization: "Cardiologist",
      experience: 10,
    },
    {
      id: 2,
      name: "Dr. Priya Sinha",
      specialization: "Dermatologist",
      experience: 7,
    },
  ];

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>

      <input
        placeholder="Search doctors..."
        className="w-96 px-4 py-3 border rounded-xl shadow-sm"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-6 space-y-5">
        {filtered.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBook={() => setSelectedDoctor(doctor)}
          />
        ))}
      </div>

      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}
