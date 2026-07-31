import { useState } from "react";
import {
  FolderTree,
  Landmark,
  Scroll,
  Palette,
  Crown,
  Leaf,
  Theater
} from "lucide-react";
import CategoriesHeader from "./CategoriesHeader";
import CategoriesStats from "./CategoriesStats";
import CategoriesToolbar from "./CategoriesToolbar";
import CategoriesGrid from "./CategoriesGrid";
import CategoriesList from "./CategoriesList";
import CategoryModal from "./CategoryModal";
import CategoryDetailsModal from "./CategoryDetailsModal";

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

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
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

  return (
    <div className="flex flex-col">
      {/* Header */}
      <CategoriesHeader onAddClick={openAddModal} />

      {/* Stats Cards */}
      <CategoriesStats categories={categories} />

      {/* Main Content */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-2xl shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        {/* Toolbar */}
        <CategoriesToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Grid or List View */}
        {viewMode === "grid" ? (
          <CategoriesGrid
            categories={filteredCategories}
            onView={handleView}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        ) : (
          <CategoriesList
            categories={filteredCategories}
            onView={handleView}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* View Details Modal */}
      <CategoryDetailsModal
        isOpen={!!viewingCategory}
        category={viewingCategory}
        onClose={() => setViewingCategory(null)}
        onEdit={openEditModal}
      />

      {/* Add / Edit Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        editingCategory={editingCategory}
        formData={formData}
        onFormDataChange={setFormData}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}