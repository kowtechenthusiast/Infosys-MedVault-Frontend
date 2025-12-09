import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Patient
import PatientAuth from "./pages/patient/PatientAuth";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientOverview from "./pages/patient/PatientOverview";
import BookAppointment from "./pages/patient/BookAppointment";
import PatientUpcoming from "./pages/patient/PatientUpcoming";
import PatientHistory from "./pages/patient/PatientHistory";
import PatientProfile from "./pages/patient/PatientProfile";

// Doctor
import DoctorAuth from "./pages/doctor/DoctorAuth";
import DoctorPending from "./pages/doctor/DoctorPending";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import AdminProfile from "./pages/admin/AdminProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* ---------------- PATIENT ---------------- */}
        <Route path="/patient/auth" element={<PatientAuth />} />

        {/* Main Dashboard Wrapper */}
        <Route path="/patient/dashboard" element={<PatientDashboard />}>
          {/* Default page */}
          <Route index element={<PatientOverview />} />
        </Route>

        {/* Direct routes (if user navigates via sidebar buttons) */}
        <Route
          path="/patient/dashboard/overview"
          element={<PatientOverview />}
        />
        <Route path="/patient/dashboard/book" element={<BookAppointment />} />
        <Route
          path="/patient/dashboard/upcoming"
          element={<PatientUpcoming />}
        />
        <Route path="/patient/dashboard/history" element={<PatientHistory />} />
        <Route path="/patient/dashboard/profile" element={<PatientProfile />} />

        {/* ---------------- DOCTOR ---------------- */}
        <Route path="/doctor/auth" element={<DoctorAuth />} />
        <Route path="/pending" element={<DoctorPending />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        {/* ---------------- ADMIN ---------------- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Profile Routes */}
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
