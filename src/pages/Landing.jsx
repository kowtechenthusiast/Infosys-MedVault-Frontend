import { Link } from "react-router-dom";
import { FaCalendarCheck, FaNotesMedical, FaUserMd } from "react-icons/fa";
import Footer from "../components/Footer";

// Note: Ensure heroImg is a high-quality, modern, professional medical illustration.
import heroImg from "../assets/hero.jpg";

export default function Landing() {
  return (
    <>
      {/* 🏥 Hero Section - Refined & Professional */}
      <section className="min-h-[85vh] bg-linear-to-br from-white via-blue-50/50 to-cyan-50/50 pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-slate-800 leading-snug md:text-6xl">
              Precision Healthcare,
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-cyan-600 drop-shadow-sm block lg:inline">
                {" "}
                Digitally Managed.
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-lg">
              Securely manage appointments, health records, and communication
              with trusted specialists in one integrated platform.
            </p>

            {/* Main CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/patient/auth"
                className="inline-block px-8 py-3 text-lg font-semibold bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-lg 
                           shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]"
              >
                Book Appointment Now
              </Link>
              <Link
                to="/doctor/auth"
                className="inline-block px-8 py-3 text-lg font-semibold border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition duration-300"
              >
                For Medical Professionals
              </Link>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg h-[400px] rounded-2xl shadow-xl overflow-hidden bg-white border border-slate-200">
              <img
                src={heroImg}
                alt="Digital Health Management Illustration"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Features Section - Elevated Cards (Reduced padding) */}
      <section className="py-16 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">
              Platform Advantages
            </h2>
            <p className="mt-3 text-md text-slate-500">
              Core features driving better patient and provider outcomes.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Easy Booking */}
            <div className="text-center p-8 bg-slate-50 rounded-xl shadow-sm border border-gray-100 border-t-4 hover:shadow-md transition duration-300">
              <FaCalendarCheck className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-slate-800">
                Real-Time Booking
              </h3>
              <p className="mt-2 text-slate-500 text-sm">
                Find and secure your next appointment instantly with real-time
                specialist availability.
              </p>
            </div>

            {/* Feature 2: Secure Records */}
            <div className="text-center p-8 bg-slate-50 rounded-xl shadow-sm border border-gray-100 border-t-4 hover:shadow-md transition duration-300">
              <FaNotesMedical className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-slate-800">
                Secure Records Hub
              </h3>
              <p className="mt-2 text-slate-500 text-sm">
                Centralized, encrypted access to medical history, prescriptions,
                and reports (HIPAA compliant).
              </p>
            </div>

            {/* Feature 3: Verified Doctors */}
            <div className="text-center p-8 bg-slate-50 rounded-xl shadow-sm border border-gray-100 border-t-4 hover:shadow-md transition duration-300">
              <FaUserMd className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-slate-800">
                Vetted Professionals
              </h3>
              <p className="mt-2 text-slate-500 text-sm">
                Connect only with licensed, highly-rated doctors and verified
                healthcare institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 💡 Final CTA Section - Gradient Banner (Reduced Padding) */}
      <section className="py-16 bg-linear-to-r from-blue-700 to-cyan-600">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            Ready to Begin Your Digital Health Journey?
          </h2>
          <p className="mt-3 text-lg text-blue-100">
            Secure, simple, and modern healthcare management starts now.
          </p>
          <Link
            to="/patient/auth"
            className="mt-8 inline-block px-10 py-3 text-lg font-bold bg-white text-blue-700 rounded-lg shadow-xl hover:bg-gray-100 transition duration-300 transform hover:scale-[1.03]"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
