import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Lock, Check, AlertCircle } from "lucide-react";

export default function PatientSetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { fullName, email } = state || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!email) {
    navigate("/patient/auth");
    return null;
  }

  // ---- PASSWORD RULES ----
  const rules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
    { label: "One special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const passwordsMatch = password === confirmPassword && password !== "";
  const isValid = rules.every((r) => r.valid) && passwordsMatch;

  const handleRegister = async () => {
    setMessage("");

    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullName,
        email,
        password,
        role: "patient",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return setMessage(data.message || "Registration failed");
    }

    navigate("/patient/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-100 to-pink-100 p-6">
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-purple-800">
          Set Your Password
        </h2>

        <p className="text-center text-sm text-gray-600">
          Account for <strong>{email}</strong>
        </p>

        {message && (
          <p className="text-center text-red-600 font-medium">{message}</p>
        )}

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
        />

        <div className="space-y-2 text-sm">
          {rules.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              {r.valid ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <AlertCircle size={16} className="text-gray-400" />
              )}
              {r.label}
            </div>
          ))}
          <div className="flex items-center gap-2">
            {passwordsMatch ? (
              <Check size={16} className="text-green-600" />
            ) : (
              <AlertCircle size={16} />
            )}
            Passwords must match
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={!isValid}
          className="w-full py-3 bg-linear-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
