import { Calendar } from "lucide-react";

export default function DoctorCard({ doctor, onBook }) {
  return (
    <div className="p-6 bg-white/70 backdrop-blur-xl border rounded-2xl shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p className="text-gray-600">{doctor.specialization}</p>
        <p className="text-gray-500 text-sm">{doctor.experience} years exp.</p>
      </div>

      <button
        onClick={onBook}
        className="px-5 py-2 bg-blue-600 text-white rounded-xl flex gap-2 items-center shadow hover:bg-blue-700"
      >
        <Calendar size={18} /> Book
      </button>
    </div>
  );
}
