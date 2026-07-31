import { useState } from 'react';
import { Landmark } from 'lucide-react';
import PlacesHeader from './PlacesHeader';
import PlacesStats from './PlacesStats';
import FeaturedPlaces from './FeaturedPlaces';
import PlacesToolbar from './PlacesToolbar';
import PlacesGrid from './PlacesGrid';
import PlacesList from './PlacesList';
import PlaceDetailsModal from './PlaceDetailsModal';
import PlaceModal from './PlaceModal';

export default function Places() {
  const [places, setPlaces] = useState([
    {
      id: 1,
      name: 'Koh Ker Temple',
      category: 'Temple',
      address: 'Srayong Village, Srayong Commune, Srayong District, Preah Vihear Province, Cambodia',
      status: 'Active',
      icon: Landmark,
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'National Museum of Cambodia',
      category: 'Historical Site',
      address: 'Phnom Penh, Cambodia',
      status: 'Active',
      icon: Landmark,
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: 'Angkor Wat',
      category: 'Temple',
      address: 'Siem Reap, Cambodia',
      status: 'Active',
      icon: Landmark,
      rating: 4.9,
      reviews: 256
    },
    {
      id: 4,
      name: 'Royal Palace',
      category: 'Palace',
      address: 'Phnom Penh, Cambodia',
      status: 'Active',
      icon: Landmark,
      rating: 4.7,
      reviews: 98
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingPlace, setViewingPlace] = useState(null);
  const [editingPlace, setEditingPlace] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Temple',
    address: '',
    status: 'Active'
  });

  const categories = ['All', 'Temple', 'Historical Site', 'Palace', 'Museum', 'Nature'];
  const formCategories = categories.filter(c => c !== 'All');
  const statusOptions = ['Active', 'Inactive', 'Pending'];

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          place.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleView = (id) => {
    const placeToView = places.find(place => place.id === id);
    if (placeToView) {
      setViewingPlace(placeToView);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      setPlaces(places.filter(place => place.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingPlace(null);
    setFormData({ name: '', category: 'Temple', address: '', status: 'Active' });
    setIsAddModalOpen(true);
  };

  const openEditModal = (place) => {
    setEditingPlace(place);
    setFormData({
      name: place.name,
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

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.address.trim()) return;

    if (editingPlace) {
      setPlaces(places.map(p =>
        p.id === editingPlace.id
          ? { ...p, ...formData }
          : p
      ));
    } else {
      const newPlace = {
        id: places.length > 0 ? Math.max(...places.map(p => p.id)) + 1 : 1,
        ...formData,
        icon: Landmark,
        rating: 0,
        reviews: 0
      };
      setPlaces([newPlace, ...places]);
    }
    closeModal();
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <PlacesHeader onOpenAddModal={openAddModal} />

      {/* Stats Cards */}
      <PlacesStats places={places} />

      {/* Featured Places */}
      <FeaturedPlaces />

      {/* All Places Section */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-2xl shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        <PlacesToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {viewMode === 'list' ? (
          <PlacesList
            places={filteredPlaces}
            onViewPlace={handleView}
            onEditPlace={openEditModal}
            onDeletePlace={handleDelete}
          />
        ) : (
          <PlacesGrid
            places={filteredPlaces}
            onViewPlace={handleView}
            onEditPlace={openEditModal}
            onDeletePlace={handleDelete}
          />
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