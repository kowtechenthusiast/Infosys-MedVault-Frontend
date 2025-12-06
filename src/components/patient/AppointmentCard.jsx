export default function AppointmentCard({ data }) {
  return (
    <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl border shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold">{data.doctor}</h3>
        <p className="text-gray-600">Specialist: {data.specialization}</p>
      </div>

      <div className="text-right">
        <p className="text-blue-600 font-semibold">{data.date}</p>
        <p className="text-blue-600 font-semibold">{data.time}</p>
      </div>
    </div>
  );
}
