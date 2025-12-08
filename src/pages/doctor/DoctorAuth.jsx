import { useState } from "react";
import DOCTOR_IMAGE_URL from "../../assets/doctor.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";

// OTP Input component for the 5-block input
const OtpInput = ({ otp, setOtp }) => {
  const inputStyle =
    "w-10 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg bg-white/70 focus:border-blue-600 outline-none transition";

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last entered digit
    setOtp(newOtp);

    // Auto-focus to the next input
    if (value && index < 4) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Auto-focus to the previous input on backspace if the current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {[...Array(5)].map((_, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={inputStyle}
          required
        />
      ))}
    </div>
  );
};

export default function DoctorAuth() {
  const [current, setCurrent] = useState("login");
  const [message, setMessage] = useState("");
  const { setRole } = useAuth();
  const navigate = useNavigate();

  // State for the new OTP flow
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]); // 5 digits OTP

  // Updated Form fields for simple registration (only fullName and email used for now)
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "", // only used for login
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchForm = () => {
    setMessage("");
    setIsOtpSent(false); // Reset OTP state when switching
    setOtp(["", "", "", "", ""]);
    setForm({
      fullName: "",
      email: "",
      password: "",
    });
    setCurrent((prev) => (prev === "login" ? "register" : "login"));
  };

  const API_URL = "http://localhost:8080/doctor";

  // New handler for sending OTP
  const handleSendOtp = async () => {
    setMessage("");
    if (!form.fullName || !form.email) {
      return setMessage("Full Name and Email are required.");
    }

    try {
      // 1. Request OTP/validate email (server checks for duplicate email and sends OTP)
      const res = await fetch(`${API_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Includes duplicate email check
        setMessage(data.message || "Failed to send OTP.");
        return;
      }

      setMessage("OTP sent to your email. Please check your inbox.");
      setIsOtpSent(true);
    } catch (err) {
      setMessage("Server error during OTP request. Try again later.");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // -------------------- REGISTRATION (FINAL STEP) --------------------
      if (current === "register") {
        if (!isOtpSent) {
          return handleSendOtp(); // If button is clicked and OTP isn't sent, send it first
        }

        const otpString = otp.join("");
        if (otpString.length !== 5) {
          return setMessage("Please enter the 5-digit OTP.");
        }

        // 2. Validate OTP
        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: form.fullName,
            email: form.email,
            otp: otpString,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.message || "OTP validation failed or invalid data.");
          return;
        }

        // 3. Success -> Navigate to profile completion
        setMessage("Registration successful! Please complete your profile.");
        // Doctor is now registered but status is pending, we can navigate them to profile setup page.
        navigate("/doctor/profile-setup");
      }

      // ----------------------- LOGIN -----------------------
      else if (current === "login") {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) return setMessage(data.message || "Invalid login");

        // Revised Login Logic
        if (data.status === "PENDING") {
          localStorage.setItem("doctorToken", data.token);
          navigate("/pending"); // Redirect to /pending if status is PENDING
        } else {
          localStorage.setItem("doctorToken", data.token);
          setMessage("Login successful!");
          setRole("doctor");
          navigate("/doctor/dashboard"); // Redirect to /dashboard if status is APPROVED
        }
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
      console.error(err);
    }
  };

  // ---------------- UI STYLES ----------------
  const inputWrapper = "relative w-full";
  const inputStyle =
    "w-full px-4 py-3 peer border border-gray-300 rounded-xl bg-white/60 backdrop-blur-md " +
    "focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none transition font-medium";
  const labelStyle =
    "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all " +
    "peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 " +
    "peer-valid:top-2 peer-valid:text-xs peer-valid:text-blue-600";
  const primaryButtonStyle =
    "w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-teal-600 cursor-pointer text-white font-semibold " +
    "shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-blue-200 p-6 font-inter">
      <div className="flex flex-col lg:flex-row bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full border border-white/30">
        {/* LEFT IMAGE AREA */}
        <div className="lg:w-1/2 relative min-h-[520px]">
          <img
            src={DOCTOR_IMAGE_URL}
            alt="Doctor"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/80 to-teal-700/60 mix-blend-multiply"></div>

          <div className="absolute bottom-12 left-10 text-white space-y-3">
            <h1 className="text-4xl font-bold tracking-wide drop-shadow-lg">
              MediBook Professionals
            </h1>
            <p className="text-lg max-w-xs leading-relaxed opacity-90">
              Empowering healthcare professionals with seamless digital tools.
            </p>
          </div>
        </div>

        {/* RIGHT FORM AREA */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-10 text-center font-poppins">
            {current === "login"
              ? "Welcome Back"
              : "Create Your Doctor Account"}
          </h2>

          {message && (
            <p className="text-center text-red-600 font-semibold mb-4">
              {message}
            </p>
          )}

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* ---------------- REGISTRATION ---------------- */}
            {current === "register" && (
              <>
                <div className={inputWrapper}>
                  <input
                    className={inputStyle}
                    required
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    disabled={isOtpSent} // Disable after OTP is sent
                  />
                  <label className={labelStyle}>Full Name</label>
                </div>

                <div className={inputWrapper}>
                  <input
                    className={inputStyle}
                    type="email"
                    required
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={isOtpSent} // Disable after OTP is sent
                  />
                  <label className={labelStyle}>Email Address</label>
                </div>

                {!isOtpSent && (
                  <button
                    type="button" // Use type="button" to prevent form submission
                    className={primaryButtonStyle}
                    onClick={handleSendOtp}
                  >
                    Generate & Send OTP
                  </button>
                )}

                {isOtpSent && (
                  <>
                    <p className="text-center text-sm text-gray-600 -mt-2">
                      Enter the 5-digit code sent to{" "}
                      <strong>{form.email}</strong>
                    </p>
                    <OtpInput otp={otp} setOtp={setOtp} />

                    <button type="submit" className={primaryButtonStyle}>
                      Verify OTP and Register
                    </button>
                  </>
                )}
              </>
            )}

            {/* ---------------- LOGIN FIELDS ---------------- */}
            {current === "login" && (
              <>
                <div className={inputWrapper}>
                  <input
                    className={inputStyle}
                    type="email"
                    required
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <label className={labelStyle}>Email Address</label>
                </div>
                <div className={inputWrapper}>
                  <input
                    className={inputStyle}
                    type="password"
                    required
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <label className={labelStyle}>Password</label>
                </div>

                <a className="text-sm text-blue-600 hover:underline self-end font-medium -mt-2 mb-5 cursor-pointer">
                  Forgot Password?
                </a>
                <LoginFiller />

                <button type="submit" className={primaryButtonStyle}>
                  Login Securely
                </button>
              </>
            )}
          </form>

          <p className="mt-8 text-center text-gray-700">
            {current === "login" ? "New to MediBook?" : "Already registered?"}{" "}
            <button
              onClick={switchForm}
              className="text-blue-700 font-bold cursor-pointer hover:underline"
            >
              {current === "login" ? "Register Now" : "Login Here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------- LOGIN INFO SECTION (Unchanged) ----------------
function LoginFiller() {
  return (
    <div className="flex flex-col gap-4 grow">
      <p className="text-sm text-gray-500 text-center leading-relaxed">
        Manage appointments, patient records, prescriptions, and more —
        securely.
      </p>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 21a9 9 0 110-18h.01"
          />
        </svg>
        <p className="text-blue-700 text-sm font-medium">
          Your data is encrypted and protected at all levels.
        </p>
      </div>

      <div className="h-[5px]"></div>
    </div>
  );
}
