import {
  User,
  Coffee,
  Activity,
  FileText,
  Settings,
  ChevronRight,
} from "lucide-react";

export default function SidebarTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "basic", label: "Basic Details", icon: User },
    { id: "lifestyle", label: "Lifestyle", icon: Coffee },
    { id: "health", label: "Health Metrics", icon: Activity },
    { id: "records", label: "Medical Records", icon: FileText },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  return (
    // ENHANCEMENT: Increased blur and stronger shadow for more depth
    <div className="bg-white/70 backdrop-blur-3xl border border-white/60 rounded-3xl shadow-[0_15px_45px_rgb(0,0,0,0.1)] p-4 sticky top-8 space-y-2 overflow-hidden">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              group relative w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-500 ease-out
              ${
                isActive
                  ? // ACTIVE: Stronger, vibrant linear, higher shadow, and noticeable translate
                    "bg-linear-to-r from-blue-800 to-blue-200  text-white shadow-xl shadow-blue-500/30 translate-x-2"
                  : // INACTIVE: Subtle hover effect for visual feedback
                    "text-slate-600 hover:bg-blue-50/70 hover:text-blue-700 hover:shadow-md hover:translate-x-0.5"
              }
            `}
          >
            {/* Tab Content */}
            <div className="flex items-center gap-4 z-10">
              <tab.icon
                size={20}
                className={`transition-colors duration-500 ${
                  isActive
                    ? "text-white scale-110" // Active icon is white
                    : "text-blue-500 group-hover:text-fuchsia-600" // Hover icon adopts secondary gradient color
                }`}
              />
              <span className="tracking-wide">{tab.label}</span>
            </div>

            {/* Active Indicator */}
            {/* {isActive && (
              <ChevronRight
                size={18}
                // ENHANCEMENT: Added a subtle fade animation on top of pulse
                className="text-white/80 animate-pulse animate-fade z-10"
              />
            )} */}

            {/* ENHANCEMENT: Subtle gradient border/underline on active state */}
            {/* {isActive && (
              <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-cyan-300 to-indigo-500 rounded-l-2xl"></div>
            )} */}
          </button>
        );
      })}
    </div>
  );
}
