import { useEffect, useState } from "react";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:8080/patient/doctors?specialization=${specialization}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then(setDoctors);
  }, [specialization]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Find Your Doctor
      </h1>

      <input
        placeholder="Search by specialization..."
        className="w-full p-3 border rounded-xl mb-6 focus:ring-2 focus:ring-blue-400"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition"
          >
            <h2 className="text-xl font-semibold">{doc.user.name}</h2>
            <p className="text-gray-600">{doc.specialization}</p>
            <p className="text-sm mt-1 text-gray-500">
              {doc.experience} years experience
            </p>

            <button
              onClick={() => (window.location.href = `/patient/book/${doc.id}`)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              View Slots
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
