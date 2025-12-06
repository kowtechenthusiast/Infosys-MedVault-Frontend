import { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";

export default function VerificationCard({ data, role }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 bg-white/70 backdrop-blur-xl border border-gray-200 shadow rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{data.name}</h3>
          <p className="text-sm text-gray-500">{role.toUpperCase()}</p>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-blue-600 hover:text-blue-800"
        >
          <ChevronDown
            size={26}
            className={`${open ? "rotate-180" : ""} transition`}
          />
        </button>
      </div>

      {/* Expandable details */}
      {open && (
        <div className="mt-4 space-y-3">
          <p>
            <span className="font-semibold">Certificate:</span>{" "}
            {data.certificate}
          </p>

          {data.specialization && (
            <p>
              <span className="font-semibold">Specialization:</span>{" "}
              {data.specialization}
            </p>
          )}

          {data.experience && (
            <p>
              <span className="font-semibold">Experience:</span>{" "}
              {data.experience}
            </p>
          )}

          <div className="flex gap-4 mt-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded-xl flex items-center gap-2 hover:bg-green-700">
              <Check size={18} /> Approve
            </button>

            <button className="px-4 py-2 bg-red-600 text-white rounded-xl flex items-center gap-2 hover:bg-red-700">
              <X size={18} /> Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
