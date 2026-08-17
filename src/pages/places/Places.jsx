import { useState, useEffect } from 'react';
import { Landmark, ChevronLeft, ChevronRight } from 'lucide-react';
import PlacesHeader from './PlacesHeader';
import PlacesStats from './PlacesStats';
import FeaturedPlaces from './FeaturedPlaces';
import PlacesToolbar from './PlacesToolbar';
import PlacesGrid from './PlacesGrid';
import PlacesList from './PlacesList';
import PlaceDetailsModal from './PlaceDetailsModal';
import PlaceModal from './PlaceModal';
import placeService from '../../services/placeService';
import categoryService from '../../services/categoryService';

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoriesList, setCategoriesList] = useState(['All']);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingPlace, setViewingPlace] = useState(null);
  const [editingPlace, setEditingPlace] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    name: '',
    category_id: 1,
    category: 'Temple',
    address: '',
    status: 'Active'
  });

  const loadCategories = async () => {
    try {
      const res = await categoryService.getCategories({ all: 'true' });
      if (res.success && res.data) {
        const names = res.data.map(c => c.name);
        setCategoriesList(['All', ...names]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadPlaces = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: itemsPerPage,
        search: searchTerm,
      };
      if (selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      const res = await placeService.getPlaces(params);
      if (res.success && res.data) {
        const formatted = res.data.map(p => ({
          ...p,
          category: p.category || p.category_detail?.name || 'Uncategorized',
          reviews: p.reviews_count || 0,
          icon: Landmark,
        }));
        setPlaces(formatted);
        if (res.meta) {
          setTotalRecords(res.meta.total);
          setTotalPages(res.meta.last_page);
        }
      }
    } catch (e) {
      console.error('Failed to load places from API', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadPlaces();
  }, [currentPage, searchTerm, selectedCategory]);

  const formCategories = categoriesList.filter(c => c !== 'All');
  const statusOptions = ['Active', 'Inactive', 'Pending'];

  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleCategoryChange = (val) => { setSelectedCategory(val); setCurrentPage(1); };

  const handleView = async (id) => {
    try {
      const res = await placeService.getPlaceById(id);
      if (res.success && res.data) {
        setViewingPlace({
          ...res.data,
          category: res.data.category || res.data.category_detail?.name || 'Uncategorized',
          reviews: res.data.reviews_count || 0,
        });
      }
    } catch (e) {
      const placeToView = places.find(place => place.id === id);
      if (placeToView) setViewingPlace(placeToView);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      try {
        await placeService.deletePlace(id);
        loadPlaces();
      } catch (e) {
        alert(e.message || 'Failed to delete place.');
      }
    }
  };

  const openAddModal = () => {
    setEditingPlace(null);
    setFormData({ name: '', category_id: 1, category: formCategories[0] || 'Temple', address: '', status: 'Active' });
    setIsAddModalOpen(true);
  };

  const openEditModal = (place) => {
    setEditingPlace(place);
    setFormData({
      name: place.name,
      category_id: place.category_id || 1,
      category: place.category,
      address: place.address,
      status: place.status
    });
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingPlace(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.address.trim()) return;

    try {
      if (editingPlace) {
        await placeService.updatePlace(editingPlace.id, {
          name: formData.name,
          category_id: formData.category_id || 1,
          address: formData.address,
          status: formData.status,
        });
      } else {
        await placeService.createPlace({
          name: formData.name,
          category_id: formData.category_id || 1,
          address: formData.address,
          status: formData.status,
        });
      }
      closeModal();
      loadPlaces();
    } catch (e) {
      alert(e.message || 'Failed to save place.');
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + places.length, totalRecords);

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <PlacesHeader onOpenAddModal={openAddModal} />

      {/* Stats Cards */}
      <PlacesStats places={places} />

      {/* Featured Places */}
      <FeaturedPlaces />

      {/* All Places Section */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        <PlacesToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categoriesList}
        />

        {isLoading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
            Loading places from API...
          </div>
        ) : viewMode === 'list' ? (
          <PlacesList
            places={places}
            onViewPlace={handleView}
            onEditPlace={openEditModal}
            onDeletePlace={handleDelete}
            startIndex={startIndex}
          />
        ) : (
          <PlacesGrid
            places={places}
            onViewPlace={handleView}
            onEditPlace={openEditModal}
            onDeletePlace={handleDelete}
          />
        )}

        {/* Pagination Footer */}
        {totalRecords > 0 && (
          <div className="p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-input-dark-bg)]/40">
            <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{totalRecords}</span> places
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

      {/* View Details Modal */}
      <PlaceDetailsModal
        place={viewingPlace}
        onClose={() => setViewingPlace(null)}
        onEditPlace={openEditModal}
      />

      {/* Add / Edit Place Modal */}
      <PlaceModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        editingPlace={editingPlace}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        formCategories={formCategories}
        statusOptions={statusOptions}
      />
    </div>
  );
}
