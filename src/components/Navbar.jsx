import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuthContext";
import { User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";

// ======================================================
// REUSABLE COMPONENTS (OUTSIDE NAVBAR)
// ======================================================

// --- Profile Dropdown ---
const ProfileDropdown = ({ user, dashboardPath, role, onLogout, onClose }) => (
  <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl border border-gray-100 py-3 origin-top-right z-50">
    <div className="px-4 pb-2 border-b border-gray-100 mb-2">
      <p className="text-sm text-slate-500 font-medium">Signed in as</p>
      <p className="text-lg text-slate-800 font-bold truncate">
        {user?.name || "User"}
      </p>
    </div>

    <Link
      to={dashboardPath}
      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-blue-50 transition"
      onClick={onClose}
    >
      <LayoutDashboard size={18} className="text-blue-500" />
      Go to Dashboard
    </Link>

    <Link
      to={`/${role}/profile`}
      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-blue-50 transition"
      onClick={onClose}
    >
      <User size={18} className="text-cyan-500" />
      View Profile
    </Link>

    <div className="pt-2 mt-2 border-t border-gray-100">
      <button
        onClick={onLogout}
        className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  </div>
);

// --- Mobile Navigation ---
const MobileNavLinks = ({ role, dashboardPath, onLogout, onClose }) => (
  <div className="flex flex-col gap-4 p-6 bg-white border-t border-gray-200 shadow-lg absolute top-full left-0 w-full z-40 md:hidden">
    {!role ? (
      <>
        <Link
          to="/doctor/auth"
          className="text-blue-700 font-semibold border border-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-center transition"
          onClick={onClose}
        >
          For Doctors
        </Link>

        <Link
          to="/patient/auth"
          className="px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-md hover:shadow-xl text-center transition"
          onClick={onClose}
        >
          Login / Sign Up
        </Link>
      </>
    ) : (
      <>
        <Link
          to={dashboardPath}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center shadow hover:bg-blue-700 transition"
          onClick={onClose}
        >
          Dashboard
        </Link>

        <Link
          to={`/${role}/profile`}
          className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg text-center hover:bg-slate-50 transition"
          onClick={onClose}
        >
          Profile
        </Link>

        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="w-full text-center px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
        >
          Logout
        </button>
      </>
    )}
  </div>
);

// ======================================================
// MAIN NAVBAR
// ======================================================

export default function Navbar() {
  const { role, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const dashboardPath =
    role === "patient"
      ? "/patient/dashboard"
      : role === "doctor"
      ? "/doctor/dashboard"
      : role === "admin"
      ? "/admin/dashboard"
      : "/";

  return (
    <nav className="w-full bg-white/95 backdrop-blur-lg border-b border-blue-100 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-extrabold tracking-wide">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500 drop-shadow-sm">
              MedVault
            </span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {!role ? (
            <>
              <Link
                to="/doctor/auth"
                className="text-blue-700 font-semibold border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
              >
                For Doctors
              </Link>

              <Link
                to="/patient/auth"
                className="px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-[0_4px_15px_rgba(6,182,212,0.4)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.6)] transition-all duration-300"
              >
                Login / Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to={dashboardPath}
                className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
              >
                Dashboard
              </Link>

              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold 
                             border-2 border-transparent hover:border-blue-400 transition"
                >
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </button>

                {open && (
                  <ProfileDropdown
                    user={user}
                    role={role}
                    dashboardPath={dashboardPath}
                    onLogout={handleLogout}
                    onClose={() => setOpen(false)}
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-700 hover:text-blue-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileNavLinks
          role={role}
          dashboardPath={dashboardPath}
          onLogout={handleLogout}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
