import { useState, useEffect } from 'react';
import { Landmark, ChevronLeft, ChevronRight } from 'lucide-react';
import ProvincesHeader from './ProvincesHeader';
import ProvincesStats from './ProvincesStats';
import ProvincesToolbar from './ProvincesToolbar';
import ProvincesGrid from './ProvincesGrid';
import ProvincesList from './ProvincesList';
import ProvinceDetailsModal from './ProvinceDetailsModal';
import ProvinceModal from './ProvinceModal';
import provinceService from '../../services/provinceService';
import deletionRequestService from '../../services/deletionRequestService';

export default function Provinces() {
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('list');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProvince, setEditingProvince] = useState(null);
  const [viewingProvince, setViewingProvince] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    name: '',
    type: 'Province',
    population: '',
    area: '',
    districts_count: 0,
    communes_count: 0,
    status: 'Active',
    description: ''
  });

  const loadProvinces = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: itemsPerPage,
      };
      if (searchTerm) params.search = searchTerm;
      if (selectedType !== 'All') params.type = selectedType;
      if (selectedStatus !== 'All') params.status = selectedStatus;

      const res = await provinceService.getProvinces(params);
      if (res.success && res.data) {
        const formatted = res.data.map(p => ({
          ...p,
          districts: p.districts_count,
          communes: p.communes_count,
          places: p.places_count || 0,
          icon: Landmark,
        }));
        setProvinces(formatted);
        if (res.meta) {
          setTotalRecords(res.meta.total);
          setTotalPages(res.meta.last_page);
        }
      }
    } catch (e) {
      console.error('Failed to load provinces from API', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProvinces();
  }, [currentPage, searchTerm, selectedType, selectedStatus]);

  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleTypeChange = (val) => { setSelectedType(val); setCurrentPage(1); };
  const handleStatusChange = (val) => { setSelectedStatus(val); setCurrentPage(1); };

  const handleView = (id) => {
    const provToView = provinces.find(prov => prov.id === id);
    if (provToView) {
      setViewingProvince(provToView);
    }
  };

  const handleDelete = async (id) => {
    const province = provinces.find(p => p.id === id);
    const provName = province?.name || `Province #${id}`;
    if (window.confirm(`Submit deletion request for province "${provName}"?\n(This will be sent to Deletion Requests for review and approval)`)) {
      try {
        await deletionRequestService.createRequest({
          request_type: 'item',
          reason: `Request to delete province: ${provName}`,
          urgency: 'high',
          items: [{
            item_type: 'province',
            item_id: id,
            item_name: provName,
            category: 'Province'
          }]
        });
        alert(`Deletion request for "${provName}" has been submitted to Deletion Requests.`);
      } catch (e) {
        alert(e.message || 'Failed to submit deletion request.');
      }
    }
  };

  const openAddModal = () => {
    setEditingProvince(null);
    setFormData({
      name: '',
      type: 'Province',
      population: '',
      area: '',
      districts_count: 0,
      communes_count: 0,
      status: 'Active',
      description: ''
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (province) => {
    setEditingProvince(province);
    setFormData({
      name: province.name,
      type: province.type,
      population: province.population || '',
      area: province.area || '',
      districts_count: province.districts || 0,
      communes_count: province.communes || 0,
      status: province.status,
      description: province.description || ''
    });
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingProvince(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    try {
      if (editingProvince) {
        await provinceService.updateProvince(editingProvince.id, formData);
      } else {
        await provinceService.createProvince(formData);
      }
      closeModal();
      loadProvinces();
    } catch (e) {
      alert(e.message || 'Failed to save province.');
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + provinces.length, totalRecords);

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <ProvincesHeader onOpenAddModal={openAddModal} />

      {/* Stats Cards */}
      <ProvincesStats provinces={provinces} />

      {/* Main Content Card */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        <ProvincesToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
        />

        {isLoading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
            Loading provinces from API...
          </div>
        ) : viewMode === 'list' ? (
          <ProvincesList
            provinces={provinces}
            onViewProvince={handleView}
            onEditProvince={openEditModal}
            onDeleteProvince={handleDelete}
            startIndex={startIndex}
          />
        ) : (
          <ProvincesGrid
            provinces={provinces}
            onViewProvince={handleView}
            onEditProvince={openEditModal}
            onDeleteProvince={handleDelete}
          />
        )}

        {/* Pagination Footer */}
        {totalRecords > 0 && (
          <div className="p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-input-dark-bg)]/40">
            <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{totalRecords}</span> provinces
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
      <ProvinceDetailsModal
        province={viewingProvince}
        onClose={() => setViewingProvince(null)}
        onEditProvince={openEditModal}
      />

      {/* Add / Edit Province Modal */}
      <ProvinceModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        editingProvince={editingProvince}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
