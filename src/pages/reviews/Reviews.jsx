import { useState } from 'react';
import { Search, Trash2, Eye, Star, User, Calendar, MapPin, ThumbsUp, ThumbsDown, MessageSquare, ChevronDown, X, Check, Clock, Award, Flag, Reply, Send, Download, RotateCcw, Landmark, Crown, Store, Umbrella, Leaf, Flame, Sunrise, Bot, FileText, BarChart2 } from 'lucide-react';

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
      label: 'Pending Reviews',
      value: reviews.filter(r => r.status === 'Pending').length,
      icon: Clock,
      color: 'text-orange-500 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      label: 'Flagged Reviews',
      value: reviews.filter(r => r.reported).length,
      icon: Flag,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20'
    }
  ];

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

  const getStatusColor = (status) => {
    const colors = {
      'Published': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
      'Pending': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
      'Flagged': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
      'Archived': 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600'
    };
    return colors[status] || colors['Pending'];
  };

  const getRatingLabel = (rating) => {
    const labels = {
      5: 'Excellent',
      4: 'Very Good',
      3: 'Good',
      2: 'Fair',
      1: 'Poor'
    };
    return labels[rating] || '';
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
              Reviews Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage and moderate user reviews across all destinations
            </p>
          </div>
          <div className="grid grid-cols-3 md:flex gap-2 md:gap-3">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2.5 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors hover:border-amber-300 dark:hover:border-amber-700"
            >
              <RotateCcw size={18} className="shrink-0" />
              <span className="font-medium text-xs md:text-sm">Reset</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Download size={18} className="shrink-0" />
              <span className="font-medium text-xs md:text-sm">Export</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
              <BarChart2 size={18} className="shrink-0" />
              <span className="font-medium text-xs md:text-sm">Analytics</span>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
        {[5, 4, 3, 2].map(rating => {
          const count = reviews.filter(r => r.rating === rating).length;
          return (
            <div key={rating} className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                {renderStars(rating)}
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Reviews List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex-1">
        {/* Toolbar */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">All Reviews</h2>
              <span className="text-sm text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 rounded-full">
                {filteredReviews.length}
              </span>
            </div>

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

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
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
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="most_likes">Most Likes</option>
                  <option value="most_helpful">Most Helpful</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Reset Filters Button */}
              {(searchTerm || selectedStatus !== 'All' || selectedRating !== 'All' || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedStatus('All');
                    setSelectedRating('All');
                    setSelectedCategory('All');
                    setSortBy('newest');
                  }}
                  className="col-span-2 sm:col-span-1 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {sortedReviews.length > 0 ? (
            sortedReviews.map((review) => (
              <div key={review.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <review.user.avatar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{review.user.name}</span>
                          {review.user.verified && (
                            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800 inline-flex items-center gap-1">
                              <Check className="w-3 h-3" /> Verified
                            </span>
                          )}
                          <span className="text-xs text-gray-400 dark:text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          {renderStars(review.rating)}
                          <span className="text-xs text-gray-500 dark:text-gray-400">({review.rating}.0)</span>
                          <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">•</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{review.place.name}</span>
                          <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">•</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {review.place.location}
                          </span>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 flex-wrap shrink-0">
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(review.status)}`}>
                          {review.status}
                        </span>
                        {review.featured && (
                          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Featured
                          </span>
                        )}
                        {review.reported && (
                          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 flex items-center gap-1">
                            <Flag className="w-3 h-3" />
                            Reported
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status badges: mobile row */}
                    <div className="flex sm:hidden items-center gap-2 flex-wrap mt-2">
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                      {review.featured && (
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                          Featured
                        </span>
                      )}
                      {review.reported && (
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 flex items-center gap-1">
                          <Flag className="w-3 h-3" />
                          Reported
                        </span>
                      )}
                    </div>

                    <h4 className="font-medium text-gray-900 dark:text-white mt-2 sm:mt-1">{review.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{review.comment}</p>

                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {review.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Review image ${idx + 1}`}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{review.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span>{review.dislikes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{review.replies.length} replies</span>
                      </button>
                      {review.helpful > 0 && (
                        <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          {review.helpful} found helpful
                        </span>
                      )}
                    </div>

                    {/* Replies */}
                    {review.replies.length > 0 && (
                      <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                        {review.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-2 mt-2">
                            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs flex-shrink-0">
                              <Bot className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{reply.user}</span>
                                <span className="text-xs text-gray-400 dark:text-gray-500">{reply.date}</span>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{reply.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions: mobile row */}
                    <div className="flex sm:hidden items-center gap-1 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => handleViewDetails(review)}
                        className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </button>
                      {review.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(review.id, 'Published')}
                            className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(review.id, 'Archived')}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Archive"
                          >
                            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setSelectedReview(review);
                          setIsReplyModalOpen(true);
                        }}
                        className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Reply"
                      >
                        <Reply className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Actions: desktop sidebar */}
                  <div className="hidden sm:flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                      onClick={() => handleViewDetails(review)}
                      className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </button>
                    {review.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(review.id, 'Published')}
                          className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(review.id, 'Archived')}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Archive"
                        >
                          <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        setSelectedReview(review);
                        setIsReplyModalOpen(true);
                      }}
                      className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Reply"
                    >
                      <Reply className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No reviews found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
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
                  <selectedReview.user.avatar className="w-5 h-5 text-blue-400" />
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
                  {selectedReview.user.name}
                  {selectedReview.user.verified && (
                    <span className="text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded-full border border-blue-800 inline-flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{selectedReview.user.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Place</span>
                  <p className="text-sm font-medium text-blue-400 mt-1 truncate">{selectedReview.place.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {selectedReview.place.location}
                  </p>
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
                  <span className="text-xs text-gray-400">Helpful</span>
                  <p className="text-base font-bold text-white mt-0.5">{selectedReview.helpful}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
              <button
                type="button"
                onClick={() => {
                  const rev = selectedReview;
                  setIsDetailsOpen(false);
                  setSelectedReview(rev);
                  setIsReplyModalOpen(true);
                }}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Reply className="w-4 h-4" />
                Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal (Dark Theme Styled) */}
      {isReplyModalOpen && selectedReview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white tracking-wide">Reply to Review</h3>
              <button
                onClick={() => setIsReplyModalOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="p-3.5 bg-[#1f2937]/50 rounded-2xl border border-gray-800">
                <p className="text-xs text-gray-400 mb-1">Review by {selectedReview.user.name}</p>
                <p className="text-sm text-gray-300 line-clamp-2">{selectedReview.comment}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Your Reply</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your response as Admin..."
                  rows="4"
                  className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
              <button
                type="button"
                onClick={() => setIsReplyModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleAddReply(selectedReview.id)}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 text-center flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}