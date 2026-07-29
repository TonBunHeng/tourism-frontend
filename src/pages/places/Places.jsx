import { useState } from 'react';
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  MapPin,
  Building2,
  Landmark,
  Mountain,
  Palette,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Grid3x3,
  List,
  ChevronDown,
  X
} from 'lucide-react';

export default function Places() {
  const [places, setPlaces] = useState([
    {
      id: 1,
      name: 'Koh Ker Temple',
      category: 'Temple',
      address: 'Srayong Village, Srayong Commune, Srayong District, Preah Vihear Province, Cambodia',
      status: 'Active',
      icon: Landmark,
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'National Museum of Cambodia',
      category: 'Historical Site',
      address: 'Phnom Penh, Cambodia',
      status: 'Active',
      icon: Landmark,
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: 'Angkor Wat',
      category: 'Temple',
      address: 'Siem Reap, Cambodia',
      status: 'Active',
      icon: Landmark,
      rating: 4.9,
      reviews: 256
    },
    {
      id: 4,
      name: 'Royal Palace',
      category: 'Palace',
      address: 'Phnom Penh, Cambodia',
      status: 'Active',
      icon: Landmark,
      rating: 4.7,
      reviews: 98
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingPlace, setViewingPlace] = useState(null);
  const [editingPlace, setEditingPlace] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Temple',
    address: '',
    status: 'Active'
  });

  const featuredPlaces = [
    {
      name: 'Siem Reap Angkor',
      location: 'Siem Reap | Temple | Heritage Site',
      rating: 5.0,
      reviews: 35,
      icon: Landmark,
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      name: 'Pursat Mountains',
      location: 'Pursat | Mountains | Nature Reserve',
      rating: 5.0,
      reviews: 6,
      icon: Mountain,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      name: 'Historical Sites',
      location: 'Multiple National Sites',
      rating: 5.0,
      reviews: 35,
      icon: Building2,
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      name: 'Cultural Museum',
      location: 'Cultural Heritage Museum',
      rating: 5.0,
      reviews: 35,
      icon: Palette,
      gradient: 'from-rose-500 to-pink-600'
    }
  ];

  const categories = ['All', 'Temple', 'Historical Site', 'Palace', 'Museum', 'Nature'];
  const formCategories = categories.filter(c => c !== 'All');
  const statusOptions = ['Active', 'Inactive', 'Pending'];

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          place.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleView = (id) => {
    const placeToView = places.find(place => place.id === id);
    if (placeToView) {
      setViewingPlace(placeToView);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      setPlaces(places.filter(place => place.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingPlace(null);
    setFormData({ name: '', category: 'Temple', address: '', status: 'Active' });
    setIsAddModalOpen(true);
  };

  const openEditModal = (place) => {
    setEditingPlace(place);
    setFormData({
      name: place.name,
      category: place.category,
      address: place.address,
      status: place.status
    });
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingPlace(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.address.trim()) return;

    if (editingPlace) {
      setPlaces(places.map(p =>
        p.id === editingPlace.id
          ? { ...p, ...formData }
          : p
      ));
    } else {
      const newPlace = {
        id: places.length > 0 ? Math.max(...places.map(p => p.id)) + 1 : 1,
        ...formData,
        icon: Landmark,
        rating: 0,
        reviews: 0
      };
      setPlaces([newPlace, ...places]);
    }
    closeModal();
  };

  const stats = [
    { label: 'Total Places', value: places.length, icon: Building2, color: '#2563EB' },
    { label: 'Active Sites', value: places.filter(p => p.status === 'Active').length, icon: CheckCircle, color: '#16A34A' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: '#F59E0B' },
    { label: 'Total Reviews', value: '1,234', icon: TrendingUp, color: '#9333EA' }
  ];

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Places Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage and organize all heritage sites and attractions
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 w-full sm:w-auto"
          >
            <Plus size={18} className="shrink-0" />
            <span className="font-medium">Add New Place</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div
                className="p-2.5 md:p-3 rounded-xl flex-shrink-0"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: stat.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Places */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Featured Places</h2>
          <button className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPlaces.map((place, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${place.gradient} p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 md:hover:scale-105 transform group cursor-pointer`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
              <div className="relative z-10">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <place.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-1">{place.name}</h3>
                <p className="text-sm text-white/90 mb-3 line-clamp-1">{place.location}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="w-3 h-3 fill-yellow-300 text-yellow-300 mr-1" />
                    <span className="text-sm font-bold">{place.rating}</span>
                    <span className="text-xs ml-1 text-white/80">({place.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Places Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex-1">
        <div className="px-4 md:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">All Places</h2>

              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 flex-shrink-0">
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
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search places..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-48 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
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
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          <>
            {/* Mobile: stacked cards instead of a squeezed table */}
            <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => (
                  <div key={place.id} className="p-4 flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center shrink-0">
                      <place.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{place.name}</p>
                        <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                          {place.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                          {place.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {place.rating} ({place.reviews})
                        </span>
                      </div>
                      <p className="flex items-start gap-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{place.address}</span>
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <button
                          onClick={() => openEditModal(place)}
                          className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleView(place.id)}
                          className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(place.id)}
                          className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📍</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No places found</h3>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Place</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredPlaces.length > 0 ? (
                    filteredPlaces.map((place, index) => (
                      <tr key={place.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
                          {String(index + 1).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                              <place.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{place.name}</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500">ID: #{place.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                            {place.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                            {place.address}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{place.rating}</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">({place.reviews})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                            <Clock className="w-3 h-3" />
                            {place.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditModal(place)}
                              className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleView(place.id)}
                              className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(place.id)}
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
                        <div className="text-6xl mb-4">📍</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No places found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
                <div key={place.id} className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                        <place.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{place.name}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{place.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{place.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1 mb-3">
                    <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{place.address}</span>
                  </p>
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 flex-shrink-0">
                      <CheckCircle className="w-3 h-3" />
                      {place.status}
                    </span>
                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleView(place.id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => openEditModal(place)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <Edit className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(place.id)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">📍</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No places found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {viewingPlace && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <viewingPlace.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">Place Details</h3>
                  <p className="text-xs text-gray-400">ID: #{viewingPlace.id}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingPlace(null)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Place Name</span>
                <p className="text-base font-semibold text-white mt-1">{viewingPlace.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category</span>
                  <p className="text-sm font-medium text-blue-400 mt-1">{viewingPlace.category}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</span>
                  <p className="text-sm font-medium text-green-400 mt-1 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {viewingPlace.status}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Rating</span>
                  <p className="text-sm font-medium text-amber-400 mt-1 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400" />
                    {viewingPlace.rating} / 5.0
                  </p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Reviews</span>
                  <p className="text-sm font-medium text-white mt-1">{viewingPlace.reviews} total reviews</p>
                </div>
              </div>

              <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Address</span>
                <p className="text-sm text-gray-300 mt-1 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{viewingPlace.address}</span>
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
              <button
                type="button"
                onClick={() => {
                  const place = viewingPlace;
                  setViewingPlace(null);
                  openEditModal(place);
                }}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Place
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Place Modal (Dark Styled to match theme) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {editingPlace ? 'Edit Place' : 'Add New Place'}
              </h3>
              <button
                onClick={closeModal}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Place Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder="Enter place name"
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Category</label>
                    <div className="relative">
                      <select
                        value={formData.category}
                        onChange={(e) => handleFormChange('category', e.target.value)}
                        className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      >
                        {formCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Status</label>
                    <div className="relative">
                      <select
                        value={formData.status}
                        onChange={(e) => handleFormChange('status', e.target.value)}
                        className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      >
                        {statusOptions.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleFormChange('address', e.target.value)}
                    placeholder="Enter full address"
                    rows="3"
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!formData.name.trim() || !formData.address.trim()}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  {editingPlace ? 'Update Place' : 'Add Place'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}