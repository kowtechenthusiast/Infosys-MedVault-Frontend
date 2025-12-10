import ProfileInput from "./ProfileInput";
import { Mail, Lock, Trash2, LogOut, Shield, Slash } from "lucide-react";

export default function AccountSettings({
  formData,
  handleChange,
  updateEmail,
  updatePassword,
  deleteAccount,
  logout,
  mustSetPasswordFirst,
}) {
  const buttonBase =
    "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 justify-center text-sm";
  const isDisabled = mustSetPasswordFirst;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Security & Account Settings
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

      {/* --- Main Settings Grid (Disabled if locked) --- */}
      <div
        className={`space-y-8 ${
          isDisabled ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        {/* Update Email */}
        <section className="p-6 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-sm space-y-4">
          <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2">
            <Mail size={20} className="text-blue-500" /> Update Email Address
          </h3>
          <div className="w-full md:w-2/3">
            <ProfileInput
              icon={Mail}
              label="New Email"
              name="newEmail"
              value={formData.newEmail || ""}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={updateEmail}
            className={`${buttonBase} mt-4 text-white 
                bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 
                shadow-md shadow-blue-500/20`}
          >
            Update Email
          </button>
        </section>

        {/* Update Password */}
        <section className="p-6 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-sm space-y-4">
          <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2">
            <Lock size={20} className="text-emerald-500" /> Change Account
            Password
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput
              icon={Lock}
              label="Current Password"
              name="oldPassword"
              type="password"
              value={formData.oldPassword || ""}
              onChange={handleChange}
            />
            <ProfileInput
              icon={Lock}
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword || ""}
              onChange={handleChange}
            />
          </div>

          <button
            onClick={updatePassword}
            className={`${buttonBase} mt-4 text-white 
                bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 
                shadow-md shadow-emerald-600/20`}
          >
            <Shield size={18} />
            Update Password
          </button>
        </section>
      </div>

      {/* --- Danger Zone & Logout --- */}
      <section className="p-6 rounded-3xl border border-red-200/60 shadow-[0_8px_30px_rgb(255,0,0,0.05)] bg-red-50/70 backdrop-blur-sm space-y-4">
        <h3 className="text-xl font-bold text-red-700 flex items-center gap-2">
          <Trash2 size={20} className="text-red-600" /> Account Actions
        </h3>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={deleteAccount}
            className={`${buttonBase} bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30`}
          >
            <Trash2 size={18} /> Permanently Delete Account
          </button>

          <button
            onClick={logout}
            className={`${buttonBase} bg-slate-700 hover:bg-slate-800 text-white shadow-lg shadow-slate-700/30`}
          >
            <LogOut size={18} /> Logout of Session
          </button>
        </div>
      </section>
    </div>
  );
}
