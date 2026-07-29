import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Building2, Globe, Users, Home, ChevronDown, X, Check, Filter, Grid3x3, List, Clock, Star, Navigation, Landmark, Waves, TreePine, Mountain, Sprout, Castle, Church, Building } from 'lucide-react';

export default function Provinces() {
  const [provinces, setProvinces] = useState([
    {
      id: 1,
      name: 'Phnom Penh',
      type: 'Capital City',
      population: '2,129,371',
      area: '678.46 km²',
      districts: 14,
      communes: 109,
      status: 'Active',
      icon: Home,
      description: 'Capital and largest city of Cambodia',
      rating: 4.9,
      places: 156
    },
    {
      id: 2,
      name: 'Siem Reap',
      type: 'Province',
      population: '1,014,234',
      area: '10,299 km²',
      districts: 12,
      communes: 100,
      status: 'Active',
      icon: Landmark,
      description: 'Home to the famous Angkor Wat temple complex',
      rating: 4.9,
      places: 89
    },
    {
      id: 3,
      name: 'Preah Sihanouk',
      type: 'Province',
      population: '310,072',
      area: '2,536.68 km²',
      districts: 4,
      communes: 26,
      status: 'Active',
      icon: Waves,
      description: 'Coastal province with beautiful beaches',
      rating: 4.7,
      places: 45
    },
    {
      id: 4,
      name: 'Battambang',
      type: 'Province',
      population: '997,169',
      area: '11,702 km²',
      districts: 13,
      communes: 93,
      status: 'Active',
      icon: Sprout,
      description: 'Known as the rice bowl of Cambodia',
      rating: 4.5,
      places: 34
    },
    {
      id: 5,
      name: 'Kampong Cham',
      type: 'Province',
      population: '895,763',
      area: '4,549 km²',
      districts: 10,
      communes: 86,
      status: 'Inactive',
      icon: Church,
      description: 'Located along the Mekong River',
      rating: 4.3,
      places: 28
    },
    {
      id: 6,
      name: 'Pursat',
      type: 'Province',
      population: '411,759',
      area: '12,692 km²',
      districts: 6,
      communes: 46,
      status: 'Active',
      icon: Mountain,
      description: 'Known for its mountain ranges and forests',
      rating: 4.4,
      places: 22
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingProvince, setViewingProvince] = useState(null);
  const [editingProvince, setEditingProvince] = useState(null);

  const provinceTypes = ['All', 'Capital City', 'Province', 'Municipality'];

  const stats = [
    { 
      label: 'Total Provinces', 
      value: provinces.length, 
      icon: Globe, 
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      label: 'Active Regions', 
      value: provinces.filter(p => p.status === 'Active').length, 
      icon: Check, 
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    { 
      label: 'Total Population', 
      value: '5.8M', 
      icon: Users, 
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    { 
      label: 'Total Places', 
      value: provinces.reduce((sum, p) => sum + p.places, 0), 
      icon: Building2, 
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    }
  ];

  const filteredProvinces = provinces.filter(prov => {
    const matchesSearch = prov.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prov.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || prov.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleEdit = (id) => {
    const province = provinces.find(p => p.id === id);
    setEditingProvince(province);
    setIsModalOpen(true);
  };

  const handleView = (id) => {
    const provinceToView = provinces.find(prov => prov.id === id);
    if (provinceToView) {
      setViewingProvince(provinceToView);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this province?')) {
      setProvinces(provinces.filter(prov => prov.id !== id));
    }
  };

  const handleSave = (provinceData) => {
    if (editingProvince) {
      setProvinces(provinces.map(p => 
        p.id === editingProvince.id ? { ...p, ...provinceData } : p
      ));
    } else {
      const newProvince = {
        id: provinces.length + 1,
        ...provinceData,
        status: 'Active',
        rating: 4.0,
        places: 0,
        icon: Building
      };
      setProvinces([...provinces, newProvince]);
    }
    setIsModalOpen(false);
    setEditingProvince(null);
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
      : 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600';
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      'Capital City': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
      'Province': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
      'Municipality': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600';
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Provinces & Cities
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage administrative regions and urban areas
            </p>
          </div>
          <button 
            onClick={() => {
              setEditingProvince(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 w-full sm:w-auto"
          >
            <Plus size={18} className="shrink-0" />
            <span className="font-medium">Add Province</span>
          </button>
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
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">All Regions</h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search provinces..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-48 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex gap-3">
                {/* Type Filter */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="appearance-none w-full pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                  >
                    {provinceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

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
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
            {filteredProvinces.length > 0 ? (
              filteredProvinces.map((province) => {
                const IconComponent = province.icon || Building;
                return (
                  <div 
                    key={province.id} 
                    className="group relative bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition-all duration-200 lg:hover:scale-[1.02]"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{province.name}</h3>
                          <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${getTypeBadgeColor(province.type)}`}>
                            {province.type}
                          </span>
                        </div>
                      </div>
                      {/* Actions: always visible on touch/mobile, fade in on hover for pointer devices */}
                      <div className="flex gap-1 flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleView(province.id)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button 
                          onClick={() => handleEdit(province.id)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button 
                          onClick={() => handleDelete(province.id)}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{province.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                        <Users className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{province.population}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                        <Navigation className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{province.area}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                        <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{province.districts} Districts</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                        <Home className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{province.places} Places</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{province.rating}</span>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border flex-shrink-0 ${getStatusColor(province.status)}`}>
                        <Clock className="w-3 h-3" />
                        {province.status}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No provinces found</h3>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Province</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Population</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Area</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Districts</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                {filteredProvinces.length > 0 ? (
                  filteredProvinces.map((province, index) => {
                    const IconComponent = province.icon || Building;
                    return (
                      <tr key={province.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
                          {String(index + 1).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{province.name}</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500">ID: #{province.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getTypeBadgeColor(province.type)}`}>
                            {province.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {province.population}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {province.area}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {province.districts}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(province.status)}`}>
                            <Clock className="w-3 h-3" />
                            {province.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleView(province.id)}
                              className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(province.id)}
                              className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(province.id)}
                              className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12">
                      <div className="text-6xl mb-4">🗺️</div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No provinces found</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {viewingProvince && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <viewingProvince.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">Province Details</h3>
                  <p className="text-xs text-gray-400">ID: #{viewingProvince.id}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingProvince(null)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Province Name</span>
                <p className="text-base font-semibold text-white mt-1">{viewingProvince.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Type</span>
                  <p className="text-sm font-medium text-blue-400 mt-1">{viewingProvince.type}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</span>
                  <p className="text-sm font-medium text-green-400 mt-1 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    {viewingProvince.status}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Population</span>
                  <p className="text-sm font-medium text-white mt-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    {viewingProvince.population}
                  </p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Area</span>
                  <p className="text-sm font-medium text-white mt-1 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-gray-400" />
                    {viewingProvince.area}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Districts & Communes</span>
                  <p className="text-sm font-medium text-white mt-1">
                    {viewingProvince.districts} Districts, {viewingProvince.communes} Communes
                  </p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Rating & Places</span>
                  <p className="text-sm font-medium text-amber-400 mt-1 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {viewingProvince.rating} ({viewingProvince.places} places)
                  </p>
                </div>
              </div>

              <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Description</span>
                <p className="text-sm text-gray-300 mt-1">{viewingProvince.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
              <button
                type="button"
                onClick={() => {
                  const prov = viewingProvince;
                  setViewingProvince(null);
                  handleEdit(prov.id);
                }}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Province
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Province Modal (Dark Theme Styled) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {editingProvince ? 'Edit Province' : 'Add New Province'}
              </h3>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingProvince(null);
                }}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Province Name</label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={editingProvince?.name || ''}
                    placeholder="Enter province name"
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Type</label>
                  <div className="relative">
                    <select
                      name="type"
                      defaultValue={editingProvince?.type || 'Province'}
                      className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      required
                    >
                      {provinceTypes.filter(t => t !== 'All').map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Population</label>
                    <input
                      name="population"
                      type="text"
                      defaultValue={editingProvince?.population || ''}
                      placeholder="e.g., 2,129,371"
                      className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Area</label>
                    <input
                      name="area"
                      type="text"
                      defaultValue={editingProvince?.area || ''}
                      placeholder="e.g., 678.46 km²"
                      className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Districts</label>
                    <input
                      name="districts"
                      type="number"
                      defaultValue={editingProvince?.districts || ''}
                      placeholder="Number of districts"
                      className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Communes</label>
                    <input
                      name="communes"
                      type="number"
                      defaultValue={editingProvince?.communes || ''}
                      placeholder="Number of communes"
                      className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingProvince?.description || ''}
                    placeholder="Enter province description"
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
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingProvince(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const form = document.querySelector('.bg-\\[\\#111827\\] form');
                    if (form) {
                      const formData = new FormData(form);
                      const data = {
                        name: formData.get('name'),
                        type: formData.get('type'),
                        population: formData.get('population'),
                        area: formData.get('area'),
                        districts: parseInt(formData.get('districts')),
                        communes: parseInt(formData.get('communes')),
                        description: formData.get('description'),
                        icon: Building
                      };
                      handleSave(data);
                    }
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 text-center"
                >
                  {editingProvince ? 'Update Province' : 'Add Province'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}