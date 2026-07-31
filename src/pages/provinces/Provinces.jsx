import { useState } from 'react';
import {
  Home,
  Landmark,
  Waves,
  Sprout,
  Church,
  Mountain,
  Building
} from 'lucide-react';
import ProvincesHeader from './ProvincesHeader';
import ProvincesStats from './ProvincesStats';
import ProvincesToolbar from './ProvincesToolbar';
import ProvincesGrid from './ProvincesGrid';
import ProvincesList from './ProvincesList';
import ProvinceDetailsModal from './ProvinceDetailsModal';
import ProvinceModal from './ProvinceModal';

export default function Provinces() {
  const [provinces, setProvinces] = useState([
    {
      id: 1,
      name: 'Phnom Penh',
      type: 'Capital City',
      population: '2,129,371',
      area: '678.46 km²',
      districts: 14,
      communes: 109,
      status: 'Active',
      icon: Home,
      description: 'Capital and largest city of Cambodia',
      rating: 4.9,
      places: 156
    },
    {
      id: 2,
      name: 'Siem Reap',
      type: 'Province',
      population: '1,014,234',
      area: '10,299 km²',
      districts: 12,
      communes: 100,
      status: 'Active',
      icon: Landmark,
      description: 'Home to the famous Angkor Wat temple complex',
      rating: 4.9,
      places: 89
    },
    {
      id: 3,
      name: 'Preah Sihanouk',
      type: 'Province',
      population: '310,072',
      area: '2,536.68 km²',
      districts: 4,
      communes: 26,
      status: 'Active',
      icon: Waves,
      description: 'Coastal province with beautiful beaches',
      rating: 4.7,
      places: 45
    },
    {
      id: 4,
      name: 'Battambang',
      type: 'Province',
      population: '997,169',
      area: '11,702 km²',
      districts: 13,
      communes: 93,
      status: 'Active',
      icon: Sprout,
      description: 'Known as the rice bowl of Cambodia',
      rating: 4.5,
      places: 34
    },
    {
      id: 5,
      name: 'Kampong Cham',
      type: 'Province',
      population: '895,763',
      area: '4,549 km²',
      districts: 10,
      communes: 86,
      status: 'Inactive',
      icon: Church,
      description: 'Located along the Mekong River',
      rating: 4.3,
      places: 28
    },
    {
      id: 6,
      name: 'Pursat',
      type: 'Province',
      population: '411,759',
      area: '12,692 km²',
      districts: 6,
      communes: 46,
      status: 'Active',
      icon: Mountain,
      description: 'Known for its mountain ranges and forests',
      rating: 4.4,
      places: 22
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingProvince, setViewingProvince] = useState(null);
  const [editingProvince, setEditingProvince] = useState(null);

  const provinceTypes = ['All', 'Capital City', 'Province', 'Municipality'];

  const filteredProvinces = provinces.filter(prov => {
    const matchesSearch = prov.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prov.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || prov.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleEdit = (id) => {
    const province = provinces.find(p => p.id === id);
    setEditingProvince(province);
    setIsModalOpen(true);
  };

  const handleView = (id) => {
    const provinceToView = provinces.find(prov => prov.id === id);
    if (provinceToView) {
      setViewingProvince(provinceToView);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this province?')) {
      setProvinces(provinces.filter(prov => prov.id !== id));
    }
  };

  const handleSave = (provinceData) => {
    if (editingProvince) {
      setProvinces(provinces.map(p => 
        p.id === editingProvince.id ? { ...p, ...provinceData } : p
      ));
    } else {
      const newProvince = {
        id: provinces.length + 1,
        ...provinceData,
        status: 'Active',
        rating: 4.0,
        places: 0,
        icon: Building
      };
      setProvinces([...provinces, newProvince]);
    }
    setIsModalOpen(false);
    setEditingProvince(null);
  };

  const openAddModal = () => {
    setEditingProvince(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProvince(null);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <ProvincesHeader onOpenAddModal={openAddModal} />

      {/* Stats Cards */}
      <ProvincesStats provinces={provinces} />

      {/* Main Content */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-2xl shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        <ProvincesToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          provinceTypes={provinceTypes}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {viewMode === 'grid' ? (
          <ProvincesGrid
            provinces={filteredProvinces}
            onViewProvince={handleView}
            onEditProvince={handleEdit}
            onDeleteProvince={handleDelete}
          />
        ) : (
          <ProvincesList
            provinces={filteredProvinces}
            onViewProvince={handleView}
            onEditProvince={handleEdit}
            onDeleteProvince={handleDelete}
          />
        )}
      </div>

      {/* View Details Modal */}
      <ProvinceDetailsModal
        province={viewingProvince}
        onClose={() => setViewingProvince(null)}
        onEditProvince={(id) => {
          setViewingProvince(null);
          handleEdit(id);
        }}
      />

      {/* Add / Edit Province Modal */}
      <ProvinceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingProvince={editingProvince}
        onSave={handleSave}
        provinceTypes={provinceTypes}
      />
    </div>
  );
}