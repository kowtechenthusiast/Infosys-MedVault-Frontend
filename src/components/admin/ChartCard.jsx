import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartCard({ type, title }) {
  const data = [
    { name: "Mon", value: 30 },
    { name: "Tue", value: 42 },
    { name: "Wed", value: 35 },
    { name: "Thu", value: 50 },
    { name: "Fri", value: 75 },
    { name: "Sat", value: 60 },
    { name: "Sun", value: 90 },
  ];

  const pieData = [
    { name: "Patients", value: 1248 },
    { name: "Doctors", value: 312 },
    { name: "Admins", value: 4 },
  ];

  return (
    <div className="p-6 bg-white/70 backdrop-blur-xl border border-blue-100 shadow-lg rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="h-64">
        {type === "line" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {type === "pie" && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#2563eb"
                dataKey="value"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
