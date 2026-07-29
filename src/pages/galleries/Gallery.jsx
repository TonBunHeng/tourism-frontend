import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Image, Video, Upload, Grid3x3, List, Clock, Tag, Heart, X, ChevronDown, Calendar } from 'lucide-react';

export default function Gallery() {
  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      title: 'Angkor Wat Sunrise',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1583418037743-c2e994c1222d?w=400&h=300&fit=crop',
      category: 'Temple',
      tags: ['angkor wat', 'sunrise', 'temple'],
      size: '2.4 MB',
      dimensions: '1920x1080',
      uploadedBy: 'Admin',
      uploadDate: '2024-01-15',
      views: 1245,
      likes: 89,
      status: 'Published'
    },
    {
      id: 2,
      title: 'Phnom Penh Skyline',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=400&h=300&fit=crop',
      category: 'City',
      tags: ['phnom penh', 'skyline', 'cityscape'],
      size: '1.8 MB',
      dimensions: '1920x1080',
      uploadedBy: 'Admin',
      uploadDate: '2024-01-20',
      views: 876,
      likes: 56,
      status: 'Published'
    },
    {
      id: 3,
      title: 'Battambang Countryside',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      category: 'Nature',
      tags: ['battambang', 'countryside', 'nature'],
      size: '3.1 MB',
      dimensions: '1920x1080',
      uploadedBy: 'Editor',
      uploadDate: '2024-02-01',
      views: 543,
      likes: 34,
      status: 'Draft'
    },
    {
      id: 4,
      title: 'Siem Reap Night Market',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1557732660-2b27a4b6a16e?w=400&h=300&fit=crop',
      category: 'Culture',
      tags: ['siem reap', 'night market', 'street food'],
      size: '2.2 MB',
      dimensions: '1920x1080',
      uploadedBy: 'Admin',
      uploadDate: '2024-02-10',
      views: 2100,
      likes: 134,
      status: 'Published'
    },
    {
      id: 5,
      title: 'Koh Rong Beach',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
      category: 'Beach',
      tags: ['koh rong', 'beach', 'island'],
      size: '2.9 MB',
      dimensions: '1920x1080',
      uploadedBy: 'Photographer',
      uploadDate: '2024-02-15',
      views: 1567,
      likes: 98,
      status: 'Published'
    },
    {
      id: 6,
      title: 'Cambodian Royal Palace',
      type: 'video',
      url: 'https://images.unsplash.com/photo-1583418037743-c2e994c1222d?w=400&h=300&fit=crop',
      category: 'Historical',
      tags: ['palace', 'royal', 'phnom penh'],
      size: '45.6 MB',
      dimensions: '1920x1080',
      uploadedBy: 'Admin',
      uploadDate: '2024-02-20',
      views: 432,
      likes: 28,
      status: 'Draft'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const categories = ['All', 'Temple', 'City', 'Nature', 'Culture', 'Beach', 'Historical'];
  const types = ['All', 'image', 'video'];

  const stats = [
    {
      label: 'Total Media',
      value: mediaItems.length,
      icon: Image,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Images',
      value: mediaItems.filter(m => m.type === 'image').length,
      icon: Image,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Videos',
      value: mediaItems.filter(m => m.type === 'video').length,
      icon: Video,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      label: 'Total Views',
      value: mediaItems.reduce((sum, m) => sum + m.views, 0).toLocaleString(),
      icon: Eye,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    }
  ];

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this media?')) {
      setMediaItems(mediaItems.filter(item => item.id !== id));
    }
  };

  const handlePreview = (item) => {
    setSelectedMedia(item);
    setIsPreviewOpen(true);
  };

  const handleEdit = (item) => {
    setEditingMedia({ ...item });
    setIsEditOpen(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!editingMedia) return;
    setMediaItems(mediaItems.map(item => item.id === editingMedia.id ? editingMedia : item));
    setIsEditOpen(false);
    setEditingMedia(null);
  };

  const getStatusColor = (status) => {
    return status === 'Published'
      ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
      : 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600';
  };

  const getTypeIcon = (type) => {
    return type === 'video' ? Video : Image;
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Media Gallery
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage and organize all media files
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 w-full sm:w-auto"
          >
            <Upload size={18} className="shrink-0" />
            <span className="font-medium">Upload Media</span>
          </button>
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

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex-1">
        {/* Toolbar */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">All Media</h2>

              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 shrink-0">
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
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-48 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:flex gap-3">
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

                {/* Type Filter */}
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6">
            {filteredMedia.length > 0 ? (
              filteredMedia.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="group relative bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 sm:hover:scale-[1.02]"
                  >
                    <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center">
                            <Video className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 ml-0.5 sm:ml-1" />
                          </div>
                        </div>
                      )}
                      {/* Actions: Clean unified styling matching Provinces/Categories pages */}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handlePreview(item)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border ${getStatusColor(item.status)}`}>
                          <Clock className="w-3 h-3" />
                          <span className="hidden xs:inline">{item.status}</span>
                        </span>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{item.title}</h3>
                        <span className="hidden sm:inline text-xs text-gray-400 dark:text-gray-500 shrink-0">{item.size}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Eye className="w-3 h-3" />
                          {item.views}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Heart className="w-3 h-3" />
                          {item.likes}
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                        <span>{item.uploadedBy}</span>
                        <span>{item.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No media found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        ) : (
          /* List View */
          <>
            <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
              {filteredMedia.length > 0 ? (
                filteredMedia.map((item) => {
                  const TypeIcon = getTypeIcon(item.type);
                  return (
                    <div key={item.id} className="p-4 flex gap-3">
                      <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden relative flex-shrink-0">
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <TypeIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.title}</p>
                          <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                            {item.category}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">{item.size}</span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">{item.views.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <button onClick={() => handlePreview(item)} className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🖼️</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No media found</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>

            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Media</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredMedia.length > 0 ? (
                    filteredMedia.map((item, index) => {
                      const TypeIcon = getTypeIcon(item.type);
                      return (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
                            {String(index + 1).padStart(2, '0')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden relative flex-shrink-0">
                                <img
                                  src={item.url}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                                {item.type === 'video' && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <TypeIcon className="w-4 h-4 text-white" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">{item.dimensions}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {item.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {item.views.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                              <Clock className="w-3 h-3" />
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handlePreview(item)}
                                className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(item)}
                                className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
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
                      <td colSpan="7" className="text-center py-12">
                        <div className="text-6xl mb-4">🖼️</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No media found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Upload Modal (Dark Theme Styled) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white tracking-wide">Upload Media</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div className="border-2 border-dashed border-gray-700 bg-[#1f2937]/50 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-200 font-medium text-sm">Drop files here or click to upload</p>
                <p className="text-xs text-gray-400 mt-1">Supports images and videos up to 50MB</p>
                <button type="button" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors text-sm shadow-md shadow-blue-500/20">
                  Choose Files
                </button>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Category</label>
                <div className="relative">
                  <select className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                    <option className="bg-[#1f2937] text-gray-400">Select category</option>
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat} className="bg-[#1f2937] text-white">{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 text-center"
              >
                Upload Files
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Media Modal */}
      {isEditOpen && editingMedia && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white tracking-wide">Edit Media</h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Title</label>
                <input
                  type="text"
                  value={editingMedia.title}
                  onChange={(e) => setEditingMedia({ ...editingMedia, title: e.target.value })}
                  className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Category</label>
                <div className="relative">
                  <select
                    value={editingMedia.category}
                    onChange={(e) => setEditingMedia({ ...editingMedia, category: e.target.value })}
                    className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat} className="bg-[#1f2937] text-white">{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Status</label>
                <div className="relative">
                  <select
                    value={editingMedia.status}
                    onChange={(e) => setEditingMedia({ ...editingMedia, status: e.target.value })}
                    className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="Published" className="bg-[#1f2937] text-white">Published</option>
                    <option value="Draft" className="bg-[#1f2937] text-white">Draft</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 text-center"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal (Dark Theme Styled) */}
      {isPreviewOpen && selectedMedia && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">Media Preview</h3>
                  <p className="text-xs text-gray-400">ID: #{selectedMedia.id}</p>
                </div>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="rounded-2xl overflow-hidden bg-black/40 border border-gray-800 flex items-center justify-center max-h-[300px]">
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="w-full h-full object-contain max-h-[300px]"
                />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Title</span>
                <p className="text-base font-semibold text-white mt-1">{selectedMedia.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category & Type</span>
                  <p className="text-sm font-medium text-blue-400 mt-1">{selectedMedia.category} · <span className="capitalize">{selectedMedia.type}</span></p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</span>
                  <p className="text-sm font-medium text-green-400 mt-1">{selectedMedia.status}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Dimensions & Size</span>
                  <p className="text-sm font-medium text-white mt-1">{selectedMedia.dimensions}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedMedia.size}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Engagement</span>
                  <p className="text-sm font-medium text-amber-400 mt-1">{selectedMedia.views.toLocaleString()} views · {selectedMedia.likes} likes</p>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMedia.tags.map((tag, idx) => (
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
                  const item = selectedMedia;
                  setIsPreviewOpen(false);
                  handleEdit(item);
                }}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Media
              </button>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}