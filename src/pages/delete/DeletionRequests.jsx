import { useState } from 'react';
import { Search, Filter, ChevronDown, Eye, Check, X, Clock, AlertCircle, User, Trash2, Calendar, Mail, Phone, FileText, Download, RotateCcw, Shield, UserX, Archive, AlertTriangle, Info } from 'lucide-react';

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

  const stats = [
    {
      label: 'Total Requests',
      value: requests.length,
      icon: FileText,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Pending',
      value: requests.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      label: 'Account Deletions',
      value: requests.filter(r => r.type === 'account').length,
      icon: UserX,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      label: 'Item Deletions',
      value: requests.filter(r => r.type === 'item').length,
      icon: Trash2,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

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
    setSelectedRequest(null);
    setConfirmAction(null);
    setAdminNotes('');
    
    if (isDetailsOpen) {
      const updated = updatedRequests.find(r => r.id === selectedRequest.id);
      if (updated) {
        setSelectedRequest(updated);
      }
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
      approved: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
      rejected: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
      archived: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600'
    };
    return colors[status] || colors.pending;
  };

  const getUrgencyBadge = (urgency) => {
    const colors = {
      critical: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
      high: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
      low: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
    };
    return colors[urgency] || colors.low;
  };

  const getTypeLabel = (type) => {
    return type === 'account' ? 'Account Deletion' : 'Item Deletion';
  };

  const getTypeIcon = (type) => {
    return type === 'account' ? UserX : Trash2;
  };

  const getTypeBadge = (type) => {
    return type === 'account' 
      ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' 
      : 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800';
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Deletion Requests
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage account deletion and item removal requests from users
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
            <button 
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors hover:border-amber-300 dark:hover:border-amber-700"
            >
              <RotateCcw size={18} className="flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm truncate">Reset</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Download size={18} className="flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm truncate">Export</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
              <Shield size={18} className="flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm truncate">Bulk Actions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 md:p-3 rounded-xl flex-shrink-0 ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Urgency Alert */}
      {requests.filter(r => r.urgency === 'critical' && r.status === 'pending').length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6 md:mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              {requests.filter(r => r.urgency === 'critical' && r.status === 'pending').length} Critical Request(s) Need Immediate Attention
            </p>
            <p className="text-xs text-red-600 dark:text-red-300 mt-0.5">
              These requests require urgent action due to security or privacy concerns
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex-1">
        {/* Toolbar */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">All Requests</h2>
              <span className="text-sm text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 rounded-full">
                {filteredRequests.length}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {/* Search */}
              <div className="relative flex-1 min-w-[140px] sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:w-40 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type === 'All' ? 'All Types' : type === 'account' ? 'Account' : 'Item'}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Urgency Filter */}
              <div className="relative">
                <select
                  value={selectedUrgency}
                  onChange={(e) => setSelectedUrgency(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  {urgencies.map(urgency => (
                    <option key={urgency} value={urgency}>{urgency.charAt(0).toUpperCase() + urgency.slice(1)}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="urgency">By Urgency</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedType !== 'All' || selectedStatus !== 'All' || selectedUrgency !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('All');
                    setSelectedStatus('All');
                    setSelectedUrgency('All');
                    setSortBy('newest');
                  }}
                  className="px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {sortedRequests.length > 0 ? (
            sortedRequests.map((request) => {
              const TypeIcon = getTypeIcon(request.type);
              return (
                <div key={request.id} className="p-4 md:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-start gap-3 md:gap-4">
                    {/* User Avatar */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400" />
                    </div>
                    
                    {/* Request Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900 dark:text-white">{request.user.name}</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 truncate">{request.user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${getTypeBadge(request.type)}`}>
                              <TypeIcon className="w-3 h-3" />
                              {getTypeLabel(request.type)}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${getUrgencyBadge(request.urgency)}`}>
                              <AlertCircle className="w-3 h-3" />
                              {request.urgency.toUpperCase()}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusBadge(request.status)}`}>
                              {request.status === 'pending' && <Clock className="w-3 h-3" />}
                              {request.status === 'approved' && <Check className="w-3 h-3" />}
                              {request.status === 'rejected' && <X className="w-3 h-3" />}
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {request.requestDate}
                            </span>
                          </div>
                        </div>
                        {request.status === 'pending' && (
                          <div className="flex gap-1 flex-shrink-0">
                            <button
                              onClick={() => handleApprove(request)}
                              className="p-1.5 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </button>
                            <button
                              onClick={() => handleReject(request)}
                              className="p-1.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{request.reason}</p>
                      
                      {request.itemsToDelete && request.itemsToDelete.length > 0 && (
                        <div className="mt-2 flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Items to delete:</span>
                          {request.itemsToDelete.map((item, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                              {item.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {request.adminNotes && (
                        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                          <p className="text-xs text-blue-700 dark:text-blue-400">
                            <span className="font-medium">Admin Note:</span> {request.adminNotes}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-4 mt-3 flex-wrap">
                        <button
                          onClick={() => handleViewDetails(request)}
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Details
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(request)}
                              className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(request)}
                              className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              Reject
                            </button>
                          </>
                        )}
                        {request.processedBy && (
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            Processed by {request.processedBy} on {request.processedDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No requests found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              {(searchTerm || selectedType !== 'All' || selectedStatus !== 'All' || selectedUrgency !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('All');
                    setSelectedStatus('All');
                    setSelectedUrgency('All');
                    setSortBy('newest');
                  }}
                  className="mt-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Details Modal (Dark Theme Styled) */}
      {isDetailsOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">Request Details</h3>
                  <p className="text-xs text-gray-400">ID: #{selectedRequest.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDetailsOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">User</span>
                <p className="text-base font-semibold text-white mt-1">{selectedRequest.user.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{selectedRequest.user.email} • {selectedRequest.user.phone}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Request Type</span>
                  <p className="text-sm font-medium text-red-400 mt-1">{getTypeLabel(selectedRequest.type)}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status & Urgency</span>
                  <p className="text-sm font-medium text-white mt-1 capitalize">{selectedRequest.status} • <span className="uppercase text-orange-400">{selectedRequest.urgency}</span></p>
                </div>
              </div>

              <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Reason</span>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">{selectedRequest.reason}</p>
              </div>

              {selectedRequest.additionalInfo && (
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Additional Information</span>
                  <p className="text-sm text-gray-300 mt-1 leading-relaxed">{selectedRequest.additionalInfo}</p>
                </div>
              )}

              {selectedRequest.itemsToDelete && selectedRequest.itemsToDelete.length > 0 && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">Items to Delete</span>
                  <div className="space-y-2">
                    {selectedRequest.itemsToDelete.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2 p-3 bg-[#1f2937]/50 rounded-xl border border-gray-800">
                        <div className="flex items-center gap-2 min-w-0">
                          <Trash2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">{item.name}</p>
                            <p className="text-xs text-gray-400">{item.type} • {item.category}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">Admin Notes</span>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add admin notes..."
                  rows="3"
                  className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
              {selectedRequest.status === 'pending' ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleApprove(selectedRequest)}
                    className="py-2.5 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReject(selectedRequest)}
                    className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium text-sm transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {isConfirmOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white tracking-wide">Confirm {confirmType}</h3>
              <button 
                onClick={() => {
                  setIsConfirmOpen(false);
                  setSelectedRequest(null);
                  setConfirmAction(null);
                }}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-300">
                Are you sure you want to <strong className="text-white">{confirmAction}</strong> this {confirmType.toLowerCase()} request for <strong className="text-white">{selectedRequest.user.name}</strong>?
              </p>
              {confirmAction === 'approve' && (
                <div className="p-3 bg-red-900/20 border border-red-800/50 rounded-xl text-xs text-red-400 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>This action will permanently execute the deletion. This cannot be undone.</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
              <button 
                onClick={() => {
                  setIsConfirmOpen(false);
                  setSelectedRequest(null);
                  setConfirmAction(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDecision}
                className={`flex-1 py-3 px-4 rounded-xl text-white font-medium text-sm transition-colors shadow-lg text-center flex items-center justify-center gap-2 ${
                  confirmAction === 'approve'
                    ? 'bg-green-600 hover:bg-green-500 shadow-green-500/25'
                    : 'bg-red-600 hover:bg-red-500 shadow-red-500/25'
                }`}
              >
                {confirmAction === 'approve' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                Confirm {confirmAction === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}