import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import SimpleFooter from "../../components/SimpleFooter";
import { Outlet } from "react-router-dom";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <DoctorSidebar />

      <div className="ml-72 w-auto pt-20 p-8 transition-all duration-300">
        <div className="min-h-[calc(100vh-140px)]">
          {/* Routed content */}
          <Outlet />
        </div>

        <SimpleFooter />
      </div>
    </div>
  );
}
