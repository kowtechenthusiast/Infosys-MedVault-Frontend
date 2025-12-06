import { Calendar, Clock } from "lucide-react";

export default function AppointmentCard({ data, showStatus }) {
  return (
    <div className="p-6 bg-white/70 backdrop-blur-xl shadow border rounded-2xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{data.patient}</h3>
          <p className="text-gray-500 text-sm">Age: {data.age}</p>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Reason:</span> {data.reason}
          </p>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            <Calendar size={18} /> {data.date}
          </div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            <Clock size={18} /> {data.time}
          </div>

          {showStatus && (
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm
                ${
                  data.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {data.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
