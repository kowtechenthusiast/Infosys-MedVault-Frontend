import StatCard from "../../components/admin/StatCard";
import ChartCard from "../../components/admin/ChartCard";

export default function PatientOverview() {
  return (
    <div className="space-y-10">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Appointments" value="14" />
        <StatCard title="Upcoming Visits" value="2" />
        <StatCard title="Doctors Consulted" value="5" />
      </div>

      {/* Health Tip */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-xl">
        <h2 className="text-2xl font-bold">Daily Health Tip</h2>
        <p className="mt-2 text-lg">
          Drink at least 2L of water every day to stay hydrated and energetic!
        </p>
      </div>

      {/* Charts */}
      <ChartCard type="line" title="Appointment Activity - Last 7 Days" />
    </div>
  );
}
