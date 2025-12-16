import ProfileInput from "./ProfileInput";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  MapPin,
  Lock,
  Edit,
  Check,
  X,
  AlertCircle,
} from "lucide-react";

export default function BasicDetails({
  formData,
  handleChange,
  isEditing,
  setIsEditing,
  handleSave,
  mustSetPasswordFirst,
  handleSetPassword,
}) {
  // Base button styles for re-use
  const buttonBase =
    "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 justify-center";

  // --- PASSWORD VALIDATION LOGIC ---
  const currentPassword = formData.initialPassword || "";
  const confirmPassword = formData.confirmPassword || "";

  const passwordRequirements = [
    {
      id: 1,
      label: "At least 8 characters",
      valid: currentPassword.length >= 8,
    },
    {
      id: 2,
      label: "One uppercase letter",
      valid: /[A-Z]/.test(currentPassword),
    },
    {
      id: 3,
      label: "One lowercase letter",
      valid: /[a-z]/.test(currentPassword),
    },
    { id: 4, label: "One number", valid: /[0-9]/.test(currentPassword) },
    {
      id: 5,
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(currentPassword),
    },
  ];

  const allRequirementsMet = passwordRequirements.every((req) => req.valid);
  const passwordsMatch =
    currentPassword === confirmPassword && currentPassword !== "";
  const isFormValid = allRequirementsMet && passwordsMatch;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* --- Header & Edit Toggle --- */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Personal Information
        </h3>

        {!isEditing ? (
          <button
            onClick={() => !mustSetPasswordFirst && setIsEditing(true)}
            disabled={mustSetPasswordFirst}
            className={`${buttonBase} text-sm 
              ${
                mustSetPasswordFirst
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm"
              }`}
          >
            <Edit size={16} />
            {mustSetPasswordFirst ? "Locked" : "Edit Profile"}
          </button>
        ) : (
          <span
            className={`${buttonBase} bg-linear-to-r from-cyan-400 to-blue-500 text-white text-sm shadow-lg shadow-blue-500/20`}
          >
            <Edit size={16} />
            Editing Active
          </span>
        )}
      </div>

      {/* --- STEP 1: Enforce Password Setup (Highly Styled Warning) --- */}
      {mustSetPasswordFirst && (
        <div className="bg-linear-to-br from-red-50/70 to-red-100/70 backdrop-blur-md border border-red-200 p-8 rounded-3xl space-y-6 shadow-xl transition-all duration-500">
          <h4 className="text-xl text-red-700 font-bold flex items-center gap-3">
            <Lock size={20} className="text-red-500 animate-pulse" /> Security
            Initialization Required
          </h4>
          <p className="text-slate-600 text-sm">
            Your account is temporarily restricted. Please set a{" "}
            <strong>strong password</strong> to unlock editing and access to
            other sections.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput
              icon={Lock}
              label="New Password"
              type="password"
              name="initialPassword"
              value={formData.initialPassword || ""}
              onChange={handleChange}
              placeholder="Enter new password"
            />
            <ProfileInput
              icon={Lock}
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword || ""}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>

          {/* --- PASSWORD STRENGTH VALIDATOR UI --- */}
          <div className="bg-white/60 rounded-xl p-4 border border-red-100/50">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Password Requirements
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {passwordRequirements.map((req) => (
                <div
                  key={req.id}
                  className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                    req.valid ? "text-green-700 font-medium" : "text-slate-500"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      req.valid
                        ? "bg-green-100 border-green-500 text-green-600"
                        : "bg-slate-100 border-slate-300 text-slate-300"
                    }`}
                  >
                    {req.valid ? (
                      <Check size={12} strokeWidth={3} />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    )}
                  </div>
                  {req.label}
                </div>
              ))}
            </div>

            {/* Match Confirmation */}
            <div className="mt-4 pt-3 border-t border-slate-200/60">
              <div
                className={`flex items-center gap-2 text-sm font-medium transition-all ${
                  passwordsMatch ? "text-green-600" : "text-slate-400"
                }`}
              >
                {passwordsMatch ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <AlertCircle size={16} />
                )}
                {passwordsMatch ? "Passwords match" : "Passwords must match"}
              </div>
            </div>
          </div>

          <button
            onClick={handleSetPassword}
            disabled={!isFormValid}
            className={`${buttonBase} mt-4 text-white w-full md:w-auto 
                ${
                  isFormValid
                    ? "bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/30 cursor-pointer"
                    : "bg-slate-300 cursor-not-allowed opacity-70"
                }`}
          >
            <Lock size={18} />
            Secure & Save Password
          </button>
        </div>
      )}

      {/* --- Profile Data Inputs --- */}
      <div
        className={`space-y-8 transition-opacity duration-300 ${
          mustSetPasswordFirst ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfileInput
            icon={User}
            label="Full Name"
            name="name"
            disabled={!isEditing}
            value={formData.name}
            onChange={handleChange}
          />
          <ProfileInput
            icon={Mail}
            label="Email"
            name="email"
            readOnly
            value={formData.email}
          />
          <ProfileInput
            icon={Phone}
            label="Phone Number"
            name="phone"
            disabled={!isEditing}
            value={formData.phone}
            onChange={handleChange}
          />
          <ProfileInput
            icon={Calendar}
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            disabled={!isEditing}
            value={formData.dateOfBirth}
            onChange={handleChange}
          />

          <ProfileInput
            icon={Heart}
            label="Blood Group"
            name="bloodGroup"
            disabled={!isEditing}
            value={formData.bloodGroup}
            onChange={handleChange}
            options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
          />

          <ProfileInput
            label="Gender"
            name="gender"
            disabled={!isEditing}
            value={formData.gender}
            onChange={handleChange}
            options={["Male", "Female", "Other"]}
          />
        </div>

        {/* --- Address Details Section --- */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
            <MapPin size={20} className="text-blue-500" /> Current Residence
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProfileInput
              label="Address Line"
              name="address"
              disabled={!isEditing}
              value={formData.address}
              onChange={handleChange}
            />
            <ProfileInput
              label="City"
              name="city"
              disabled={!isEditing}
              value={formData.city}
              onChange={handleChange}
            />
            <ProfileInput
              label="State / Province"
              name="state"
              disabled={!isEditing}
              value={formData.state}
              onChange={handleChange}
            />
            <ProfileInput
              label="Pincode / Zip"
              name="pincode"
              disabled={!isEditing}
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* --- Save Button --- */}
        {isEditing && (
          <div className="pt-8 flex justify-end">
            <button
              onClick={handleSave}
              className={`${buttonBase} text-white 
                bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                shadow-xl shadow-blue-600/30`}
            >
              Save Profile Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
