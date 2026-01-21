import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Patient
import PatientAuth from "./pages/patient/PatientAuth";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientOverview from "./pages/patient/PatientOverview";
import BookAppointment from "./pages/patient/BookAppointment";
import PatientHistory from "./pages/patient/PatientHistory";
import PatientProfile from "./pages/patient/PatientProfile";
import MedicalRecordAccessRequests from "./pages/patient/MedicalRecordAccessRequests";
// Doctor
import DoctorAuth from "./pages/doctor/DoctorAuth";
import Pending from "./pages/Pending";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorOverview from "./pages/doctor/DoctorOverview";
import SlotManager from "./pages/doctor/SlotManager";
import AppointmentHistory from "./pages/doctor/AppointmentHistory";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import AdminProfile from "./pages/admin/AdminProfile";
import SetPassword from "./pages/SetPassword";
import AuthRoleSelect from "./components/AuthRoleSelect";
import MyAppointments from "./pages/doctor/MyAppointments";
import BookingRequests from "./pages/doctor/BookingRequests";
import PatientAppointment from "./pages/patient/PatientAppointment";
import EmergencyRequests from "./pages/doctor/EmergencyRequests";
import EmergencyRequestPatient from "./pages/patient/EmergencyRequestPatient";
import { ToastContainer } from "react-toastify";
import DoctorReview from "./pages/doctor/DoctorReview";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthRoleSelect />} />

        {/* ---------------- PATIENT ---------------- */}
        <Route path="/patient/auth" element={<PatientAuth />} />

        {/* Main Dashboard Wrapper */}
        <Route path="/patient/dashboard" element={<PatientDashboard />}>
          <Route index element={<PatientOverview />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="appointments" element={<PatientAppointment />} />
          <Route path="history" element={<PatientHistory />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route
            path="access-requests"
            element={<MedicalRecordAccessRequests />}
          />
          <Route
            path="emergency-requests"
            element={<EmergencyRequestPatient />}
          />
        </Route>

        <Route path="/patient/pending" element={<Pending />} />
        <Route path="/patient/set-password" element={<SetPassword />} />

        {/* ---------------- DOCTOR ---------------- */}
        <Route path="/doctor/auth" element={<DoctorAuth />} />
        <Route path="/doctor/pending" element={<Pending />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />}>
          <Route index element={<DoctorOverview />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="slots" element={<SlotManager />} />
          <Route path="history" element={<AppointmentHistory />} />
          <Route path="booking-requests" element={<BookingRequests />} />
          <Route path="emergency-requests" element={<EmergencyRequests />} />
          <Route path="reviews" element={<DoctorReview />} />
        </Route>

        <Route path="/doctor/set-password" element={<SetPassword />} />

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
