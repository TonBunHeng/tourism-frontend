import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GalleryHeader from "./GalleryHeader";
import GalleryStats from "./GalleryStats";
import GalleryToolbar from "./GalleryToolbar";
import GalleryGrid from "./GalleryGrid";
import GalleryList from "./GalleryList";
import GalleryUploadModal from "./GalleryUploadModal";
import GalleryEditModal from "./GalleryEditModal";
import GalleryPreviewModal from "./GalleryPreviewModal";
import categoryService from "../../services/categoryService";
import galleryService from "../../services/galleryService";

export default function Gallery() {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [viewMode, setViewMode] = useState("list");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const [categoriesList, setCategoriesList] = useState(["All", "Temple", "City", "Nature", "Culture", "Beach", "Historical"]);
  const types = ["All", "image", "video"];

  const loadCategories = async () => {
    try {
      const res = await categoryService.getCategories({ all: "true" });
      if (res.success && res.data && res.data.length > 0) {
        const names = res.data.map(c => c.name);
        setCategoriesList(["All", ...names]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: itemsPerPage,
      };
      if (searchTerm) params.search = searchTerm;
      if (selectedType !== "All") params.type = selectedType;

      const res = await galleryService.getGalleries(params);
      if (res.success && res.data) {
        let items = res.data.map(item => ({
          ...item,
          category: item.category || item.category_name || item.category_detail?.name || "General",
          place: item.place || item.place_name || item.place_detail?.name || "General",
          uploader: typeof item.uploader === "object" ? item.uploader?.name : (item.uploader_name || item.uploader || "Admin"),
          url: item.url || item.image_url || "",
          size: item.size || item.file_size || "2.4 MB",
          views: item.views !== undefined ? item.views : (item.views_count !== undefined ? item.views_count : 0),
          likes: item.likes !== undefined ? item.likes : (item.likes_count !== undefined ? item.likes_count : 0),
          uploadDate: item.uploadDate || (item.created_at ? item.created_at.split("T")[0] : "2026-08-17"),
          tags: Array.isArray(item.tags) ? item.tags : (item.tags ? [item.tags] : []),
        }));

        if (selectedCategory !== "All") {
          items = items.filter(i => i.category === selectedCategory);
        }

        setMediaItems(items);
        setTotalRecords(res.meta?.total || items.length);
        setTotalPages(res.meta?.last_page || Math.ceil((res.meta?.total || items.length) / itemsPerPage) || 1);
      }
    } catch (e) {
      console.error("Failed to load gallery items:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadMedia();
  }, [currentPage, searchTerm, selectedCategory, selectedType]);

  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleCategoryChange = (val) => { setSelectedCategory(val); setCurrentPage(1); };
  const handleTypeChange = (val) => { setSelectedType(val); setCurrentPage(1); };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + mediaItems.length, totalRecords);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      try {
        await galleryService.deleteMedia(id);
        loadMedia();
      } catch (e) {
        alert(e.message || "Failed to delete media item.");
      }
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

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingMedia) return;
    try {
      await galleryService.updateMedia(editingMedia.id, {
        title: editingMedia.title,
        type: editingMedia.type || "image",
        url: editingMedia.url || editingMedia.image_url,
        status: editingMedia.status || "Published",
      });
      setIsEditOpen(false);
      setEditingMedia(null);
      loadMedia();
    } catch (err) {
      alert(err.message || "Failed to update media.");
    }
  };

  const handleAddMedia = async (newMedia) => {
    try {
      await galleryService.uploadMedia({
        title: newMedia.title || "Untitled Media",
        type: newMedia.type || "image",
        url: newMedia.url || newMedia.imageUrl || "",
        status: "Published",
      });
      setIsUploadModalOpen(false);
      loadMedia();
    } catch (err) {
      alert(err.message || "Failed to upload media.");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <GalleryHeader onUploadClick={() => setIsUploadModalOpen(true)} />

      {/* Stats Cards */}
      <GalleryStats mediaItems={mediaItems} />

      {/* Main Content */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        {/* Toolbar */}
        <GalleryToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categoriesList}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          types={types}
        />

        {/* Grid or List View */}
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
            Loading gallery media from API...
          </div>
        ) : viewMode === "grid" ? (
          <GalleryGrid
            media={mediaItems}
            onPreview={handlePreview}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <GalleryList
            media={mediaItems}
            onPreview={handlePreview}
            onEdit={handleEdit}
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
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{totalRecords}</span> media items
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

      {/* Upload Modal */}
      <GalleryUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        categories={categoriesList}
        onAddMedia={handleAddMedia}
      />

      {/* Edit Media Modal */}
      <GalleryEditModal
        isOpen={isEditOpen}
        editingMedia={editingMedia}
        onEditingMediaChange={setEditingMedia}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleUpdateSubmit}
        categories={categoriesList}
      />

      {/* Preview Modal */}
      <GalleryPreviewModal
        isOpen={isPreviewOpen}
        media={selectedMedia}
        onClose={() => setIsPreviewOpen(false)}
        onEdit={handleEdit}
      />
    </div>
  );
}
