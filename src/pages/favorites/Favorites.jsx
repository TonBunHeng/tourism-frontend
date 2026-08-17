import { useState, useEffect } from "react";
import {
  Landmark,
  Crown,
  Waves,
  TreePine,
  ShoppingBag,
  Leaf,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import FavoritesHeader from "./FavoritesHeader";
import FavoritesStats from "./FavoritesStats";
import FavoritesToolbar from "./FavoritesToolbar";
import FavoritesGrid from "./FavoritesGrid";
import FavoritesList from "./FavoritesList";
import FavoriteModal from "./FavoriteModal";
import FavoriteDetailsModal from "./FavoriteDetailsModal";
import favoriteService from "../../services/favoriteService";
import placeService from "../../services/placeService";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("list");
  const [selectedFavorites, setSelectedFavorites] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  // New Place form state
  const [newPlace, setNewPlace] = useState({
    name: "",
    category: "Temple",
    location: "",
    description: "",
    bestTime: "Morning",
    price: "Free"
  });

  const categories = ["All", "Temple", "Palace", "Beach", "Nature", "Market", "Farm"];
  const statuses = ["All", "Visited", "Wishlist"];

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const res = await favoriteService.getFavorites();
      if (res.success && res.data) {
        const iconMap = {
          Temple: Landmark,
          Palace: Crown,
          Beach: Waves,
          Nature: TreePine,
          Market: ShoppingBag,
          Farm: Leaf
        };

        const formatted = res.data.map(fav => {
          const place = fav.place || {};
          const catName = place.category || place.category_detail?.name || "Temple";
          return {
            id: fav.id,
            place_id: fav.place_id,
            name: place.name || "Favorite Place",
            category: catName,
            location: place.address || place.location || "Cambodia",
            rating: place.rating || 4.5,
            reviews: place.reviews_count || 0,
            icon: iconMap[catName] || Landmark,
            description: place.description || "No description provided.",
            savedDate: fav.saved_date || fav.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
            visited: Boolean(fav.visited),
            tags: [catName.toLowerCase()],
            visitors: place.visitors_count || 100,
            bestTime: place.best_time || "Morning",
            duration: place.duration || "2 hours",
            price: place.price || "Free",
            coordinates: place.coordinates || "11.5500° N, 104.9167° E",
            image_url: place.image_url || ""
          };
        });
        setFavorites(formatted);
      }
    } catch (e) {
      console.error("Failed to load favorites:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" ||
                         (selectedStatus === "Visited" && item.visited) ||
                         (selectedStatus === "Wishlist" && !item.visited);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalRecords = filteredFavorites.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedFavorites = filteredFavorites.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleCategoryChange = (val) => { setSelectedCategory(val); setCurrentPage(1); };
  const handleStatusChange = (val) => { setSelectedStatus(val); setCurrentPage(1); };
  const handleSortChange = (val) => { setSortBy(val); setCurrentPage(1); };

  const handleToggleVisited = async (id) => {
    try {
      await favoriteService.toggleVisited(id);
      loadFavorites();
    } catch (e) {
      alert(e.message || "Failed to update visited status.");
    }
  };

  const handleDelete = async (idOrPlaceId) => {
    if (window.confirm("Are you sure you want to remove this favorite?")) {
      try {
        await favoriteService.removeFavorite(idOrPlaceId);
        loadFavorites();
      } catch (e) {
        alert(e.message || "Failed to remove favorite.");
      }
    }
  };

  const handleViewDetails = (favorite) => {
    setSelectedFavorite(favorite);
    setIsDetailsOpen(true);
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

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newPlace.name || !newPlace.location) {
      alert("Please fill in required fields");
      return;
    }
    try {
      // Find or create place first
      const placeRes = await placeService.createPlace({
        name: newPlace.name,
        address: newPlace.location,
        description: newPlace.description,
        status: "Active"
      });
      if (placeRes.success && placeRes.data) {
        await favoriteService.addFavorite(placeRes.data.id);
        setIsAddOpen(false);
        setNewPlace({
          name: "",
          category: "Temple",
          location: "",
          description: "",
          bestTime: "Morning",
          price: "Free"
        });
        loadFavorites();
      }
    } catch (err) {
      alert(err.message || "Failed to add favorite place.");
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSortBy("recent");
    setCurrentPage(1);
  };

  const handleReset = () => {
    loadFavorites();
  };

  const handleBulkDelete = async () => {
    if (!selectedFavorites.length) return;
    if (window.confirm(`Remove ${selectedFavorites.length} item(s) from favorites?`)) {
      for (const id of selectedFavorites) {
        try { await favoriteService.removeFavorite(id); } catch (e) {}
      }
      setSelectedFavorites([]);
      loadFavorites();
    }
  };

  const handleBulkMarkVisited = async () => {
    if (!selectedFavorites.length) return;
    for (const id of selectedFavorites) {
      try { await favoriteService.toggleVisited(id); } catch (e) {}
    }
    setSelectedFavorites([]);
    loadFavorites();
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
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          statuses={statuses}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onClearFilters={handleClearFilters}
          onBulkDelete={handleBulkDelete}
          onBulkMarkVisited={handleBulkMarkVisited}
          onDeselectAll={() => setSelectedFavorites([])}
        />

        {/* Grid or List View */}
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
            Loading favorites from API...
          </div>
        ) : viewMode === "grid" ? (
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
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{" "}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{" "}
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
                        ? "bg-[var(--color-primary)] text-white shadow-sm font-bold"
                        : "border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-gray-100 dark:hover:bg-gray-800"
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
