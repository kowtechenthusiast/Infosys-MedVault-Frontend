import { useNavigate } from "react-router-dom";
import { Stethoscope, User, ArrowRight } from "lucide-react";
import Footer from "./Footer";

export default function AuthRoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-cyan-50 px-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-800 mb-3">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
                MedVault
              </span>
            </h1>
            <p className="text-slate-600 text-lg">
              Choose how you want to continue
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Patient Card */}
            <RoleCard
              title="I am a Patient"
              description="Book appointments, manage records, and track your health securely."
              icon={<User size={40} />}
              accent="blue"
              onClick={() => navigate("/patient/auth")}
            />

            {/* Doctor Card */}
            <RoleCard
              title="I am a Doctor"
              description="Manage appointments, patients, availability, and consultations."
              icon={<Stethoscope size={40} />}
              accent="cyan"
              onClick={() => navigate("/doctor/auth")}
            />
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-12">
            You can change your role only by creating a new account
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ======================================================
   ROLE CARD
====================================================== */
function RoleCard({ title, description, icon, accent, onClick }) {
  const accentStyles =
    accent === "blue"
      ? "from-blue-600 to-blue-500 group-hover:shadow-blue-200"
      : "from-cyan-600 to-cyan-500 group-hover:shadow-cyan-200";

  return (
    <button
      onClick={onClick}
      className="group text-left w-full bg-white rounded-2xl p-8 
                 border border-gray-100 shadow-md 
                 hover:shadow-2xl transition-all duration-300
                 hover:-translate-y-1"
    >
      <div
        className={`w-14 h-14 rounded-xl bg-linear-to-r ${accentStyles}
                    flex items-center justify-center text-white mb-6`}
      >
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-3">{title}</h2>

      <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>

      <div className="flex items-center gap-2 text-slate-700 font-semibold group-hover:text-blue-600 transition">
        Continue
        <ArrowRight size={18} />
      </div>
    </button>
  );
}
