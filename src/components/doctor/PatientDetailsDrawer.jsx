export default function PatientDetailsDrawer({ patient, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
      <div className="w-full sm:w-[420px] bg-white h-full p-6 shadow-xl animate-slideIn">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black mb-4"
        >
          ✕ Close
        </button>

        <h2 className="text-2xl font-bold mb-4">{patient?.user.name}</h2>

        <div className="space-y-3 text-sm">
          <Info label="Email" value={patient?.user.email} />
          <Info label="Phone" value={patient?.phone} />
          <Info label="Gender" value={patient?.gender} />
          <Info label="DOB" value={patient?.dateOfBirth} />
          <Info label="Blood Group" value={patient?.bloodGroup} />
          <Info label="City" value={patient?.city} />
          <Info label="State" value={patient?.state} />
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <h3 className="font-semibold mb-2">Health Snapshot</h3>
          <p>Sugar: {patient?.sugarLevel ?? "—"} mg/dL</p>
          <p>
            BP: {patient?.bpSys}/{patient?.bpDia}
          </p>
          <p>SpO₂: {patient?.spo2 ?? "—"}%</p>
          <p>Heart Rate: {patient?.heartRate ?? "—"} BPM</p>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );
}
