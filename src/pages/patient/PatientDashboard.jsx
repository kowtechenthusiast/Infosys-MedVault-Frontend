import { useState } from "react";
import PatientSidebar from "../../components/patient/PatientSidebar";
import PatientOverview from "./PatientOverview";
import BookAppointment from "./BookAppointment";
import PatientUpcoming from "./PatientUpcoming";
import PatientHistory from "./PatientHistory";
import PatientProfile from "./PatientProfile";

export default function PatientDashboard() {
  const [current, setCurrent] = useState("overview");

  return (
    <div className="flex">
      <PatientSidebar current={current} setCurrent={setCurrent} />

      <div className="ml-72 w-full p-10 pt-24">
        {current === "overview" && <PatientOverview />}
        {current === "book" && <BookAppointment />}
        {current === "upcoming" && <PatientUpcoming />}
        {current === "history" && <PatientHistory />}
        {current === "profile" && <PatientProfile />}
      </div>
    </div>
  );
}
