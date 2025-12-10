import { useState, useEffect } from "react";

import BasicDetails from "../../components/patient/profile/BasicDetails";
import LifestyleInfo from "../../components/patient/profile/LifestyleInfo";
import HealthMetrics from "../../components/patient/profile/HealthMetrics";
import MedicalRecords from "../../components/patient/profile/MedicalRecords";
import AccountSettings from "../../components/patient/profile/AccountSettings";
import SidebarTabs from "../../components/patient/profile/SidebarTabs";

export default function PatientProfile() {
  const patientId = localStorage.getItem("patientId");

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
    pincode: "",
    password: "",

    sleepHours: "",
    diet: "",
    smoking: "",
    alcohol: "",
    sugarLevel: "",
    bpSys: "",
    bpDia: "",
    spo2: "",
    heartRate: "",

    initialPassword: "",
    confirmPassword: "",
  });

  const mustSetPasswordFirst =
    !formData.password || formData.password.trim() === "";
  // const mustSetPasswordFirst = false;
  // Fetch patient profile
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/profile/patient/${patientId}`
        );
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    }
    load();
  }, [patientId]);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // ------------------ PASSWORD SETUP HANDLER ------------------
  const handleSetPassword = async () => {
    if (!formData.initialPassword || !formData.confirmPassword) {
      alert("Enter both password fields.");
      return;
    }

    if (formData.initialPassword !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8080/api/profile/set-password",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: patientId,
            password: formData.initialPassword,
          }),
        }
      );

      if (res.ok) {
        alert("Password set successfully!");
        setFormData((p) => ({
          ...p,
          password: formData.initialPassword,
          initialPassword: "",
          confirmPassword: "",
        }));
      } else {
        alert("Error setting password.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  // ------------------ GENERAL PROFILE UPDATE ------------------
  const saveProfile = async () => {
    const fd = new FormData();
    fd.append("userId", patientId);

    Object.keys(formData).forEach((k) => {
      if (formData[k]) fd.append(k, formData[k]);
    });

    try {
      await fetch("http://localhost:8080/api/profile/patient", {
        method: "PUT",
        body: fd,
      });

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const updateEmail = () => alert("Email updated!");
  const updatePassword = () => alert("Password updated!");
  const deleteAccount = () => alert("Account deleted!");
  const logout = () => alert("Logged out!");

  return (
    <div className="min-h-screen relative bg-slate-50 overflow-hidden font-sans selection:bg-blue-200">
      {/* --- Ambient Background Elements --- */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-cyan-100/50 rounded-full blur-[100px] pointer-events-none" />

      {/* --- Main Layout --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-10 ml-2">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-slate-800 via-blue-800 to-indigo-800 tracking-tight">
            Patient Dashboard
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Manage your health profile and records securely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SidebarTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              mustSetPasswordFirst={mustSetPasswordFirst}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 lg:p-10 transition-all duration-300 min-h-[600px] relative">
              {/* Render Active Component */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === "basic" && (
                  <BasicDetails
                    formData={formData}
                    handleChange={handleChange}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    handleSave={saveProfile}
                    mustSetPasswordFirst={mustSetPasswordFirst}
                    handleSetPassword={handleSetPassword}
                  />
                )}

                {activeTab === "lifestyle" && (
                  <LifestyleInfo
                    formData={formData}
                    handleChange={handleChange}
                    handleSave={saveProfile}
                    mustSetPasswordFirst={mustSetPasswordFirst}
                  />
                )}

                {activeTab === "health" && (
                  <HealthMetrics
                    formData={formData}
                    handleChange={handleChange}
                    handleSave={saveProfile}
                    mustSetPasswordFirst={mustSetPasswordFirst}
                  />
                )}

                {activeTab === "records" && (
                  <MedicalRecords
                    patientId={patientId}
                    mustSetPasswordFirst={mustSetPasswordFirst}
                  />
                )}

                {activeTab === "settings" && (
                  <AccountSettings
                    formData={formData}
                    handleChange={handleChange}
                    updateEmail={updateEmail}
                    updatePassword={updatePassword}
                    deleteAccount={deleteAccount}
                    logout={logout}
                    mustSetPasswordFirst={mustSetPasswordFirst}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
