import { useState } from "react";
import ChartCard from "../../components/admin/ChartCard"; // Keeping your existing chart component
import {
  Zap,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  Activity,
  AlertTriangle,
} from "lucide-react";

// Reusable Glowing Card Component (UNMODIFIED)
const GlowStatCard = ({ icon: Icon, title, value, subtext, colorParams }) => (
  <div
    className={`relative group p-6 bg-white rounded-2xl border border-slate-100 transition-all duration-300 hover:-translate-y-1
    shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] 
    hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] 
    ${colorParams.hoverShadow}
  `}
  >
    <div
      className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${colorParams.bg}`}
    >
      <Icon size={60} />
    </div>

    <div className="flex items-center justify-between mb-4">
      <div
        className={`p-3 rounded-xl ${colorParams.lightBg} ${colorParams.text}`}
      >
        <Icon size={24} />
      </div>
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

// Mock data for the next appointment
const NEXT_APPOINTMENT = {
  time: "02:00 PM",
  patient: "Julian Vos (New Patient)",
};

const FuturisticGreeting = ({ name }) => (
  <div className="relative p-8 rounded-3xl bg-white border border-blue-50 shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)] overflow-hidden">
    {/* FIX: Reduced the size of the background circle (w-48 h-48) 
        and reduced the negative margin (-mr-8 -mt-8) 
        to prevent horizontal overflow bleed.
    */}
    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-100 to-cyan-50 rounded-full blur-3xl -mr-8 -mt-8 opacity-60"></div>

    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          Good Afternoon,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 drop-shadow-sm">
            {name}
          </span>
        </h1>

        {/* UPDATED CODE: Removed Specialty, Added Critical Alerts */}
        <p className="text-slate-500 mt-2 flex items-center gap-2">
          {/* Using Activity icon, but styling it low-key */}
          <Activity size={16} className="text-slate-400" />
          <span>
            System Check: All operational metrics nominal. Last update 15
            minutes ago.
          </span>
        </p>
      </div>

      {/* Next Appointment Detail (Rich, High-Priority Metric) */}
      <div className="hidden md:block text-right border-l border-slate-100 pl-6">
        <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">
          Next Session
        </p>
        <div className="flex flex-col items-end">
          <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-600 drop-shadow-lg transition-all duration-300 hover:scale-[1.02]">
            {NEXT_APPOINTMENT.time}
          </h3>
          <p className="text-sm font-medium text-slate-600 flex items-center gap-1 mt-1">
            <Clock size={14} className="text-teal-500" />
            {NEXT_APPOINTMENT.patient}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function DoctorOverview({ userInfo }) {
  const [enabled, setEnabled] = useState(true);

  return (
    // Added overflow-x-hidden to the outer container to prevent horizontal scroll
    <div className="space-y-8 overflow-x-hidden">
      {/* 1. Greeting Section */}
      <FuturisticGreeting name={userInfo.name} specialty={userInfo.specialty} />

      {/* 2. Availability Switch (Cyber Style) */}
      <div className="flex items-center justify-between p-1 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-sm">
        <button
          onClick={() => setEnabled(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300
              ${
                enabled
                  ? "bg-slate-800 text-white shadow-[0_4px_15px_rgba(30,41,59,0.3)]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
        >
          <Zap
            size={18}
            className={enabled ? "text-yellow-400 fill-yellow-400" : ""}
          />
          Available
        </button>
        <button
          onClick={() => setEnabled(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300
              ${
                !enabled
                  ? "bg-slate-800 text-white shadow-[0_4px_15px_rgba(30,41,59,0.3)]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
        >
          <Clock size={18} />
          Busy
        </button>
      </div>

      {/* 3. Glowing Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlowStatCard
          title="Total Consultations"
          value="1,204"
          subtext="High patient volume this month"
          icon={Users}
          colorParams={{
            bg: "bg-blue-500",
            lightBg: "bg-blue-50",
            text: "text-blue-600",
            hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
          }}
        />
        <GlowStatCard
          title="Pending Reports"
          value="12"
          subtext="Requires immediate attention"
          icon={Clock}
          colorParams={{
            bg: "bg-amber-500",
            lightBg: "bg-amber-50",
            text: "text-amber-600",
            hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]",
          }}
        />
        <GlowStatCard
          title="Satisfaction Rate"
          value="99.2%"
          subtext="Top 5% in your department"
          icon={CheckCircle}
          colorParams={{
            bg: "bg-teal-500",
            lightBg: "bg-teal-50",
            text: "text-teal-600",
            hoverShadow: "hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.3)]",
          }}
        />
      </div>

      {/* 4. Charts Section (Wrappers for existing components) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-1 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)] transition-all">
          <ChartCard type="line" title="Appointments - Last 7 Days" />
        </div>
        <div className="bg-white p-1 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)] transition-all">
          <ChartCard type="pie" title="Patient Types Distribution" />
        </div>
      </div>
    </div>
  );
}
