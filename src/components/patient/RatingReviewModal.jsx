import { useState } from "react";
import { X, Star } from "lucide-react";
import { useAuth } from "../../context/useAuthContext";
import { toast } from "react-toastify";

export default function RatingReviewModal({ isOpen, onClose, appointment }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(appointment.rating || 0);
  const [review, setReview] = useState(appointment.review || "");

  const isRated = appointment.rated;
  const handleSubmit = async () => {
    if (rating < 1) {
      alert("Please select a rating");
      return;
    }

    try {
      const params = new URLSearchParams({
        appointmentId: appointment.id,
        patientId: user.userId, // must be sent from backend
        rating: rating,
        review: review || "",
      });

      const res = await fetch(
        `http://localhost:8080/api/ratings?${params.toString()}`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        toast.error("Failed to submit rating");
        throw new Error("Failed to submit rating");
      }
      toast.success("Rating submitted successfully");
      appointment.rating = rating;
      appointment.review = review;
      appointment.rated = true;

      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting rating");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">
            Rate Dr. {appointment.doctorName}
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* ⭐ Rating */}
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              disabled={isRated}
              onClick={() => setRating(star)}
            >
              <Star
                size={28}
                className={`${
                  rating >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                } ${isRated ? "cursor-not-allowed" : ""}`}
              />
            </button>
          ))}
        </div>

        {/* 📝 Review */}
        <textarea
          disabled={isRated}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full  rounded-xl p-3 text-sm resize-none disabled:bg-slate-100"
          rows={4}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-xl bg-slate-100"
          >
            Close
          </button>

          {!isRated && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm rounded-xl bg-yellow-500 text-white font-bold"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
