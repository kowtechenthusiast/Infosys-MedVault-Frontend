import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Overview from "./Overview";
import DoctorVerification from "./DoctorVerification";
import AdminVerification from "./AdminVerification";
import ControlMenu from "./ControlMenu";

export default function AdminDashboard() {
  const [current, setCurrent] = useState("overview");

  return (
    <div className="flex">
      <AdminSidebar current={current} setCurrent={setCurrent} />

      {/* MAIN CONTENT */}
      <div className="ml-72 w-full pt-24 p-8">
        {current === "overview" && <Overview />}
        {current === "doctor" && <DoctorVerification />}
        {current === "admin" && <AdminVerification />}
        {current === "control" && <ControlMenu />}
      </div>
    </div>
  );
}
