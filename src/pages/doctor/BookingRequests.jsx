import React, { useEffect, useState } from "react";
import {
  Inbox,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  Eye,
  Clock,
  AlertCircle,
} from "lucide-react";
import PatientDetailsModal from "../../components/doctor/PatientDetailsModal";
import { toast } from "react-toastify";

/* ================= REQUEST CARD ================= */
const RequestCard = ({ appt, onViewDetails, onApprove, onReject, loading }) => {
  return (
    <div className="group bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Patient Info & Time */}
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex flex-col items-center justify-center text-indigo-600 border border-indigo-100">
            <span className="text-xs font-black uppercase leading-none">
              {new Date(appt.appointmentDate).toLocaleString("en-US", {
                month: "short",
              })}
            </span>

            <span className="text-xl font-black">
              {appt.appointmentDate?.slice(8, 10)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-slate-800">
                {appt.patientName}
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-wider border border-amber-100">
                Pending Request
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {appt.appointmentTime?.slice(0, 5)}
              </span>
              <span className="flex items-center gap-1.5">
                <AlertCircle size={14} /> {appt.reason || "General Checkup"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onViewDetails(appt)}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-bold text-sm transition-all"
          >
            <Eye size={18} />
            View Patient
          </button>

          <button
            disabled={loading}
            onClick={() => onApprove(appt.id)}
            className={`p-3 rounded-2xl border border-emerald-100 transition-all
    ${
      loading
        ? "bg-emerald-200 text-white cursor-not-allowed"
        : "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
    }`}
          >
            <UserCheck size={20} />
          </button>

          <button
            disabled={loading}
            onClick={() => onReject(appt.id)}
            className={`p-3 rounded-2xl border border-rose-100 transition-all
    ${
      loading
        ? "bg-rose-200 text-white cursor-not-allowed"
        : "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
    }`}
          >
            <UserX size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
export default function BookingRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/patient/booking/getPendingAppointment?userId=${localStorage.getItem(
            "userId"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
            },
          }
        );
        const data = await res.json();
        console.log("Fetched Pending Data:", data);
        // Filter specifically for REQUESTED status
        const filtered = (data || []).filter((a) => a.status === "REQUESTED");
        setRequests(filtered);
        console.log("Fetched Requests:", filtered);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchRequests();
  }, []);

  const [actionLoadingId, setActionLoadingId] = useState(null);

  const approveRequest = async (appointmentId) => {
    try {
      setActionLoadingId(appointmentId);

      await fetch(
        `http://localhost:8080/patient/booking/approve/${appointmentId}?doctorId=${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
          },
        }
      );
      toast.success("Request approved successfully");
      // Remove approved request from UI
      setRequests((prev) => prev.filter((r) => r.id !== appointmentId));
    } catch (err) {
      console.error("Approve failed:", err);
      toast.error("Failed to approve request");
    } finally {
      setActionLoadingId(null);
    }
  };

  const rejectRequest = async (appointmentId) => {
    try {
      setActionLoadingId(appointmentId);

      await fetch(
        `http://localhost:8080/patient/booking/reject/${appointmentId}?doctorId=${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
          },
        }
      );

      // Remove rejected request from UI
      toast.success("Request rejected successfully");
      setRequests((prev) => prev.filter((r) => r.id !== appointmentId));
    } catch (err) {
      console.error("Reject failed:", err);
      toast.error("Failed to reject request");
    } finally {
      setActionLoadingId(null);
    }
  };

  const paginatedRequests = requests.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );
  const totalPages = Math.ceil(requests.length / PER_PAGE);

  return (
    <div className="space-y-8 p-4 md:p-8 bg-slate-50/30 rounded-[3rem] border border-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
            <Inbox size={12} /> Inbox
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">
            Booking <span className="text-indigo-600">Requests</span>
          </h2>
          <p className="text-slate-400 font-medium mt-1">
            You have {requests.length} new patient requests waiting for
            approval.
          </p>
        </div>
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 gap-4">
        {paginatedRequests.length > 0 ? (
          paginatedRequests.map((appt) => (
            <RequestCard
              key={appt.id}
              appt={appt}
              onViewDetails={(req) => setSelectedRequest(req)}
              onApprove={approveRequest}
              onReject={rejectRequest}
              loading={actionLoadingId === appt.id}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
              <Inbox size={40} />
            </div>
            <p className="text-slate-400 font-bold text-lg">Clean Slate!</p>
            <p className="text-slate-300 text-sm">
              No pending requests at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {requests.length > PER_PAGE && (
        <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-100">
          <span className="text-xs font-black text-slate-400 uppercase ml-4">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="p-3 rounded-2xl hover:bg-indigo-600 hover:text-white disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
              disabled={page === totalPages}
              className="p-3 rounded-2xl hover:bg-indigo-600 hover:text-white disabled:opacity-20 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Details Drawer */}
      {selectedRequest && (
        <PatientDetailsModal
          patient={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}
