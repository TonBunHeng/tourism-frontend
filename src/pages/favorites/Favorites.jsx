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
import categoryService from "../../services/categoryService";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState(["All"]);
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

  const statuses = ["All", "Visited", "Wishlist"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getCategories();
        if (res.success && res.data) {
          const names = ["All", ...res.data.map(c => c.name)];
          setCategories(names);
        }
      } catch (e) {
        console.error("Failed to fetch categories from API", e);
      }
    };
    fetchCategories();
  }, []);

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
            icon: iconMap[catName] || Landmark,
            location: place.address || place.province || "Cambodia",
            rating: place.rating || 5.0,
            reviewsCount: place.reviews_count || 0,
            image: place.image_url || place.image || "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600",
            status: fav.visited ? "Visited" : "Wishlist",
            dateAdded: fav.created_at ? new Date(fav.created_at).toISOString().split('T')[0] : "Recently",
            bestTime: place.best_time || "Morning",
            price: place.price || "Free",
            description: place.description || ""
          };
        });

        setFavorites(formatted);
      }
    } catch (e) {
      console.error("Failed to load favorites from API", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleToggleStatus = async (favId) => {
    try {
      await favoriteService.toggleVisited(favId);
      loadFavorites();
    } catch (e) {
      console.error("Failed to toggle visited status", e);
    }
  };

  const handleDeleteFavorite = async (placeId) => {
    if (!window.confirm("Are you sure you want to remove this favorite?")) return;
    try {
      await favoriteService.removeFavorite(placeId);
      loadFavorites();
    } catch (e) {
      console.error("Failed to delete favorite", e);
    }
  };

  const handleCreatePlace = async (e) => {
    e.preventDefault();
    if (!newPlace.name) return;
    try {
      const res = await placeService.createPlace(newPlace);
      if (res.success && res.data) {
        await favoriteService.addFavorite({ place_id: res.data.id, visited: false });
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
    } catch (e) {
      console.error("Failed to create place / add favorite", e);
    }
  };

  // Filter and Sort
  const filteredFavorites = favorites.filter((fav) => {
    const matchesSearch =
      fav.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fav.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || fav.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || fav.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage) || 1;
  const paginatedFavorites = filteredFavorites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-6">
      <FavoritesHeader
        totalCount={favorites.length}
        onAddClick={() => setIsAddOpen(true)}
      />

      <FavoritesStats favorites={favorites} />

      <FavoritesToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        categories={categories}
        statuses={statuses}
      />

      {viewMode === "grid" ? (
        <FavoritesGrid
          favorites={paginatedFavorites}
          selectedFavorites={selectedFavorites}
          setSelectedFavorites={setSelectedFavorites}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteFavorite}
          onView={(fav) => { setSelectedFavorite(fav); setIsDetailsOpen(true); }}
        />
      ) : (
        <FavoritesList
          favorites={paginatedFavorites}
          selectedFavorites={selectedFavorites}
          setSelectedFavorites={setSelectedFavorites}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteFavorite}
          onView={(fav) => { setSelectedFavorite(fav); setIsDetailsOpen(true); }}
        />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 rounded-lg border">
        <p className="text-xs text-gray-700">
          Showing <span className="font-medium">{paginatedFavorites.length}</span> of{" "}
          <span className="font-medium">{filteredFavorites.length}</span> items
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="flex items-center gap-1 px-3 py-1 text-xs border rounded-md disabled:opacity-40 hover:bg-gray-50"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="flex items-center gap-1 px-3 py-1 text-xs border rounded-md disabled:opacity-40 hover:bg-gray-50"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <FavoriteModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        newPlace={newPlace}
        setNewPlace={setNewPlace}
        categories={categories}
        onSubmit={handleCreatePlace}
      />

      <FavoriteDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        favorite={selectedFavorite}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}
