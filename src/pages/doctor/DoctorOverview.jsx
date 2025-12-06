import { useState } from "react";
import StatCard from "../../components/admin/StatCard";
import ChartCard from "../../components/admin/ChartCard";

export default function DoctorOverview() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="space-y-10">
      {/* Toggle Availability */}
      <div className="p-6 bg-white/70 backdrop-blur-xl shadow rounded-2xl border">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Availability Status</h2>

          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-gray-600 font-semibold">
              {enabled ? "Enabled" : "Disabled"}
            </span>
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="hidden"
            />
            <div
              className={`w-14 h-7 rounded-full p-1 transition ${
                enabled ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow transform transition ${
                  enabled ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Appointments" value="248" />
        <StatCard title="Today's Appointments" value="10" />
        <StatCard title="Weekly Growth" value="12%" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard type="line" title="Appointments - Last 7 Days" />

        <ChartCard type="pie" title="Patient Types Distribution" />
      </div>
    </div>
  );
}
