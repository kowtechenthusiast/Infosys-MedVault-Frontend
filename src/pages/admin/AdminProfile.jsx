/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo, memo } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building,
  ShieldCheck,
  CheckCircle,
  Key,
  FileBadge,
} from "lucide-react";

// === Reusable Input Component ===
const ProfileInput = memo(
  ({
    icon: Icon,
    label,
    name,
    type = "text",
    value,
    disabled,
    onChange,
    readOnly = false,
  }) => (
    <div>
      <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 flex items-center gap-2">
        <Icon size={14} className="text-blue-500" /> {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        className={`w-full text-base font-medium px-4 py-2 rounded-xl transition-all duration-300
          ${
            disabled || readOnly
              ? "bg-slate-100 border border-slate-200 text-slate-700 cursor-not-allowed"
              : "bg-white border border-blue-300 shadow-inner text-slate-900"
          }`}
      />
    </div>
  )
);

export default function AdminProfile() {
  const adminId = localStorage.getItem("adminId");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    password: "",
    certificate: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  // --- Fetch Admin Profile ---
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/profile/admin/${adminId}`
        );

        if (!res.ok) throw new Error("Failed to fetch admin profile");

        const data = await res.json();

        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
      } catch (err) {
        console.error("Error loading admin profile:", err);
      }
    }

    if (adminId) fetchData();
  }, [adminId]);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle Save
  const handleSave = async () => {
    if (!formData.password) {
      alert("❗ Password is required for updating the admin profile.");
      return;
    }

    if (!formData.certificate) {
      alert("❗ Certificate file is required.");
      return;
    }

    const body = new FormData();
    body.append("userId", adminId);
    body.append("password", formData.password);
    if (formData.phone) body.append("phone", formData.phone);
    if (formData.designation) body.append("designation", formData.designation);
    if (formData.department) body.append("department", formData.department);

    body.append("certificate", formData.certificate);

    try {
      const res = await fetch(
        "http://localhost:8080/api/profile/admin/profile",
        {
          method: "PUT",
          body,
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Admin profile updated successfully!");
        setIsEditing(false);
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating admin profile.");
    }
  };

  // Profile completion %
  const profileCompletion = useMemo(() => {
    const required = ["phone", "designation", "department"];

    const completed = required.filter(
      (f) => formData[f] && formData[f] !== ""
    ).length;

    return Math.floor((completed / required.length) * 100);
  }, [formData]);

  return (
    <div className="space-y-8 p-4 md:p-8">
      <h2 className="text-3xl font-extrabold text-slate-800 pb-3 border-b border-blue-100">
        🛡️ Admin Profile & Verification
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div className="p-6 bg-white border rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck size={20} className="text-green-500" /> Profile
              Status
            </h3>

            <div className="flex justify-between mb-2">
              <span className="font-semibold">Completion</span>
              <span className="text-2xl font-extrabold text-blue-600">
                {profileCompletion}%
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-200">
              <div
                className="h-3 bg-green-500 rounded-full transition-all"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 bg-white border rounded-2xl space-y-3">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold"
              >
                💾 Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="lg:col-span-2 p-8 bg-white border rounded-2xl space-y-6">
          <h3 className="text-2xl font-bold text-blue-700 border-b pb-2">
            Admin Personal Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput
              icon={User}
              label="Full Name"
              name="name"
              value={formData.name}
              readOnly
            />

            <ProfileInput
              icon={Mail}
              label="Email"
              name="email"
              value={formData.email}
              readOnly
            />

            <ProfileInput
              icon={Phone}
              label="Phone"
              name="phone"
              value={formData.phone}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <ProfileInput
              icon={Briefcase}
              label="Designation"
              name="designation"
              value={formData.designation}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <h3 className="text-2xl font-bold text-blue-700 border-b pb-2 mt-6">
            Admin Department Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput
              icon={Building}
              label="Department"
              name="department"
              value={formData.department}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          {/* File Upload */}
          {isEditing && (
            <>
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">
                  Certificate (PDF / Image)
                </label>
                <input
                  type="file"
                  name="certificate"
                  required
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              {/* Password */}
              <ProfileInput
                icon={Key}
                label="Password (Required)"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
