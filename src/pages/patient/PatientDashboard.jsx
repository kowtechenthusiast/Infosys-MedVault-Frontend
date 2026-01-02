import PatientSidebar from "../../components/patient/PatientSidebar";
import SimpleFooter from "../../components/SimpleFooter";
import { Outlet } from "react-router-dom";

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar */}
      <PatientSidebar />

      {/* Main Content */}
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
