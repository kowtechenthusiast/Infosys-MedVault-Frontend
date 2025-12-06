import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuthContext";

export default function Navbar() {
  const { role, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
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
      : null;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-wide">
            MediBook
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          {!role && (
            <>
              {/* Doctor Portal */}
              <Link
                to="/doctor/auth"
                className="text-blue-700 font-semibold border border-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
              >
                For Doctors
              </Link>

              {/* Patient Login */}
              <Link
                to="/patient/auth"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Login / Sign Up
              </Link>

              {/* Admin */}
              <Link
                to="/admin/login"
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Admin Login
              </Link>
            </>
          )}

          {/* If logged in — show dashboard + profile */}
          {role && (
            <div className="flex items-center gap-4">
              <Link
                to={dashboardPath}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold"
                >
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl border border-gray-100 py-2">
                    <p className="px-4 py-2 text-gray-700 font-semibold">
                      {user?.name}
                    </p>
                    <Link
                      to={`/${role}/profile`}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
