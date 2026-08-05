import { useState, useEffect } from 'react';
import {
  Landmark,
  Crown,
  Waves,
  TreePine,
  ShoppingBag,
  Leaf,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import FavoritesHeader from './FavoritesHeader';
import FavoritesStats from './FavoritesStats';
import FavoritesToolbar from './FavoritesToolbar';
import FavoritesGrid from './FavoritesGrid';
import FavoritesList from './FavoritesList';
import FavoriteModal from './FavoriteModal';
import FavoriteDetailsModal from './FavoriteDetailsModal';

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
    },
    {
      id: 8,
      name: 'Preah Vihear Temple',
      category: 'Temple',
      location: 'Preah Vihear, Cambodia',
      rating: 4.9,
      reviews: 380,
      icon: Landmark,
      description: 'Ancient Hindu temple built during the Khmer Empire on a 525-metre cliff.',
      savedDate: '2024-03-05',
      visited: true,
      tags: ['heritage', 'cliff', 'UNESCO'],
      visitors: 4500,
      bestTime: 'Early Morning',
      duration: '3 hours',
      price: '$10',
      coordinates: '14.3917° N, 104.6800° E'
    }
  ];

  const [favorites, setFavorites] = useState(defaultFavorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('list');
  const [selectedFavorites, setSelectedFavorites] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  // New Place form state
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus, sortBy, sortedFavorites.length]);

  const totalRecords = sortedFavorites.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedFavorites = sortedFavorites.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this from favorites?')) {
      setFavorites(favorites.filter(fav => fav.id !== id));
      setSelectedFavorites(prev => prev.filter(fid => fid !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedFavorites.length === 0) return;
    if (window.confirm(`Are you sure you want to remove ${selectedFavorites.length} place(s) from favorites?`)) {
      setFavorites(favorites.filter(fav => !selectedFavorites.includes(fav.id)));
      setSelectedFavorites([]);
    }
  };

  const handleBulkMarkVisited = () => {
    setFavorites(favorites.map(fav =>
      selectedFavorites.includes(fav.id) ? { ...fav, visited: true } : fav
    ));
    setSelectedFavorites([]);
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

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSortBy('recent');
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <FavoritesHeader
        onReset={handleReset}
        onAddNew={() => setIsAddOpen(true)}
      />

      {/* Stats Cards */}
      <FavoritesStats favorites={favorites} />

      {/* Main Content */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        {/* Toolbar */}
        <FavoritesToolbar
          totalCount={filteredFavorites.length}
          selectedCount={selectedFavorites.length}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          statuses={statuses}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onClearFilters={handleClearFilters}
          onBulkDelete={handleBulkDelete}
          onBulkMarkVisited={handleBulkMarkVisited}
          onDeselectAll={() => setSelectedFavorites([])}
        />

        {/* Grid or List View */}
        {viewMode === 'grid' ? (
          <FavoritesGrid
            favorites={paginatedFavorites}
            selectedFavorites={selectedFavorites}
            onToggleSelect={handleToggleSelect}
            onToggleVisited={handleToggleVisited}
            onViewDetails={handleViewDetails}
            onDelete={handleDelete}
          />
        ) : (
          <FavoritesList
            favorites={paginatedFavorites}
            selectedFavorites={selectedFavorites}
            onToggleSelect={handleToggleSelect}
            onSelectAll={handleSelectAll}
            isAllSelected={selectedFavorites.length === filteredFavorites.length && filteredFavorites.length > 0}
            onToggleVisited={handleToggleVisited}
            onViewDetails={handleViewDetails}
            onDelete={handleDelete}
            startIndex={startIndex}
          />
        )}

        {/* Pagination Footer */}
        {totalRecords > 0 && (
          <div className="p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-input-dark-bg)]/40">
            <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{totalRecords}</span> favorites
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

      {/* Add New Place Modal */}
      <FavoriteModal
        isOpen={isAddOpen}
        newPlace={newPlace}
        onNewPlaceChange={setNewPlace}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddSubmit}
      />

      {/* Details Modal */}
      <FavoriteDetailsModal
        isOpen={isDetailsOpen}
        favorite={selectedFavorite}
        onClose={() => setIsDetailsOpen(false)}
        onDelete={handleDelete}
        onToggleVisited={handleToggleVisited}
      />
    </div>
  );
}