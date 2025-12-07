import { useState } from "react";
import PatientSidebar from "../../components/patient/PatientSidebar";
import PatientOverview from "./PatientOverview";
import BookAppointment from "./BookAppointment";
import PatientUpcoming from "./PatientUpcoming";
import PatientHistory from "./PatientHistory";
import PatientProfile from "./PatientProfile";
import SimpleFooter from "../../components/SimpleFooter"; // Import the Footer

// Sample Data (Necessary for the Sidebar/Overview, mirroring DoctorDashboard structure)
const USER_INFO = {
  name: "Sarah Chen",
  email: "sarah@example.com",
  id: "PAT-1004",
};

export default function PatientDashboard() {
  const [current, setCurrent] = useState("overview");

  return (
    // Background: Very light gray (bg-slate-50) to allow the "glowing" content cards to pop.
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar: Passes user info and state control */}
      <PatientSidebar
        current={current}
        setCurrent={setCurrent}
        userInfo={USER_INFO} // Pass user info if needed by sidebar
      />

      {/* Main Content Container: Adjusted padding to account for top spacing and sidebar width */}
      <div className="ml-72 w-auto pt-20 p-8 transition-all duration-300">
        {/* === MAIN CONTENT VIEW === */}
        <div className="min-h-[calc(100vh-140px)]">
          {current === "overview" && <PatientOverview userInfo={USER_INFO} />}
          {current === "book" && <BookAppointment />}
          {current === "upcoming" && <PatientUpcoming />}
          {current === "history" && <PatientHistory />}
          {current === "profile" && <PatientProfile userInfo={USER_INFO} />}
        </div>

        {/* === FOOTER === */}
        <SimpleFooter />
      </div>
    </div>
  );
}
