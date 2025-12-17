import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  AtSign,
  CheckCircle,
  AlertTriangle,
  UserPlus,
  LogIn,
  Mail, // New icon for OTP send phase
} from "lucide-react";
import { useAuth } from "../../context/useAuthContext";

// --- Floating Input Component ---
const FloatingInput = ({
  label,
  type,
  value,
  onChange,
  Icon,
  name,
  disabled = false,
}) => (
  <div className="relative w-full">
    <input
      type={type}
      required
      value={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
      className="w-full pl-12 pr-4 pb-3 pt-4 bg-gray-50 border border-gray-300 rounded-xl
      peer focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200
      disabled:bg-gray-200 disabled:cursor-not-allowed"
    />

    {Icon && (
      <Icon
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-blue-600 transition duration-200"
      />
    )}

    {/* Dynamic Label Positioning based on peer-focus/peer-valid */}
    <label
      className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 text-base transition-all duration-200
      peer-focus:top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:left-4
      peer-valid:top-3 peer-valid:text-xs peer-valid:text-blue-600 pointer-events-none bg-gray-50 px-1"
    >
      {label}
    </label>
  </div>
);

// --- OTP Input Component (5 Digits) ---
const OtpInput = ({ otp, handleOtpChange }) => (
  <div className="flex justify-center gap-3 mt-2">
    {[0, 1, 2, 3, 4].map((index) => (
      <input
        key={index}
        maxLength={1}
        type="text"
        inputMode="numeric"
        value={otp[index]}
        onChange={(e) => handleOtpChange(e.target.value, index)}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
          }
        }}
        id={`otp-${index}`}
        className="w-12 h-14 text-center text-xl font-bold border-2 rounded-xl text-gray-800
          focus:border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none transition duration-200 bg-white"
        required
      />
    ))}
  </div>
);

// --- Main Component ---
export default function AdminAuth() {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [step, setStep] = useState(1); // 1: Initial Form, 2: OTP Verification

  const [form, setForm] = useState({
    email: "",
    password: "", // Used for both registration (initial password) and login
    fullName: "",
  });

  const [isOtpSent, setIsOtpSent] = useState(false); // New state for registration flow
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  const { setRole } = useAuth();
  const navigate = useNavigate();

  const API_URL = "http://localhost:8080";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setMessage("");
    setMode(mode === "login" ? "register" : "login");
    setStep(1);
    setIsOtpSent(false); // Reset registration flow
    setOtp(["", "", "", "", ""]);
    setForm({ email: "", password: "", fullName: "" });
  };

  /* ------------------ HANDLE REGISTRATION FLOW ------------------ */

  const handleSendOtp = async (e) => {
    e.preventDefault(); // Prevents form submission during OTP send phase
    setLoading(true);
    setMessage("");

    if (!form.fullName || !form.email || !form.password) {
      setMessageType("error");
      setMessage("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      // 1. Request OTP/validate email
      const res = await fetch(`${API_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessageType("error");
        setMessage(
          data.message || "Failed to send OTP. Email may be registered."
        );
        return;
      }

      setMessageType("success");
      setMessage("OTP sent to your email. Please check your inbox.");
      setIsOtpSent(true);
      setStep(2); // Move to OTP verification step
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Server error during OTP request. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const fullOtp = otp.join("");
    if (fullOtp.length !== 5) {
      setMessageType("error");
      setMessage("Please enter the complete 5-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      // 2. Validate OTP and Complete Registration
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          otp: fullOtp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessageType("error");
        setMessage(
          data.message || "OTP validation failed or registration failed."
        );
        setOtp(["", "", "", "", ""]);
        return;
      }

      // Success -> Navigate to pending/success page
      setMessageType("success");
      setMessage("Registration successful! Waiting for Admin approval...");

      // Store token (if provided, usually for PENDING status access)
      if (data.token) localStorage.setItem("adminToken", data.token);

      navigate("/pending"); // Redirect to a waiting page
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ HANDLE LOGIN FLOW ------------------ */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessageType("error");
        setMessage(
          data.error ||
            "Invalid email, password, or account is pending approval."
        );
        return;
      }

      // Login Success: Check status and redirect
      localStorage.setItem("adminToken", data.token);
      setRole("admin");

      setMessageType("success");
      setMessage("Login Successful! Redirecting...");

      if (data.status === "PENDING") {
        navigate("/pending");
      } else {
        // Assuming status is ACTIVE/APPROVED
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* --------------- HANDLE OTP FIELD CHANGES --------------- */
  const handleOtpChange = (value, index) => {
    const updated = [...otp];
    if (!/^\d*$/.test(value)) return;

    updated[index] = value.slice(-1);
    setOtp(updated);

    if (value.length === 1 && index < 4) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const isLoginMode = mode === "login";
  // const HeaderIcon = isLoginMode ? LogIn : UserPlus;
  const headerText = isLoginMode ? "Admin Login" : "Admin Account Registration";

  // --- Visual Styles ---
  const buttonStyle =
    "w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold cursor-pointer rounded-xl shadow-lg " +
    "hover:shadow-xl transition transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blue-200 p-10 transform transition-all duration-500 ease-in-out">
        <h2 className="text-3xl font-extrabold text-center text-blue-900 tracking-tight mb-8">
          {/* <HeaderIcon size={32} className="inline mr-3 text-blue-600" /> */}
          {headerText}
        </h2>

        {/* MESSAGE BOX */}
        {message && (
          <div
            className={`p-3 rounded-xl mb-6 flex items-center gap-3 ${
              messageType === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : messageType === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-yellow-100 text-yellow-700 border border-yellow-300"
            } transition duration-300`}
          >
            {messageType === "error" ? (
              <AlertTriangle size={20} />
            ) : (
              <CheckCircle size={20} />
            )}
            <p className="font-medium text-sm">{message}</p>
          </div>
        )}

        {/* ---------------------- LOGIN FLOW (STEP 1 ONLY) ---------------------- */}
        {isLoginMode && (
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <FloatingInput
              label="Admin Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              Icon={AtSign}
            />

            <FloatingInput
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              Icon={Lock}
            />

            <button className={buttonStyle} disabled={loading}>
              {loading ? "Logging In..." : "Secure Login"}
            </button>
          </form>
        )}

        {/* ---------------------- REGISTRATION FLOW ---------------------- */}
        {!isLoginMode && step === 1 && (
          <form className="flex flex-col gap-6" onSubmit={handleSendOtp}>
            <FloatingInput
              label="Full Name"
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              Icon={UserPlus}
            />
            <FloatingInput
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              Icon={AtSign}
            />
            <FloatingInput
              label="Choose Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              Icon={Lock}
            />
            <button className={buttonStyle} disabled={loading}>
              <Mail size={20} className="inline mr-2" />
              {loading ? "Sending OTP..." : "Send Verification OTP"}
            </button>
          </form>
        )}

        {/* ---------------------- REGISTRATION STEP 2: OTP ---------------------- */}
        {!isLoginMode && step === 2 && isOtpSent && (
          <form className="flex flex-col gap-6" onSubmit={handleRegister}>
            <p className="text-gray-600 text-center text-sm">
              Enter the 5-digit code sent to
              <span className="font-semibold text-slate-800">
                {" "}
                {form.email}
              </span>
              .
            </p>

            <OtpInput otp={otp} handleOtpChange={handleOtpChange} />

            <button
              className={buttonStyle}
              disabled={loading || otp.join("").length !== 5}
            >
              <CheckCircle size={20} className="inline mr-2" />
              {loading ? "Registering..." : "Verify & Register"}
            </button>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium text-center cursor-pointer transition duration-200"
              onClick={() => {
                setStep(1);
                setIsOtpSent(false);
                setMessage("");
                setOtp(["", "", "", "", ""]);
              }}
            >
              ← Back to Details
            </button>
          </form>
        )}

        {/* ---------------------- SWITCH MODE ---------------------- */}
        <p className="mt-8 text-center text-gray-600 text-sm">
          {isLoginMode ? "Need an account?" : "Already registered?"}{" "}
          <button
            onClick={switchMode}
            className="font-bold text-blue-600 hover:text-blue-800 cursor-pointer hover:underline transition duration-200"
          >
            {isLoginMode ? "Register Now" : "Log In Here"}
          </button>
        </p>
      </div>
    </div>
  );
}
