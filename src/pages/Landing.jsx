import { FaCalendarCheck, FaNotesMedical, FaUserMd } from "react-icons/fa"; // Importing icons
import heroImg from "../assets/hero.jpg"; // Placeholder image path
export default function Landing() {
  return (
    <>
      {/* 🏥 Hero Section - Modern & Engaging */}
      <section className="min-h-[90vh] bg-white pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-6xl font-extrabold text-blue-900 leading-tight">
              Your Health, <span className="text-blue-600">Simplified.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Effortlessly book hospital appointments and securely manage all
              your health records in one place.
            </p>

            {/* Main CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/patient/auth"
                className="inline-block px-8 py-4 text-lg font-semibold bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
              >
                Book Your First Appointment
              </a>
              <a
                href="/doctor/auth"
                className="inline-block px-8 py-4 text-lg font-semibold border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition duration-300"
              >
                Are you a Doctor?
              </a>
            </div>
          </div>

          {/* Image/Illustration */}
          {/* Image / Illustration */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg h-96 rounded-2xl shadow-2xl overflow-hidden bg-white">
              <img
                src={heroImg}
                alt="Medical Appointment Illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Features Section - Clarity and Trust */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-800">
              Why Choose Our Platform?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Key features designed to make your healthcare journey seamless and
              secure.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1: Easy Booking */}
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <FaCalendarCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800">
                Instant Appointments
              </h3>
              <p className="mt-2 text-gray-500">
                Find and book appointments with verified specialists in seconds,
                24/7.
              </p>
            </div>

            {/* Feature 2: Secure Records */}
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <FaNotesMedical className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800">
                Secure Health Records
              </h3>
              <p className="mt-2 text-gray-500">
                Access your medical history, prescriptions, and reports securely
                anytime, anywhere.
              </p>
            </div>

            {/* Feature 3: Verified Doctors */}
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <FaUserMd className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800">
                Trusted Professionals
              </h3>
              <p className="mt-2 text-gray-500">
                Connect with highly-rated and licensed doctors and hospitals in
                your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 💡 Final CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to Take Control of Your Health?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of users who are simplifying their healthcare
            management today.
          </p>
          <a
            href="/patient/auth"
            className="mt-8 inline-block px-10 py-4 text-lg font-bold bg-white text-blue-600 rounded-full shadow-xl hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            Create Your Free Account
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}
