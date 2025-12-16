import { useState } from "react";
import ProfileInput from "./ProfileInput";
import {
  Activity,
  Heart,
  Save,
  Droplet,
  Monitor,
  Slash,
  Edit,
} from "lucide-react";

export default function HealthMetrics({
  formData,
  handleChange,
  handleSave,
  mustSetPasswordFirst,
}) {
  // Local state to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  const buttonBase =
    "px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 justify-center";

  // Lock section if password is not set
  const isLocked = mustSetPasswordFirst;

  const handleSaveClick = () => {
    handleSave("health");
    setIsEditing(false); // Exit edit mode after saving
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* --- Header & Edit Toggle --- */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Vital Health Metrics
          </h3>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
        </div>

        {/* Edit Button Logic */}
        {!isLocked &&
          (!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 justify-center text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm"
            >
              <Edit size={16} />
              Edit Metrics
            </button>
          ) : (
            <span className="px-6 py-2 rounded-xl font-bold flex items-center gap-2 justify-center bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm shadow-lg shadow-blue-500/20">
              <Edit size={16} />
              Editing Active
            </span>
          ))}
      </div>

      {/* --- Locked Warning Banner --- */}
      {isLocked && (
        <div className="text-center bg-slate-50 border border-slate-200 p-6 rounded-2xl text-slate-500 font-medium flex items-center justify-center gap-3">
          <Slash size={18} className="text-red-400" />
          This section is locked until you set your account password in Basic
          Details.
        </div>
      )}

      {/* --- Input Grid --- */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
          isLocked ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        <ProfileInput
          icon={Droplet}
          type="number"
          label="Blood Glucose (mg/dL)"
          name="sugarLevel"
          // FIX: Handle null values
          value={formData.sugarLevel || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <ProfileInput
          icon={Heart}
          type="number"
          label="Systolic BP (mmHg)"
          name="bpSys"
          // FIX: Handle null values
          value={formData.bpSys || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <ProfileInput
          icon={Heart}
          type="number"
          label="Diastolic BP (mmHg)"
          name="bpDia"
          // FIX: Handle null values
          value={formData.bpDia || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <ProfileInput
          icon={Monitor}
          type="number"
          label="Oxygen Saturation (SpO₂ %)"
          name="spo2"
          // FIX: Handle null values
          value={formData.spo2 || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <ProfileInput
          icon={Heart}
          type="number"
          label="Heart Rate (BPM)"
          name="heartRate"
          // FIX: Handle null values
          value={formData.heartRate || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      {/* --- Save Button (Visible only when editing) --- */}
      {!isLocked && isEditing && (
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSaveClick}
            className={`${buttonBase} text-white 
              bg-linear-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-700 hover:to-rose-700 
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
