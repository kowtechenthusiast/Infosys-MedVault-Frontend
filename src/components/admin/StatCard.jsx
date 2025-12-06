export default function StatCard({ title, value }) {
  return (
    <div className="p-6 bg-white/70 backdrop-blur-xl border border-blue-100 shadow-lg rounded-2xl">
      <p className="text-gray-600 font-medium">{title}</p>
      <h2 className="text-4xl font-extrabold text-blue-700 mt-2">{value}</h2>
    </div>
  );
}
