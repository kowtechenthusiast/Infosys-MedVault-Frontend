import { useState } from "react";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import DoctorOverview from "./DoctorOverview";
import MyAppointments from "./MyAppointments";
import AppointmentHistory from "./AppointmentHistory";
import SimpleFooter from "../../components/SimpleFooter";
import SlotManager from "./SlotManager";
import { useAuth } from "../../context/useAuthContext";

// Sample Data

export default function DoctorDashboard() {
  const { name } = useAuth();
  const [current, setCurrent] = useState("overview");

  const USER_INFO = {
    name: name || "Dr. Eleanor Vance",
    specialty: "Cardiology",
    id: `DOC-${localStorage.getItem("userId") || "1001"}`,
  };

  // Note: The ml-72 class applied to the main content div below ensures
  // that the footer (which is inside this div) also aligns correctly
  // to the right of the fixed sidebar.

  return (
    // Background: Very light gray to allow the white "glowing" cards to pop
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <DoctorSidebar
        current={current}
        setCurrent={setCurrent}
        userInfo={USER_INFO}
      />

      <div className="ml-72 w-auto pt-20 p-8 transition-all duration-300">
        {/* === MAIN CONTENT VIEW === */}
        <div className="min-h-[calc(100vh-140px)]">
          {current === "overview" && <DoctorOverview userInfo={USER_INFO} />}
          {current === "upcoming" && <MyAppointments />}
          {/* {current === "history" && <AppointmentHistory />} */}
          {current === "slots" && <SlotManager />}
        </div>

        {/* === FOOTER === */}
        <SimpleFooter />
      </div>
    </div>
  );
}
