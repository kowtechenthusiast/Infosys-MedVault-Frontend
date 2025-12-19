/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo, memo } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  ClipboardSignature,
  Stethoscope,
  FileBadge,
  Building,
  MapPin,
  GraduationCap,
  UploadCloud,
  CheckCircle2,
  Eye,
  AlertCircle,
  IndianRupee,
} from "lucide-react";

/* ================= REUSABLE MODERN INPUT ================= */
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
    error,
  }) => (
    <div className="group relative">
      <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 transition-colors group-focus-within:text-blue-500">
        <Icon size={14} /> {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value || ""}
          readOnly={readOnly}
          disabled={disabled}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-xl font-medium outline-none transition-all duration-300
          ${
            disabled || readOnly
              ? "bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed"
              : error
              ? "bg-white border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 shadow-sm"
              : "bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm"
          }`}
        />
        {error && (
          <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-semibold">
            <AlertCircle size={10} /> {error}
          </p>
        )}
      </div>
    </div>
  )
);

export default function DoctorProfile() {
  const doctorId = localStorage.getItem("userId");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    medicalLicense: null, // New file upload
    medicalLicenseUrl: "", // Existing file path from server
    consultationFee: "",
  });

  const specializationOptions = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "General Physician",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
  ];

  /* ================= FETCH DATA FROM BACKEND ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      if (!doctorId) return;
      try {
        const res = await fetch(
          `http://localhost:8080/api/profile/doctor/${doctorId}`
        );
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        console.log("Doctor Profile Data:", data);
        setFormData({
          ...data,
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          medicalLicenseUrl: data.medicalLicense || "", // Adjust based on your API key
        });

        console.log("Form Data Set:", {
          ...data,
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          medicalLicenseUrl: data.medicalLicense || "",
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchProfile();
  }, [doctorId]);

  /* ================= VALIDATION LOGIC ================= */
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      tempErrors.phone = "Must be 10 digits";

    if (!formData.specialization)
      tempErrors.specialization = "Please select a specialization";
    if (!formData.medicalRegistrationNumber)
      tempErrors.medicalRegistrationNumber = "Registration number is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (formData.experience < 0) tempErrors.experience = "Invalid experience";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    // Clear error when user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const data = new FormData();
    data.append("userId", doctorId);

    const fields = [
      "phone",
      "dateOfBirth",
      "gender",
      "medicalRegistrationNumber",
      "licensingAuthority",
      "specialization",
      "qualification",
      "experience",
      "consultationFee",
      "clinicHospitalName",
      "city",
      "state",
      "country",
      "pincode",
    ];

    fields.forEach((field) => data.append(field, formData[field] || ""));

    if (formData.medicalLicense instanceof File) {
      data.append("medicalLicense", formData.medicalLicense);
    }

    console.log("Fee:", formData.consultationFee);

    try {
      const res = await fetch("http://localhost:8080/api/profile/doctor", {
        method: "PUT",
        body: data,
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      alert("Error updating profile. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PROGRESS CALCULATION ================= */
  const profileCompletion = useMemo(() => {
    const essential = [
      "name",
      "email",
      "phone",
      "dateOfBirth",
      "gender",
      "medicalRegistrationNumber",
      "specialization",
      "experience",
      "consultationFee",
      "clinicHospitalName",
      "city",
      "medicalLicense",
    ];
    const filled = essential.filter((f) => {
      if (f === "medicalLicense")
        return formData.medicalLicense || formData.medicalLicenseUrl;
      return formData[f] && formData[f].toString().trim() !== "";
    }).length;
    return Math.floor((filled / essential.length) * 100);
  }, [formData]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <span className="bg-blue-600 text-white p-2 rounded-2xl shadow-lg">
                <Stethoscope size={32} />
              </span>
              Doctor Profile
            </h1>
          </div>

          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            disabled={loading}
            className={`px-8 py-3.5 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-xl ${
              isEditing
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-slate-900 hover:bg-slate-800 text-white"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              "Processing..."
            ) : isEditing ? (
              <>
                <CheckCircle2 size={18} /> Save Changes
              </>
            ) : (
              "Edit Profile"
            )}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: COMPLETION BAR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-bold text-slate-800 text-lg">
                  Profile Strength
                </h3>
                <span className="text-3xl font-black text-blue-600">
                  {profileCompletion}%
                </span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1">
                <div
                  className="h-full rounded-full bg-linear-to-r from-blue-500 to-indigo-500 transition-all duration-1000"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </div>

            <div className="bg-indigo-900 p-8 rounded-4xl text-white">
              <ShieldCheck className="text-indigo-300 mb-4" size={40} />
              <h4 className="text-xl font-bold mb-2">Verification Status</h4>
              <p className="text-indigo-200 text-sm mb-6">
                Details are encrypted and stored securely.
              </p>
              <div className="flex items-center gap-3 text-sm font-medium">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Verified Partner
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-4xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-1.5 bg-blue-600 rounded-full" />
                <h3 className="text-2xl font-bold text-slate-800">
                  Personal & Professional Details
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <ProfileInput
                  icon={User}
                  label="Full Name"
                  value={formData.name}
                  readOnly
                />
                <ProfileInput
                  icon={Mail}
                  label="Email"
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
                  error={errors.phone}
                />
                <ProfileInput
                  icon={Calendar}
                  type="date"
                  label="DOB"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  disabled={!isEditing}
                  onChange={handleChange}
                />

                {/* Gender Select */}
                <div className="group relative">
                  <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 transition-colors group-focus-within:text-blue-500">
                    <User size={14} /> Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    disabled={!isEditing}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl font-medium outline-none transition-all duration-300 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Specialization Select */}
                <div className="group relative">
                  <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 transition-colors group-focus-within:text-blue-500">
                    <Stethoscope size={14} /> Specialization
                  </label>

                  {!isEditing ? (
                    /* READ-ONLY VIEW: Shows as a clean input when not editing */
                    <input
                      type="text"
                      value={formData.specialization || "Not Specified"}
                      readOnly
                      className="w-full px-4 py-3 rounded-xl font-medium outline-none transition-all duration-300 bg-slate-50 border border-slate-200 text-slate-500 cursor-not-allowed shadow-sm"
                    />
                  ) : (
                    /* EDIT VIEW: Shows the dropdown selection */
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl font-medium outline-none transition-all duration-300 bg-white border ${
                        errors.specialization
                          ? "border-red-400"
                          : "border-slate-200"
                      } focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm`}
                    >
                      <option value="">Select Specialization</option>
                      {specializationOptions.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  )}

                  {isEditing && errors.specialization && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold">
                      {errors.specialization}
                    </p>
                  )}
                </div>

                <ProfileInput
                  icon={ClipboardSignature}
                  label="Reg No."
                  name="medicalRegistrationNumber"
                  value={formData.medicalRegistrationNumber}
                  disabled={!isEditing}
                  onChange={handleChange}
                  error={errors.medicalRegistrationNumber}
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
                  icon={GraduationCap}
                  label="Qualification"
                  name="qualification"
                  value={formData.qualification}
                  disabled={!isEditing}
                  onChange={handleChange}
                />

                <ProfileInput
                  icon={ShieldCheck}
                  type="number"
                  label="Experience (Years)"
                  name="experience"
                  value={formData.experience}
                  disabled={!isEditing}
                  onChange={handleChange}
                  error={errors.experience}
                />

                <ProfileInput
                  icon={IndianRupee}
                  type="number"
                  label="Consultation Fee ($)"
                  name="consultationFee"
                  value={formData.consultationFee}
                  disabled={!isEditing}
                  onChange={handleChange}
                  error={errors.consultationFee}
                />

                <ProfileInput
                  icon={Building}
                  label="Clinic Name"
                  name="clinicHospitalName"
                  value={formData.clinicHospitalName}
                  disabled={!isEditing}
                  onChange={handleChange}
                />

                <ProfileInput
                  icon={MapPin}
                  label="City"
                  name="city"
                  value={formData.city}
                  disabled={!isEditing}
                  onChange={handleChange}
                  error={errors.city}
                />
                <ProfileInput
                  icon={MapPin}
                  label="State"
                  name="state"
                  value={formData.state}
                  disabled={!isEditing}
                  onChange={handleChange}
                />

                <ProfileInput
                  icon={MapPin}
                  label="Country"
                  name="country"
                  value={formData.country}
                  disabled={!isEditing}
                  onChange={handleChange}
                />
                <ProfileInput
                  icon={MapPin}
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  disabled={!isEditing}
                  onChange={handleChange}
                />
              </div>

              {/* MODERN FILE UPLOAD & VIEW */}
              <div className="mt-10 pt-10 border-t border-slate-100">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Medical License (PDF/JPG)
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  <input
                    type="file"
                    id="license"
                    name="medicalLicense"
                    className="hidden"
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <label
                    htmlFor="license"
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                      !isEditing
                        ? "bg-slate-100 text-slate-400"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    <UploadCloud size={18} />
                    {formData.medicalLicense?.name || "Upload New Document"}
                  </label>

                  {/* View Existing License Button */}
                  {/* View Existing License Button */}
                  {formData.medicalLicenseUrl && (
                    <div className="flex flex-wrap items-center gap-3">
                      {/* VIEW BUTTON */}
                      <button
                        type="button"
                        onClick={() => {
                          const baseUrl = "http://localhost:8080";
                          const filePath =
                            formData.medicalLicenseUrl.startsWith("/")
                              ? formData.medicalLicenseUrl
                              : `/${formData.medicalLicenseUrl}`;
                          window.open(`${baseUrl}${filePath}`, "_blank");
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200 shadow-sm"
                      >
                        <Eye size={16} /> View
                      </button>

                      {/* DOWNLOAD BUTTON */}
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const baseUrl = "http://localhost:8080";
                            const filePath =
                              formData.medicalLicenseUrl.startsWith("/")
                                ? formData.medicalLicenseUrl
                                : `/${formData.medicalLicenseUrl}`;
                            const fileUrl = `${baseUrl}${filePath}`;

                            // Fetch the file as a blob to force download
                            const response = await fetch(fileUrl);
                            const blob = await response.blob();
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;

                            // Set filename from the URL path
                            const fileName = filePath.split("/").pop();
                            link.setAttribute(
                              "download",
                              fileName || "medical-license"
                            );

                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                            window.URL.revokeObjectURL(url);
                          } catch (err) {
                            console.error("Download failed:", err);
                            alert("Could not download file.");
                          }
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all border border-blue-100 shadow-sm"
                      >
                        <UploadCloud size={16} className="rotate-180" />{" "}
                        Download
                      </button>
                    </div>
                  )}

                  {isEditing && formData.medicalLicense && (
                    <span className="text-xs text-emerald-600 font-bold italic">
                      New File Selected
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
