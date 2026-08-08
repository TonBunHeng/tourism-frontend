import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GalleryHeader from './GalleryHeader';
import GalleryStats from './GalleryStats';
import GalleryToolbar from './GalleryToolbar';
import GalleryGrid from './GalleryGrid';
import GalleryList from './GalleryList';
import GalleryUploadModal from './GalleryUploadModal';
import GalleryEditModal from './GalleryEditModal';
import GalleryPreviewModal from './GalleryPreviewModal';

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
    },
    {
      id: 7,
      title: 'Kampot Pepper Farm',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      category: 'Nature',
      tags: ['kampot', 'pepper', 'farm'],
      size: '3.4 MB',
      dimensions: '1920x1080',
      uploadedBy: 'Editor',
      uploadDate: '2024-03-01',
      views: 780,
      likes: 62,
      status: 'Published'
    },
    {
      id: 8,
      title: 'Preah Vihear Temple Cliff',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1583418037743-c2e994c1222d?w=400&h=300&fit=crop',
      category: 'Temple',
      tags: ['preah vihear', 'temple', 'cliff'],
      size: '4.1 MB',
      dimensions: '1920x1080',
      uploadedBy: 'Admin',
      uploadDate: '2024-03-05',
      views: 1890,
      likes: 145,
      status: 'Published'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState('list');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ['All', 'Temple', 'City', 'Nature', 'Culture', 'Beach', 'Historical'];
  const types = ['All', 'image', 'video'];

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleCategoryChange = (val) => { setSelectedCategory(val); setCurrentPage(1); };
  const handleTypeChange = (val) => { setSelectedType(val); setCurrentPage(1); };

  const totalRecords = filteredMedia.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedMedia = filteredMedia.slice(startIndex, startIndex + itemsPerPage);

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
          categories={categories}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          types={types}
        />

        {/* Grid or List View */}
        {viewMode === 'grid' ? (
          <GalleryGrid
            media={paginatedMedia}
            onPreview={handlePreview}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <GalleryList
            media={paginatedMedia}
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
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{' '}
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
                        ? 'bg-[var(--color-primary)] text-white shadow-sm font-bold'
                        : 'border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-gray-100 dark:hover:bg-gray-800'
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
        categories={categories}
        onAddMedia={(newMedia) => setMediaItems([newMedia, ...mediaItems])}
      />

      {/* Edit Media Modal */}
      <GalleryEditModal
        isOpen={isEditOpen}
        editingMedia={editingMedia}
        onEditingMediaChange={setEditingMedia}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleUpdateSubmit}
        categories={categories}
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