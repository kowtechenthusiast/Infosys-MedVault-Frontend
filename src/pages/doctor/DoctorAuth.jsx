import { useState } from "react";
import DOCTOR_IMAGE_URL from "../../assets/doctor.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";

/* ---------------- OTP INPUT ---------------- */
const OtpInput = ({ otp, setOtp }) => {
  const inputStyle =
    "w-10 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg bg-white/70 focus:border-blue-600 outline-none transition";

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 4) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
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

/* ---------------- FLOATING INPUT ---------------- */
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
        className="w-full px-4 pb-3 pt-4 border border-gray-300 rounded-xl 
          bg-white/60 backdrop-blur-md placeholder-transparent
          peer focus:border-blue-600 focus:ring-2 focus:ring-blue-300
          outline-none transition font-medium
          disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      <label
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none
          transition-all 
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600
          peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-blue-600"
      >
        {label}
      </label>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function DoctorAuth() {
  const [current, setCurrent] = useState("login");
  const [message, setMessage] = useState("");
  const { setRole, setName } = useAuth();
  const navigate = useNavigate();

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const API_URL = "http://localhost:8080/api/auth";

  const switchForm = () => {
    setMessage("");
    setIsOtpSent(false);
    setOtp(["", "", "", "", ""]);
    setForm({ fullName: "", email: "", password: "" });
    setCurrent((p) => (p === "login" ? "register" : "login"));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ---------------- SEND OTP ---------------- */
  const handleSendOtp = async () => {
    setMessage("");
    if (!form.fullName || !form.email)
      return setMessage("Full Name and Email are required.");

    try {
      const res = await fetch(`${API_URL}/generate-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          role: "doctor",
        }),
      });

      const data = await res.json();
      if (!res.ok) return setMessage(data.message || "Failed to send OTP.");

      setMessage("OTP sent to your email.");
      setIsOtpSent(true);
    } catch {
      setMessage("Server error. Try again later.");
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      /* -------- REGISTER -------- */
      if (current === "register") {
        if (!isOtpSent) return handleSendOtp();

        const otpString = otp.join("");
        if (otpString.length !== 5)
          return setMessage("Please enter the 5-digit OTP.");

        const res = await fetch(`${API_URL}/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            otp: otpString,
            role: "doctor",
          }),
        });

        const data = await res.json();
        if (!res.ok)
          return setMessage(data.message || "OTP verification failed.");

        navigate("/doctor/set-password", {
          state: {
            fullName: form.fullName,
            email: form.email,
            role: "doctor",
          },
        });
      } else {
        /* -------- LOGIN -------- */
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

        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", "doctor");
        localStorage.setItem("doctorToken", data.token);
        setRole("doctor");
        setName(data.name);

        if (data.status === "PENDING") {
          navigate("/doctor/pending"); // Redirect to /pending if status is PENDING
        } else {
          setMessage("Login Successful!");
          navigate("/doctor/dashboard"); // Redirect to /dashboard if status is APPROVED/ACTIVE
        }
      }
    } catch {
      setMessage("Server error. Try again later.");
    }
  };

  const primaryButton =
    "w-full py-3 bg-gradient-to-r from-blue-700 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-blue-200 p-6">
      <div className="flex flex-col lg:flex-row bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full">
        {/* IMAGE */}
        <div className="lg:w-1/2 relative">
          <img src={DOCTOR_IMAGE_URL} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/80 to-teal-700/60" />
        </div>

        {/* FORM */}
        <div className="lg:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-blue-800 text-center mb-6">
            {current === "login" ? "Doctor Login" : "Verify Your Email"}
          </h2>

          {message && (
            <p className="text-center text-red-600 font-medium mb-3">
              {message}
            </p>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {current === "register" && (
              <>
                <FloatingInput
                  name="fullName"
                  label="Full Name"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  disabled={isOtpSent}
                />
                <FloatingInput
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  disabled={isOtpSent}
                />

                {!isOtpSent ? (
                  <button
                    type="button"
                    className={primaryButton}
                    onClick={handleSendOtp}
                  >
                    Generate & Send OTP
                  </button>
                ) : (
                  <>
                    <OtpInput otp={otp} setOtp={setOtp} />
                    <button type="submit" className={primaryButton}>
                      Verify OTP & Continue
                    </button>
                  </>
                )}
              </>
            )}

            {current === "login" && (
              <>
                <FloatingInput
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
                <FloatingInput
                  name="password"
                  label="Password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
                <button type="submit" className={primaryButton}>
                  Login Securely
                </button>
              </>
            )}
          </form>

          <p className="mt-4 text-center">
            {current === "login" ? "New doctor?" : "Already registered?"}{" "}
            <button
              onClick={switchForm}
              className="font-bold text-blue-600 hover:underline"
            >
              {current === "login" ? "Register Now" : "Login Here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
