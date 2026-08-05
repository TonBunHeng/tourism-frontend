import { useState } from 'react';
import {
  Activity,
  PartyPopper,
  Clapperboard,
  Ship,
  Utensils,
  Music
} from 'lucide-react';
import EventsHeader from './EventsHeader';
import EventsStats from './EventsStats';
import EventsToolbar from './EventsToolbar';
import EventsGrid from './EventsGrid';
import EventsList from './EventsList';
import EventModal from './EventModal';
import EventDetailsModal from './EventDetailsModal';

import siemReapImg from '../../assets/places_img/SiemReapAngkor.jpg';
import historicalImg from '../../assets/places_img/HistoricalSites.jpeg';
import pursatImg from '../../assets/places_img/PursatMountains.jpeg';
import museumImg from '../../assets/places_img/images.jpeg';

export default function Events() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Angkor Wat International Half Marathon',
      category: 'Sports',
      description: 'Annual international half marathon through the ancient temple complex',
      location: 'Siem Reap, Cambodia',
      date: '2024-12-15',
      time: '06:00 AM',
      attendees: 2500,
      price: '$45',
      status: 'Upcoming',
      image: Activity,
      imageUrl: siemReapImg,
      organizer: 'Cambodia Tourism Board',
      featured: true,
      rating: 4.9,
      tags: ['sports', 'marathon', 'cultural']
    },
    {
      id: 2,
      title: 'Khmer New Year Festival',
      category: 'Cultural',
      description: 'Traditional Khmer New Year celebrations with music, dance, and cultural performances',
      location: 'Phnom Penh, Cambodia',
      date: '2024-04-13',
      time: '08:00 AM',
      attendees: 15000,
      price: 'Free',
      status: 'Ongoing',
      image: PartyPopper,
      imageUrl: historicalImg,
      organizer: 'Ministry of Culture',
      featured: true,
      rating: 4.8,
      tags: ['cultural', 'traditional', 'festival']
    },
    {
      id: 3,
      title: 'Cambodia International Film Festival',
      category: 'Arts & Entertainment',
      description: 'Showcasing the best of Cambodian and international cinema',
      location: 'Phnom Penh, Cambodia',
      date: '2024-03-20',
      time: '10:00 AM',
      attendees: 800,
      price: '$15',
      status: 'Completed',
      image: Clapperboard,
      imageUrl: museumImg,
      organizer: 'Cambodian Film Association',
      featured: false,
      rating: 4.7,
      tags: ['film', 'cinema', 'arts']
    },
    {
      id: 4,
      title: 'Water Festival (Bon Om Touk)',
      category: 'Cultural',
      description: 'Boat racing festival marking the reversal of the Tonle Sap river flow',
      location: 'Phnom Penh, Cambodia',
      date: '2024-11-27',
      time: '07:00 AM',
      attendees: 20000,
      price: 'Free',
      status: 'Upcoming',
      image: Ship,
      imageUrl: siemReapImg,
      organizer: 'Phnom Penh Municipality',
      featured: true,
      rating: 4.9,
      tags: ['cultural', 'festival', 'traditional']
    },
    {
      id: 5,
      title: 'Siem Reap Food & Culture Festival',
      category: 'Food & Drink',
      description: 'Celebrating Cambodian cuisine with food stalls, cooking demonstrations, and cultural shows',
      location: 'Siem Reap, Cambodia',
      date: '2024-02-10',
      time: '11:00 AM',
      attendees: 3200,
      price: '$25',
      status: 'Completed',
      image: Utensils,
      imageUrl: museumImg,
      organizer: 'Siem Reap Tourism Association',
      featured: false,
      rating: 4.6,
      tags: ['food', 'culture', 'culinary']
    },
    {
      id: 6,
      title: 'Kampot Pepper & Music Festival',
      category: 'Music',
      description: 'Annual festival celebrating Kampot pepper with live music performances',
      location: 'Kampot, Cambodia',
      date: '2024-09-08',
      time: '02:00 PM',
      attendees: 1500,
      price: '$30',
      status: 'Upcoming',
      image: Music,
      imageUrl: pursatImg,
      organizer: 'Kampot Provincial Government',
      featured: false,
      rating: 4.5,
      tags: ['music', 'festival', 'local']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Cultural',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
    organizer: '',
    imageUrl: ''
  });

  const categories = ['All', 'Sports', 'Cultural', 'Arts & Entertainment', 'Food & Drink', 'Music'];
  const statuses = ['All', 'Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || event.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      category: 'Cultural',
      description: '',
      location: '',
      date: '',
      time: '',
      price: '',
      organizer: '',
      imageUrl: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      category: event.category,
      description: event.description,
      location: event.location,
      date: event.date,
      time: event.time,
      price: event.price,
      organizer: event.organizer,
      imageUrl: event.imageUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location) {
      alert('Please fill in required fields');
      return;
    }

    if (editingEvent) {
      setEvents(events.map(e =>
        e.id === editingEvent.id ? { ...e, ...formData } : e
      ));
    } else {
      const newEvent = {
        id: events.length ? Math.max(...events.map(e => e.id)) + 1 : 1,
        ...formData,
        attendees: 0,
        status: 'Upcoming',
        image: PartyPopper,
        featured: false,
        rating: 5.0,
        tags: [formData.category.toLowerCase()]
      };
      setEvents([newEvent, ...events]);
    }
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <EventsHeader onCreateClick={handleOpenCreateModal} />

      {/* Stats Cards */}
      <EventsStats events={events} />

      {/* Main Content */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        {/* Toolbar */}
        <EventsToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          statuses={statuses}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Grid or List View */}
        {viewMode === 'grid' ? (
          <EventsGrid
            events={filteredEvents}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <EventsList
            events={filteredEvents}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Add/Edit Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        editingEvent={editingEvent}
        formData={formData}
        onFormDataChange={setFormData}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
        onSubmit={handleFormSubmit}
        categories={categories}
      />

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={isDetailsOpen}
        event={selectedEvent}
        onClose={() => setIsDetailsOpen(false)}
        onEdit={handleEdit}
      />
    </div>
  );
}