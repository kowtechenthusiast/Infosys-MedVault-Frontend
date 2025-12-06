import { useState } from "react";
import DOCTOR_IMAGE_URL from "../../assets/doctor.jpg";
import { useNavigate } from "react-router-dom";

export default function DoctorAuth() {
  const [current, setCurrent] = useState("login");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  // Form fields
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    yearsOfExperience: "",
    specialization: "",
    contactPhone: "",
    email: "",
    password: "",
    confirmPassword: "",
    licenseFile: null,
  });

  // Handle text/select inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFile = (e) => {
    setForm({ ...form, licenseFile: e.target.files[0] });
  };

  // Clean switch handler (no useEffect needed)
  const switchForm = () => {
    setMessage("");
    setForm({
      fullName: "",
      gender: "",
      yearsOfExperience: "",
      specialization: "",
      contactPhone: "",
      email: "",
      password: "",
      confirmPassword: "",
      licenseFile: null,
    });
    setCurrent((prev) => (prev === "login" ? "register" : "login"));
  };

  // API base URL
  const API_URL = "http://localhost:8080/doctor";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (current == "register") {
        // Registration password match check
        if (form.password !== form.confirmPassword) {
          setMessage("Passwords do not match!");
          return;
        }

        const formData = new FormData();
        Object.keys(form).forEach((key) => {
          formData.append(key, form[key]);
        });

        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          setMessage(data.message || "Registration failed");
          return;
        }

        setMessage("Registration submitted for verification!");
        switchForm();
      } else if (current == "login") {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });

        const data = await res.json();
        if (!res.ok) return setMessage(data.message || "Invalid login");

        localStorage.setItem("doctorToken", data.token);
        setMessage("Login successful!");

        if (data.status == "PENDING") navigate("/doctor/pending");
        else navigate("/doctor/dashboard");
      }

      // LOGIN
    } catch (err) {
      setMessage("Server error. Try again later.");
      console.error(err);
    }
  };

  // UI classnames
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
    "shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-blue-200 p-6 font-inter">
      <div className="flex flex-col lg:flex-row bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full border border-white/30">
        {/* LEFT IMAGE SIDE */}
        <div className="lg:w-1/2 relative min-h-[520px]">
          <img
            src={DOCTOR_IMAGE_URL}
            alt="Doctor"
            className="absolute inset-0 w-full h-full object-cover p-17"
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

        {/* RIGHT FORM SIDE */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-10 text-center font-poppins">
            {current == "login"
              ? "Welcome Back"
              : "Create Your Professional Account"}
          </h2>

          {message && (
            <p className="text-center text-red-600 font-semibold mb-4">
              {message}
            </p>
          )}

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* REGISTRATION FIELDS */}
            {current == "register" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Fields */}
                  <div className={inputWrapper}>
                    <input
                      className={inputStyle}
                      required
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                    />
                    <label className={labelStyle}>Full Name</label>
                  </div>

                  {/* Gender */}
                  <div className={inputWrapper}>
                    <select
                      className={`${inputStyle} bg-white`}
                      required
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value=""></option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <label className={labelStyle}>Gender</label>
                  </div>

                  {/* Experience */}
                  <div className={inputWrapper}>
                    <input
                      className={inputStyle}
                      type="number"
                      min="0"
                      required
                      name="yearsOfExperience"
                      value={form.yearsOfExperience}
                      onChange={handleChange}
                    />
                    <label className={labelStyle}>Years of Experience</label>
                  </div>

                  {/* Department */}
                  {/* <div className={inputWrapper}>
                    <select
                      className={`${inputStyle} bg-white`}
                      required
                      name="hospitalDepartment"
                      value={form.hospitalDepartment}
                      onChange={handleChange}
                    >
                      <option value=""></option>
                      <option>Emergency</option>
                      <option>Outpatient (OPD)</option>
                      <option>Radiology</option>
                      <option>Pathology</option>
                      <option>Pediatrics</option>
                      <option>General Medicine</option>
                      <option>Surgery</option>
                      <option>Orthopedics</option>
                    </select>
                    <label className={labelStyle}>Hospital Department</label>
                  </div> */}

                  {/* Specialization */}
                  <div className={inputWrapper}>
                    <select
                      className={`${inputStyle} bg-white`}
                      required
                      name="specialization"
                      value={form.specialization}
                      onChange={handleChange}
                    >
                      <option value=""></option>
                      {[
                        "Cardiology",
                        "Neurology",
                        "Dermatology",
                        "Psychiatry",
                        "Orthopedics",
                        "General Physician",
                        "ENT Specialist",
                        "Gastroenterology",
                        "Urology",
                        "Nephrology",
                        "Gynecology",
                        "Oncology",
                      ].map((s, i) => (
                        <option key={i}>{s}</option>
                      ))}
                    </select>
                    <label className={labelStyle}>Specialization</label>
                  </div>

                  {/* Contact & Email */}
                  {[
                    ["contactPhone", "Contact Phone", "tel"],
                    ["email", "Email Address", "email"],
                  ].map(([name, label, type], i) => (
                    <div className={inputWrapper} key={i}>
                      <input
                        className={inputStyle}
                        type={type}
                        required
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                      />
                      <label className={labelStyle}>{label}</label>
                    </div>
                  ))}

                  {/* Consultation Type */}
                  {/* <div className={inputWrapper}>
                    <select
                      className={`${inputStyle} bg-white`}
                      required
                      name="consultationType"
                      value={form.consultationType}
                      onChange={handleChange}
                    >
                      <option value=""></option>
                      <option>In-Person Only</option>
                      <option>Online Only</option>
                      <option>Both In-Person & Online</option>
                    </select>
                    <label className={labelStyle}>Consultation Type</label>
                  </div> */}
                </div>

                {/* Document Upload */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium mb-2">
                    Upload Medical License Document (PDF / JPG)
                  </label>
                  <input
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg
                  file:border-0 file:text-sm file:font-semibold file:bg-blue-100 
                  file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
                    type="file"
                    onChange={handleFile}
                    required
                  />
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ["password", "Password"],
                    ["confirmPassword", "Confirm Password"],
                  ].map(([name, label], i) => (
                    <div className={inputWrapper} key={i}>
                      <input
                        className={inputStyle}
                        type="password"
                        required
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                      />
                      <label className={labelStyle}>{label}</label>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              // ---------------- LOGIN FORM ----------------
              <div className="flex flex-col gap-4">
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

                <a className="text-sm text-blue-600 hover:underline self-end font-medium -mt-2 mb-10 cursor-pointer">
                  Forgot Password?
                </a>

                <LoginFiller />
              </div>
            )}

            <button type="submit" className={primaryButtonStyle}>
              {current == "login"
                ? "Login Securely"
                : "Submit for Verification"}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-700">
            {current == "login" ? "New to MediBook?" : "Already registered?"}{" "}
            <button
              onClick={switchForm}
              className="text-blue-700 font-bold cursor-pointer hover:underline"
            >
              {current == "login" ? "Register Now" : "Login Here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// LOGIN HELPER COMPONENT
function LoginFiller() {
  return (
    <div className="flex flex-col gap-4 grow">
      <div className="h-2"></div>
      <p className="text-sm text-gray-500 text-center leading-relaxed">
        Manage appointments, patient records, prescriptions, and more — securely
        and instantly.
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

      <div className="h-[90px] md:h-90px]"></div>
    </div>
  );
}
