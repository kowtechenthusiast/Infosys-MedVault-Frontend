import { useState } from "react";
import patientImageUrl from "../../assets/patient.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";

// --- NEW OTP Input component for the 5-block input ---
const OtpInput = ({ otp, setOtp }) => {
  const inputStyle =
    "w-10 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg bg-white/70 focus:border-purple-600 outline-none transition";

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
// ------------------------------------------------------

// Floating Input Component (Unchanged)
function FloatingInput({
  name,
  label,
  type,
  value,
  onChange,
  required = false,
  disabled = false,
}) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder=" "
        className="w-full px-4 pb-3 pt-4 font-mono text-l border border-gray-300 rounded-xl 
          bg-white/60 backdrop-blur-md placeholder-transparent
          peer focus:border-purple-600 focus:ring-2 focus:ring-purple-300
          outline-none transition font-medium
          disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      <label
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none
          transition-all 
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600
          peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-purple-600"
      >
        {label}
      </label>
    </div>
  );
}

// LoginHelper Component (Unchanged)
function LoginHelper() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex items-center justify-center p-3 rounded-xl bg-purple-50 border border-purple-200 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-purple-600 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-purple-700 text-xs font-medium">
          View prescriptions, reports & visit summaries instantly.
        </p>
      </div>

      <a
        href="#"
        className="text-sm text-purple-600 hover:text-purple-800 hover:underline self-end font-medium -mt-2"
      >
        Forgot Password?
      </a>
      <div className="h-[5px]"></div>
    </div>
  );
}

export default function PatientAuth() {
  const [current, setCurrent] = useState("login");
  const [message, setMessage] = useState("");
  const { setRole } = useAuth();
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();

  // --- New OTP states ---
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]); // 5 digits OTP

  // User state updated to only include fields needed for registration/login
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "", // Only used for login
  });

  const switchForm = () => {
    setMessage("");
    setIsOtpSent(false); // Reset OTP state
    setOtp(["", "", "", "", ""]);
    setUser({
      fullName: "",
      email: "",
      password: "",
    });

    setCurrent((prev) => (prev === "login" ? "register" : "login"));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const API_URL = "http://localhost:8080/api/auth";

  // New handler for sending OTP
  const handleSendOtp = async () => {
    setMessage("");
    if (!user.fullName || !user.email) {
      return setMessage("Full Name and Email are required.");
    }

    try {
      // 1. Request OTP/validate email (server checks for duplicate email and sends OTP)
      const res = await fetch(`${API_URL}/generate-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.fullName,
          email: user.email,
          role: "patient",
        }),
      });

      const data = await res.json();
      setUserId(data.userId); // Store userId for OTP verification
      // Store email for future reference

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

        // 2. Validate OTP and Complete Registration
        const res = await fetch(`${API_URL}/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            role: "patient",
            otp: otpString,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(
            data.message || "OTP validation failed or registration failed."
          );
          return;
        }

        // 3. Success -> Navigate to pending/success page
        setMessage(
          "Registration successful! Your temporary password will be emailed."
        );
        localStorage.setItem("patientId", data.userId); // Store temporarily for pending checks
        localStorage.setItem("role", "patient");
        setRole("patient");
        navigate("/pending"); // Navigates to a waiting page (e.g., waiting for password email/approval)
      }

      // ----------------------- LOGIN -----------------------
      else if (current === "login") {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) return setMessage(data.message || "Invalid login");

        // Revised Login Logic
        // Assuming the patient login response also has a 'status' or similar field
        // to handle the post-registration state (e.g., waiting for password)
        if (data.status === "PENDING") {
          localStorage.setItem("patientToken", data.token); // Store token for future checks
          navigate("/pending"); // Redirect to /pending if status is PENDING
        } else {
          localStorage.setItem("patientToken", data.token);
          setMessage("Login Successful!");
          setRole("patient");
          navigate("/patient/dashboard"); // Redirect to /dashboard if status is APPROVED/ACTIVE
        }
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
      console.error(err);
    }
  };

  const primaryButton =
    "w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold cursor-pointer rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-100 to-pink-100 p-6 font-inter">
      <div className="flex flex-col lg:flex-row bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full border border-white/30">
        {/* LEFT IMAGE */}
        <div className="lg:w-1/2 relative min-h-[280px] lg:min-h-full">
          <img
            src={patientImageUrl}
            alt="Patient"
            className="absolute inset-0 w-full h-full object-cover p-10"
          />
          <div className="absolute inset-0 bg-linear-to-br from-purple-800/70 to-pink-500/60 mix-blend-multiply"></div>

          <div className="absolute bottom-10 left-8 text-white max-w-xs">
            <h3 className="text-3xl font-bold drop-shadow-lg leading-snug">
              {current === "login" ? "Welcome Back" : "Begin Your Care Journey"}
            </h3>
            <p className="text-sm opacity-90 mt-2 leading-relaxed">
              {current === "login"
                ? "Access your medical history, medications, and appointments anytime."
                : "Register now and stay connected with your healthcare provider easily."}
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center min-h-[550px]">
          <h2 className="text-4xl font-extrabold text-purple-800 mb-8 text-center font-poppins">
            {current === "login" ? "Patient Login" : "Verify Your Email"}
          </h2>

          {message && (
            <p className="text-center text-red-600 font-medium mb-3">
              {message}
            </p>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* ---------------- REGISTRATION FIELDS ---------------- */}
            {current === "register" && (
              <>
                <FloatingInput
                  name="fullName"
                  label="Full Name"
                  type="text"
                  required
                  value={user.fullName}
                  onChange={handleChange}
                  disabled={isOtpSent} // Disabled after OTP is sent
                />
                {/* Phone removed as per doctor component change to Name & Email only */}
                <FloatingInput
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  value={user.email}
                  onChange={handleChange}
                  disabled={isOtpSent} // Disabled after OTP is sent
                />
                {!isOtpSent && (
                  <button
                    type="button" // Use type="button" to prevent form submission
                    className={primaryButton}
                    onClick={handleSendOtp}
                  >
                    Generate & Send OTP
                  </button>
                )}
                {isOtpSent && (
                  <>
                    <p className="text-center text-sm text-gray-600 -mt-2">
                      Enter the 5-digit code sent to{" "}
                      <strong>{user.email}</strong>
                    </p>
                    <OtpInput otp={otp} setOtp={setOtp} />

                    <button type="submit" className={primaryButton}>
                      Verify OTP and Register
                    </button>
                  </>
                )}
                <div className="h-[40px]"></div> {/* height adjustment */}
              </>
            )}

            {/* ---------------- LOGIN FIELDS ---------------- */}
            {current === "login" && (
              <>
                <FloatingInput
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  value={user.email}
                  onChange={handleChange}
                />
                <FloatingInput
                  name="password"
                  label="Password"
                  type="password"
                  required
                  value={user.password}
                  onChange={handleChange}
                />
                <LoginHelper />
                <button type="submit" className={primaryButton}>
                  Login Securely
                </button>
              </>
            )}
          </form>

          <p className="mt-3 text-center text-gray-700">
            {current === "login"
              ? "New to our portal?"
              : "Already have an account?"}{" "}
            <button
              onClick={switchForm}
              className="font-bold text-purple-600 hover:text-purple-800 cursor-pointer hover:underline transition"
            >
              {current === "login" ? "Register Now" : "Login Here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
