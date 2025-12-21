import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuthContext";
import { User, LogOut, LayoutDashboard, Menu, X, LogIn } from "lucide-react";

/* ======================================================
   PROFILE DROPDOWN
====================================================== */
const ProfileDropdown = ({ user, dashboardPath, role, onLogout, onClose }) => (
  <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl border border-gray-100 py-3 z-50">
    <div className="px-4 pb-2 border-b border-gray-100 mb-2">
      <p className="text-sm text-slate-500">Signed in as</p>
      <p className="text-lg font-semibold text-slate-800 truncate">
        {user?.name || "User"}
      </p>
    </div>

    <Link
      to={dashboardPath}
      className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 transition"
      onClick={onClose}
    >
      <LayoutDashboard size={18} className="text-blue-500" />
      Dashboard
    </Link>

    <Link
      to={`/${role}/profile`}
      className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 transition"
      onClick={onClose}
    >
      <User size={18} className="text-cyan-500" />
      Profile
    </Link>

    <div className="mt-2 border-t border-gray-100 pt-2">
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  </div>
);

/* ======================================================
   MOBILE MENU
====================================================== */
const MobileNavLinks = ({ role, dashboardPath, onLogout, onClose }) => (
  <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg z-40 p-6 space-y-4">
    {!role ? (
      <Link
        to="/auth"
        onClick={onClose}
        className="flex items-center justify-center gap-2 px-6 py-3 
                   bg-linear-to-r from-blue-600 to-cyan-500 text-white 
                   rounded-xl font-semibold shadow-md hover:shadow-xl transition"
      >
        <LogIn size={18} />
        Login / Sign Up
      </Link>
    ) : (
      <>
        <Link
          to={dashboardPath}
          onClick={onClose}
          className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Dashboard
        </Link>

        <Link
          to={`/${role}/profile`}
          onClick={onClose}
          className="block text-center px-4 py-2 border rounded-lg"
        >
          Profile
        </Link>

        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="w-full px-4 py-2 text-red-600 border border-red-300 rounded-lg"
        >
          Logout
        </button>
      </>
    )}
  </div>
);

/* ======================================================
   MAIN NAVBAR
====================================================== */
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
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-extrabold tracking-wide">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
              MedVault
            </span>
          </h1>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {!role ? (
            <Link
              to="/auth"
              className="flex items-center gap-2 px-6 py-2.5 
                         bg-linear-to-r from-blue-600 to-cyan-500 
                         text-white font-semibold rounded-xl 
                         shadow-md hover:shadow-xl transition"
            >
              <LogIn size={18} />
              Login / Sign Up
            </Link>
          ) : (
            <>
              <Link
                to={dashboardPath}
                className="px-4 py-2 rounded-lg bg-linear-to-r 
                           from-blue-600 to-cyan-500 text-white font-semibold"
              >
                Dashboard
              </Link>

              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full bg-blue-100 
                             flex items-center justify-center text-blue-700 font-bold"
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

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

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
