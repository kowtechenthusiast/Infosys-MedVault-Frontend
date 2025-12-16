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
  const [mustSetPasswordFirst, setMustSetPasswordFirst] = useState(false);

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

        // CASE 1 — Profile not completed
        if (data.success === false && data.response) {
          const base = data.response;

          setFormData((prev) => ({
            ...prev,
            ...base,
          }));

          setMustSetPasswordFirst(!base.password);
          return;
        }

        // CASE 2 — Profile exists
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));

        setMustSetPasswordFirst(!data.password);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    }

    load();
  }, [patientId]);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // -------------------------------------------
  // SET PASSWORD FIRST TIME
  // -------------------------------------------
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
      const res = await fetch("http://localhost:8080/api/auth/set-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: patientId,
          password: formData.initialPassword,
        }),
      });

      if (res.ok) {
        alert("Password set successfully!");
        setFormData((p) => ({
          ...p,
          password: formData.initialPassword,
          initialPassword: "",
          confirmPassword: "",
        }));
        setMustSetPasswordFirst(false);
      } else {
        alert("Error setting password.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  // -------------------------------------------
  // GENERAL PROFILE UPDATE HANDLER
  // -------------------------------------------
  const saveProfile = async () => {
    const fd = new FormData();

    // Combine only allowed backend fields
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

    const requestObject = { userId: patientId };

    allowedFields.forEach((key) => {
      if (formData[key] !== "" && formData[key] !== undefined) {
        requestObject[key] = formData[key];
      }
    });

    fd.append("data", JSON.stringify(requestObject));

    try {
      const res = await fetch(
        "http://localhost:8080/api/profile/patient/complete-profile",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestObject),
        }
      );

      if (res.ok) {
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const updateEmail = () => alert("Email updated!");
  const updatePassword = () => alert("Password updated!");
  const deleteAccount = () => alert("Account deleted!");
  const logout = () => alert("Logged out!");

  // -------------------------------------------
  // UI RENDER
  // -------------------------------------------
  return (
    <div className="min-h-screen relative bg-slate-50 overflow-hidden font-sans selection:bg-blue-200">
      {/* Ambient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200/40 rounded-full blur-[100px]" />
      <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-cyan-100/50 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="mb-10 ml-2">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-slate-800 via-blue-800 to-indigo-800 tracking-tight">
            Patient Profile
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Manage your health profile and records securely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SidebarTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              mustSetPasswordFirst={mustSetPasswordFirst}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl p-8 lg:p-10 min-h-[600px] relative">
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
