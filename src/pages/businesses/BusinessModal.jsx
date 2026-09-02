import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Building2, Save } from 'lucide-react';

export default function BusinessModal({
  isOpen,
  onClose,
  editingBusiness = null,
  onSubmit
}) {
  const [formData, setFormData] = useState({
    name: '',
    category_id: '1',
    category_name: 'Hospitality',
    owner_name: '',
    owner_email: '',
    owner_phone: '',
    province: 'Siem Reap',
    address: '',
    license_number: '',
    verification_status: 'pending',
    description: '',
    website: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBusiness) {
      setFormData({
        name: editingBusiness.name || '',
        category_id: editingBusiness.category?.id || editingBusiness.category_id || '1',
        category_name: editingBusiness.category?.name || editingBusiness.category_name || editingBusiness.category || 'Hospitality',
        owner_name: editingBusiness.owner?.name || editingBusiness.owner_name || '',
        owner_email: editingBusiness.owner?.email || editingBusiness.owner_email || editingBusiness.email || '',
        owner_phone: editingBusiness.owner?.phone || editingBusiness.owner_phone || editingBusiness.phone || '',
        province: editingBusiness.province?.name || editingBusiness.province || 'Siem Reap',
        address: editingBusiness.address || '',
        license_number: editingBusiness.license_number || editingBusiness.tax_id || '',
        verification_status: editingBusiness.verification_status || editingBusiness.status || 'pending',
        description: editingBusiness.description || '',
        website: editingBusiness.website || ''
      });
    } else {
      setFormData({
        name: '',
        category_id: '1',
        category_name: 'Hospitality',
        owner_name: '',
        owner_email: '',
        owner_phone: '',
        province: 'Siem Reap',
        address: '',
        license_number: '',
        verification_status: 'pending',
        description: '',
        website: ''
      });
    }
    setErrors({});
  }, [editingBusiness, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Business name is required';
    if (!formData.owner_name.trim()) newErrors.owner_name = 'Owner name is required';
    if (!formData.owner_email.trim()) newErrors.owner_email = 'Owner email is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  const categories = [
    { id: '1', name: 'Hospitality & Hotels' },
    { id: '2', name: 'Tour & Travel Agency' },
    { id: '3', name: 'Dining' },
    { id: '4', name: 'Transport & Logistics' },
    { id: '5', name: 'Souvenir & Handicrafts' },
  ];

  const provinces = ['Siem Reap', 'Phnom Penh', 'Preah Sihanouk', 'Battambang', 'Kampot', 'Kep'];

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-modal-overlay)] backdrop-blur-xs p-4 animate-alert-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col relative border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] animate-alert-popup overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex justify-between items-center bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-surface-hover-dark)]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[#003E83] dark:text-blue-400 flex items-center justify-center font-bold">
              <Building2 size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                {editingBusiness ? 'Edit Business Profile' : 'Add New Business Profile'}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                {editingBusiness ? `Updating record #${editingBusiness.id}` : 'Register a commercial business entity in AngkorVerses'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Angkor Heritage Restaurant & Lounge"
                className="w-full px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs focus:ring-2 focus:ring-[var(--color-input)] focus:outline-none"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
                Business Category
              </label>
              <select
                value={formData.category_name}
                onChange={(e) => {
                  const cat = categories.find(c => c.name === e.target.value);
                  handleChange('category_name', e.target.value);
                  if (cat) handleChange('category_id', cat.id);
                }}
                className="w-full px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs focus:ring-2 focus:ring-[var(--color-input)] focus:outline-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
                Owner Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.owner_name}
                onChange={(e) => handleChange('owner_name', e.target.value)}
                placeholder="e.g. Sok Sovann"
                className="w-full px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs focus:ring-2 focus:ring-[var(--color-input)] focus:outline-none"
              />
              {errors.owner_name && <p className="text-xs text-red-500 mt-1">{errors.owner_name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
                Owner Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.owner_email}
                onChange={(e) => handleChange('owner_email', e.target.value)}
                placeholder="e.g. info@angkor-restaurant.com"
                className="w-full px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs focus:ring-2 focus:ring-[var(--color-input)] focus:outline-none"
              />
              {errors.owner_email && <p className="text-xs text-red-500 mt-1">{errors.owner_email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
                Owner Phone Contact
              </label>
              <input
                type="text"
                value={formData.owner_phone}
                onChange={(e) => handleChange('owner_phone', e.target.value)}
                placeholder="e.g. +855 12 884 920"
                className="w-full px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs focus:ring-2 focus:ring-[var(--color-input)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
                Province / Region
              </label>
              <select
                value={formData.province}
                onChange={(e) => handleChange('province', e.target.value)}
                className="w-full px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs focus:ring-2 focus:ring-[var(--color-input)] focus:outline-none cursor-pointer"
              >
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
                Commercial License / Tax ID
              </label>
              <input
                type="text"
                value={formData.license_number}
                onChange={(e) => handleChange('license_number', e.target.value)}
                placeholder="e.g. MOT-2024-REG"
                className="w-full px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs focus:ring-2 focus:ring-[var(--color-input)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
                Verification Status
              </label>
              <select
                value={formData.verification_status}
                onChange={(e) => handleChange('verification_status', e.target.value)}
                className="w-full px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs focus:ring-2 focus:ring-[var(--color-input)] focus:outline-none cursor-pointer capitalize"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="suspended">Suspended</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
              Address & Location Details
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="e.g. Street 08, Siem Reap"
              className="w-full px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs focus:ring-2 focus:ring-[var(--color-input)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
              Website URL
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="e.g. https://angkor-restaurant.com"
              className="w-full px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs focus:ring-2 focus:ring-[var(--color-input)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
              Business Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter brief description of services, accommodations, or offerings..."
              className="w-full px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs focus:ring-2 focus:ring-[var(--color-input)] focus:outline-none resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-xs sm:text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#003E83] hover:bg-[#002e62] text-white font-medium rounded-md transition-colors text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Save size={16} />
              {editingBusiness ? 'Save Profile Changes' : 'Create Business Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
