import { useState } from 'react';
import {
  User,
  Landmark,
  Crown,
  Store,
  Umbrella,
  Leaf,
  Flame,
  Sunrise
} from 'lucide-react';
import ReviewsHeader from './ReviewsHeader';
import ReviewsStats from './ReviewsStats';
import ReviewsRatingSummary from './ReviewsRatingSummary';
import ReviewsToolbar from './ReviewsToolbar';
import ReviewsList from './ReviewsList';
import { renderStars } from '../../utils/StatusUtils';
import ReviewDetailsModal from './ReviewDetailsModal';
import ReviewReplyModal from './ReviewReplyModal';

export default function Reviews() {
  // Default data
  const defaultReviews = [
    {
      id: 1,
      user: {
        name: 'Sokha P.',
        avatar: User,
        email: 'sokha@email.com',
        verified: true,
        memberSince: '2023-06-15',
        totalReviews: 12
      },
      place: {
        name: 'Angkor Wat',
        category: 'Temple',
        location: 'Siem Reap',
        image: Landmark
      },
      rating: 5,
      title: 'Absolutely breathtaking!',
      comment: 'One of the most magnificent temples I have ever visited. The sunrise view was unforgettable. A must-visit for anyone coming to Cambodia. The intricate carvings and historical significance make this place truly special.',
      date: '2024-01-15',
      likes: 245,
      dislikes: 12,
      replies: [
        {
          id: 1,
          user: 'Admin',
          comment: 'Thank you for your wonderful review! We\'re glad you enjoyed your visit.',
          date: '2024-01-16'
        }
      ],
      status: 'Published',
      featured: true,
      images: ['https://images.unsplash.com/photo-1583418037743-c2e994c1222d?w=200&h=150&fit=crop'],
      helpful: 89,
      reported: false
    },
    {
      id: 2,
      user: {
        name: 'David C.',
        avatar: User,
        email: 'david@email.com',
        verified: false,
        memberSince: '2023-08-20',
        totalReviews: 5
      },
      place: {
        name: 'Phnom Penh Royal Palace',
        category: 'Palace',
        location: 'Phnom Penh',
        image: Crown
      },
      rating: 4,
      title: 'Beautiful architecture',
      comment: 'The Royal Palace is stunning with intricate Khmer architecture. The gardens are well-maintained and the Silver Pagoda is a must-see. Highly recommended for history enthusiasts.',
      date: '2024-01-20',
      likes: 134,
      dislikes: 8,
      replies: [],
      status: 'Published',
      featured: false,
      images: [],
      helpful: 45,
      reported: false
    },
    {
      id: 3,
      user: {
        name: 'Maria L.',
        avatar: User,
        email: 'maria@email.com',
        verified: false,
        memberSince: '2024-01-05',
        totalReviews: 3
      },
      place: {
        name: 'Siem Reap Night Market',
        category: 'Market',
        location: 'Siem Reap',
        image: Store
      },
      rating: 3,
      title: 'Good but crowded',
      comment: 'Great variety of souvenirs and street food. However, it gets extremely crowded in the evening. Go early if you want to avoid the crowds and get better prices.',
      date: '2024-01-25',
      likes: 67,
      dislikes: 23,
      replies: [],
      status: 'Pending',
      featured: false,
      images: ['https://images.unsplash.com/photo-1557732660-2b27a4b6a16e?w=200&h=150&fit=crop'],
      helpful: 23,
      reported: false
    },
    {
      id: 4,
      user: {
        name: 'James R.',
        avatar: User,
        email: 'james@email.com',
        verified: true,
        memberSince: '2023-03-10',
        totalReviews: 18
      },
      place: {
        name: 'Koh Rong Island',
        category: 'Beach',
        location: 'Sihanoukville',
        image: Umbrella
      },
      rating: 5,
      title: 'Paradise found!',
      comment: 'White sandy beaches, crystal clear water, and amazing snorkeling. The boat trip from Sihanoukville was worth it. Perfect for relaxation and water activities.',
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
      status: 'Published',
      featured: true,
      images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop'],
      helpful: 67,
      reported: false
    },
    {
      id: 5,
      user: {
        name: 'Sophie N.',
        avatar: User,
        email: 'sophie@email.com',
        verified: false,
        memberSince: '2023-11-01',
        totalReviews: 7
      },
      place: {
        name: 'Battambang Countryside',
        category: 'Nature',
        location: 'Battambang',
        image: Leaf
      },
      rating: 4,
      title: 'Peaceful escape',
      comment: 'The countryside is beautiful with rice paddies and rural villages. The bamboo train was a fun experience. Great for photography and experiencing rural life.',
      date: '2024-02-10',
      likes: 92,
      dislikes: 3,
      replies: [],
      status: 'Published',
      featured: false,
      images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=150&fit=crop'],
      helpful: 34,
      reported: false
    },
    {
      id: 6,
      user: {
        name: 'Thomas K.',
        avatar: User,
        email: 'thomas@email.com',
        verified: false,
        memberSince: '2024-01-28',
        totalReviews: 2
      },
      place: {
        name: 'Killing Caves',
        category: 'Historical',
        location: 'Battambang',
        image: Flame
      },
      rating: 5,
      title: 'Important historical site',
      comment: 'A somber but important place to visit to understand Cambodia\'s history. The memorial is well-maintained and respectful. A meaningful experience.',
      date: '2024-02-15',
      likes: 156,
      dislikes: 4,
      replies: [],
      status: 'Pending',
      featured: false,
      images: [],
      helpful: 56,
      reported: true
    },
    {
      id: 7,
      user: {
        name: 'Emma W.',
        avatar: User,
        email: 'emma@email.com',
        verified: true,
        memberSince: '2023-09-15',
        totalReviews: 9
      },
      place: {
        name: 'Tonle Sap Lake',
        category: 'Nature',
        location: 'Siem Reap',
        image: Sunrise
      },
      rating: 4,
      title: 'Unique floating village experience',
      comment: 'Visiting the floating villages on Tonle Sap was eye-opening. The community is resilient and the scenery is beautiful. Highly recommend taking a boat tour.',
      date: '2024-02-20',
      likes: 78,
      dislikes: 6,
      replies: [],
      status: 'Published',
      featured: false,
      images: ['https://images.unsplash.com/photo-1542131596-7a4ffc23f2f4?w=200&h=150&fit=crop'],
      helpful: 29,
      reported: false
    }
  ];

  const [reviews, setReviews] = useState(defaultReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Temple', 'Palace', 'Market', 'Beach', 'Nature', 'Historical'];
  const statuses = ['All', 'Published', 'Pending', 'Flagged', 'Archived'];
  const ratings = ['All', '5', '4', '3', '2', '1'];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || review.status === selectedStatus;
    const matchesRating = selectedRating === 'All' || review.rating === parseInt(selectedRating);
    const matchesCategory = selectedCategory === 'All' || review.place.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesRating && matchesCategory;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    if (sortBy === 'most_likes') return b.likes - a.likes;
    if (sortBy === 'most_helpful') return b.helpful - a.helpful;
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

  const handleOpenReplyModal = (review) => {
    setSelectedReview(review);
    setIsReplyModalOpen(true);
  };

  const handleAddReply = (reviewId) => {
    if (replyText.trim()) {
      setReviews(reviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            replies: [
              ...review.replies,
              {
                id: review.replies.length + 1,
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

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all reviews to default? This will restore all original reviews and cannot be undone.')) {
      setReviews(defaultReviews);
      setSearchTerm('');
      setSelectedStatus('All');
      setSelectedRating('All');
      setSelectedCategory('All');
      setSortBy('newest');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSelectedRating('All');
    setSelectedCategory('All');
    setSortBy('newest');
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <ReviewsHeader onReset={handleReset} />

      {/* Stats Cards */}
      <ReviewsStats reviews={reviews} />

      {/* Quick Rating Summary */}
      <ReviewsRatingSummary reviews={reviews} renderStars={renderStars} />

      {/* Reviews List Container */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-2xl shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        {/* Toolbar */}
        <ReviewsToolbar
          totalCount={filteredReviews.length}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          statuses={statuses}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          ratings={ratings}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearFilters={handleClearFilters}
        />

        {/* Reviews Feed */}
        <ReviewsList
          reviews={sortedReviews}
          onViewDetails={handleViewDetails}
          onStatusChange={handleStatusChange}
          onOpenReplyModal={handleOpenReplyModal}
          onDelete={handleDelete}
        />
      </div>

      {/* Review Details Modal */}
      <ReviewDetailsModal
        isOpen={isDetailsOpen}
        review={selectedReview}
        onClose={() => setIsDetailsOpen(false)}
        onOpenReplyModal={handleOpenReplyModal}
      />

      {/* Reply Modal */}
      <ReviewReplyModal
        isOpen={isReplyModalOpen}
        review={selectedReview}
        onClose={() => setIsReplyModalOpen(false)}
        replyText={replyText}
        onReplyTextChange={setReplyText}
        onSendReply={handleAddReply}
      />
    </div>
  );
}