import { useState } from "react";

export default function AdminLogin() {
  const [step, setStep] = useState(2); // 1 = login, 2 = OTP

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-blue-100 p-6">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-8 animate-fadeIn">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-700 tracking-wide mb-6">
          Admin Secure Login
        </h2>

        {/* ---------------------- LOGIN FORM ---------------------- */}
        {step === 1 && (
          <form
            className="flex flex-col gap-6 transition-all duration-300"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
          >
            <FloatingInput label="Admin Email" type="email" />
            <FloatingInput label="Password" type="password" />

            <button
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md
              transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue
            </button>
          </form>
        )}

        {/* ---------------------- OTP FORM ---------------------- */}
        {step === 2 && (
          <form
            className="flex flex-col gap-6 transition-all duration-300 animate-fadeIn"
            onSubmit={(e) => {
              e.preventDefault();
              alert("OTP Verified (simulate)");
            }}
          >
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
                  className="w-12 h-14 text-center text-xl font-semibold 
                  bg-white border border-gray-300 rounded-xl text-gray-800
                  focus:border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none
                  transition"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length === 1) {
                      const next = document.getElementById(`otp-${index + 1}`);
                      next?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !e.target.value) {
                      const prev = document.getElementById(`otp-${index - 1}`);
                      prev?.focus();
                    }
                  }}
                  id={`otp-${index}`}
                />
              ))}
            </div>

            <button
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md
              transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Verify OTP
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
const FloatingInput = ({ label, type = "text" }) => (
  <div className="relative w-full">
    <input
      type={type}
      required
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
