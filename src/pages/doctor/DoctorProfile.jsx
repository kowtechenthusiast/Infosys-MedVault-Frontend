/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo, memo } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  CheckCircle,
  Key,
  ClipboardSignature,
  Stethoscope,
  FileBadge,
  Building,
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

export default function DoctorProfile() {
  const doctorId = localStorage.getItem("doctorId");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    medicalRegistrationNumber: "",
    licensingAuthority: "",
    specialization: "",
    qualification: "",
    experience: "",
    clinicHospitalName: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    password: "",
    profilePhoto: null,
    medicalLicense: null,
    degreeCertificates: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  // --- Fetch doctor profile ---
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/profile/doctor/${doctorId}`
        );

        if (!res.ok) throw new Error("Failed to fetch doctor profile");

        const data = await res.json();

        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
      } catch (err) {
        console.error("Error fetching doctor profile:", err);
      }
    }

    if (doctorId) fetchData();
  }, [doctorId]);

  // --- Handle form field change ---
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // --- Save Updated Profile ---
  const handleSave = async () => {
    if (!formData.password) {
      alert("❗ Password is required to update your profile.");
      return;
    }
    if (!formData.medicalLicense || !formData.degreeCertificates) {
      alert("❗ Medical license and degree certificates are required.");
      return;
    }

    const body = new FormData();
    body.append("userId", doctorId);
    body.append("password", formData.password);
    body.append("dateOfBirth", formData.dateOfBirth);
    body.append("gender", formData.gender);
    body.append(
      "medicalRegistrationNumber",
      formData.medicalRegistrationNumber
    );
    body.append("licensingAuthority", formData.licensingAuthority);
    body.append("specialization", formData.specialization);
    body.append("qualification", formData.qualification);
    body.append("experience", formData.experience);
    body.append("phone", formData.phone);
    body.append("clinicHospitalName", formData.clinicHospitalName);
    body.append("city", formData.city);
    body.append("state", formData.state);
    body.append("country", formData.country);
    body.append("pincode", formData.pincode);

    if (formData.profilePhoto)
      body.append("profilePhoto", formData.profilePhoto);
    body.append("medicalLicense", formData.medicalLicense);
    body.append("degreeCertificates", formData.degreeCertificates);

    try {
      const res = await fetch("http://localhost:8080/api/profile/doctor", {
        method: "PUT",
        body,
      });

      const data = await res.json();
      console.log("Updated:", data);

      if (data.success) {
        alert("Doctor profile updated successfully!");
        setIsEditing(false);
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Profile Completion ---
  const profileCompletion = useMemo(() => {
    const requiredFields = [
      "name",
      "phone",
      "dateOfBirth",
      "gender",
      "medicalRegistrationNumber",
      "licensingAuthority",
      "specialization",
      "qualification",
      "experience",
      "clinicHospitalName",
      "city",
      "state",
      "country",
      "pincode",
    ];

    const filled = requiredFields.filter(
      (f) => formData[f] && formData[f] !== ""
    ).length;

    return Math.floor((filled / requiredFields.length) * 100);
  }, [formData]);

  return (
    <div className="space-y-8 p-4 md:p-8">
      <h2 className="text-3xl font-extrabold text-slate-800 pb-3 border-b border-blue-100">
        🩺 Doctor Profile & Professional Data
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

            <div className="w-full h-3 bg-slate-200 rounded-full">
              <div
                className="h-3 bg-green-400 rounded-full transition-all"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border space-y-3">
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
            Personal Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput
              icon={User}
              label="Full Name"
              name="name"
              value={formData.name}
              disabled={!isEditing}
              onChange={handleChange}
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
              icon={Calendar}
              type="date"
              label="Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <h3 className="text-2xl font-bold text-blue-700 border-b pb-2 mt-6">
            Professional Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput
              icon={ClipboardSignature}
              label="Medical Registration Number"
              name="medicalRegistrationNumber"
              value={formData.medicalRegistrationNumber}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <ProfileInput
              icon={FileBadge}
              label="Licensing Authority"
              name="licensingAuthority"
              value={formData.licensingAuthority}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <ProfileInput
              icon={Stethoscope}
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <ProfileInput
              icon={Stethoscope}
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <ProfileInput
              icon={Stethoscope}
              type="number"
              label="Experience (Years)"
              name="experience"
              value={formData.experience}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <h3 className="text-2xl font-bold text-blue-700 border-b pb-2 mt-6">
            Clinic / Hospital Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput
              icon={Building}
              label="Clinic/Hospital Name"
              name="clinicHospitalName"
              value={formData.clinicHospitalName}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <ProfileInput
              icon={Mail}
              label="City"
              name="city"
              value={formData.city}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <ProfileInput
              icon={Mail}
              label="State"
              name="state"
              value={formData.state}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <ProfileInput
              icon={Mail}
              label="Country"
              name="country"
              value={formData.country}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <ProfileInput
              icon={Mail}
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          {/* File Uploads */}
          {isEditing && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Profile Photo (Optional)
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Medical License (PDF / Image)
                </label>
                <input
                  type="file"
                  name="medicalLicense"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Degree Certificates (PDF / Image)
                </label>
                <input
                  type="file"
                  name="degreeCertificates"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <ProfileInput
                icon={Key}
                label="Password (Required for update)"
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
