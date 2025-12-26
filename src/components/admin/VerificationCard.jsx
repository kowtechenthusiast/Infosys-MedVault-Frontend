import { useState } from "react";
import {
  ChevronDown,
  Check,
  X,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Clock,
  Eye,
  MapPin,
  Mail,
  Phone,
  Building2,
  Calendar,
  CreditCard,
  ExternalLink,
} from "lucide-react";

// --- Detail Modal Component ---
const DetailModal = ({
  isOpen,
  onClose,
  data,
  statusColors,
  actionLoading,
  handleGrantAccess,
  handleDenyRequest,
  isPending,
}) => {
  if (!isOpen) return null;

  const baseUrl = "http://localhost:8080";
  const filePath = data.medicalLicense?.startsWith("/")
    ? data.medicalLicense
    : `/${data.medicalLicense}`;
  const licenseUrl = `${baseUrl}${filePath}`;

  // Check if file is an image to use <img> instead of <iframe> for better rendering
  const isImage = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(licenseUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="bg-white rounded-4xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-2xl ${statusColors.bg} ${statusColors.text}`}
            >
              <User size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{data.name}</h2>
              <p className="text-sm text-slate-500 font-medium">
                {data.specialization} • Registration:{" "}
                {data.medicalRegistrationNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto grid md:grid-cols-12 gap-8">
          {/* Column 1: Info (Spans 5/12) */}
          <div className="md:col-span-5 space-y-8">
            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-5">
                Professional Background
              </h3>
              <div className="space-y-4">
                <InfoItem
                  icon={<GraduationCap size={18} />}
                  label="Qualification"
                  value={data.qualification}
                />
                <InfoItem
                  icon={<Briefcase size={18} />}
                  label="Clinical Experience"
                  value={`${data.experience} Years`}
                />
                <InfoItem
                  icon={<Building2 size={18} />}
                  label="Current Facility"
                  value={data.clinicHospitalName}
                />
                <InfoItem
                  icon={<CreditCard size={18} />}
                  label="Consultation Fee"
                  value={`₹${data.consultationFee}`}
                />
                <InfoItem
                  icon={<Calendar size={18} />}
                  label="Date of Birth"
                  value={data.dateOfBirth}
                />
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-5">
                Contact & Location
              </h3>
              <div className="space-y-4">
                <InfoItem
                  icon={<Mail size={18} />}
                  label="Email Address"
                  value={data.email}
                />
                <InfoItem
                  icon={<Phone size={18} />}
                  label="Phone Number"
                  value={data.phone}
                />
                <InfoItem
                  icon={<MapPin size={18} />}
                  label="Practice Location"
                  value={`${data.city}, ${data.state}, ${data.pincode}`}
                />
              </div>
            </section>
          </div>

          {/* Column 2: Document Preview (Spans 7/12) */}
          <div className="md:col-span-7 flex flex-col h-full min-h-[450px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                Medical License Verification
              </h3>
              <button
                onClick={() => window.open(licenseUrl, "_blank")}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
              >
                <ExternalLink size={14} /> Full Screen
              </button>
            </div>

            <div className="flex-1 bg-slate-900 rounded-3xl overflow-hidden relative border-4 border-slate-100 shadow-inner group">
              {data.medicalLicense ? (
                isImage ? (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 p-2">
                    <img
                      src={licenseUrl}
                      alt="License"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <iframe
                    src={licenseUrl}
                    className="w-full h-full bg-white"
                    title="License Preview"
                  />
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-3">
                  <FileText size={48} className="opacity-20" />
                  <p className="text-sm font-semibold">Document not found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t bg-slate-50 flex justify-end items-center gap-4">
          {isPending ? (
            <>
              <button
                onClick={handleDenyRequest}
                disabled={actionLoading}
                className="px-8 py-3 rounded-2xl border border-slate-200 bg-white text-red-600 font-bold hover:bg-red-50 hover:border-red-100 transition-all disabled:opacity-50"
              >
                Reject Request
              </button>
              <button
                onClick={handleGrantAccess}
                disabled={actionLoading}
                className="px-10 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-blue-600 shadow-xl shadow-blue-200 transition-all disabled:opacity-50"
              >
                Approve Doctor
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-10 py-3 rounded-2xl bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 transition-colors"
            >
              Close Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex gap-3">
    <div className="text-slate-400 mt-0.5">{icon}</div>
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-slate-700">{value || "N/A"}</p>
    </div>
  </div>
);

// --- Main Card Component ---
export default function VerificationCard({ data }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState(data.status);
  const [actionLoading, setActionLoading] = useState(false);

  const isPending = status === "PENDING";

  const statusColors = isPending
    ? {
        border: "border-amber-100",
        bg: "bg-amber-50",
        text: "text-amber-600",
        dot: "bg-amber-500",
      }
    : status === "APPROVED"
    ? {
        border: "border-green-100",
        bg: "bg-green-50",
        text: "text-green-600",
        dot: "bg-green-500",
      }
    : {
        border: "border-red-100",
        bg: "bg-red-50",
        text: "text-red-600",
        dot: "bg-red-500",
      };

  const updateStatus = async (action) => {
    try {
      setActionLoading(true);
      const res = await fetch(
        `http://localhost:8080/api/admin/users/${data.userId}/${action}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Action failed");
      const updated = await res.json();
      setStatus(updated.status);
      setModalOpen(false);
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <div
        className={`w-full mb-3 group transition-all duration-200 hover:-translate-y-0.5`}
      >
        <div
          className={`flex items-center justify-between p-4 bg-white border ${statusColors.border} rounded-2xl shadow-sm hover:shadow-md transition-shadow`}
        >
          {/* Basic Info Group */}
          <div className="flex items-center gap-4 flex-2">
            <div
              className={`h-10 w-10 rounded-full ${statusColors.bg} ${statusColors.text} flex items-center justify-center shrink-0`}
            >
              <User size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800 truncate">{data.name}</h3>
              <p className="text-xs text-slate-500 font-medium">
                {data.specialization} • {data.experience} Yrs Exp
              </p>
            </div>
          </div>

          {/* Location Group (Hidden on small screens) */}
          <div className="hidden md:flex flex-col flex-1 items-start">
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <MapPin size={12} />
              <span className="truncate max-w-[150px]">{data.city}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-6">
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${statusColors.bg} ${statusColors.text}`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${statusColors.dot} animate-pulse`}
              />
              {status}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              <Eye size={16} />
              <span>View</span>
            </button>
          </div>
        </div>
      </div>

      <DetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={data}
        statusColors={statusColors}
        actionLoading={actionLoading}
        handleGrantAccess={() => updateStatus("approve")}
        handleDenyRequest={() => updateStatus("reject")}
        isPending={isPending}
      />
    </>
  );
}
