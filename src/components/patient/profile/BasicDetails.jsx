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
        <div className="bg-linear-to-br from-red-50/70 to-red-100/70 backdrop-blur-md border border-red-200 p-8 rounded-3xl space-y-5 shadow-xl transition-all duration-500">
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

          <button
            onClick={handleSetPassword}
            className={`${buttonBase} mt-4 text-white w-full md:w-auto 
                bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/30`}
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
