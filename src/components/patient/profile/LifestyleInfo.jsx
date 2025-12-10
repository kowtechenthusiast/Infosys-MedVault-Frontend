import ProfileInput from "./ProfileInput";
import { Moon, Activity, Coffee, Save, Slash } from "lucide-react";

export default function LifestyleInfo({
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
            Lifestyle & Habits
          </h3>
          <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
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
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
          isDisabled ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        <ProfileInput
          icon={Moon}
          type="number"
          label="Avg Daily Sleep (Hours)"
          name="sleepHours"
          value={formData.sleepHours}
          onChange={handleChange}
        />
        <ProfileInput
          icon={Coffee}
          label="Diet Preference"
          name="diet"
          value={formData.diet}
          onChange={handleChange}
          options={["Vegetarian", "Non-Vegetarian", "Vegan", "Eggetarian"]}
        />
        <ProfileInput
          icon={Activity}
          label="Smoking Habit"
          name="smoking"
          value={formData.smoking}
          onChange={handleChange}
          options={["Never", "Occasionally", "Frequently", "Quitted"]}
        />
        <ProfileInput
          icon={Activity}
          label="Alcohol Consumption"
          name="alcohol"
          value={formData.alcohol}
          onChange={handleChange}
          options={["Never", "Socially", "Frequent", "Addicted"]}
        />
      </div>

      {/* Save Button */}
      {!isDisabled && (
        <div className="pt-4 flex justify-end">
          <button
            onClick={() => handleSave("lifestyle")}
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
