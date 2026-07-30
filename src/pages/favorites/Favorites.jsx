import { useState } from 'react';
import {
  Landmark,
  Crown,
  Waves,
  TreePine,
  ShoppingBag,
  Leaf
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
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex-1">
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
            favorites={sortedFavorites}
            selectedFavorites={selectedFavorites}
            onToggleSelect={handleToggleSelect}
            onToggleVisited={handleToggleVisited}
            onViewDetails={handleViewDetails}
            onDelete={handleDelete}
          />
        ) : (
          <FavoritesList
            favorites={sortedFavorites}
            selectedFavorites={selectedFavorites}
            onToggleSelect={handleToggleSelect}
            onSelectAll={handleSelectAll}
            isAllSelected={selectedFavorites.length === filteredFavorites.length && filteredFavorites.length > 0}
            onToggleVisited={handleToggleVisited}
            onViewDetails={handleViewDetails}
            onDelete={handleDelete}
          />
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