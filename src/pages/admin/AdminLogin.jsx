import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  /* ------------------ HANDLE LOGIN ------------------ */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Output:", data);

      if (!res.ok) {
        console.log("not ok:", res);

        setMessage(data.message || "Login failed");
        return;
      }

      setMessage("OTP sent to email.");
      setStep(2);
    } catch (err) {
      console.error("Error:", err);
      setMessage("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ HANDLE OTP VERIFY ------------------ */
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const fullOtp = otp.join("");

    try {
      const res = await fetch("http://localhost:8080/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: fullOtp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "OTP verification failed");
        return;
      }

      setMessage("OTP Verified Successfully!");
      // Redirect admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ UPDATE OTP DIGITS ------------------ */
  const handleOtpChange = (value, index) => {
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value.length === 1 && index < 4) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-blue-100 p-6">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-8 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-blue-700 tracking-wide mb-4">
          Admin Secure Login
        </h2>

        {message && (
          <p className="text-center text-red-600 font-medium mb-4">{message}</p>
        )}

        {/* ---------------------- LOGIN FORM ---------------------- */}
        {step === 1 && (
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <FloatingInput
              label="Admin Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FloatingInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md
              transition transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </form>
        )}

        {/* ---------------------- OTP FORM ---------------------- */}
        {step === 2 && (
          <form className="flex flex-col gap-6" onSubmit={handleOtpVerify}>
            <p className="text-gray-600 text-center text-sm">
              Enter the 5-digit verification code sent to your email.
            </p>

            {/* OTP Boxes */}
            <div className="flex justify-center gap-3">
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
                  className="w-12 h-14 text-center text-xl font-semibold 
                  bg-white border border-gray-300 rounded-xl text-gray-800
                  focus:border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none transition"
                  id={`otp-${index}`}
                />
              ))}
            </div>

            <button
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md
              transition transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 text-sm underline text-center"
              onClick={() => setStep(1)}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* -------------------- FLOATING INPUT -------------------- */
const FloatingInput = ({ label, type = "text", value, onChange }) => (
  <div className="relative w-full">
    <input
      type={type}
      required
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 rounded-xl
      peer focus:border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none transition"
    />

    <label
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all
      peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600
      peer-valid:top-2 peer-valid:text-xs peer-valid:text-blue-600"
    >
      {label}
    </label>
  </div>
);
