import { useState, useEffect } from "react";

import BasicDetails from "../../components/patient/profile/BasicDetails";
import LifestyleInfo from "../../components/patient/profile/LifestyleInfo";
import HealthMetrics from "../../components/patient/profile/HealthMetrics";
import MedicalRecords from "../../components/patient/profile/MedicalRecords";
import AccountSettings from "../../components/patient/profile/AccountSettings";
import SidebarTabs from "../../components/patient/profile/SidebarTabs";

export default function PatientProfile() {
  const patientId = localStorage.getItem("userId");

  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    idProofPath: "", // To store the URL from backend
    idProof: null, // To store the selected file

    sleepHours: "",
    diet: "",
    smoking: "",
    alcohol: "",
    sugarLevel: "",
    bpSys: "",
    bpDia: "",
    spo2: "",
    heartRate: "",
  });

  // -------------------------------------------
  // FETCH PATIENT PROFILE
  // -------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/profile/patient/${patientId}`
        );

        if (!res.ok) {
          console.error("Bad response:", res.status);
          return;
        }

        const data = await res.json();
        console.log("Profile API Response:", data);

        // CASE 1 — Profile wrapper response
        if (data.success === false && data.response) {
          setFormData((prev) => ({
            ...prev,
            ...data.response,
          }));
          return;
        }

        // CASE 2 — Normal profile
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    }

    load();
  }, [patientId]);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // -------------------------------------------
  // SAVE PROFILE
  // -------------------------------------------
  const saveProfile = async () => {
    const data = new FormData();
    data.append("userId", patientId);

    const allowedFields = [
      "dateOfBirth",
      "gender",
      "bloodGroup",
      "phone",
      "address",
      "city",
      "state",
      "country",
      "pincode",
      "sleepHours",
      "diet",
      "smoking",
      "alcohol",
      "sugarLevel",
      "bpSys",
      "bpDia",
      "spo2",
      "heartRate",
    ];

    allowedFields.forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    // Append the file if a new one was selected
    if (formData.idProof) {
      data.append("idProof", formData.idProof);
    }

    try {
      const res = await fetch(
        "http://localhost:8080/api/profile/patient/complete-profile",
        {
          method: "PUT",
          // Note: Content-Type header is omitted so the browser sets it to
          // multipart/form-data with the correct boundary automatically
          body: data,
        }
      );

      if (res.ok) {
        setIsEditing(false);
        alert("Profile updated successfully!");
        // Optional: Re-fetch to get the new idProofPath
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleFileChange = (e) => {
    setFormData((p) => ({ ...p, idProof: e.target.files[0] }));
  };

  const updateEmail = () => alert("Email updated!");
  const updatePassword = () => alert("Password updated!");
  const deleteAccount = () => alert("Account deleted!");
  const logout = () => alert("Logged out!");

  // -------------------------------------------
  // UI
  // -------------------------------------------
  return (
    <div className="min-h-screen relative bg-slate-50 overflow-hidden font-sans">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-10 ml-2">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-slate-800 via-blue-800 to-indigo-800">
            Patient Profile
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Manage your health profile and records securely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-xl border rounded-[2.5rem] shadow-xl p-8 min-h-[600px]">
              {activeTab === "basic" && (
                <BasicDetails
                  formData={formData}
                  handleChange={handleChange}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  handleSave={saveProfile}
                  handleFileChange={handleFileChange}
                />
              )}

              {activeTab === "lifestyle" && (
                <LifestyleInfo
                  formData={formData}
                  handleChange={handleChange}
                  handleSave={saveProfile}
                />
              )}

              {activeTab === "health" && (
                <HealthMetrics
                  formData={formData}
                  handleChange={handleChange}
                  handleSave={saveProfile}
                />
              )}

              {activeTab === "records" && (
                <MedicalRecords patientId={patientId} />
              )}

              {activeTab === "settings" && (
                <AccountSettings
                  formData={formData}
                  handleChange={handleChange}
                  updateEmail={updateEmail}
                  updatePassword={updatePassword}
                  deleteAccount={deleteAccount}
                  logout={logout}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
