import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, AtSign, CheckCircle, AlertTriangle } from "lucide-react"; // Imported icons for better context

export default function AdminLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("admin@example.com"); // Pre-filled for demo
  const [password, setPassword] = useState("password123"); // Pre-filled for demo
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // 'error', 'success'
  const navigate = useNavigate();

  /* ------------------ HANDLE LOGIN ------------------ */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Simulate API call success/failure
    const isLoginSuccessful =
      email === "admin@example.com" && password === "password123";

    try {
      if (!isLoginSuccessful) {
        setMessageType("error");
        setMessage("Invalid credentials. Please try again.");
        return;
      }

      // Simulating API call to send OTP
      setTimeout(() => {
        setMessageType("success");
        setMessage(
          "✅ Authentication successful. Please check your email for the 5-digit OTP."
        );
        setStep(2);
      }, 1000);
    } catch (err) {
      console.error("Error:", err);
      setMessageType("error");
      setMessage("Server error. Try again.");
    } finally {
      // In real code, setLoading(false) should happen inside the setTimeout or after a successful network response
      setTimeout(() => setLoading(false), 1000);
    }
  };

  /* ------------------ HANDLE OTP VERIFY ------------------ */
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const fullOtp = otp.join("");
    // Simulate API call for OTP verification
    const isOtpValid = fullOtp === "12345"; // Mock OTP

    try {
      if (!isOtpValid) {
        setMessageType("error");
        setMessage("❌ Invalid OTP. Please try again.");
        return;
      }

      // Simulating successful verification
      setTimeout(() => {
        setMessageType("success");
        setMessage("🎉 OTP Verified Successfully! Redirecting...");
        // Redirect admin dashboard
        navigate("/admin/dashboard");
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Server error. Try again.");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  /* ------------------ UPDATE OTP DIGITS ------------------ */
  const handleOtpChange = (value, index) => {
    const updated = [...otp];
    updated[index] = value.slice(-1); // Ensures only one character is saved
    setOtp(updated);

    if (value.length === 1 && index < 4) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    // Updated background to a cleaner light theme
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blue-100 p-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-slate-800 tracking-tight mb-8">
          <Lock size={32} className="inline mr-2 text-blue-600" /> Admin Secure
          Login
        </h2>

        {/* Dynamic Message Box */}
        {message && (
          <div
            className={`p-3 rounded-lg font-medium mb-6 flex items-center gap-2 ${
              messageType === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {messageType === "error" ? (
              <AlertTriangle size={18} />
            ) : (
              <CheckCircle size={18} />
            )}
            <p>{message}</p>
          </div>
        )}

        {/* ---------------------- STEP 1: LOGIN FORM ---------------------- */}
        {step === 1 && (
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <FloatingInput
              label="Admin Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              Icon={AtSign}
            />

            <FloatingInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              Icon={Lock}
            />

            <button
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-md 
              shadow-blue-300/50 hover:shadow-lg transition transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue to 2FA"}
            </button>
          </form>
        )}

        {/* ---------------------- STEP 2: OTP FORM ---------------------- */}
        {step === 2 && (
          <form className="flex flex-col gap-6" onSubmit={handleOtpVerify}>
            <p className="text-gray-600 text-center text-base">
              Enter the 5-digit verification code sent to{" "}
              <span className="font-semibold text-slate-800">{email}</span>.
            </p>

            {/* OTP Boxes */}
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
                  className={`w-12 h-14 text-center text-xl font-bold 
                  bg-white border-2 rounded-xl text-gray-800 shadow-sm
                  focus:border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none transition
                  ${otp[index] ? "border-blue-500" : "border-gray-300"}`} // Highlight filled boxes
                  id={`otp-${index}`}
                />
              ))}
            </div>

            <button
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-md
              shadow-blue-300/50 hover:shadow-lg transition transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Log In"}
            </button>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium text-center transition-colors"
              onClick={() => {
                setStep(1);
                setMessage("");
              }}
            >
              ← Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* -------------------- FLOATING INPUT (UPDATED) -------------------- */
const FloatingInput = ({ label, type = "text", value, onChange, Icon }) => (
  <div className="relative w-full">
    <input
      type={type}
      required
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 text-gray-800 rounded-xl shadow-inner
      peer focus:border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none transition"
    />

    {/* Icon inside the input field */}
    {Icon && (
      <Icon
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-blue-600 transition"
      />
    )}

    <label
      className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all
      peer-focus:top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:left-4
      peer-valid:top-3 peer-valid:text-xs peer-valid:text-blue-600 peer-valid:left-4
      bg-white px-1 pointer-events-none"
    >
      {label}
    </label>
  </div>
);
