import { useState } from "react";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import DoctorOverview from "./DoctorOverview";
import UpcomingAppointments from "./UpcomingAppointments";
import AppointmentHistory from "./AppointmentHistory";

export default function DoctorDashboard() {
  const [current, setCurrent] = useState("overview");

  return (
    <div className="flex">
      <DoctorSidebar current={current} setCurrent={setCurrent} />

      <div className="ml-72 w-full pt-24 p-8">
        {current === "overview" && <DoctorOverview />}
        {current === "upcoming" && <UpcomingAppointments />}
        {current === "history" && <AppointmentHistory />}
      </div>
    </div>
  );
}
