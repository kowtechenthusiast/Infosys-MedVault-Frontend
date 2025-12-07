/* eslint-disable no-unused-vars */
import { useState, useMemo, memo } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  ShieldCheck,
  CheckCircle,
  Key, // For Change Password
  Trash2, // For Delete Account
  AtSign, // For Change Email
} from "lucide-react";

// --- Reusable Input Field Component (Optimized with memo) ---
const ProfileInput = memo(
  ({
    icon: Icon,
    label,
    name,
    type = "text",
    value,
    disabled,
    onChange,
    readOnly = false, // Added readOnly prop for email
  }) => (
    <div>
      {/* Corrected: Icon must be inside the label with flex utilities */}
      <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 flex items-center gap-2">
        <Icon size={14} className="text-blue-500" />
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full text-base font-medium transition-all duration-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400
          ${
            disabled || readOnly
              ? "bg-slate-100 text-slate-700 border border-slate-200 cursor-not-allowed" // Better visual for disabled/readOnly
              : "bg-white text-slate-900 border border-blue-300 shadow-inner"
          }`}
      />
    </div>
  )
);
// Prevents unnecessary re-renders of input fields

export default function PatientProfile() {
  // Mock Data (use real state/props in a production environment)
  const initialUser = {
    name: "Kajal Kumar",
    age: 21,
    phone: "9876543210",
    email: "kajal@example.com",
    address: "123 Health Blvd, Digital City",
    bloodType: "O+",
  };

  const [formData, setFormData] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // In a real app: call API to save data
    console.log("Saving changes:", formData);
    setIsEditing(false);
  };

  // Placeholder functions for advanced actions
  const handleChangePassword = () =>
    console.log("Navigating to Change Password.");
  const handleChangeEmail = () =>
    console.log("Prompting Change Email workflow.");
  const handleDeleteAccount = () => console.log("Confirming Account Deletion.");

  // --- Profile Completion Logic ---
  const profileCompletion = useMemo(() => {
    const fields = Object.values(initialUser);
    const completedFields = fields.filter(
      (val) =>
        formData[
          Object.keys(initialUser).find((key) => initialUser[key] === val)
        ] !== "" &&
        formData[
          Object.keys(initialUser).find((key) => initialUser[key] === val)
        ] !== null
    ).length;
    const totalFields = fields.length;
    return Math.floor((completedFields / totalFields) * 100);
  }, [formData, initialUser]);

  return (
    <div className="space-y-8 p-4 md:p-8">
      {" "}
      {/* Added padding to the container */}
      <h2 className="text-3xl font-extrabold text-slate-800 border-b border-blue-100 pb-3">
        👤 My Profile & Health Data
      </h2>
      {/* --- Main Content Layout --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* === Column 1: Status and Actions === */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Completion Card */}
          <div className="p-6 bg-white rounded-2xl shadow-xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ShieldCheck size={20} className="text-green-500" /> Profile
              Status
            </h3>

            <div className="flex items-center justify-between mb-2">
              <span className="text-md font-semibold text-slate-700">
                Completion
              </span>
              <span className="text-2xl font-extrabold text-blue-600">
                {profileCompletion}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-linear-to-r from-green-400 to-cyan-500 transition-all duration-700"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>

            {profileCompletion === 100 ? (
              <p className="mt-4 text-sm text-green-600 flex items-center gap-1">
                <CheckCircle size={16} /> Data is fully verified and complete.
              </p>
            ) : (
              <p className="mt-4 text-sm text-amber-600">
                Missing data fields. Complete your profile for optimal care
                matching.
              </p>
            )}
          </div>

          {/* Action Button Card */}
          <div className="p-6 bg-white rounded-2xl border border-blue-200 shadow-md space-y-3">
            <h3 className="text-lg font-bold text-slate-700 mb-2">
              Account Actions
            </h3>

            {/* Main Save/Edit Button */}
            {isEditing ? (
              <button
                onClick={handleSave}
                className="w-full bg-linear-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  💾 Confirm & Save Changes
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-linear-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  ✏️ Edit Information
                </span>
              </button>
            )}

            {/* Advanced Buttons */}
            <button
              onClick={handleChangePassword}
              className="w-full border border-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              <Key size={18} className="text-blue-500" /> Change Password
            </button>

            <button
              onClick={handleChangeEmail}
              className="w-full border border-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              <AtSign size={18} className="text-blue-500" /> Change Email
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full border border-red-300 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <Trash2 size={18} /> Delete Account
            </button>
          </div>
        </div>

        {/* === Column 2 & 3: Profile Form Fields === */}
        <div className="lg:col-span-2 p-8 bg-white backdrop-blur-md rounded-2xl border border-blue-100 shadow-2xl space-y-6">
          {/* Personal Details Section */}
          <h3 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-100 pb-2 mb-4">
            Personal Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <ProfileInput
              icon={User}
              label="Full Name"
              name="name"
              value={formData.name}
              disabled={!isEditing}
              onChange={handleChange}
            />

            {/* Email (Read-only status) */}
            <ProfileInput
              icon={Mail}
              label="Email Address (Login ID)"
              name="email"
              value={formData.email}
              readOnly={true} // Use readOnly for non-editable fields
            />

            {/* Phone */}
            <ProfileInput
              icon={Phone}
              label="Phone Number"
              name="phone"
              value={formData.phone}
              disabled={!isEditing}
              onChange={handleChange}
            />

            {/* Age */}
            <ProfileInput
              icon={Calendar}
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          {/* Medical Info Section */}
          <h3 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-100 pb-2 pt-6 mb-4">
            Medical & Contact Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blood Type */}
            <ProfileInput
              icon={Heart}
              label="Blood Type"
              name="bloodType"
              value={formData.bloodType}
              disabled={!isEditing}
              onChange={handleChange}
            />

            {/* Address */}
            <ProfileInput
              icon={Mail}
              label="Residential Address"
              name="address"
              value={formData.address}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
