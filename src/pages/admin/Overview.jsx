import StatCard from "../../components/admin/StatCard";
import ChartCard from "../../components/admin/ChartCard";

export default function Overview() {
  return (
    <div className="space-y-10">
      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Patients" value="1,248" />
        <StatCard title="Total Doctors" value="312" />
        <StatCard title="Appointments Today" value="89" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard type="line" title="Appointments - Last 7 Days" />
        <ChartCard type="pie" title="Platform Distribution" />
      </div>
    </div>
  );
}
