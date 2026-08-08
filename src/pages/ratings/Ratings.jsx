import { useState } from 'react';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';
import RatingsHeader from './RatingsHeader';
import RatingsStats from './RatingsStats';
import RatingsSentiment from './RatingsSentiment';
import RatingsToolbar from './RatingsToolbar';
import RatingsGrid from './RatingsGrid';
import RatingsTable from './RatingsTable';
import ReviewsList from './ReviewsList';
import ReviewDetailsModal from './ReviewDetailsModal';
import ReviewReplyModal from './ReviewReplyModal';
import RatingsAnalyticsModal from './RatingsAnalyticsModal';

export default function Ratings() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: { name: 'Sokha P.', avatar: User, verified: true },
      place: { name: 'Angkor Wat', location: 'Siem Reap' },
      category: 'Temple',
      rating: 5,
      title: 'Absolutely breathtaking!',
      comment: 'One of the most magnificent temples I have ever visited. The sunrise view was unforgettable. A must-visit for anyone coming to Cambodia.',
      date: '2024-01-15',
      likes: 245,
      dislikes: 12,
      replies: [
        {
          id: 1,
          user: 'Admin',
          comment: 'Thank you for your wonderful feedback! We are glad you enjoyed your visit.',
          date: '2024-01-16'
        }
      ],
      status: 'Approved',
      verified: true,
      images: ['https://images.unsplash.com/photo-1583418037743-c2e994c1222d?w=200&h=150&fit=crop']
    },
    {
      id: 2,
      user: { name: 'David C.', avatar: User, verified: false },
      place: { name: 'Phnom Penh Royal Palace', location: 'Phnom Penh' },
      category: 'Palace',
      rating: 4,
      title: 'Beautiful architecture',
      comment: 'The Royal Palace is stunning with intricate Khmer architecture. The gardens are well-maintained. Highly recommended!',
      date: '2024-01-20',
      likes: 134,
      dislikes: 8,
      replies: [],
      status: 'Approved',
      verified: false,
      images: []
    },
    {
      id: 3,
      user: { name: 'Maria L.', avatar: User, verified: false },
      place: { name: 'Siem Reap Night Market', location: 'Siem Reap' },
      category: 'Market',
      rating: 3,
      title: 'Good but crowded',
      comment: 'Great variety of souvenirs and street food. However, it gets extremely crowded in the evening. Go early if you want to avoid the crowds.',
      date: '2024-01-25',
      likes: 67,
      dislikes: 23,
      replies: [],
      status: 'Pending',
      verified: false,
      images: ['https://images.unsplash.com/photo-1557732660-2b27a4b6a16e?w=200&h=150&fit=crop']
    },
    {
      id: 4,
      user: { name: 'James R.', avatar: User, verified: true },
      place: { name: 'Koh Rong Island', location: 'Sihanoukville' },
      category: 'Beach',
      rating: 5,
      title: 'Paradise found!',
      comment: 'White sandy beaches, crystal clear water, and amazing snorkeling. The boat trip from Sihanoukville was worth it.',
      date: '2024-02-01',
      likes: 189,
      dislikes: 5,
      replies: [
        {
          id: 2,
          user: 'Admin',
          comment: 'We\'re thrilled you enjoyed Koh Rong! It\'s truly a hidden gem.',
          date: '2024-02-02'
        }
      ],
      status: 'Approved',
      verified: true,
      images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop']
    },
    {
      id: 5,
      user: { name: 'Sophie N.', avatar: User, verified: false },
      place: { name: 'Battambang Countryside', location: 'Battambang' },
      category: 'Nature',
      rating: 4,
      title: 'Peaceful escape',
      comment: 'The countryside is beautiful with rice paddies and rural villages. The bamboo train was a fun experience.',
      date: '2024-02-10',
      likes: 92,
      dislikes: 3,
      replies: [],
      status: 'Approved',
      verified: false,
      images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=150&fit=crop']
    },
    {
      id: 6,
      user: { name: 'Thomas K.', avatar: User, verified: false },
      place: { name: 'Killing Caves', location: 'Battambang' },
      category: 'Historical',
      rating: 5,
      title: 'Important historical site',
      comment: 'A somber but important place to visit to understand Cambodia\'s history. The memorial is well-maintained and respectful.',
      date: '2024-02-15',
      likes: 156,
      dislikes: 4,
      replies: [],
      status: 'Pending',
      verified: false,
      images: []
    },
    {
      id: 7,
      user: { name: 'Emma W.', avatar: User, verified: true },
      place: { name: 'Preah Vihear Temple', location: 'Preah Vihear' },
      category: 'Temple',
      rating: 5,
      title: 'Majestic cliff top temple',
      comment: 'The cliff top views are incredible. Breathtaking architecture and history.',
      date: '2024-02-20',
      likes: 142,
      dislikes: 2,
      replies: [],
      status: 'Approved',
      verified: true,
      images: []
    },
    {
      id: 8,
      user: { name: 'Vannak M.', avatar: User, verified: true },
      place: { name: 'Bokor National Park', location: 'Kampot' },
      category: 'Nature',
      rating: 4,
      title: 'Cool mountain air',
      comment: 'Great views and cool breeze. Loved exploring the old buildings.',
      date: '2024-02-24',
      likes: 88,
      dislikes: 1,
      replies: [],
      status: 'Approved',
      verified: true,
      images: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState('All');
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [sortBy, setSortBy] = useState('newest');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const places = ['All', 'Angkor Wat', 'Phnom Penh Royal Palace', 'Siem Reap Night Market', 'Koh Rong Island', 'Battambang Countryside', 'Killing Caves'];
  const statuses = ['All', 'Approved', 'Pending', 'Rejected'];
  const ratings = ['All', '5', '4', '3', '2', '1'];

  const ratingDistribution = [
    { rating: 5, count: reviews.filter(r => r.rating === 5).length },
    { rating: 4, count: reviews.filter(r => r.rating === 4).length },
    { rating: 3, count: reviews.filter(r => r.rating === 3).length },
    { rating: 2, count: reviews.filter(r => r.rating === 2).length },
    { rating: 1, count: reviews.filter(r => r.rating === 1).length }
  ];

  const filteredReviews = reviews.filter(review => {
    const userName = typeof review.user === 'object' ? review.user.name : review.user;
    const placeName = typeof review.place === 'object' ? review.place.name : review.place;

    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         placeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || review.status === selectedStatus;
    const matchesRating = selectedRating === 'All' || review.rating === parseInt(selectedRating);
    const matchesPlace = selectedPlace === 'All' || placeName === selectedPlace;
    return matchesSearch && matchesStatus && matchesRating && matchesPlace;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    if (sortBy === 'most_likes') return b.likes - a.likes;
    return 0;
  });

  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleStatusFilterChange = (val) => { setSelectedStatus(val); setCurrentPage(1); };
  const handleRatingChange = (val) => { setSelectedRating(val); setCurrentPage(1); };
  const handlePlaceChange = (val) => { setSelectedPlace(val); setCurrentPage(1); };
  const handleSortChange = (val) => { setSortBy(val); setCurrentPage(1); };

  const totalRecords = sortedReviews.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedReviews = sortedReviews.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setIsDetailsOpen(true);
  };

  const handleOpenReplyModal = (review) => {
    setSelectedReview(review);
    setIsReplyModalOpen(true);
  };

  const handleAddReply = (reviewId) => {
    if (replyText.trim()) {
      setReviews(reviews.map(review => {
        if (review.id === reviewId) {
          const currentReplies = Array.isArray(review.replies) ? review.replies : [];
          return {
            ...review,
            replies: [
              ...currentReplies,
              {
                id: currentReplies.length + 1,
                user: 'Admin',
                comment: replyText,
                date: new Date().toISOString().split('T')[0]
              }
            ]
          };
        }
        return review;
      }));
      setReplyText('');
      setIsReplyModalOpen(false);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, status: newStatus } : review
    ));
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

        {viewMode === 'feed' ? (
          <ReviewsList
            reviews={paginatedReviews}
            onViewDetails={handleViewDetails}
            onStatusChange={handleStatusChange}
            onOpenReplyModal={handleOpenReplyModal}
          />
        ) : (
          <>
            {/* Mobile View */}
            <RatingsGrid
              reviews={paginatedReviews}
              onStatusChange={handleStatusChange}
              onViewDetails={handleViewDetails}
            />

            {/* Desktop View */}
            <RatingsTable
              reviews={paginatedReviews}
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
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{' '}
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
                        ? 'bg-[var(--color-primary)] text-white shadow-sm font-bold'
                        : 'border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-gray-100 dark:hover:bg-gray-800'
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