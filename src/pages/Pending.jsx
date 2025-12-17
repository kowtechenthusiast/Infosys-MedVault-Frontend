import { Clock, Hourglass, Mail } from "lucide-react"; // Importing relevant icons
import { Link } from "react-router-dom"; // Assuming you might use Link for navigation

export default function DoctorPending() {
  return (
    // Centered container with increased vertical padding
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-xl w-full p-10 bg-white rounded-3xl border border-blue-100 shadow-[0_15px_60px_-15px_rgba(40,100,150,0.15)] text-center space-y-6">
        {/* Verification Icon - Using the theme's gradient colors */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg">
            <Hourglass size={36} className="text-white animate-spin-slow" />
          </div>
        </div>

        {/* Main Heading - Elevated Typography */}
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Verification <span className="text-orange-500">In Progress</span>
        </h2>

        {/* Status Message */}
        <p className="mt-3 text-lg text-slate-600 max-w-md mx-auto">
          Thank you for submitting your credentials. Your account is currently
          under review by the administrator.
        </p>

        {/* Estimated Wait Time / Next Steps Card */}
        <div className="p-5 bg-amber-50 rounded-xl border border-amber-200 text-left space-y-3">
          <div className="flex items-center gap-3 font-semibold text-amber-700">
            <Clock size={20} />
            Estimated Review Time
          </div>
          <p className="text-slate-700 text-sm">
            Verification typically takes <strong>24 to 48 hours</strong>. You
            will receive an email notification as soon as your profile is
            approved.
          </p>
        </div>

        {/* Contact Support Link */}
        <Link
          to="/support" // Placeholder link for support
          className="inline-flex items-center gap-2 mt-4 px-6 py-3 text-md font-semibold text-blue-700 rounded-full border border-blue-300 hover:bg-blue-50 transition-colors"
        >
          <Mail size={18} />
          Contact Support Team
        </Link>
      </div>
    </div>
  );
}
