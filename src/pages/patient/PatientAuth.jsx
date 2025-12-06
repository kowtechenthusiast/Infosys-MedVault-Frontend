import { useState } from "react";
import patientImageUrl from "../../assets/patient.jpg";

// Floating Input Component
function FloatingInput({
  name,
  label,
  type,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        name={name}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/60 backdrop-blur-md
          peer focus:border-purple-600 focus:ring-2 focus:ring-purple-300 outline-none transition font-medium"
      />
      <label
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600
          peer-valid:top-2 peer-valid:text-xs peer-valid:text-purple-600"
      >
        {label}
      </label>
    </div>
  );
}

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
    </div>
  );
}

// MAIN COMPONENT
export default function PatientAuth() {
  const [current, setCurrent] = useState("login");
  const [message, setMessage] = useState("");

  const [user, setUser] = useState({
    fullName: "",
    age: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const switchForm = () => {
    setMessage("");
    setUser({
      fullName: "",
      age: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setCurrent((prev) => (prev === "login" ? "register" : "login"));
  };

  // handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // backend API base URL (change if needed)
  const API_URL = "http://localhost:8080/patient";

  // FORM SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (current === "register") {
        if (user.password !== user.confirmPassword) {
          setMessage("Passwords do not match!");
          return;
        }

        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        const data = await res.json();

        console.log("Data:", data);

        if (!res.ok) return setMessage(data.message || "Registration failed");

        switchForm();
      } else if (current === "login") {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        });

        const data = await res.json();
        if (!res.ok) return setMessage(data.message || "Invalid credentials");

        setMessage("Login Successful!");

        // redirect or store token
        localStorage.setItem("patientToken", data.token);
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
      console.error("Error:", err);
    }
  };

  const primaryButton =
    "w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold cursor-pointer rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition";

  const submitButtonClasses =
    current === "login" ? primaryButton : `mt-[-58px] ${primaryButton}`;

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
        <div className="lg:w-1/2 p-10 flex flex-col justify-center min-h-[600px]">
          <h2 className="text-4xl font-extrabold text-purple-800 mb-10 text-center font-poppins">
            {current === "login" ? "Patient Login" : "Create Patient Account"}
          </h2>

          {message && (
            <p className="text-center text-red-600 font-medium mb-3">
              {message}
            </p>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* REGISTER FIELDS */}
            {current === "register" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput
                    name="fullName"
                    label="Full Name"
                    type="text"
                    required
                    value={user.fullName}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    name="age"
                    label="Age"
                    type="number"
                    required
                    value={user.age}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    required
                    value={user.phone}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    name="email"
                    label="Email Address"
                    type="email"
                    required
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>

                <FloatingInput
                  name="password"
                  label="Password"
                  type="password"
                  required
                  value={user.password}
                  onChange={handleChange}
                />
                <FloatingInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                  value={user.confirmPassword}
                  onChange={handleChange}
                />
              </>
            )}

            {/* LOGIN FIELDS */}
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
              </>
            )}

            {current === "login" ? (
              <LoginHelper />
            ) : (
              <div className="h-[72px] invisible"></div>
            )}

            <button type="submit" className={submitButtonClasses}>
              {current === "login" ? "Login Securely" : "Register Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-700">
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
