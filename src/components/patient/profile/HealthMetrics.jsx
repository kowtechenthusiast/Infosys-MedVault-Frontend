import ProfileInput from "./ProfileInput";
import { Activity, Heart, Save, Droplet, Monitor, Slash } from "lucide-react";

export default function HealthMetrics({
  formData,
  handleChange,
  handleSave,
  mustSetPasswordFirst,
}) {
  const buttonBase =
    "px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 justify-center";

  const isDisabled = mustSetPasswordFirst;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Vital Health Metrics
          </h3>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
        </div>
      </div>

      {isDisabled && (
        <div className="text-center bg-slate-50 border border-slate-200 p-6 rounded-2xl text-slate-500 font-medium flex items-center justify-center gap-3">
          <Slash size={18} className="text-red-400" />
          This section is locked until you set your account password in Basic
          Details.
        </div>
      )}

      {/* Input Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
          isDisabled ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        <ProfileInput
          icon={Droplet}
          type="number"
          label="Blood Glucose (mg/dL)"
          name="sugarLevel"
          value={formData.sugarLevel}
          onChange={handleChange}
        />
        <ProfileInput
          icon={Heart}
          type="number"
          label="Systolic BP (mmHg)"
          name="bpSys"
          value={formData.bpSys}
          onChange={handleChange}
        />
        <ProfileInput
          icon={Heart}
          type="number"
          label="Diastolic BP (mmHg)"
          name="bpDia"
          value={formData.bpDia}
          onChange={handleChange}
        />
        <ProfileInput
          icon={Monitor}
          type="number"
          label="Oxygen Saturation (SpO₂ %)"
          name="spo2"
          value={formData.spo2}
          onChange={handleChange}
        />
        <ProfileInput
          icon={Heart}
          type="number"
          label="Heart Rate (BPM)"
          name="heartRate"
          value={formData.heartRate}
          onChange={handleChange}
        />
      </div>

      {/* Save Button */}
      {!isDisabled && (
        <div className="pt-4 flex justify-end">
          <button
            onClick={() => handleSave("health")}
            className={`${buttonBase} text-white 
              bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-700 hover:to-rose-700 
              shadow-xl shadow-rose-600/30`}
          >
            <Save size={18} />
            Update Health Data
          </button>
        </div>
      )}
    </div>
  );
}
