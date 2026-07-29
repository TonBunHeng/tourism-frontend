import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye, FolderTree, Layers, TrendingUp, Clock, X, Check, Landmark, Scroll, Palette, Crown, Leaf, Theater } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Temple",
      description: "Ancient religious structures and sacred sites",
      icon: Landmark,
      placeCount: 45,
      status: "Active",
      createdAt: "2024-01-15",
      color: "#8B5CF6"
    },
    {
      id: 2,
      name: "Historical Site",
      description: "Heritage locations with historical significance",
      icon: Scroll,
      placeCount: 28,
      status: "Active",
      createdAt: "2024-01-20",
      color: "#EC4899"
    },
    {
      id: 3,
      name: "Museum",
      description: "Cultural and historical exhibition centers",
      icon: Palette,
      placeCount: 15,
      status: "Active",
      createdAt: "2024-02-01",
      color: "#3B82F6"
    },
    {
      id: 4,
      name: "Palace",
      description: "Royal residences and administrative buildings",
      icon: Crown,
      placeCount: 8,
      status: "Inactive",
      createdAt: "2024-02-10",
      color: "#F59E0B"
    },
    {
      id: 5,
      name: "Nature Reserve",
      description: "Protected natural areas and wildlife sanctuaries",
      icon: Leaf,
      placeCount: 12,
      status: "Active",
      createdAt: "2024-03-01",
      color: "#10B981"
    },
    {
      id: 6,
      name: "Cultural Center",
      description: "Community spaces for cultural activities",
      icon: Theater,
      placeCount: 7,
      status: "Active",
      createdAt: "2024-03-15",
      color: "#EF4444"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingCategory, setViewingCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
    color: "#8B5CF6"
  });

  const stats = [
    { label: "Total Categories", value: categories.length, icon: FolderTree, color: "#2563EB" },
    { label: "Active Categories", value: categories.filter(c => c.status === "Active").length, icon: Check, color: "#16A34A" },
    { label: "Total Places", value: categories.reduce((sum, c) => sum + c.placeCount, 0), icon: Layers, color: "#9333EA" },
    { label: "Average Places/Category", value: Math.round(categories.reduce((sum, c) => sum + c.placeCount, 0) / categories.length), icon: TrendingUp, color: "#F59E0B" }
  ];

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", status: "Active", color: "#8B5CF6" });
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
      color: category.color
    });
    setIsModalOpen(true);
  };

  const handleView = (id) => {
    const catToView = categories.find(cat => cat.id === id);
    if (catToView) {
      setViewingCategory(catToView);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.description.trim()) return;

    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, ...formData } : cat
      ));
    } else {
      const newCategory = {
        id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
        ...formData,
        icon: FolderTree,
        placeCount: 0,
        createdAt: new Date().toISOString().split("T")[0]
      };
      setCategories([newCategory, ...categories]);
    }
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const getStatusColor = (status) => {
    return status === "Active" 
      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" 
      : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600";
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Categories Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Organize and manage all place categories
            </p>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 w-full sm:w-auto"
          >
            <Plus size={18} className="shrink-0" />
            <span className="font-medium">Add Category</span>
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

      {/* Categories Grid/List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex-1">
        {/* Toolbar */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">All Categories</h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-48 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 self-start sm:self-auto">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white dark:bg-gray-600 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                >
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-white dark:bg-gray-600 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                >
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredCategories.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
              {filteredCategories.map((category) => (
                <div 
                  key={category.id} 
                  className="group relative bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition-all duration-200 lg:hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div 
                        className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <category.icon size={24} style={{ color: category.color }} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{category.name}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{category.placeCount} places</span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-1 flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleView(category.id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button 
                        onClick={() => openEditModal(category)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{category.description}</p>
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border flex-shrink-0 ${getStatusColor(category.status)}`}>
                      <Clock className="w-3 h-3" />
                      {category.status}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 truncate">Created: {category.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Places</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredCategories.map((category, index) => (
                    <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${category.color}20` }}
                          >
                            <category.icon size={20} style={{ color: category.color }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{category.name}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">ID: #{category.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                        {category.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Layers className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{category.placeCount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(category.status)}`}>
                          <Clock className="w-3 h-3" />
                          {category.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(category.id)}
                            className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <FolderTree className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">No categories found</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {viewingCategory && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${viewingCategory.color}20` }}
                >
                  <viewingCategory.icon className="w-5 h-5" style={{ color: viewingCategory.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">Category Details</h3>
                  <p className="text-xs text-gray-400">ID: #{viewingCategory.id}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingCategory(null)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category Name</span>
                <p className="text-base font-semibold text-white mt-1">{viewingCategory.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Places</span>
                  <p className="text-sm font-medium text-blue-400 mt-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    {viewingCategory.placeCount} places
                  </p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</span>
                  <p className="text-sm font-medium text-green-400 mt-1 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    {viewingCategory.status}
                  </p>
                </div>
              </div>

              <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Description</span>
                <p className="text-sm text-gray-300 mt-1">{viewingCategory.description}</p>
              </div>

              <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Created Date</span>
                <p className="text-sm text-gray-300 mt-1">{viewingCategory.createdAt}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
              <button
                type="button"
                onClick={() => {
                  const cat = viewingCategory;
                  setViewingCategory(null);
                  openEditModal(cat);
                }}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Category Modal (Dark Theme Styled) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Category Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter category name"
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter category description"
                    rows="3"
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Color Theme</label>
                  <div className="flex gap-2 flex-wrap pt-1">
                    {["#8B5CF6", "#EC4899", "#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#6366F1", "#14B8A6"].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${formData.color === color ? "border-white scale-110 shadow-lg" : "border-transparent hover:scale-105"}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={!formData.name.trim() || !formData.description.trim()}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  {editingCategory ? "Update Category" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}