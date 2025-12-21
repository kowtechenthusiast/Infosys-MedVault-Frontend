import { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Eye,
  ExternalLink,
  FileText,
} from "lucide-react";

/* ===================== MODAL ===================== */
const PatientDetailModal = ({
  isOpen,
  onClose,
  data,
  statusColors,
  actionLoading,
  handleApprove,
  handleReject,
  isPending,
}) => {
  if (!isOpen) return null;

  const baseUrl = "http://localhost:8080";
  const filePath = data.idProof?.startsWith("/")
    ? data.idProof
    : `/${data.idProof}`;
  const idProofUrl = `${baseUrl}${filePath}`;
  const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(idProofUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-2xl ${statusColors.bg} ${statusColors.text}`}
            >
              <User size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{data.name}</h2>
              <p className="text-sm text-slate-500">
                Patient • {data.gender} • {data.bloodGroup}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 grid md:grid-cols-12 gap-8 overflow-y-auto">
          {/* Info */}
          <div className="md:col-span-5 space-y-6">
            <Info label="Email" icon={<Mail size={16} />} value={data.email} />
            <Info label="Phone" icon={<Phone size={16} />} value={data.phone} />
            <Info
              label="Address"
              icon={<MapPin size={16} />}
              value={`${data.address}, ${data.city}, ${data.state} - ${data.pincode}`}
            />
            <Info
              label="Date of Birth"
              icon={<Calendar size={16} />}
              value={data.dateOfBirth}
            />
            <Info
              label="Blood Group"
              icon={<CreditCard size={16} />}
              value={data.bloodGroup}
            />
          </div>

          {/* ID Proof */}
          <div className="md:col-span-7 flex flex-col">
            <div className="flex justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600">
                ID Proof
              </h3>
              {data.idProof && (
                <button
                  onClick={() => window.open(idProofUrl, "_blank")}
                  className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600"
                >
                  <ExternalLink size={14} /> Full Screen
                </button>
              )}
            </div>

            <div className="flex-1 rounded-3xl border bg-slate-100 overflow-hidden">
              {data.idProof ? (
                isImage ? (
                  <img
                    src={idProofUrl}
                    alt="ID Proof"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe src={idProofUrl} className="w-full h-full" />
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <FileText size={48} />
                  <p className="text-sm font-semibold mt-2">
                    No document uploaded
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-slate-50 flex justify-end gap-4">
          {isPending ? (
            <>
              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="px-8 py-3 rounded-xl border text-red-600 font-bold hover:bg-red-50"
              >
                Reject
              </button>
              <button
                onClick={handleApprove}
                disabled={actionLoading}
                className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-blue-600"
              >
                Approve Patient
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-slate-200 font-bold"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ===================== INFO ITEM ===================== */
const Info = ({ icon, label, value }) => (
  <div className="flex gap-3 text-sm">
    <div className="text-slate-400 mt-1">{icon}</div>
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-400">{label}</p>
      <p className="font-semibold text-slate-700">{value || "N/A"}</p>
    </div>
  </div>
);

/* ===================== CARD ===================== */
export default function PatientVerificationCard({ data }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState(data.status);
  const [loading, setLoading] = useState(false);

  const isPending = status === "PENDING";

  const statusColors = isPending
    ? { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" }
    : status === "APPROVED"
    ? { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" }
    : { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" };

  const updateStatus = async (action) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8080/api/admin/users/${data.userId}/${action}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      const updated = await res.json();
      setStatus(updated.status);
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`flex items-center justify-between p-4 bg-white border ${statusColors.border} rounded-2xl shadow-sm`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-full ${statusColors.bg} ${statusColors.text}`}
          >
            <User size={18} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{data.name}</h3>
            <p className="text-xs text-slate-500">{data.city}</p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-blue-600"
        >
          <Eye size={16} /> View
        </button>
      </div>

      <PatientDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={data}
        statusColors={statusColors}
        actionLoading={loading}
        handleApprove={() => updateStatus("approve")}
        handleReject={() => updateStatus("reject")}
        isPending={isPending}
      />
    </>
  );
}
