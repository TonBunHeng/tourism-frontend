import { useState, useEffect } from 'react';
import {
  Activity,
  PartyPopper,
  Clapperboard,
  Ship,
  Utensils,
  Music,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import EventsHeader from './EventsHeader';
import EventsStats from './EventsStats';
import EventsToolbar from './EventsToolbar';
import EventsGrid from './EventsGrid';
import EventsList from './EventsList';
import EventModal from './EventModal';
import EventDetailsModal from './EventDetailsModal';
import eventService from '../../services/eventService';
import categoryService from '../../services/categoryService';

import siemReapImg from '../../assets/places_img/SiemReapAngkor.jpg';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [categoriesList, setCategoriesList] = useState(['All']);

  const loadCategories = async () => {
    try {
      const res = await categoryService.getCategories({ all: 'true' });
      if (res.success && res.data && res.data.length > 0) {
        const names = res.data.map(c => c.name);
        setCategoriesList(['All', ...names]);
      } else {
        setCategoriesList(['All', 'Cultural', 'Festival', 'Sports', 'Food', 'Music', 'Exhibition']);
      }
    } catch (e) {
      console.error(e);
      setCategoriesList(['All', 'Cultural', 'Festival', 'Sports', 'Food', 'Music', 'Exhibition']);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    title: '',
    category: 'Cultural',
    description: '',
    location: '',
    start_date: '',
    start_time: '08:00 AM',
    price: 'Free',
    status: 'Upcoming',
    organizer: ''
  });

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: itemsPerPage,
        search: searchTerm,
      };
      if (selectedStatus !== 'All') params.status = selectedStatus;

      const res = await eventService.getEvents(params);
      if (res.success && res.data) {
        const formatted = res.data.map(e => ({
          ...e,
          date: e.start_date,
          time: e.start_time || '08:00 AM',
          attendees: e.attendees_count || 0,
          image: Activity,
          imageUrl: e.image_url || siemReapImg,
        }));
        setEvents(formatted);
        if (res.meta) {
          setTotalRecords(res.meta.total);
          setTotalPages(res.meta.last_page);
        }
      }
    } catch (e) {
      console.error('Failed to load events from API', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [currentPage, searchTerm, selectedStatus]);

  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleCategoryChange = (val) => { setSelectedCategory(val); setCurrentPage(1); };
  const handleStatusChange = (val) => { setSelectedStatus(val); setCurrentPage(1); };

  const handleView = (idOrEvent) => {
    const eventToView = typeof idOrEvent === 'object'
      ? idOrEvent
      : events.find(event => event.id === idOrEvent);
    if (eventToView) {
      setViewingEvent(eventToView);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        loadEvents();
      } catch (e) {
        alert(e.message || 'Failed to delete event.');
      }
    }
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      category: 'Cultural',
      description: '',
      location: '',
      start_date: new Date().toISOString().split('T')[0],
      start_time: '08:00 AM',
      price: 'Free',
      status: 'Upcoming',
      organizer: '',
      imageUrl: ''
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (idOrEvent) => {
    const event = typeof idOrEvent === 'object'
      ? idOrEvent
      : events.find(e => e.id === idOrEvent) || {};
    setEditingEvent(event);
    setFormData({
      title: event.title || '',
      category: event.category || 'Cultural',
      description: event.description || '',
      location: event.location || '',
      start_date: event.start_date || event.date || '',
      start_time: event.start_time || event.time || '08:00 AM',
      price: event.price || 'Free',
      status: event.status || 'Upcoming',
      organizer: event.organizer || '',
      imageUrl: event.imageUrl || event.image_url || ''
    });
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingEvent(null);
  };

  const handleFormChange = (fieldOrData, value) => {
    if (typeof fieldOrData === 'object' && fieldOrData !== null) {
      setFormData(fieldOrData);
    } else {
      setFormData(prev => ({ ...prev, [fieldOrData]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.location.trim()) return;

    try {
      if (editingEvent) {
        await eventService.updateEvent(editingEvent.id, formData);
      } else {
        await eventService.createEvent(formData);
      }
      closeModal();
      loadEvents();
    } catch (e) {
      alert(e.message || 'Failed to save event.');
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + events.length, totalRecords);

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <EventsHeader onOpenAddModal={openAddModal} />

      {/* Stats Section */}
      <EventsStats events={events} />

      {/* Main Content Section */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        <EventsToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categoriesList}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
        />

        {isLoading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
            Loading events from API...
          </div>
        ) : viewMode === 'list' ? (
          <EventsList
            events={events}
            onViewEvent={handleView}
            onEditEvent={openEditModal}
            onDeleteEvent={handleDelete}
            startIndex={startIndex}
          />
        ) : (
          <EventsGrid
            events={events}
            onViewEvent={handleView}
            onEditEvent={openEditModal}
            onDeleteEvent={handleDelete}
          />
        )}

        {/* Pagination Footer */}
        {totalRecords > 0 && (
          <div className="p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-input-dark-bg)]/40">
            <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{totalRecords}</span> events
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

      {/* Add / Edit Event Modal */}
      <EventModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        editingEvent={editingEvent}
        formData={formData}
        onFormChange={handleFormChange}
        onFormDataChange={handleFormChange}
        onSubmit={handleSubmit}
        categories={categoriesList.filter(c => c !== 'All')}
      />

      {/* View Event Details Modal */}
      <EventDetailsModal
        isOpen={Boolean(viewingEvent)}
        event={viewingEvent}
        onClose={() => setViewingEvent(null)}
        onEdit={(e) => {
          setViewingEvent(null);
          openEditModal(e);
        }}
        onEditEvent={(e) => {
          setViewingEvent(null);
          openEditModal(e);
        }}
      />
    </div>
  );
}
