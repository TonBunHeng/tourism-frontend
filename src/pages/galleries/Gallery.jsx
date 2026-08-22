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
import galleryService from "../../services/galleryService";
import categoryService from "../../services/categoryService";
import deletionRequestService from "../../services/deletionRequestService";
import { useAlert } from "../../context/AlertContext";

export default function Gallery() {
  const { showConfirm, showSuccess, showError } = useAlert();
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
  const itemsPerPage = 8;

  const [categoriesList, setCategoriesList] = useState(["All", "Temple", "Nature", "Culture", "City", "Festival", "Food"]);
  const types = ["All", "Image", "Video"];

  const loadCategories = async () => {
    try {
      const res = await categoryService.getCategories({ per_page: 100 });
      if (res.success && res.data && res.data.length > 0) {
        const catNames = res.data.map(c => c.name);
        setCategoriesList(["All", ...catNames]);
      }
    } catch (e) {
      console.warn("Could not load categories:", e);
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
      if (selectedCategory !== "All") params.category = selectedCategory;
      if (selectedType !== "All") params.type = selectedType.toLowerCase();

      const res = await galleryService.getMedia(params);
      if (res.success && res.data) {
        const formatted = res.data.map(item => ({
          id: item.id,
          title: item.title,
          type: item.type || "image",
          url: item.url,
          category: item.category || item.category_name || "General",
          size: item.size || item.file_size || "2.4 MB",
          dimensions: item.dimensions || "1920x1080",
          uploadedBy: item.uploader_name || item.user?.name || "Admin",
          uploadDate: item.uploadDate || (item.created_at ? item.created_at.split("T")[0] : "2026-08-18"),
          views: Number(item.views_count ?? item.views ?? 0),
          likes: Number(item.likes_count ?? item.likes ?? 0),
          status: item.status || "Published",
          tags: Array.isArray(item.tags)
            ? item.tags.map(t => (typeof t === "string" ? t : t.name || "tag"))
            : [item.category?.toLowerCase() || "tourism"]
        }));
        setMediaItems(formatted);
        if (res.meta) {
          setTotalRecords(res.meta.total || formatted.length);
          setTotalPages(res.meta.last_page || Math.ceil((res.meta.total || formatted.length) / itemsPerPage) || 1);
        } else {
          setTotalRecords(formatted.length);
          setTotalPages(1);
        }
      }
    } catch (e) {
      console.error("Failed to load gallery media from API:", e);
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
    const item = mediaItems.find(m => m.id === id);
    const mediaTitle = item?.title || `Media #${id}`;
    const confirmed = await showConfirm({
      title: 'Submit Deletion Request',
      message: `Are you sure you want to submit a deletion request for "${mediaTitle}"?\n\nThis will be sent to Deletion Requests for review and approval.`,
      confirmText: 'Submit Deletion',
      type: 'danger'
    });

    if (!confirmed) return;

    try {
      await deletionRequestService.createRequest({
        request_type: 'item',
        reason: `Request to delete media item: ${mediaTitle}`,
        urgency: 'low',
        items: [{
          item_type: 'gallery',
          item_id: id,
          item_name: mediaTitle,
          category: item?.category || 'Gallery'
        }]
      });
      showSuccess(`Deletion request for "${mediaTitle}" has been submitted to Deletion Requests.`, 'Request Submitted');
    } catch (e) {
      showError(e.message || 'Failed to submit deletion request.', 'Submission Failed');
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
    if (e && e.preventDefault) e.preventDefault();
    if (!editingMedia) return;
    try {
      await galleryService.updateMedia(editingMedia.id, {
        title: editingMedia.title,
        type: editingMedia.type || "image",
        category: editingMedia.category,
        url: editingMedia.url
      });
      setIsEditOpen(false);
      setEditingMedia(null);
      showSuccess(`Media item "${editingMedia.title}" has been updated successfully.`, 'Media Updated');
      loadMedia();
    } catch (err) {
      showError(err.message || "Failed to update media item.", 'Update Failed');
    }
  };

  const handleAddMedia = async (newMedia) => {
    try {
      await galleryService.createMedia({
        title: newMedia.title,
        type: newMedia.type || "image",
        url: newMedia.url,
        category: newMedia.category,
        file_size: newMedia.size || "2.4 MB",
        dimensions: newMedia.dimensions || "1920x1080",
        status: newMedia.status || "Published"
      });
      setIsUploadModalOpen(false);
      showSuccess(`Media item "${newMedia.title}" has been created and published successfully.`, 'Media Uploaded');
      loadMedia();
    } catch (err) {
      showError(err.message || "Failed to create media item.", 'Upload Failed');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <GalleryHeader onOpenUploadModal={() => setIsUploadModalOpen(true)} />

      {/* Stats Cards */}
      <GalleryStats mediaItems={mediaItems} media={mediaItems} />

      {/* Main Content Section */}
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

        {/* Content View */}
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
            Loading gallery media from database...
          </div>
        ) : viewMode === "list" ? (
          <GalleryList
            media={mediaItems}
            mediaItems={mediaItems}
            onPreview={handlePreview}
            onEdit={handleEdit}
            onDelete={handleDelete}
            startIndex={startIndex}
          />
        ) : (
          <GalleryGrid
            media={mediaItems}
            mediaItems={mediaItems}
            onPreview={handlePreview}
            onEdit={handleEdit}
            onDelete={handleDelete}
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

      {/* Edit Modal */}
      <GalleryEditModal
        isOpen={isEditOpen}
        editingMedia={editingMedia}
        onEditingMediaChange={setEditingMedia}
        onClose={() => {
          setIsEditOpen(false);
          setEditingMedia(null);
        }}
        onSubmit={handleUpdateSubmit}
        categories={categoriesList}
      />

      {/* Preview Modal */}
      <GalleryPreviewModal
        isOpen={isPreviewOpen}
        media={selectedMedia}
        onClose={() => {
          setIsPreviewOpen(false);
          setSelectedMedia(null);
        }}
      />
    </div>
  );
}
