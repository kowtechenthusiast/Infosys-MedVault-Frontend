import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

export default function ChartCard({ type, title }) {
  const data = [
    { name: "Mon", Consults: 30 },
    { name: "Tue", Consults: 42 },
    { name: "Wed", Consults: 35 },
    { name: "Thu", Consults: 50 },
    { name: "Fri", Consults: 75 },
    { name: "Sat", Consults: 60 },
    { name: "Sun", Consults: 90 },
  ];

  const pieData = [
    { name: "Video Consults", value: 450 },
    { name: "In-Person", value: 300 },
    { name: "Asynchronous Chat", value: 150 },
  ];

  // Color palette for the futuristic theme
  const PIE_COLORS = ["#3b82f6", "#06b6d4", "#10b981"];

  return (
    // Advanced Container: Solid white, glowing shadow, subtle border
    <div className="p-6 bg-white shadow-[0_4px_30px_rgba(59,130,246,0.1)] border border-blue-100/50 rounded-2xl">
      <h2 className="text-xl font-bold text-slate-800 mb-6">{title}</h2>

      <div className="h-64">
        {/* === ADVANCED LINE/AREA CHART === */}
        {(type === "line" || type === "area") && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              {/* Gradient Definition for Area Fill */}
              <defs>
                <linearGradient id="colorConsults" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Grid: Subtle horizontal lines */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />

              {/* X-Axis: Shows Day of the Week (dataKey="name") */}
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                tickLine={false}
                axisLine={false}
                className="text-xs"
              />

              {/* Y-Axis: Shows numerical values */}
              <YAxis
                stroke="#94a3b8"
                tickLine={false}
                axisLine={false}
                className="text-xs"
              />

              {/* Tooltip: Styled for dark background and glowing theme */}
              <Tooltip
                wrapperClassName="shadow-xl border-none rounded-lg"
                contentStyle={{
                  backgroundColor: "#1e293b",
                  color: "#fff",
                  border: "none",
                  padding: "8px",
                }}
              />

              {/* Area Fill */}
              <Area
                type="monotone"
                dataKey="Consults"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorConsults)"
              />

              {/* Primary Line (placed last to overlay the Area) */}
              <Line
                type="monotone"
                dataKey="Consults"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ stroke: "#3b82f6", strokeWidth: 3, r: 4 }}
                activeDot={{
                  r: 8,
                  fill: "#3b82f6",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {/* === ENHANCED PIE CHART === */}
        {type === "pie" && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                wrapperClassName="shadow-xl border-none rounded-lg"
                contentStyle={{
                  backgroundColor: "#1e293b",
                  color: "#fff",
                  border: "none",
                  padding: "8px",
                }}
              />
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60} // Added inner radius for a Doughnut chart look
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
