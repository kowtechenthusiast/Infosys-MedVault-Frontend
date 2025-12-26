import {
  X,
  FileText,
  HeartPulse,
  User,
  Activity,
  Lock,
  MapPin,
  Phone,
  Mail,
  Droplets,
  Zap,
  Wind,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";

const TABS = [
  { key: "basic", label: "Identity", icon: User, color: "text-blue-500" },
  { key: "health", label: "Vitals", icon: HeartPulse, color: "text-rose-500" },
  {
    key: "lifestyle",
    label: "Habits",
    icon: Activity,
    color: "text-emerald-500",
  },
  { key: "records", label: "Archive", icon: FileText, color: "text-amber-500" },
];

const doctorId = localStorage.getItem("userId");
console.log("Doctor ID from localStorage:", doctorId);

export default function PatientDetailsModal({ patient, onClose }) {
  console.log("PatientDetailsModal - patient:", patient);
  const [activeTab, setActiveTab] = useState("basic");
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(false);

  useEffect(() => {
    if (activeTab !== "records") return;
    const fetchRecords = async () => {
      setLoadingRecords(true);
      try {
        const res = await fetch(
          `http://localhost:8080/api/medical-records/patient/${patient.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
            },
          }
        );
        const data = await res.json();
        setRecords(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingRecords(false);
      }
    };
    fetchRecords();
  }, [activeTab, patient.id]);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[3rem] w-full max-w-5xl shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in duration-300 flex flex-col md:flex-row h-[85vh]">
        {/* SIDEBAR: Patient Summary */}
        <div className="w-full md:w-80 bg-slate-900 p-8 text-white flex flex-col shrink-0">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-3xl font-black shadow-lg shadow-blue-500/20">
              {patient.name?.charAt(0)}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-slate-900 w-8 h-8 rounded-full flex items-center justify-center">
              <Activity size={14} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-black tracking-tight">{patient.name}</h2>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            Patient ID: #{patient.id}
          </p>

          <div className="space-y-4 mt-auto">
            <SidebarItem
              icon={<Mail size={16} />}
              label="Email"
              value={patient.email || "Not provided"}
            />
            <SidebarItem
              icon={<Phone size={16} />}
              label="Emergency"
              value={patient.phone}
            />
            <SidebarItem
              icon={<MapPin size={16} />}
              label="Location"
              value={`${patient.city}, ${patient.state}`}
            />
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col bg-slate-50/50 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-2xl bg-white text-slate-400 hover:text-rose-500 shadow-sm z-10 transition-all"
          >
            <X size={20} />
          </button>

          {/* TAB NAVIGATION */}
          <div className="px-8 pt-8 flex gap-2">
            {TABS.map(({ key, label, icon: Icon, color }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === key
                    ? "bg-white text-slate-900 shadow-md scale-105"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Icon size={16} className={activeTab === key ? color : ""} />
                {label}
              </button>
            ))}
          </div>

          <div className="p-8 overflow-y-auto flex-1 no-scrollbar">
            {activeTab === "basic" && <BasicInfo patient={patient} />}
            {activeTab === "health" && <HealthMetrics patient={patient} />}
            {activeTab === "lifestyle" && <Lifestyle patient={patient} />}
            {activeTab === "records" && (
              <MedicalRecords
                records={records}
                loading={loadingRecords}
                patientId={patient.id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

const BasicInfo = ({ patient }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4">
    <StatCard
      label="Gender"
      value={patient.gender}
      icon={<User className="text-blue-500" />}
    />
    <StatCard
      label="Blood Group"
      value={patient.bloodGroup}
      icon={<Droplets className="text-rose-500" />}
    />
    <StatCard
      label="Address"
      value={patient.address}
      className="md:col-span-2"
    />
    <StatCard label="Pincode" value={patient.pincode} />
    <StatCard label="Country" value="India" />
  </div>
);

const HealthMetrics = ({ patient }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4">
    <MetricCard
      label="Sugar Level"
      value={patient.sugarLevel}
      unit="mg/dL"
      icon={<Zap />}
      color="bg-amber-500"
    />
    <MetricCard
      label="Blood Pressure"
      value={`${patient.bpSys}/${patient.bpDia}`}
      unit="mmHg"
      icon={<Activity />}
      color="bg-rose-500"
    />
    <MetricCard
      label="SpO₂ Level"
      value={patient.spo2}
      unit="%"
      icon={<Wind />}
      color="bg-blue-500"
    />
    <MetricCard
      label="Heart Rate"
      value={patient.heartRate}
      unit="BPM"
      icon={<HeartPulse />}
      color="bg-emerald-500"
    />
  </div>
);

const Lifestyle = ({ patient }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4">
    <StatCard label="Sleep Duration" value={`${patient.sleepHours} hrs/day`} />
    <StatCard label="Dietary Preference" value={patient.diet} />
    <StatCard label="Smoking Status" value={patient.smoking} />
    <StatCard label="Alcohol Consumption" value={patient.alcohol} />
  </div>
);

const MedicalRecords = ({ records, loading, patientId }) => {
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-50">
        <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="font-black uppercase text-xs tracking-widest">
          Scanning Archive...
        </p>
      </div>
    );

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-4">
      {records.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200">
          <FileText className="mx-auto text-slate-300 mb-2" size={40} />
          <p className="text-slate-400 font-bold uppercase text-xs">
            No records found for this unit
          </p>
        </div>
      ) : (
        records.map((rec) => {
          const canView = rec.allowedDoctors?.some((doc) => doc.id == doctorId);
          return (
            <div
              key={rec.id}
              className="group bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between hover:shadow-xl hover:shadow-blue-500/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-2xl ${
                    canView
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {canView ? <FileText size={24} /> : <Lock size={24} />}
                </div>
                <div>
                  <p className="font-black text-slate-800 tracking-tight">
                    {rec.fileName}
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    Uploaded {new Date(rec.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {canView ? (
                <a
                  href={rec.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-blue-600 transition-all uppercase tracking-widest"
                >
                  <Eye size={14} /> Open
                </a>
              ) : (
                <button
                  onClick={() => requestAccess(rec.id, patientId, doctorId)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-amber-50 text-amber-600 rounded-2xl text-xs font-black hover:bg-amber-500 hover:text-white transition-all uppercase tracking-widest"
                >
                  Request Access
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

/* ================= ATOMIC UI HELPERS ================= */

const SidebarItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-slate-500">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-500 uppercase">{label}</p>
      <p className="text-sm font-bold text-slate-200">{value || "—"}</p>
    </div>
  </div>
);

const StatCard = ({ label, value, icon, className = "" }) => (
  <div
    className={`bg-white p-5 rounded-[2rem] border border-slate-100 ${className}`}
  >
    <div className="flex items-center gap-3 mb-1">
      {icon}
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
    </div>
    <p className="text-lg font-black text-slate-800 ml-7">{value || "—"}</p>
  </div>
);

const MetricCard = ({ label, value, unit, icon, color }) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className={`p-4 rounded-3xl text-white shadow-lg ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-800 tracking-tighter">
          {value || "—"}
        </p>
      </div>
    </div>
    <span className="text-xs font-black text-slate-300 uppercase tracking-widest rotate-90">
      {unit}
    </span>
  </div>
);

const requestAccess = async (recordId, patientId, doctorId) => {
  // Logic remains the same...
  const response = await fetch(
    `http://localhost:8080/api/medical-records/request-access`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
      },
      body: JSON.stringify({ recordId, patientId, doctorId }),
    }
  );
  if (response.ok) alert("Access request sent");
  else alert("Failed to send access request");
};
