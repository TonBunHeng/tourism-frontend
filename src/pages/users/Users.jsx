import { useState, useEffect } from 'react';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';
import UsersHeader from './UsersHeader';
import UsersStats from './UsersStats';
import UsersToolbar from './UsersToolbar';
import UsersGrid from './UsersGrid';
import UsersList from './UsersList';
import UserModal from './UserModal';
import UserDetailsModal from './UserDetailsModal';

export default function Users() {
  // Default user data
  const defaultUsers = [
    {
      id: 1,
      name: 'Sokha P.',
      email: 'sokha@email.com',
      phone: '+855 12 345 678',
      avatar: User,
      role: 'Admin',
      status: 'Active',
      joinDate: '2023-06-15',
      lastActive: '2024-02-25 14:30',
      reviews: 12,
      favorites: 8,
      places: 3,
      location: 'Siem Reap',
      verified: true,
      twoFactorAuth: true,
      subscription: 'Premium',
      activity: 'High',
      reports: 0
    },
    {
      id: 2,
      name: 'David C.',
      email: 'david@email.com',
      phone: '+855 98 765 432',
      avatar: User,
      role: 'User',
      status: 'Active',
      joinDate: '2023-08-20',
      lastActive: '2024-02-24 10:15',
      reviews: 5,
      favorites: 3,
      places: 1,
      location: 'Phnom Penh',
      verified: false,
      twoFactorAuth: false,
      subscription: 'Free',
      activity: 'Medium',
      reports: 0
    },
    {
      id: 3,
      name: 'Maria L.',
      email: 'maria@email.com',
      phone: '+855 16 543 210',
      avatar: User,
      role: 'User',
      status: 'Inactive',
      joinDate: '2024-01-05',
      lastActive: '2024-02-01 08:00',
      reviews: 3,
      favorites: 5,
      places: 0,
      location: 'Siem Reap',
      verified: false,
      twoFactorAuth: false,
      subscription: 'Free',
      activity: 'Low',
      reports: 2
    },
    {
      id: 4,
      name: 'James R.',
      email: 'james@email.com',
      phone: '+855 77 123 456',
      avatar: User,
      role: 'Moderator',
      status: 'Active',
      joinDate: '2023-03-10',
      lastActive: '2024-02-25 16:45',
      reviews: 18,
      favorites: 12,
      places: 5,
      location: 'Battambang',
      verified: true,
      twoFactorAuth: true,
      subscription: 'Premium',
      activity: 'High',
      reports: 1
    },
    {
      id: 5,
      name: 'Sophie N.',
      email: 'sophie@email.com',
      phone: '+855 92 456 789',
      avatar: User,
      role: 'User',
      status: 'Suspended',
      joinDate: '2023-11-01',
      lastActive: '2024-02-20 11:30',
      reviews: 7,
      favorites: 4,
      places: 2,
      location: 'Kampot',
      verified: false,
      twoFactorAuth: false,
      subscription: 'Free',
      activity: 'Medium',
      reports: 5
    },
    {
      id: 6,
      name: 'Thomas K.',
      email: 'thomas@email.com',
      phone: '+855 88 987 654',
      avatar: User,
      role: 'User',
      status: 'Active',
      joinDate: '2024-01-28',
      lastActive: '2024-02-25 09:00',
      reviews: 2,
      favorites: 1,
      places: 1,
      location: 'Phnom Penh',
      verified: true,
      twoFactorAuth: false,
      subscription: 'Basic',
      activity: 'Low',
      reports: 0
    },
    {
      id: 7,
      name: 'Emma W.',
      email: 'emma@email.com',
      phone: '+855 97 234 567',
      avatar: User,
      role: 'User',
      status: 'Active',
      joinDate: '2023-09-15',
      lastActive: '2024-02-24 20:00',
      reviews: 9,
      favorites: 6,
      places: 2,
      location: 'Sihanoukville',
      verified: true,
      twoFactorAuth: true,
      subscription: 'Premium',
      activity: 'Medium',
      reports: 0
    },
    {
      id: 8,
      name: 'Vannak M.',
      email: 'vannak@email.com',
      phone: '+855 10 999 888',
      avatar: User,
      role: 'Admin',
      status: 'Active',
      joinDate: '2023-01-10',
      lastActive: '2024-02-25 18:20',
      reviews: 24,
      favorites: 15,
      places: 8,
      location: 'Phnom Penh',
      verified: true,
      twoFactorAuth: true,
      subscription: 'Premium',
      activity: 'High',
      reports: 0
    }
  ];

  const [users, setUsers] = useState(defaultUsers);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSubscription, setSelectedSubscription] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('list');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal states
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'User',
    status: 'Active',
    subscription: 'Free',
    location: 'Siem Reap'
  });

  const roles = ['All', 'Admin', 'Moderator', 'User'];
  const statuses = ['All', 'Active', 'Inactive', 'Suspended'];
  const subscriptions = ['All', 'Free', 'Basic', 'Premium'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
    const matchesSubscription = selectedSubscription === 'All' || user.subscription === selectedSubscription;
    return matchesSearch && matchesRole && matchesStatus && matchesSubscription;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.joinDate) - new Date(a.joinDate);
    if (sortBy === 'oldest') return new Date(a.joinDate) - new Date(b.joinDate);
    if (sortBy === 'most_reviews') return b.reviews - a.reviews;
    if (sortBy === 'most_active') return b.lastActive > a.lastActive ? 1 : -1;
    if (sortBy === 'most_favorites') return b.favorites - a.favorites;
    return 0;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRole, selectedStatus, selectedSubscription, sortBy, sortedUsers.length]);

  const totalRecords = sortedUsers.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all users to default?')) {
      setUsers(defaultUsers);
      setSearchTerm('');
      setSelectedRole('All');
      setSelectedStatus('All');
      setSelectedSubscription('All');
      setSortBy('newest');
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      subscription: user.subscription,
      location: user.location
    });
    setIsAddUserOpen(true);
  };

  const handleOpenAddUser = () => {
    setEditingUser(null);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'User',
      status: 'Active',
      subscription: 'Free',
      location: 'Siem Reap'
    });
    setIsAddUserOpen(true);
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert('Please fill in required fields');
      return;
    }

    if (editingUser) {
      setUsers(users.map(user =>
        user.id === editingUser.id ? { ...user, ...newUser } : user
      ));
    } else {
      const createdUser = {
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone || '+855 12 000 000',
        avatar: User,
        role: newUser.role,
        status: newUser.status,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().replace('T', ' ').substring(0, 16),
        reviews: 0,
        favorites: 0,
        places: 0,
        location: newUser.location,
        verified: false,
        twoFactorAuth: false,
        subscription: newUser.subscription,
        activity: 'Low',
        reports: 0
      };

      setUsers([createdUser, ...users]);
    }

    setIsAddUserOpen(false);
    setEditingUser(null);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'User',
      status: 'Active',
      subscription: 'Free',
      location: 'Siem Reap'
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedRole('All');
    setSelectedStatus('All');
    setSelectedSubscription('All');
    setSortBy('newest');
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <UsersHeader
        onReset={handleReset}
        onAddUser={handleOpenAddUser}
      />

      {/* Stats Cards */}
      <UsersStats users={users} />

      {/* Users Table / Grid Container */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        {/* Toolbar */}
        <UsersToolbar
          totalCount={filteredUsers.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          roles={roles}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          statuses={statuses}
          selectedSubscription={selectedSubscription}
          onSubscriptionChange={setSelectedSubscription}
          subscriptions={subscriptions}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearFilters={handleClearFilters}
        />

        {/* Grid or List View */}
        {viewMode === 'grid' ? (
          <UsersGrid
            users={paginatedUsers}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <UsersList
            users={paginatedUsers}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
            startIndex={startIndex}
          />
        )}

        {/* Pagination Footer */}
        {totalRecords > 0 && (
          <div className="p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-input-dark-bg)]/40">
            <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{' '}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{totalRecords}</span> users
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

      {/* Add / Edit User Modal */}
      <UserModal
        isOpen={isAddUserOpen}
        editingUser={editingUser}
        newUser={newUser}
        onNewUserChange={setNewUser}
        onClose={() => {
          setIsAddUserOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleAddUserSubmit}
      />

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={isDetailsOpen}
        user={selectedUser}
        onClose={() => setIsDetailsOpen(false)}
        onEdit={handleEdit}
      />
    </div>
  );
}