import { useState } from "react";
import ProfileInput from "./ProfileInput";
import { Moon, Activity, Coffee, Save, Slash, Edit } from "lucide-react";

export default function LifestyleInfo({
  formData,
  handleChange,
  handleSave,
  mustSetPasswordFirst,
}) {
  // Local state to toggle edit mode for this specific section
  const [isEditing, setIsEditing] = useState(false);

  const buttonBase =
    "px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 justify-center";

  // If password isn't set, this section is completely disabled
  const isLocked = mustSetPasswordFirst;

  const handleSaveClick = () => {
    handleSave("lifestyle");
    setIsEditing(false); // Exit edit mode after saving
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* --- Header & Edit Toggle --- */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Lifestyle & Habits
          </h3>
          <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
        </div>

        {/* Edit Button Logic */}
        {!isLocked &&
          (!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 justify-center text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm"
            >
              <Edit size={16} />
              Edit Lifestyle
            </button>
          ) : (
            <span className="px-6 py-2 rounded-xl font-bold flex items-center gap-2 justify-center bg-linear-to-r from-cyan-400 to-blue-500 text-white text-sm shadow-lg shadow-blue-500/20">
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
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
          isLocked ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        <ProfileInput
          icon={Moon}
          type="number"
          label="Avg Daily Sleep (Hours)"
          name="sleepHours"
          // FIX: Use || "" to ensure value is never null
          value={formData.sleepHours || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <ProfileInput
          icon={Coffee}
          label="Diet Preference"
          name="diet"
          // FIX: Use || "" to ensure value is never null
          value={formData.diet || ""}
          onChange={handleChange}
          disabled={!isEditing}
          options={["Vegetarian", "Non-Vegetarian", "Vegan", "Eggetarian"]}
        />
        <ProfileInput
          icon={Activity}
          label="Smoking Habit"
          name="smoking"
          // FIX: Use || "" to ensure value is never null
          value={formData.smoking || ""}
          onChange={handleChange}
          disabled={!isEditing}
          options={["Never", "Occasionally", "Frequently", "Quitted"]}
        />
        <ProfileInput
          icon={Activity}
          label="Alcohol Consumption"
          name="alcohol"
          // FIX: Use || "" to ensure value is never null
          value={formData.alcohol || ""}
          onChange={handleChange}
          disabled={!isEditing}
          options={["Never", "Socially", "Frequent", "Addicted"]}
        />
      </div>

      {/* --- Save Button (Only visible when editing) --- */}
      {!isLocked && isEditing && (
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSaveClick}
            className={`${buttonBase} text-white 
              bg-linear-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 
              shadow-xl shadow-emerald-500/30`}
          >
            <Save size={18} />
            Update Lifestyle Data
          </button>
        </div>
      )}
    </div>
  );
}
