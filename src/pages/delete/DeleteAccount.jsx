import { useState } from 'react';
import { User } from 'lucide-react';
import DeletionHeader from './DeletionHeader';
import DeletionStats from './DeletionStats';
import DeletionAlert from './DeletionAlert';
import DeletionToolbar from './DeletionToolbar';
import DeletionList from './DeletionList';
import DeletionDetailsModal from './DeletionDetailsModal';
import DeletionConfirmModal from './DeletionConfirmModal';

export default function DeleteAccount() {
  // Default data for deletion requests
  const defaultRequests = [
    {
      id: 1,
      type: 'account',
      user: {
        name: 'Sokha P.',
        email: 'sokha@email.com',
        phone: '+855 12 345 678',
        avatar: User,
        memberSince: '2023-06-15',
        totalReviews: 12,
        totalFavorites: 8,
        totalPlaces: 3
      },
      reason: 'Privacy concerns - I no longer want my personal data stored on the platform.',
      additionalInfo: 'I would like all my data to be completely removed from the system. I have concerns about data privacy.',
      requestDate: '2024-01-15',
      status: 'pending',
      urgency: 'high',
      attachments: ['data_export_request.pdf'],
      adminNotes: '',
      processedDate: null,
      processedBy: null,
      itemsToDelete: []
    },
    {
      id: 2,
      type: 'account',
      user: {
        name: 'David C.',
        email: 'david@email.com',
        phone: '+855 98 765 432',
        avatar: User,
        memberSince: '2023-08-20',
        totalReviews: 5,
        totalFavorites: 3,
        totalPlaces: 1
      },
      reason: 'Moving to another country - I will no longer be using Cambodian travel services.',
      additionalInfo: 'I am relocating permanently and will not need this account anymore.',
      requestDate: '2024-01-20',
      status: 'approved',
      urgency: 'medium',
      attachments: [],
      adminNotes: 'User confirmed identity via email. Data export prepared.',
      processedDate: '2024-01-22',
      processedBy: 'Admin',
      itemsToDelete: []
    },
    {
      id: 3,
      type: 'account',
      user: {
        name: 'Maria L.',
        email: 'maria@email.com',
        phone: '+855 16 543 210',
        avatar: User,
        memberSince: '2024-01-05',
        totalReviews: 3,
        totalFavorites: 5,
        totalPlaces: 0
      },
      reason: 'Inactive account - I haven\'t used this account in months.',
      additionalInfo: 'I created this account but never really used it. Please delete it.',
      requestDate: '2024-01-25',
      status: 'pending',
      urgency: 'low',
      attachments: [],
      adminNotes: '',
      processedDate: null,
      processedBy: null,
      itemsToDelete: []
    },
    {
      id: 4,
      type: 'item',
      user: {
        name: 'James R.',
        email: 'james@email.com',
        phone: '+855 77 123 456',
        avatar: User,
        memberSince: '2023-03-10',
        totalReviews: 18,
        totalFavorites: 12,
        totalPlaces: 5
      },
      reason: 'Duplicate listing - I accidentally created two listings for the same place.',
      additionalInfo: 'I created Koh Rong Resort twice. Please keep the first one and delete this duplicate.',
      requestDate: '2024-02-01',
      status: 'pending',
      urgency: 'medium',
      attachments: ['screenshot_duplicate.png'],
      adminNotes: '',
      processedDate: null,
      processedBy: null,
      itemsToDelete: [
        {
          id: 101,
          name: 'Koh Rong Resort (Duplicate)',
          type: 'place',
          category: 'Accommodation',
          dateAdded: '2024-01-28'
        }
      ]
    },
    {
      id: 5,
      type: 'item',
      user: {
        name: 'Sophie N.',
        email: 'sophie@email.com',
        phone: '+855 92 456 789',
        avatar: User,
        memberSince: '2023-11-01',
        totalReviews: 7,
        totalFavorites: 4,
        totalPlaces: 2
      },
      reason: 'Incorrect information - I want to remove a place I no longer manage.',
      additionalInfo: 'I used to manage the Battambang Art Gallery but no longer do. Please remove it from the platform.',
      requestDate: '2024-02-10',
      status: 'pending',
      urgency: 'high',
      attachments: ['ownership_proof.pdf'],
      adminNotes: '',
      processedDate: null,
      processedBy: null,
      itemsToDelete: [
        {
          id: 102,
          name: 'Battambang Art Gallery',
          type: 'place',
          category: 'Art Gallery',
          dateAdded: '2023-12-15'
        }
      ]
    },
    {
      id: 6,
      type: 'item',
      user: {
        name: 'Thomas K.',
        email: 'thomas@email.com',
        phone: '+855 88 987 654',
        avatar: User,
        memberSince: '2024-01-28',
        totalReviews: 2,
        totalFavorites: 1,
        totalPlaces: 1
      },
      reason: 'Privacy - I want to remove my personal review of the Killing Caves.',
      additionalInfo: 'I feel uncomfortable with my review being public. Please remove it.',
      requestDate: '2024-02-15',
      status: 'approved',
      urgency: 'high',
      attachments: [],
      adminNotes: 'Review removed as per user request. User privacy respected.',
      processedDate: '2024-02-16',
      processedBy: 'Admin',
      itemsToDelete: [
        {
          id: 103,
          name: 'Review of Killing Caves',
          type: 'review',
          category: 'Review',
          dateAdded: '2024-02-10'
        }
      ]
    },
    {
      id: 7,
      type: 'account',
      user: {
        name: 'Emma W.',
        email: 'emma@email.com',
        phone: '+855 97 234 567',
        avatar: User,
        memberSince: '2023-09-15',
        totalReviews: 9,
        totalFavorites: 6,
        totalPlaces: 2
      },
      reason: 'Security concern - I believe my account may have been compromised.',
      additionalInfo: 'I received suspicious login attempts. Please delete my account for security reasons.',
      requestDate: '2024-02-20',
      status: 'pending',
      urgency: 'critical',
      attachments: ['security_report.pdf'],
      adminNotes: '',
      processedDate: null,
      processedBy: null,
      itemsToDelete: []
    },
    {
      id: 8,
      type: 'item',
      user: {
        name: 'Nina P.',
        email: 'nina@email.com',
        phone: '+855 78 876 543',
        avatar: User,
        memberSince: '2024-02-01',
        totalReviews: 4,
        totalFavorites: 2,
        totalPlaces: 0
      },
      reason: 'Spam content - I want to report and delete spam reviews on my place.',
      additionalInfo: 'There are multiple fake reviews on my restaurant listing. Please delete them.',
      requestDate: '2024-02-25',
      status: 'pending',
      urgency: 'medium',
      attachments: ['spam_screenshots.zip'],
      adminNotes: '',
      processedDate: null,
      processedBy: null,
      itemsToDelete: [
        {
          id: 104,
          name: 'Fake Review #1',
          type: 'review',
          category: 'Review',
          dateAdded: '2024-02-20'
        },
        {
          id: 105,
          name: 'Fake Review #2',
          type: 'review',
          category: 'Review',
          dateAdded: '2024-02-22'
        }
      ]
    }
  ];

  const [requests, setRequests] = useState(defaultRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedUrgency, setSelectedUrgency] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmType, setConfirmType] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const types = ['All', 'account', 'item'];
  const statuses = ['All', 'pending', 'approved', 'rejected', 'archived'];
  const urgencies = ['All', 'critical', 'high', 'medium', 'low'];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || request.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || request.status === selectedStatus;
    const matchesUrgency = selectedUrgency === 'All' || request.urgency === selectedUrgency;
    return matchesSearch && matchesType && matchesStatus && matchesUrgency;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.requestDate) - new Date(a.requestDate);
    if (sortBy === 'oldest') return new Date(a.requestDate) - new Date(b.requestDate);
    if (sortBy === 'urgency') {
      const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return (urgencyOrder[a.urgency] || 4) - (urgencyOrder[b.urgency] || 4);
    }
    return 0;
  });

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all requests to default?')) {
      setRequests(defaultRequests);
      setSearchTerm('');
      setSelectedType('All');
      setSelectedStatus('All');
      setSelectedUrgency('All');
      setSortBy('newest');
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setAdminNotes(request.adminNotes || '');
    setIsDetailsOpen(true);
  };

  const handleApprove = (request) => {
    setConfirmAction('approve');
    setConfirmType(request.type === 'account' ? 'Account Deletion' : 'Item Deletion');
    setSelectedRequest(request);
    setIsConfirmOpen(true);
  };

  const handleReject = (request) => {
    setConfirmAction('reject');
    setConfirmType(request.type === 'account' ? 'Account Deletion' : 'Item Deletion');
    setSelectedRequest(request);
    setIsConfirmOpen(true);
  };

  const confirmDecision = () => {
    if (!selectedRequest || !confirmAction) return;

    const updatedRequests = requests.map(req => {
      if (req.id === selectedRequest.id) {
        return {
          ...req,
          status: confirmAction === 'approve' ? 'approved' : 'rejected',
          processedDate: new Date().toISOString().split('T')[0],
          processedBy: 'Admin',
          adminNotes: adminNotes || req.adminNotes
        };
      }
      return req;
    });

    setRequests(updatedRequests);
    setIsConfirmOpen(false);
    setConfirmAction(null);
    setAdminNotes('');

    if (isDetailsOpen && selectedRequest) {
      const updated = updatedRequests.find(r => r.id === selectedRequest.id);
      if (updated) {
        setSelectedRequest(updated);
      }
    } else {
      setSelectedRequest(null);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedStatus('All');
    setSelectedUrgency('All');
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm || selectedType !== 'All' || selectedStatus !== 'All' || selectedUrgency !== 'All';

  return (
    <div className="flex flex-col">
      {/* Header */}
      <DeletionHeader onReset={handleReset} />

      {/* Stats Cards */}
      <DeletionStats requests={requests} />

      {/* Urgency Alert */}
      <DeletionAlert requests={requests} />

      {/* Main Content */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-2xl shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        {/* Toolbar */}
        <DeletionToolbar
          totalCount={filteredRequests.length}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          types={types}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          statuses={statuses}
          selectedUrgency={selectedUrgency}
          onUrgencyChange={setSelectedUrgency}
          urgencies={urgencies}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearFilters={handleClearFilters}
        />

        {/* Requests List */}
        <DeletionList
          requests={sortedRequests}
          onViewDetails={handleViewDetails}
          onApprove={handleApprove}
          onReject={handleReject}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Details Modal */}
      <DeletionDetailsModal
        isOpen={isDetailsOpen}
        request={selectedRequest}
        adminNotes={adminNotes}
        onAdminNotesChange={setAdminNotes}
        onClose={() => setIsDetailsOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Confirm Modal */}
      <DeletionConfirmModal
        isOpen={isConfirmOpen}
        request={selectedRequest}
        confirmAction={confirmAction}
        confirmType={confirmType}
        onClose={() => {
          setIsConfirmOpen(false);
          setSelectedRequest(null);
          setConfirmAction(null);
        }}
        onConfirm={confirmDecision}
      />
    </div>
  );
}
