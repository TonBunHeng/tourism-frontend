import { useState } from 'react';
import { User } from 'lucide-react';
import RatingsHeader from './RatingsHeader';
import RatingsStats from './RatingsStats';
import RatingsSentiment from './RatingsSentiment';
import RatingsToolbar from './RatingsToolbar';
import RatingsGrid from './RatingsGrid';
import RatingsTable from './RatingsTable';
import ReviewDetailsModal from './ReviewDetailsModal';

export default function Ratings() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'Sokha P.',
      avatar: User,
      place: 'Angkor Wat',
      category: 'Temple',
      rating: 5,
      title: 'Absolutely breathtaking!',
      comment: 'One of the most magnificent temples I have ever visited. The sunrise view was unforgettable. A must-visit for anyone coming to Cambodia.',
      date: '2024-01-15',
      likes: 245,
      dislikes: 12,
      replies: 18,
      status: 'Approved',
      verified: true,
      images: ['https://images.unsplash.com/photo-1583418037743-c2e994c1222d?w=200&h=150&fit=crop']
    },
    {
      id: 2,
      user: 'David C.',
      avatar: User,
      place: 'Phnom Penh Royal Palace',
      category: 'Palace',
      rating: 4,
      title: 'Beautiful architecture',
      comment: 'The Royal Palace is stunning with intricate Khmer architecture. The gardens are well-maintained. Highly recommended!',
      date: '2024-01-20',
      likes: 134,
      dislikes: 8,
      replies: 12,
      status: 'Approved',
      verified: false,
      images: []
    },
    {
      id: 3,
      user: 'Maria L.',
      avatar: User,
      place: 'Siem Reap Night Market',
      category: 'Market',
      rating: 3,
      title: 'Good but crowded',
      comment: 'Great variety of souvenirs and street food. However, it gets extremely crowded in the evening. Go early if you want to avoid the crowds.',
      date: '2024-01-25',
      likes: 67,
      dislikes: 23,
      replies: 5,
      status: 'Pending',
      verified: false,
      images: ['https://images.unsplash.com/photo-1557732660-2b27a4b6a16e?w=200&h=150&fit=crop']
    },
    {
      id: 4,
      user: 'James R.',
      avatar: User,
      place: 'Koh Rong Island',
      category: 'Beach',
      rating: 5,
      title: 'Paradise found!',
      comment: 'White sandy beaches, crystal clear water, and amazing snorkeling. The boat trip from Sihanoukville was worth it.',
      date: '2024-02-01',
      likes: 189,
      dislikes: 5,
      replies: 22,
      status: 'Approved',
      verified: true,
      images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop']
    },
    {
      id: 5,
      user: 'Sophie N.',
      avatar: User,
      place: 'Battambang Countryside',
      category: 'Nature',
      rating: 4,
      title: 'Peaceful escape',
      comment: 'The countryside is beautiful with rice paddies and rural villages. The bamboo train was a fun experience.',
      date: '2024-02-10',
      likes: 92,
      dislikes: 3,
      replies: 8,
      status: 'Approved',
      verified: false,
      images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=150&fit=crop']
    },
    {
      id: 6,
      user: 'Thomas K.',
      avatar: User,
      place: 'Killing Caves',
      category: 'Historical',
      rating: 5,
      title: 'Important historical site',
      comment: 'A somber but important place to visit to understand Cambodia\'s history. The memorial is well-maintained and respectful.',
      date: '2024-02-15',
      likes: 156,
      dislikes: 4,
      replies: 15,
      status: 'Pending',
      verified: false,
      images: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState('All');
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

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
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.place.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || review.status === selectedStatus;
    const matchesRating = selectedRating === 'All' || review.rating === parseInt(selectedRating);
    const matchesPlace = selectedPlace === 'All' || review.place === selectedPlace;
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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setIsDetailsOpen(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, status: newStatus } : review
    ));
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <RatingsHeader />

      {/* Stats Cards */}
      <RatingsStats reviews={reviews} />

      {/* Rating Distribution & Sentiment */}
      <RatingsSentiment reviews={reviews} ratingDistribution={ratingDistribution} />

      {/* Reviews Table Container */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex-1">
        {/* Toolbar */}
        <RatingsToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          statuses={statuses}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          ratings={ratings}
          selectedPlace={selectedPlace}
          onPlaceChange={setSelectedPlace}
          places={places}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Mobile View */}
        <RatingsGrid
          reviews={sortedReviews}
          onStatusChange={handleStatusChange}
          onViewDetails={handleViewDetails}
          onDelete={handleDelete}
        />

        {/* Desktop View */}
        <RatingsTable
          reviews={sortedReviews}
          onStatusChange={handleStatusChange}
          onViewDetails={handleViewDetails}
          onDelete={handleDelete}
        />
      </div>

      {/* Review Details Modal */}
      <ReviewDetailsModal
        isOpen={isDetailsOpen}
        review={selectedReview}
        onClose={() => setIsDetailsOpen(false)}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}