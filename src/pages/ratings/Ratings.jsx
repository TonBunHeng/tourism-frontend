import { useState, useEffect } from "react";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import RatingsHeader from "./RatingsHeader";
import RatingsStats from "./RatingsStats";
import RatingsSentiment from "./RatingsSentiment";
import RatingsToolbar from "./RatingsToolbar";
import RatingsGrid from "./RatingsGrid";
import RatingsTable from "./RatingsTable";
import ReviewsList from "./ReviewsList";
import ReviewDetailsModal from "./ReviewDetailsModal";
import ReviewReplyModal from "./ReviewReplyModal";
import RatingsAnalyticsModal from "./RatingsAnalyticsModal";
import reviewService from "../../services/reviewService";
import placeService from "../../services/placeService";

export default function Ratings() {
  const [reviews, setReviews] = useState([]);
  const [places, setPlaces] = useState(["All"]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState("All");
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [sortBy, setSortBy] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const statuses = ["All", "Approved", "Pending", "Rejected"];
  const ratings = ["All", "5", "4", "3", "2", "1"];

  useEffect(() => {
    const fetchPlacesList = async () => {
      try {
        const res = await placeService.getPlaces({ per_page: 100 });
        if (res.success && res.data) {
          const names = ["All", ...res.data.map((p) => p.name)];
          setPlaces(names);
        }
      } catch (e) {
        console.error("Failed to load places filter list from API", e);
      }
    };
    fetchPlacesList();
  }, []);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: itemsPerPage,
      };
      if (searchTerm) params.search = searchTerm;
      if (selectedStatus !== "All") params.status = selectedStatus;
      if (selectedRating !== "All") params.rating = selectedRating;

      const res = await reviewService.getReviews(params);
      if (res.success && res.data) {
        const formatted = res.data.map(r => ({
          ...r,
          user: r.user || { name: "Anonymous", email: "user@example.com" },
          place: r.place || { name: "General Attraction" },
          title: r.title || "User Review",
          comment: r.comment || "",
          status: r.status || "Approved",
          replies: r.replies || [],
        }));
        setReviews(formatted);
        if (res.meta) {
          setTotalRecords(res.meta.total || formatted.length);
          setTotalPages(res.meta.last_page || 1);
        } else {
          setTotalRecords(formatted.length);
          setTotalPages(Math.ceil(formatted.length / itemsPerPage) || 1);
        }
      }
    } catch (e) {
      console.error("Failed to load reviews from API", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [currentPage, searchTerm, selectedStatus, selectedRating]);

  // Client side filtering for places & sorting
  const filteredReviews = reviews.filter((review) => {
    const matchesPlace =
      selectedPlace === "All" || review.place?.name === selectedPlace;
    return matchesPlace;
  }).sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    if (sortBy === "most-replies") return (b.replies?.length || 0) - (a.replies?.length || 0);
    return new Date(b.created_at || b.date) - new Date(a.created_at || a.date);
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await reviewService.updateReviewStatus(id, newStatus);
      loadReviews();
    } catch (e) {
      console.error("Failed to update review status", e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await reviewService.deleteReview(id);
      loadReviews();
    } catch (e) {
      console.error("Failed to delete review", e);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedReview) return;
    try {
      await reviewService.replyToReview(selectedReview.id, { comment: replyText });
      setReplyText("");
      setIsReplyModalOpen(false);
      loadReviews();
    } catch (e) {
      console.error("Failed to reply to review", e);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <RatingsHeader
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      <RatingsStats reviews={reviews} />

      <RatingsSentiment reviews={reviews} />

      <RatingsToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        places={places}
        statuses={statuses}
        ratings={ratings}
      />

      {viewMode === "table" ? (
        <RatingsTable
          reviews={filteredReviews}
          isLoading={isLoading}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onView={(rev) => { setSelectedReview(rev); setIsDetailsOpen(true); }}
          onReply={(rev) => { setSelectedReview(rev); setIsReplyModalOpen(true); }}
        />
      ) : (
        <RatingsGrid
          reviews={filteredReviews}
          isLoading={isLoading}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onView={(rev) => { setSelectedReview(rev); setIsDetailsOpen(true); }}
          onReply={(rev) => { setSelectedReview(rev); setIsReplyModalOpen(true); }}
        />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 rounded-lg border">
        <p className="text-xs text-gray-700">
          Showing <span className="font-medium">{filteredReviews.length}</span> of{" "}
          <span className="font-medium">{totalRecords}</span> reviews
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="flex items-center gap-1 px-3 py-1 text-xs border rounded-md disabled:opacity-40 hover:bg-gray-50"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="flex items-center gap-1 px-3 py-1 text-xs border rounded-md disabled:opacity-40 hover:bg-gray-50"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <ReviewDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        review={selectedReview}
        onStatusChange={handleStatusChange}
        onReply={() => { setIsDetailsOpen(false); setIsReplyModalOpen(true); }}
      />

      <ReviewReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        review={selectedReview}
        replyText={replyText}
        setReplyText={setReplyText}
        onSubmit={handleReplySubmit}
      />

      <RatingsAnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        reviews={reviews}
      />
    </div>
  );
}
