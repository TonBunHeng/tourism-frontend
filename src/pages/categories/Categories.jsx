import { useState, useEffect } from "react";
import { Landmark, ChevronLeft, ChevronRight } from "lucide-react";
import CategoriesHeader from "./CategoriesHeader";
import CategoriesStats from "./CategoriesStats";
import CategoriesToolbar from "./CategoriesToolbar";
import CategoriesGrid from "./CategoriesGrid";
import CategoriesList from "./CategoriesList";
import CategoryModal from "./CategoryModal";
import CategoryDetailsModal from "./CategoryDetailsModal";
import categoryService from "../../services/categoryService";
import deletionRequestService from "../../services/deletionRequestService";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("list");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [viewingCategory, setViewingCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
    color: "#8B5CF6"
  });

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: itemsPerPage,
        search: searchTerm || undefined,
      };
      if (statusFilter !== "All") {
        params.status = statusFilter;
      }
      const res = await categoryService.getCategories(params);
      if (res.success && res.data) {
        const formatted = res.data.map(c => ({
          ...c,
          placeCount: c.places_count !== undefined ? Number(c.places_count) : 0,
          icon: Landmark,
          createdAt: c.created_at ? c.created_at.split('T')[0] : '2024-01-01',
        }));
        setCategories(formatted);
        if (res.meta) {
          setTotalRecords(res.meta.total);
          setTotalPages(res.meta.last_page);
        } else {
          setTotalRecords(formatted.length);
          setTotalPages(1);
        }
      }
    } catch (e) {
      console.error("Failed to load categories from API", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [currentPage, searchTerm, statusFilter]);

  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleStatusChange = (val) => { setStatusFilter(val); setCurrentPage(1); };

  const handleView = (category) => {
    setViewingCategory(category);
  };

  const handleDelete = async (id) => {
    const category = categories.find(c => c.id === id);
    const categoryName = category?.name || `Category #${id}`;
    if (window.confirm(`Submit deletion request for category "${categoryName}"?\n(This will be sent to Deletion Requests for review and approval)`)) {
      try {
        await deletionRequestService.createRequest({
          request_type: 'item',
          reason: `Request to delete category: ${categoryName}`,
          urgency: 'medium',
          items: [{
            item_type: 'category',
            item_id: id,
            item_name: categoryName,
            category: 'Category'
          }]
        });
        alert(`Deletion request for "${categoryName}" has been submitted to Deletion Requests.`);
      } catch (e) {
        alert(e.message || "Failed to submit deletion request.");
      }
    }
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", status: "Active", color: "#8B5CF6" });
    setIsAddModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      status: category.status || "Active",
      color: category.color || "#8B5CF6"
    });
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingCategory(null);
  };

  const handleFormChange = (fieldOrData, value) => {
    if (typeof fieldOrData === 'object' && fieldOrData !== null) {
      setFormData(fieldOrData);
    } else {
      setFormData(prev => ({ ...prev, [fieldOrData]: value }));
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, formData);
      } else {
        await categoryService.createCategory(formData);
      }
      closeModal();
      loadCategories();
    } catch (e) {
      alert(e.message || "Failed to save category.");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + categories.length, totalRecords);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <CategoriesHeader onOpenAddModal={openAddModal} />

      {/* Stats Cards */}
      <CategoriesStats categories={categories} />

      {/* Main Categories Section */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        <CategoriesToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
        />

        {isLoading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
            Loading categories from database...
          </div>
        ) : viewMode === "list" ? (
          <CategoriesList
            categories={categories}
            onView={handleView}
            onViewCategory={handleView}
            onEdit={openEditModal}
            onEditCategory={openEditModal}
            onDelete={handleDelete}
            onDeleteCategory={handleDelete}
            startIndex={startIndex}
          />
        ) : (
          <CategoriesGrid
            categories={categories}
            onView={handleView}
            onViewCategory={handleView}
            onEdit={openEditModal}
            onEditCategory={openEditModal}
            onDelete={handleDelete}
            onDeleteCategory={handleDelete}
          />
        )}

        {/* Pagination Footer */}
        {totalRecords > 0 && (
          <div className="p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-input-dark-bg)]/40">
            <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{" "}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{" "}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{totalRecords}</span> categories
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

      {/* Modals */}
      <CategoryModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        editingCategory={editingCategory}
        formData={formData}
        onFormChange={handleFormChange}
        onFormDataChange={handleFormChange}
        onSubmit={handleSubmit}
      />

      <CategoryDetailsModal
        isOpen={Boolean(viewingCategory)}
        category={viewingCategory}
        onClose={() => setViewingCategory(null)}
        onEdit={(cat) => {
          setViewingCategory(null);
          openEditModal(cat);
        }}
        onEditCategory={(cat) => {
          setViewingCategory(null);
          openEditModal(cat);
        }}
      />
    </div>
  );
}
