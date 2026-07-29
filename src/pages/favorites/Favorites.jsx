import { useState } from 'react';
import { Heart, Search, MapPin, Star, Clock, Users, Calendar, Filter, ChevronDown, X, Check, Share2, Eye, Trash2, Plus, Grid3x3, List, Share, RotateCcw, Landmark, Crown, Waves, TreePine, ShoppingBag, Leaf } from 'lucide-react';

export default function Favorites() {
  // Default data
  const defaultFavorites = [
    {
      id: 1,
      name: 'Angkor Wat',
      category: 'Temple',
      location: 'Siem Reap, Cambodia',
      rating: 4.9,
      reviews: 1245,
      icon: Landmark,
      description: 'The largest religious monument in the world and a UNESCO World Heritage site.',
      savedDate: '2024-01-15',
      visited: true,
      tags: ['heritage', 'ancient', 'UNESCO'],
      visitors: 25000,
      bestTime: 'Sunrise',
      duration: '3-4 hours',
      price: '$37',
      coordinates: '13.4125° N, 103.8667° E'
    },
    {
      id: 2,
      name: 'Royal Palace',
      category: 'Palace',
      location: 'Phnom Penh, Cambodia',
      rating: 4.7,
      reviews: 876,
      icon: Crown,
      description: 'The official residence of the King of Cambodia, featuring beautiful Khmer architecture.',
      savedDate: '2024-01-20',
      visited: false,
      tags: ['royal', 'architecture', 'historical'],
      visitors: 5000,
      bestTime: 'Morning',
      duration: '2-3 hours',
      price: '$10',
      coordinates: '11.5638° N, 104.9311° E'
    },
    {
      id: 3,
      name: 'Koh Rong Island',
      category: 'Beach',
      location: 'Sihanoukville, Cambodia',
      rating: 4.8,
      reviews: 654,
      icon: Waves,
      description: 'A beautiful tropical island with white sandy beaches and crystal clear water.',
      savedDate: '2024-02-01',
      visited: false,
      tags: ['beach', 'island', 'paradise'],
      visitors: 8000,
      bestTime: 'December-April',
      duration: 'Full day',
      price: '$25',
      coordinates: '10.7001° N, 103.2395° E'
    },
    {
      id: 4,
      name: 'Bayon Temple',
      category: 'Temple',
      location: 'Siem Reap, Cambodia',
      rating: 4.8,
      reviews: 543,
      icon: Landmark,
      description: 'Famous for its many smiling stone faces, located in the heart of Angkor Thom.',
      savedDate: '2024-02-10',
      visited: true,
      tags: ['ancient', 'architecture', 'Buddhist'],
      visitors: 15000,
      bestTime: 'Sunset',
      duration: '2 hours',
      price: 'Included',
      coordinates: '13.4410° N, 103.8588° E'
    },
    {
      id: 5,
      name: 'Bokor National Park',
      category: 'Nature',
      location: 'Kampot, Cambodia',
      rating: 4.6,
      reviews: 432,
      icon: TreePine,
      description: 'A stunning national park with mountain views, waterfalls, and colonial-era ruins.',
      savedDate: '2024-02-15',
      visited: false,
      tags: ['national park', 'mountains', 'nature'],
      visitors: 12000,
      bestTime: 'December-February',
      duration: 'Full day',
      price: '$15',
      coordinates: '10.8548° N, 104.0269° E'
    },
    {
      id: 6,
      name: 'Central Market',
      category: 'Market',
      location: 'Phnom Penh, Cambodia',
      rating: 4.3,
      reviews: 321,
      icon: ShoppingBag,
      description: 'Art Deco-style market offering everything from jewelry to souvenirs and local food.',
      savedDate: '2024-02-20',
      visited: false,
      tags: ['market', 'shopping', 'local culture'],
      visitors: 10000,
      bestTime: 'Morning',
      duration: '1-2 hours',
      price: 'Free',
      coordinates: '11.5699° N, 104.9205° E'
    },
    {
      id: 7,
      name: 'Kampot Pepper Farm',
      category: 'Farm',
      location: 'Kampot, Cambodia',
      rating: 4.5,
      reviews: 289,
      icon: Leaf,
      description: 'Visit the famous Kampot pepper farms and learn about the cultivation process.',
      savedDate: '2024-03-01',
      visited: false,
      tags: ['farm', 'food', 'local product'],
      visitors: 3000,
      bestTime: 'Morning',
      duration: '2 hours',
      price: '$5',
      coordinates: '10.7500° N, 104.2000° E'
    }
  ];

  const [favorites, setFavorites] = useState(defaultFavorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  
  // State for Add New Place Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPlace, setNewPlace] = useState({
    name: '',
    category: 'Temple',
    location: '',
    description: '',
    bestTime: 'Morning',
    price: 'Free'
  });

  const categories = ['All', 'Temple', 'Palace', 'Beach', 'Nature', 'Market', 'Farm'];
  const statuses = ['All', 'Visited', 'Not Visited'];

  const stats = [
    {
      label: 'Total Favorites',
      value: favorites.length,
      icon: Heart,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-900/20'
    },
    {
      label: 'Visited Places',
      value: favorites.filter(f => f.visited).length,
      icon: Check,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Average Rating',
      value: favorites.length > 0 ? (favorites.reduce((sum, f) => sum + f.rating, 0) / favorites.length).toFixed(1) : '0.0',
      icon: Star,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      label: 'Places to Visit',
      value: favorites.filter(f => !f.visited).length,
      icon: MapPin,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    }
  ];

  const filteredFavorites = favorites.filter(fav => {
    const matchesSearch = fav.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fav.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fav.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || fav.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || 
                         (selectedStatus === 'Visited' && fav.visited) ||
                         (selectedStatus === 'Not Visited' && !fav.visited);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.savedDate) - new Date(a.savedDate);
    if (sortBy === 'oldest') return new Date(a.savedDate) - new Date(b.savedDate);
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    if (sortBy === 'most_reviews') return b.reviews - a.reviews;
    if (sortBy === 'most_visitors') return b.visitors - a.visitors;
    return 0;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this from favorites?')) {
      setFavorites(favorites.filter(fav => fav.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedFavorites.length === 0) return;
    if (window.confirm(`Are you sure you want to remove ${selectedFavorites.length} place(s) from favorites?`)) {
      setFavorites(favorites.filter(fav => !selectedFavorites.includes(fav.id)));
      setSelectedFavorites([]);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all favorites to default? This will restore all original places.')) {
      setFavorites(defaultFavorites);
      setSearchTerm('');
      setSelectedCategory('All');
      setSelectedStatus('All');
      setSortBy('recent');
      setSelectedFavorites([]);
    }
  };

  const handleViewDetails = (favorite) => {
    setSelectedFavorite(favorite);
    setIsDetailsOpen(true);
  };

  const handleToggleVisited = (id) => {
    setFavorites(favorites.map(fav =>
      fav.id === id ? { ...fav, visited: !fav.visited } : fav
    ));
  };

  const handleToggleSelect = (id) => {
    setSelectedFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedFavorites.length === filteredFavorites.length) {
      setSelectedFavorites([]);
    } else {
      setSelectedFavorites(filteredFavorites.map(f => f.id));
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newPlace.name || !newPlace.location) {
      alert('Please fill in required fields');
      return;
    }

    const iconMap = {
      Temple: Landmark,
      Palace: Crown,
      Beach: Waves,
      Nature: TreePine,
      Market: ShoppingBag,
      Farm: Leaf
    };

    const createdPlace = {
      id: favorites.length ? Math.max(...favorites.map(f => f.id)) + 1 : 1,
      name: newPlace.name,
      category: newPlace.category,
      location: newPlace.location,
      rating: 5.0,
      reviews: 1,
      icon: iconMap[newPlace.category] || Landmark,
      description: newPlace.description || 'No description provided.',
      savedDate: new Date().toISOString().split('T')[0],
      visited: false,
      tags: [newPlace.category.toLowerCase(), 'new'],
      visitors: 1000,
      bestTime: newPlace.bestTime,
      duration: '2 hours',
      price: newPlace.price,
      coordinates: '11.5500° N, 104.9167° E'
    };

    setFavorites([createdPlace, ...favorites]);
    setIsAddOpen(false);
    setNewPlace({
      name: '',
      category: 'Temple',
      location: '',
      description: '',
      bestTime: 'Morning',
      price: 'Free'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'} w-4 h-4`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Favorite Places
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage and organize your favorite destinations
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
            <button 
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors hover:border-amber-300 dark:hover:border-amber-700"
            >
              <RotateCcw size={18} className="flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm truncate">Reset</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Share2 size={18} className="flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm truncate">Share</span>
            </button>
            <button 
              onClick={() => setIsAddOpen(true)}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
            >
              <Plus size={18} className="flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm truncate">Add New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 md:p-3 rounded-xl flex-shrink-0 ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex-1">
        {/* Toolbar */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">All Favorites</h2>
              <span className="text-sm text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 rounded-full">
                {filteredFavorites.length}
              </span>
              {selectedFavorites.length > 0 && (
                <span className="text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-2.5 py-0.5 rounded-full">
                  {selectedFavorites.length} selected
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {/* Search */}
              <div className="relative flex-1 min-w-[140px] sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent sm:w-40 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="most_reviews">Most Reviews</option>
                  <option value="most_visitors">Most Visitors</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  <Grid3x3 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  <List className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedStatus('All');
                    setSortBy('recent');
                  }}
                  className="px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedFavorites.length > 0 && (
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex-wrap">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {selectedFavorites.length} place(s) selected
              </span>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
              <button
                onClick={() => {
                  setFavorites(favorites.map(fav =>
                    selectedFavorites.includes(fav.id) ? { ...fav, visited: true } : fav
                  ));
                  setSelectedFavorites([]);
                }}
                className="px-3 py-1.5 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors flex items-center gap-1"
              >
                <Check className="w-4 h-4" />
                Mark as Visited
              </button>
              <button
                onClick={() => setSelectedFavorites([])}
                className="px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Deselect All
              </button>
            </div>
          )}
        </div>

        {/* Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
            {sortedFavorites.length > 0 ? (
              sortedFavorites.map((favorite) => (
                <div 
                  key={favorite.id} 
                  className={`group relative bg-white dark:bg-gray-800/50 border rounded-xl p-5 hover:shadow-lg transition-all duration-200 lg:hover:scale-[1.02] ${
                    selectedFavorites.includes(favorite.id) ? 'border-rose-400 dark:border-rose-500 ring-2 ring-rose-400 dark:ring-rose-500' : 'border-gray-100 dark:border-gray-700'
                  }`}
                >
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedFavorites.includes(favorite.id)}
                      onChange={() => handleToggleSelect(favorite.id)}
                      className="w-4 h-4 text-rose-600 border-gray-300 dark:border-gray-600 rounded focus:ring-rose-500 dark:bg-gray-700 dark:checked:bg-rose-600"
                    />
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  </div>

                  <div className="flex items-start gap-3 mb-3 mt-2">
                    <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 flex items-center justify-center">
                      {(() => {
                        const FavoriteIcon = favorite.icon;
                        return <FavoriteIcon className="w-7 h-7 text-rose-600 dark:text-rose-400" />;
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{favorite.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{favorite.location}</span>
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{favorite.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                      <span>{favorite.rating}</span>
                      <span className="text-gray-400 dark:text-gray-500 truncate">({favorite.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{favorite.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                      <Users className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{favorite.visitors.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{favorite.savedDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border flex-shrink-0 ${
                      favorite.visited 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                        : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                    }`}>
                      {favorite.visited ? (
                        <><Check className="w-3 h-3" /> Visited</>
                      ) : (
                        <><Clock className="w-3 h-3" /> To Visit</>
                      )}
                    </span>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleToggleVisited(favorite.id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title={favorite.visited ? 'Mark as not visited' : 'Mark as visited'}
                      >
                        <Check className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleViewDetails(favorite)}
                        className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(favorite.id)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mb-4 flex justify-center">
                  <Heart className="w-12 h-12 text-rose-500 dark:text-rose-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No favorites found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        ) : (
          /* List View */
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedFavorites.length === filteredFavorites.length && filteredFavorites.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-rose-600 border-gray-300 dark:border-gray-600 rounded focus:ring-rose-500 dark:bg-gray-700 dark:checked:bg-rose-600"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Place</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                {sortedFavorites.length > 0 ? (
                  sortedFavorites.map((favorite, index) => (
                    <tr key={favorite.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedFavorites.includes(favorite.id)}
                          onChange={() => handleToggleSelect(favorite.id)}
                          className="w-4 h-4 text-rose-600 border-gray-300 dark:border-gray-600 rounded focus:ring-rose-500 dark:bg-gray-700 dark:checked:bg-rose-600"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                            <favorite.icon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{favorite.name}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {favorite.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800">
                          {favorite.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {renderStars(favorite.rating)}
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({favorite.reviews})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${
                          favorite.visited 
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                        }`}>
                          {favorite.visited ? (
                            <><Check className="w-3 h-3" /> Visited</>
                          ) : (
                            <><Clock className="w-3 h-3" /> To Visit</>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleToggleVisited(favorite.id)}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title={favorite.visited ? 'Mark as not visited' : 'Mark as visited'}
                          >
                            <Check className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button
                            onClick={() => handleViewDetails(favorite)}
                            className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(favorite.id)}
                            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Remove"
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
                      <div className="mb-4 flex justify-center">
                        <Heart className="w-12 h-12 text-rose-500 dark:text-rose-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No favorites found</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD NEW PLACE MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white tracking-wide">Add New Place</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Place Name</label>
                <input
                  type="text"
                  placeholder="Enter place name"
                  value={newPlace.name}
                  onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                  className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Category</label>
                  <div className="relative">
                    <select
                      value={newPlace.category}
                      onChange={(e) => setNewPlace({ ...newPlace, category: e.target.value })}
                      className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="Temple">Temple</option>
                      <option value="Palace">Palace</option>
                      <option value="Beach">Beach</option>
                      <option value="Nature">Nature</option>
                      <option value="Market">Market</option>
                      <option value="Farm">Farm</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Siem Reap, Cambodia"
                    value={newPlace.location}
                    onChange={(e) => setNewPlace({ ...newPlace, location: e.target.value })}
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Best Time to Visit</label>
                  <input
                    type="text"
                    placeholder="e.g., Sunrise / Morning"
                    value={newPlace.bestTime}
                    onChange={(e) => setNewPlace({ ...newPlace, bestTime: e.target.value })}
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Price</label>
                  <input
                    type="text"
                    placeholder="e.g., $10 or Free"
                    value={newPlace.price}
                    onChange={(e) => setNewPlace({ ...newPlace, price: e.target.value })}
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Description</label>
                <textarea
                  rows="3"
                  placeholder="Enter place description"
                  value={newPlace.description}
                  onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })}
                  className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 text-center"
                >
                  Add Place
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsOpen && selectedFavorite && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600/20 flex items-center justify-center">
                  <selectedFavorite.icon className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">Place Details</h3>
                  <p className="text-xs text-gray-400">ID: #{selectedFavorite.id}</p>
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
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Place Name</span>
                <p className="text-base font-semibold text-white mt-1">{selectedFavorite.name}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" /> {selectedFavorite.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category & Status</span>
                  <p className="text-sm font-medium text-rose-400 mt-1">{selectedFavorite.category}</p>
                  <p className="text-xs text-green-400 mt-0.5">{selectedFavorite.visited ? 'Visited' : 'To Visit'}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Rating</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    {renderStars(selectedFavorite.rating)}
                    <span className="text-sm font-medium text-amber-400">({selectedFavorite.rating})</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedFavorite.reviews} reviews</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Best Time & Duration</span>
                  <p className="text-sm font-medium text-white mt-1">{selectedFavorite.bestTime}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedFavorite.duration}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Price & Visitors</span>
                  <p className="text-sm font-medium text-white mt-1">{selectedFavorite.price}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedFavorite.visitors.toLocaleString()} visitors</p>
                </div>
              </div>

              <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Description</span>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">{selectedFavorite.description}</p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFavorite.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-[#1f2937] text-gray-300 rounded-lg text-xs border border-gray-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
              <button
                type="button"
                onClick={() => {
                  const fav = selectedFavorite;
                  setIsDetailsOpen(false);
                  handleDelete(fav.id);
                }}
                className="py-2.5 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 font-medium text-sm transition-colors flex items-center gap-2 border border-red-800/50"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
              <button
                type="button"
                onClick={() => {
                  handleToggleVisited(selectedFavorite.id);
                  setIsDetailsOpen(false);
                }}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
              >
                {selectedFavorite.visited ? <Clock className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                {selectedFavorite.visited ? 'Mark as To Visit' : 'Mark as Visited'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}