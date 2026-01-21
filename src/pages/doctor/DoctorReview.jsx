/* eslint-disable no-unused-vars */
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/useAuthContext";
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowUpDown,
  User,
  Stethoscope,
  Info,
  CheckCircle2,
  Activity,
} from "lucide-react";

const PAGE_SIZE = 5;

export default function DoctorReview() {
  const { user } = useAuth();
  const doctorId = user?.userId;

  const [allReviews, setAllReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (!doctorId) return;
    fetch(`http://localhost:8080/api/ratings/doctor/${doctorId}`)
      .then((res) => res.json())
      .then((data) => {
        setAllReviews(data || []);
        setPage(0);
      });
  }, [doctorId]);

  // --- Analytics Calculations ---
  const totalRatings = allReviews.length;

  const avgRating =
    totalRatings > 0
      ? (
          allReviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings
        ).toFixed(1)
      : "0.0";

  const getStarPercentage = (star) => {
    if (totalRatings === 0) return 0;
    const count = allReviews.filter(
      (r) => Math.round(r.rating) === star
    ).length;
    return Math.round((count / totalRatings) * 100);
  };

  const sortedReviews = useMemo(() => {
    let result = [...allReviews];
    if (sortBy === "highest") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "lowest") result.sort((a, b) => a.rating - b.rating);
    else result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return result;
  }, [allReviews, sortBy]);

  const totalPages = Math.ceil(sortedReviews.length / PAGE_SIZE);
  const paginatedReviews = sortedReviews.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      {/* 1. DETAILED ANALYTICS HEADER */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Score Card */}
          <div className="md:col-span-4 p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[70px] opacity-20 -mr-16 -mt-16"></div>
            <div>
              <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
                Patient Satisfaction
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-7xl font-black tracking-tighter">
                  {avgRating}
                </span>
                <span className="text-slate-500 text-2xl font-bold">/ 5.0</span>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex gap-1.5 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={22}
                    fill={i < Math.floor(avgRating) ? "currentColor" : "none"}
                    strokeWidth={2.5}
                  />
                ))}
              </div>
              <p className="text-slate-400 text-sm font-medium">
                Based on {totalRatings} verified reviews
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="md:col-span-8 p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm flex flex-col justify-center">
            <h4 className="text-slate-800 text-sm font-bold mb-6 flex items-center gap-2">
              <Activity size={16} className="text-blue-500" /> Rating
              Distribution
            </h4>
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-6">
                  <span className="text-[10px] font-black text-slate-400 w-6">
                    {star}★
                  </span>
                  <div className="flex-1 h-2.5 bg-slate-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
                      style={{ width: `${getStarPercentage(star)}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 w-10 text-right">
                    {getStarPercentage(star)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SORT BAR */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-3">
          Patient Experience
          <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full font-bold">
            {totalRatings} Reviews
          </span>
        </h2>
        <div className="flex items-center gap-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Sort By
          </label>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm focus-within:ring-2 ring-blue-100 transition-all">
            <ArrowUpDown size={14} className="text-blue-500" />
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(0);
              }}
              className="text-xs font-bold text-slate-600 outline-none cursor-pointer bg-transparent"
            >
              <option value="newest">Newest Feedback</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. ROW-BASED CARDS */}
      <div className="space-y-4">
        {paginatedReviews.map((r) => (
          <div
            key={r.appointmentId}
            className="group bg-white border border-slate-100 p-8 rounded-[2.5rem] hover:shadow-2xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:bg-blue-50 transition-colors"></div>

            <div className="flex flex-col lg:flex-row gap-8 relative z-10">
              <div className="lg:w-1/4 border-r border-slate-100 pr-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    <User size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-base">
                      {r.patientName}
                    </h4>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded inline-block">
                      {r.patientGender} • ID: {r.patientId}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                    <MapPin size={14} className="text-slate-300" />{" "}
                    {r.patientCity}
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 flex items-center gap-2">
                    <Info size={14} className="text-slate-300" /> Posted{" "}
                    {new Date(r.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex-1 py-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                    <Stethoscope size={12} className="text-blue-400" />{" "}
                    {r.appointmentReason}
                  </span>
                </div>
                <div className="relative">
                  <Quote
                    className="absolute -top-3 -left-3 text-slate-100 group-hover:text-blue-100 transition-colors"
                    size={40}
                  />
                  <p className="relative z-10 text-slate-600 text-[15px] leading-relaxed pl-6 font-medium">
                    "
                    {r.review || "The patient did not leave a written comment."}
                    "
                  </p>
                </div>
              </div>

              <div className="lg:w-1/5 flex flex-col justify-between items-end text-right border-l border-slate-100 pl-6">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-amber-50 text-amber-600 rounded-[1.5rem] font-black text-2xl border border-amber-100 shadow-sm">
                  <Star size={24} fill="currentColor" />
                  {r.rating.toFixed(1)}
                </div>
                <div className="mt-6 space-y-1.5">
                  <div className="flex items-center justify-end gap-2 text-slate-800 text-xs font-bold">
                    <Calendar size={14} className="text-blue-500" />{" "}
                    {r.appointmentDate}
                  </div>
                  <div className="flex items-center justify-end gap-2 text-slate-400 text-[11px] font-bold">
                    <Clock size={14} /> {r.appointmentTime}
                  </div>
                  <div className="pt-2">
                    <p className="text-[9px] font-black text-slate-300 uppercase bg-slate-50 px-2 py-1 rounded inline-block">
                      Ref #{r.appointmentId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-10 border-t border-slate-100">
          <button
            disabled={page === 0}
            onClick={() => {
              setPage((p) => p - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-20 transition-all"
          >
            <ChevronLeft size={18} /> Previous
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPage(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  page === i
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => {
              setPage((p) => p + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-20 transition-all"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
