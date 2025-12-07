import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Overview from "./Overview";
import DoctorVerification from "./DoctorVerification";
import AdminVerification from "./AdminVerification";
import ControlMenu from "./ControlMenu";
// Import the SimpleFooter component to match the structure
import SimpleFooter from "../../components/SimpleFooter";
import PatientVerification from "./PatientVerification";

export default function AdminDashboard() {
  const [current, setCurrent] = useState("overview");

  return (
    // Background, font, and text color match the DoctorDashboard theme
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. Sidebar - Fixed width assumed */}
      <AdminSidebar current={current} setCurrent={setCurrent} />

      {/* 2. Main Content Wrapper */}
      {/* ml-72 for sidebar offset, pt-20 for consistent top padding */}
      <div className="ml-72 w-auto pt-20 p-8 transition-all duration-300">
        {/* === MAIN CONTENT VIEW === */}
        {/* Ensures content takes up enough height before the footer */}
        <div className="min-h-[calc(100vh-140px)]">
          {current === "overview" && <Overview />}
          {current === "patient" && <PatientVerification />}
          {current === "doctor" && <DoctorVerification />}
          {current === "admin" && <AdminVerification />}
          {current === "control" && <ControlMenu />}
        </div>

        {/* === FOOTER === */}
        {/* Added for structural completeness and consistent layout */}
        <SimpleFooter />
      </div>
    </div>
  );
}
