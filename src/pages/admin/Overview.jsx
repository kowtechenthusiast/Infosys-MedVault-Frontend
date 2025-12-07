import ChartCard from "../../components/admin/ChartCard";
import { Users, AlertTriangle, Clock, CheckCircle } from "lucide-react"; // Icons for stats

// Reusable Glowing Card Component (Adapted for Admin Stats)
const GlowStatCard = ({ icon: Icon, title, value, subtext, colorParams }) => (
  <div
    className={`relative group p-6 bg-white rounded-2xl border border-slate-100 transition-all duration-300 hover:-translate-y-1
    shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] 
    hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] 
    ${colorParams.hoverShadow}
  `}
  >
    {/* Large, blurred background icon */}
    <div
      className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${colorParams.bg}`}
    >
      <Icon size={60} />
    </div>

    <div className="flex items-center justify-between mb-4">
      {/* Icon Badge */}
      <div
        className={`p-3 rounded-xl ${colorParams.lightBg} ${colorParams.text}`}
      >
        <Icon size={24} />
      </div>
      {/* Trend/Change indicator */}
      <span
        className={`text-xs font-bold px-2 py-1 rounded-full ${colorParams.lightBg} ${colorParams.text}`}
      >
        +2.4%
      </span>
    </div>

    <div>
      <p className="text-slate-500 text-sm font-medium tracking-wide">
        {title}
      </p>
      <h3 className="text-3xl font-bold text-slate-800 mt-1 drop-shadow-sm">
        {value}
      </h3>
      <p className="text-slate-400 text-xs mt-1">{subtext}</p>
    </div>
  </div>
);

// Futuristic Greeting component for the header
const FuturisticGreeting = ({ name, role }) => (
  <div className="relative p-8 rounded-3xl bg-white border border-blue-50 shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)] overflow-hidden">
    <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-br from-blue-100 to-cyan-50 rounded-full blur-3xl -mr-8 -mt-8 opacity-60"></div>

    <div className="relative z-10">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
        System Administration,
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500 drop-shadow-sm ml-2">
          {name}
        </span>
      </h1>

      <p className="text-slate-500 mt-2 flex items-center gap-2">
        <AlertTriangle size={16} className="text-yellow-500" />
        <span>
          Monitoring {role}. Critical tasks highlighted below. Last system
          pulse: 5 seconds ago.
        </span>
      </p>
    </div>
  </div>
);

export default function Overview() {
  // --- Mock Data Setup for Admin Overview ---
  const adminStats = [
    {
      title: "Total Registered Patients",
      value: "12,480",
      subtext: "Platform user base",
      icon: Users,
      colorParams: {
        bg: "bg-blue-500",
        lightBg: "bg-blue-50",
        text: "text-blue-600",
        hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
      },
      // Adjusted value to be higher for an admin view
      trend: "+4.1%",
    },
    {
      title: "Verified Doctors",
      value: "312",
      subtext: "Requires 12 pending reviews",
      icon: CheckCircle,
      colorParams: {
        bg: "bg-green-500",
        lightBg: "bg-green-50",
        text: "text-green-600",
        hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]",
      },
      trend: "+1.2%",
    },
    {
      title: "Appointments Today (Global)",
      value: "89",
      subtext: "Current demand vs capacity",
      icon: Clock,
      colorParams: {
        bg: "bg-amber-500",
        lightBg: "bg-amber-50",
        text: "text-amber-600",
        hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]",
      },
      trend: "-0.5%",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Futuristic Greeting (Admin Specific) */}
      <FuturisticGreeting name="A. Smith" role="Global Healthcare Network" />

      {/* 2. Glowing Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminStats.map((stat, index) => (
          <GlowStatCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtext={stat.subtext}
            icon={stat.icon}
            colorParams={stat.colorParams}
          />
        ))}
      </div>

      {/* 3. Charts Section (Wrappers for existing components) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Applied the rich, elevated card styling to chart containers */}
        <div className="bg-white p-1 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)] transition-all">
          <ChartCard type="line" title="Global Appointments - Last 30 Days" />
        </div>
        <div className="bg-white p-1 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)] transition-all">
          <ChartCard type="pie" title="Doctor Specialty Distribution" />
        </div>
      </div>
    </div>
  );
}
