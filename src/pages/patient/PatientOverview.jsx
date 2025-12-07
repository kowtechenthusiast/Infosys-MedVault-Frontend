/* eslint-disable no-unused-vars */
import ChartCard from "../../components/admin/ChartCard"; // Assuming ChartCard is reusable
import { Calendar, Clock, UserCheck, HeartPulse } from "lucide-react"; // Icons for patient stats

// --- Components Replicated from Admin Dashboard (for internal use) ---

const LayeredStatCard = ({
  icon: Icon,
  title,
  value,
  subtext,
  colorParams,
}) => (
  <div
    className={`relative overflow-hidden bg-white rounded-xl border border-slate-200 
    transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 
    ${colorParams.hoverShadow}
  `}
  >
    {/* 1. Distinct Color Accent Bar (Left Side) */}
    <div
      className={`absolute top-0 left-0 h-full w-2 ${colorParams.bg} opacity-80`}
    ></div>

    {/* 2. Content Wrapper */}
    <div className="p-6 pl-8">
      {/* 3. Icon and Meta Data Row */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon Badge: No background, just the accent text color */}
        <div className={`p-1 rounded-full ${colorParams.text}`}>
          <Icon size={24} />
        </div>

        {/* Trend/Change indicator - More subtle, using slate and a small colored dot */}
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
          <span
            className={`w-2 h-2 rounded-full ${colorParams.text} opacity-70`}
          ></span>
          +3.1%
        </span>
      </div>

      {/* 4. Value and Title */}
      <div>
        <p className="text-slate-600 text-sm font-medium tracking-wide">
          {title}
        </p>
        <h3 className={`text-4xl font-extrabold text-slate-900 mt-1`}>
          {value}
        </h3>
        <p className="text-slate-400 text-xs mt-1 italic">{subtext}</p>
      </div>
    </div>

    {/* 5. Subtle Bottom Border Line on Hover (Color Accent) */}
    <div
      className={`absolute bottom-0 left-0 w-full h-1 ${colorParams.bg} opacity-0 transition-opacity group-hover:opacity-100`}
    ></div>
  </div>
);

// Futuristic Greeting component adapted for Patient
const PatientGreeting = ({ name }) => (
  <div className="relative p-8 rounded-3xl bg-white border border-blue-50 shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)] overflow-hidden">
    {/* Subtle background glow */}
    <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-br from-blue-100 to-cyan-50 rounded-full blur-3xl -mr-8 -mt-8 opacity-60"></div>

    <div className="relative z-10">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
        Welcome Back,
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500 drop-shadow-sm ml-2">
          {name}
        </span>
      </h1>

      <p className="text-slate-500 mt-2 flex items-center gap-2">
        <HeartPulse size={16} className="text-red-500" />
        <span>
          Your personalized health overview. Let's monitor your journey.
        </span>
      </p>
    </div>
  </div>
);

// --- Main Patient Overview Component ---

export default function PatientOverview() {
  const patientStats = [
    {
      title: "Total Appointments",
      value: "14",
      subtext: "Since account creation",
      icon: Calendar,
      colorParams: {
        bg: "bg-blue-500",
        lightBg: "bg-blue-50",
        text: "text-blue-600",
        hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
      },
    },
    {
      title: "Upcoming Visits",
      value: "2",
      subtext: "Next one is tomorrow",
      icon: Clock,
      colorParams: {
        bg: "bg-amber-500",
        lightBg: "bg-amber-50",
        text: "text-amber-600",
        hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]",
      },
    },
    {
      title: "Doctors Consulted",
      value: "5",
      subtext: "Diverse specialist history",
      icon: UserCheck,
      colorParams: {
        bg: "bg-green-500",
        lightBg: "bg-green-50",
        text: "text-green-600",
        hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]",
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Themed Patient Greeting */}
      <PatientGreeting name="Jane Doe" />

      {/* 2. Glowing Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {patientStats.map((stat, index) => (
          <LayeredStatCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtext={stat.subtext}
            icon={stat.icon}
            colorParams={stat.colorParams}
          />
        ))}
      </div>

      {/* 3. Themed Health Tip */}
      <div className="p-6 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-[0_10px_30px_-5px_rgba(59,130,246,0.5)] border border-blue-400 hover:shadow-[0_15px_40px_-5px_rgba(59,130,246,0.6)] transition-all">
        <h2 className="text-2xl font-bold flex items-center gap-3 drop-shadow-md">
          <HeartPulse size={28} /> Daily Health Tip
        </h2>
        <p className="mt-2 text-blue-100 text-lg">
          Drink at least **2L of water** every day to stay hydrated and
          energetic! Don't forget your 10,000 steps goal.
        </p>
      </div>

      {/* 4. Charts - Wrapped in Elevated Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-1 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)] transition-all">
          <ChartCard type="line" title="Appointment Activity - Last 7 Days" />
        </div>
        <div className="bg-white p-1 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)] transition-all">
          <ChartCard type="pie" title="Consultation Type Distribution" />
        </div>
      </div>
    </div>
  );
}
