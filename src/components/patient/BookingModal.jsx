import { X } from "lucide-react";

export default function BookingModal({ doctor, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl w-[450px] shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

        <p className="font-semibold">{doctor.name}</p>
        <p className="text-gray-600 mb-4">{doctor.specialization}</p>

        <label className="block font-medium text-gray-700 mt-2">
          Select Date
        </label>
        <input
          type="date"
          className="w-full px-4 py-2 border rounded-xl mt-1"
        />

        <label className="block font-medium text-gray-700 mt-4">
          Select Time
        </label>
        <input
          type="time"
          className="w-full px-4 py-2 border rounded-xl mt-1"
        />

        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}
