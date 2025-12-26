import { useEffect, useState } from "react";
import DoctorCard from "../../components/patient/DoctorCard";
import BookingModal from "../../components/patient/BookingModal";
import DoctorDetailsModal from "../../components/patient/DoctorDetailsModal";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [viewDoctor, setViewDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/profile/doctor/getDoctors",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setDoctors(data.doctors || []);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((d) => {
    const term = search.toLowerCase();
    return (
      d.name?.toLowerCase().includes(term) ||
      d.specialization?.toLowerCase().includes(term) ||
      d.city?.toLowerCase().includes(term)
    );
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "fee")
      return (a.consultationFee || 0) - (b.consultationFee || 0);
    if (sortBy === "experience")
      return (b.experience || 0) - (a.experience || 0);
    return 0;
  });

  const totalPages = Math.ceil(sortedDoctors.length / itemsPerPage);
  const doctorsToShow = sortedDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* SECTION: HERO & SEARCH */}
      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
            <Sparkles size={16} />
            <span>Find Specialist</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Book your next{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">
              Medical Session
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl font-medium">
            Browse through our verified network of top-tier specialists. Filter
            by rating, experience, or consultation fees.
          </p>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col lg:flex-row gap-4 p-2 bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 transition-all focus-within:border-blue-200">
          <div className="relative flex-[2]">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              placeholder="Search name, specialty, or location..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-14 pr-4 py-4 bg-transparent text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 px-4 border-l border-slate-100">
            <SlidersHorizontal size={18} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent py-4 text-slate-700 font-bold focus:outline-none cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Top Rated</option>
              <option value="fee">Lowest Fee</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>
      </section>

      {/* SECTION: DOCTOR LIST */}
      <div className="grid gap-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-bold">
              Fetching verified specialists...
            </p>
          </div>
        ) : doctorsToShow.length > 0 ? (
          doctorsToShow.map((doctor) => (
            <DoctorCard
              key={doctor.userId}
              doctor={doctor}
              onBook={() => setSelectedDoctor(doctor)}
              onView={() => setViewDoctor(doctor)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
            <MapPin size={48} className="text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">
              No results found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {sortedDoctors.length > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* MODALS */}
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
      {viewDoctor && (
        <DoctorDetailsModal
          doctor={viewDoctor}
          onClose={() => setViewDoctor(null)}
        />
      )}
    </div>
  );
}
