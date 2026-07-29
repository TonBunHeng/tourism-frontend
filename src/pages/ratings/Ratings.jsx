import { useState } from 'react';
import { Star, Search, Eye, Trash2, User, Calendar, MapPin, ThumbsUp, ThumbsDown, MessageSquare, ChevronDown, Check, X, Clock, Download, Image as ImageIcon, Share2 } from 'lucide-react';

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

  const stats = [
    {
      label: 'Total Reviews',
      value: reviews.length,
      icon: MessageSquare,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Average Rating',
      value: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0.0',
      icon: Star,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      label: 'Total Likes',
      value: reviews.reduce((sum, r) => sum + r.likes, 0).toLocaleString(),
      icon: ThumbsUp,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Pending Reviews',
      value: reviews.filter(r => r.status === 'Pending').length,
      icon: Clock,
      color: 'text-orange-500 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

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

  const getStatusColor = (status) => {
    const colors = {
      'Approved': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
      'Pending': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
      'Rejected': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
    };
    return colors[status] || colors['Pending'];
  };

  const renderStars = (rating, size = 'sm') => {
    const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'} ${starSize}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Ratings & Reviews
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage user reviews and ratings across all destinations
            </p>
          </div>
          <div className="grid grid-cols-2 md:flex gap-2 md:gap-3">
            <button className="flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Download size={18} className="shrink-0"/>
              <span className="font-medium text-xs md:text-sm">Export</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
              <Share2 size={18} className="shrink-0"/>
              <span className="font-medium text-xs md:text-sm">Share Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.rating} className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1 w-10 sm:w-16 shrink-0">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.rating}</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${reviews.length > 0 ? (item.count / reviews.length) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 w-8 sm:w-12 text-right shrink-0">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Overall Sentiment</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">Positive</span>
              </div>
              <span className="text-sm font-bold text-green-700 dark:text-green-400">
                {reviews.length > 0 ? Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Neutral</span>
              </div>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                {reviews.length > 0 ? Math.round((reviews.filter(r => r.rating === 3).length / reviews.length) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <div className="flex items-center gap-2">
                <ThumbsDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-red-700 dark:text-red-400">Negative</span>
              </div>
              <span className="text-sm font-bold text-red-700 dark:text-red-400">
                {reviews.length > 0 ? Math.round((reviews.filter(r => r.rating <= 2).length / reviews.length) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex-1">
        {/* Toolbar */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">All Reviews</h2>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Rating Filter */}
              <div className="relative">
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  <option value="All">All Ratings</option>
                  {ratings.filter(r => r !== 'All').map(r => (
                    <option key={r} value={r}>{r} Stars</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Place Filter */}
              <div className="relative">
                <select
                  value={selectedPlace}
                  onChange={(e) => setSelectedPlace(e.target.value)}
                  className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  {places.map(place => (
                    <option key={place} value={place}>{place}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="most_likes">Most Likes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: stacked cards instead of a squeezed table */}
        <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
          {sortedReviews.length > 0 ? (
            sortedReviews.map((review) => (
              <div key={review.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <review.avatar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{review.user}</p>
                      <span className={`shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{review.title}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-0.5 min-w-0">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{review.place}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {renderStars(review.rating)}
                      <span className="flex items-center gap-0.5 text-xs text-gray-500 dark:text-gray-400">
                        <ThumbsUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                        {review.likes}
                      </span>
                      {review.verified && (
                        <span className="text-xs flex items-center gap-0.5 text-blue-600 dark:text-blue-400">
                          <Check className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {review.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(review.id, 'Approved')}
                            className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(review.id, 'Rejected')}
                            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleViewDetails(review)}
                        className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No reviews found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Desktop / tablet: full table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50/50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Place</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Likes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {sortedReviews.length > 0 ? (
                sortedReviews.map((review, index) => (
                  <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0">
                          <review.avatar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.user}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{review.title}</p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {review.date}
                            </span>
                            {review.verified && (
                              <span className="text-xs flex items-center gap-0.5 text-blue-600 dark:text-blue-400">
                                <Check className="w-3 h-3" />
                                Verified
                              </span>
                            )}
                            {review.images && review.images.length > 0 && (
                              <span className="text-xs text-gray-400 dark:text-gray-500">
                                <ImageIcon className="w-3 h-3" /> {review.images.length} photos
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                        {review.place}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStars(review.rating)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          <ThumbsUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                          <span>{review.likes}</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <ThumbsDown className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                          <span>{review.dislikes}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(review.status)}`}>
                        <Clock className="w-3 h-3" />
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-1">
                        {review.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(review.id, 'Approved')}
                              className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(review.id, 'Rejected')}
                              className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleViewDetails(review)}
                          className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <div className="text-6xl mb-4">⭐</div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No reviews found</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Details Modal (Dark Theme Styled) */}
      {isDetailsOpen && selectedReview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <selectedReview.avatar className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">Review Details</h3>
                  <p className="text-xs text-gray-400">ID: #{selectedReview.id}</p>
                </div>
              </div>
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">User</span>
                <p className="text-base font-semibold text-white mt-1 flex items-center gap-2">
                  {selectedReview.user}
                  {selectedReview.verified && (
                    <span className="text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded-full border border-blue-800 inline-flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{selectedReview.date}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Place</span>
                  <p className="text-sm font-medium text-blue-400 mt-1 truncate">{selectedReview.place}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedReview.category}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Rating & Status</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    {renderStars(selectedReview.rating)}
                    <span className="text-sm font-medium text-amber-400">({selectedReview.rating})</span>
                  </div>
                  <p className="text-xs text-green-400 mt-0.5">{selectedReview.status}</p>
                </div>
              </div>

              <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Review Title</span>
                <p className="text-sm font-semibold text-white mt-1">{selectedReview.title}</p>
              </div>

              <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Comment</span>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">{selectedReview.comment}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
                  <span className="text-xs text-gray-400">Likes</span>
                  <p className="text-base font-bold text-white mt-0.5">{selectedReview.likes}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
                  <span className="text-xs text-gray-400">Dislikes</span>
                  <p className="text-base font-bold text-white mt-0.5">{selectedReview.dislikes}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
                  <span className="text-xs text-gray-400">Replies</span>
                  <p className="text-base font-bold text-white mt-0.5">{selectedReview.replies}</p>
                </div>
              </div>

              {selectedReview.images && selectedReview.images.length > 0 && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">Attached Images</span>
                  <div className="flex gap-2 flex-wrap">
                    {selectedReview.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Review image ${idx + 1}`}
                        className="w-20 h-20 rounded-xl object-cover border border-gray-800"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
              {selectedReview.status === 'Pending' && (
                <button
                  type="button"
                  onClick={() => {
                    handleStatusChange(selectedReview.id, 'Approved');
                    setIsDetailsOpen(false);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  const rev = selectedReview;
                  setIsDetailsOpen(false);
                  handleDelete(rev.id);
                }}
                className="py-2.5 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 font-medium text-sm transition-colors flex items-center gap-2 border border-red-800/50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}