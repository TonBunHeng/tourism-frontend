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

export default function Ratings() {
  const [reviews, setReviews] = useState([]);
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

  const places = ["All", "Angkor Wat", "Royal Palace & Silver Pagoda", "Bayon Temple", "Bokor National Park"];
  const statuses = ["All", "Approved", "Pending", "Rejected"];
  const ratings = ["All", "5", "4", "3", "2", "1"];

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
          likes: r.likes || 0,
        }));
        setReviews(formatted);
        setTotalRecords(res.meta?.total || formatted.length);
        setTotalPages(res.meta?.last_page || Math.ceil((res.meta?.total || formatted.length) / itemsPerPage) || 1);
      }
    } catch (e) {
      console.error("Failed to load reviews:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [currentPage, searchTerm, selectedStatus, selectedRating, selectedPlace, sortBy]);

  const ratingDistribution = [
    { rating: 5, count: reviews.filter(r => r.rating === 5).length },
    { rating: 4, count: reviews.filter(r => r.rating === 4).length },
    { rating: 3, count: reviews.filter(r => r.rating === 3).length },
    { rating: 2, count: reviews.filter(r => r.rating === 2).length },
    { rating: 1, count: reviews.filter(r => r.rating === 1).length }
  ];

  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleStatusFilterChange = (val) => { setSelectedStatus(val); setCurrentPage(1); };
  const handleRatingChange = (val) => { setSelectedRating(val); setCurrentPage(1); };
  const handlePlaceChange = (val) => { setSelectedPlace(val); setCurrentPage(1); };
  const handleSortChange = (val) => { setSortBy(val); setCurrentPage(1); };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + reviews.length, totalRecords);

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setIsDetailsOpen(true);
  };

  const handleOpenReplyModal = (review) => {
    setSelectedReview(review);
    setIsReplyModalOpen(true);
  };

  const handleAddReply = async (reviewId) => {
    if (replyText.trim() && reviewId) {
      try {
        await reviewService.addReply(reviewId, replyText);
        setReplyText("");
        setIsReplyModalOpen(false);
        loadReviews();
      } catch (e) {
        alert(e.message || "Failed to submit reply.");
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await reviewService.updateReview(id, { status: newStatus });
      loadReviews();
    } catch (e) {
      alert(e.message || "Failed to update review status.");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <RatingsHeader onOpenAnalytics={() => setIsAnalyticsOpen(true)} />

      {/* Stats Cards */}
      <RatingsStats reviews={reviews} />

      {/* Rating Distribution & Sentiment */}
      <RatingsSentiment reviews={reviews} ratingDistribution={ratingDistribution} />

      {/* Reviews Container */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        {/* Toolbar */}
        <RatingsToolbar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusFilterChange}
          statuses={statuses}
          selectedRating={selectedRating}
          onRatingChange={handleRatingChange}
          ratings={ratings}
          selectedPlace={selectedPlace}
          onPlaceChange={handlePlaceChange}
          places={places}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {isLoading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
            Loading reviews from API...
          </div>
        ) : viewMode === "feed" ? (
          <ReviewsList
            reviews={reviews}
            onViewDetails={handleViewDetails}
            onStatusChange={handleStatusChange}
            onOpenReplyModal={handleOpenReplyModal}
          />
        ) : (
          <>
            {/* Mobile View */}
            <RatingsGrid
              reviews={reviews}
              onStatusChange={handleStatusChange}
              onViewDetails={handleViewDetails}
            />

            {/* Desktop View */}
            <RatingsTable
              reviews={reviews}
              onStatusChange={handleStatusChange}
              onViewDetails={handleViewDetails}
              startIndex={startIndex}
            />
          </>
        )}

        {/* Pagination Footer */}
        {totalRecords > 0 && (
          <div className="p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-input-dark-bg)]/40">
            <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{" "}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{" "}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{totalRecords}</span> ratings & reviews
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[var(--color-primary)] text-white shadow-sm font-bold"
                        : "border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Review Details Modal */}
      <ReviewDetailsModal
        isOpen={isDetailsOpen}
        review={selectedReview}
        onClose={() => setIsDetailsOpen(false)}
        onStatusChange={handleStatusChange}
      />

      {/* Admin Reply Modal */}
      <ReviewReplyModal
        isOpen={isReplyModalOpen}
        review={selectedReview}
        onClose={() => setIsReplyModalOpen(false)}
        replyText={replyText}
        onReplyTextChange={setReplyText}
        onSendReply={handleAddReply}
      />

      {/* Ratings Analytics Modal */}
      <RatingsAnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        reviews={reviews}
      />
    </div>
  );
}
