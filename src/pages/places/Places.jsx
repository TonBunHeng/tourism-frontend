import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Star,
  Clock,
  Landmark,
  ExternalLink
} from 'lucide-react';
import PlacesHeader from './PlacesHeader';
import PlacesStats from './PlacesStats';
import FeaturedPlaces from './FeaturedPlaces';
import PlacesToolbar from './PlacesToolbar';
import PlacesList from './PlacesList';
import PlacesGrid from './PlacesGrid';
import PlaceModal from './PlaceModal';
import PlaceDetailsModal from './PlaceDetailsModal';
import placeService from '../../services/placeService';
import categoryService from '../../services/categoryService';
import deletionRequestService from '../../services/deletionRequestService';

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [categoriesList, setCategoriesList] = useState(['All', 'Temple', 'Palace', 'Beach', 'Nature', 'Market', 'Farm']);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [viewingPlace, setViewingPlace] = useState(null);

  // Add / Edit Form State
  const [formData, setFormData] = useState({
    name: '',
    category_id: 1,
    category: 'Temple',
    address: '',
    description: '',
    best_time: '',
    duration: '',
    price: '',
    rating: 5.0,
    status: 'Active',
    image_url: ''
  });

  const handleFormChange = (fieldOrData, value) => {
    if (typeof fieldOrData === 'object' && fieldOrData !== null) {
      setFormData(fieldOrData);
    } else {
      setFormData(prev => ({ ...prev, [fieldOrData]: value }));
    }
  };

  const loadCategories = async () => {
    try {
      const res = await categoryService.getCategories({ all: true });
      if (res.success && res.data && res.data.length > 0) {
        const catNames = res.data.map(c => c.name);
        setCategoriesList(['All', ...catNames]);
      }
    } catch (e) {
      console.warn('Could not load categories list for filter:', e);
    }
  };

  const loadPlaces = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: itemsPerPage,
      };
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory !== 'All') params.category = selectedCategory;

      const res = await placeService.getPlaces(params);
      if (res.success && res.data) {
        const formatted = res.data.map(p => ({
          id: p.id,
          name: p.name,
          category_id: p.category_id,
          category: p.category || p.category_detail?.name || 'Attraction',
          category_detail: p.category_detail,
          province_id: p.province_id,
          province: p.province || p.province_detail?.name || 'Siem Reap',
          province_detail: p.province_detail,
          address: p.address || 'Cambodia',
          coordinates: p.coordinates || '13.4125° N, 103.8670° E',
          latitude: p.latitude || 13.4125,
          longitude: p.longitude || 103.8670,
          description: p.description || '',
          best_time: p.best_time || 'Morning',
          duration: p.duration || '2-3 Hours',
          price: p.price || 'Free',
          rating: Number(p.rating || 5.0),
          reviews: Number(p.reviews_count || 0),
          visits: Number(p.visitors_count || 0),
          image_url: p.image_url || p.image || '',
          image: p.image_url || p.image || '',
          images: p.image_url ? [p.image_url] : [],
          is_featured: Boolean(p.is_featured),
          status: p.status || 'Active',
          created_at: p.created_at,
          updated_at: p.updated_at
        }));
        setPlaces(formatted);
        setTotalRecords(res.meta?.total || formatted.length);
        setTotalPages(res.meta?.last_page || Math.ceil((res.meta?.total || formatted.length) / itemsPerPage) || 1);
      }
    } catch (e) {
      console.error('Failed to load places from API:', e);
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

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  const handleView = async (idOrPlace) => {
    const id = typeof idOrPlace === 'object' && idOrPlace !== null ? idOrPlace.id : idOrPlace;
    const localPlace = places.find(p => p.id === id) || (typeof idOrPlace === 'object' ? idOrPlace : null);
    if (localPlace) {
      setViewingPlace(localPlace);
    }
    try {
      const res = await placeService.getPlaceById(id);
      if (res.success && res.data) {
        const p = res.data;
        setViewingPlace({
          ...p,
          reviews: p.reviews_count !== undefined ? Number(p.reviews_count) : 0,
          visits: p.visitors_count !== undefined ? Number(p.visitors_count) : 0,
          category: p.category || p.category_detail?.name || 'Attraction',
          image: p.image_url || p.image || '',
          images: p.image_url ? [p.image_url] : [],
        });
      }
    } catch (e) {
      console.warn('Single place fetch fallback:', e);
    }
  };

  const handleDelete = async (id) => {
    const place = places.find(p => p.id === id);
    const placeName = place?.name || `Place #${id}`;
    if (window.confirm(`Submit deletion request for "${placeName}"?\n(This will be sent to Deletion Requests for review and approval)`)) {
      try {
        await deletionRequestService.createRequest({
          request_type: 'item',
          reason: `Request to delete destination: ${placeName}`,
          urgency: 'medium',
          items: [{
            item_type: 'place',
            item_id: id,
            item_name: placeName,
            category: place?.category || 'Place',
          }]
        });
        alert(`Deletion request for "${placeName}" has been submitted to Deletion Requests.`);
      } catch (e) {
        alert(e.message || 'Failed to submit deletion request.');
      }
    }
  };

  const formCategories = categoriesList.filter(c => c !== 'All');

  const openAddModal = () => {
    setEditingPlace(null);
    setFormData({
      name: '',
      category_id: 1,
      category: formCategories[0] || 'Temple',
      address: '',
      description: '',
      best_time: 'Morning',
      duration: '2-3 Hours',
      price: '$10 - $25',
      rating: 5.0,
      status: 'Active',
      image_url: ''
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (place) => {
    setEditingPlace(place);
    setFormData({
      name: place.name,
      category_id: place.category_id || 1,
      category: place.category || formCategories[0] || 'Temple',
      address: place.address || '',
      description: place.description || '',
      best_time: place.best_time || 'Morning',
      duration: place.duration || '2-3 Hours',
      price: place.price || '',
      rating: place.rating || 5.0,
      status: place.status || 'Active',
      image_url: place.image_url || place.image || ''
    });
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingPlace(null);
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) return;

    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        address: formData.address,
        description: formData.description || '',
        best_time: formData.best_time || '',
        duration: formData.duration || '',
        price: formData.price || '',
        rating: formData.rating || 5.0,
        status: formData.status || 'Active',
        image_url: formData.image_url || ''
      };

      if (editingPlace) {
        await placeService.updatePlace(editingPlace.id, payload);
      } else {
        await placeService.createPlace(payload);
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
      {/* 1. Header with Add Place Button */}
      <PlacesHeader
        onOpenAddModal={openAddModal}
        onAddPlace={openAddModal}
        onAddClick={openAddModal}
      />

      {/* 2. Key Metrics & Analytics Row */}
      <PlacesStats places={places} />

      {/* 3. Featured / Top-Rated Attractions Showcase */}
      <FeaturedPlaces
        places={places}
        onViewPlace={handleView}
        onEditPlace={openEditModal}
      />

      {/* 4. Main Places Explorer Container */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        {/* Search & Filter Toolbar */}
        <PlacesToolbar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          categories={categoriesList}
        />

        {/* Places List or Grid View */}
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
            Loading places from database...
          </div>
        ) : viewMode === 'grid' ? (
          <PlacesGrid
            places={places}
            onViewPlace={handleView}
            onEditPlace={openEditModal}
            onDeletePlace={handleDelete}
          />
        ) : (
          <PlacesList
            places={places}
            onViewPlace={handleView}
            onEditPlace={openEditModal}
            onDeletePlace={handleDelete}
            startIndex={startIndex}
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

      {/* Place Details Modal */}
      <PlaceDetailsModal
        place={viewingPlace}
        onClose={() => setViewingPlace(null)}
        onEditPlace={openEditModal}
      />

      {/* Add / Edit Place Modal */}
      <PlaceModal
        isOpen={isAddModalOpen}
        editingPlace={editingPlace}
        formData={formData}
        onFormDataChange={handleFormChange}
        onFormChange={handleFormChange}
        onClose={closeModal}
        onSubmit={handleSubmit}
        categories={formCategories}
        formCategories={formCategories}
      />
    </div>
  );
}
