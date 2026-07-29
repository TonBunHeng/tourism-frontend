import { useState } from 'react';
import { Search, Plus, Trash2, Eye, Edit, User, Mail, Phone, Calendar, MapPin, MessageSquare, Clock, Check, X, ChevronDown, Grid3x3, List, Download, RotateCcw, Award, Users as UsersIcon, UserCheck, UserX, Activity } from 'lucide-react';

export default function Users () {
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
      activity: 'High',
      reports: 0
    }
  ];

  const [users, setUsers] = useState(defaultUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSubscription, setSelectedSubscription] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // State for Add/Edit User Modal
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
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

  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      icon: UsersIcon,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Active Users',
      value: users.filter(u => u.status === 'Active').length,
      icon: UserCheck,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Premium Users',
      value: users.filter(u => u.subscription === 'Premium').length,
      icon: Award,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      label: 'Avg. Reviews',
      value: (users.reduce((sum, u) => sum + u.reviews, 0) / users.length).toFixed(1),
      icon: MessageSquare,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

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

  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: newStatus } : user
    ));
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

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
      'Inactive': 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600',
      'Suspended': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
    };
    return colors[status] || colors['Inactive'];
  };

  const getRoleColor = (role) => {
    const colors = {
      'Admin': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
      'Moderator': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
      'User': 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600'
    };
    return colors[role] || colors['User'];
  };

  const getSubscriptionColor = (subscription) => {
    const colors = {
      'Premium': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
      'Basic': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
      'Free': 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600'
    };
    return colors[subscription] || colors['Free'];
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              User Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage and monitor all platform users
            </p>
          </div>
          <div className="grid grid-cols-3 md:flex gap-2 md:gap-3">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2.5 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors hover:border-amber-300 dark:hover:border-amber-700"
            >
              <RotateCcw size={18} className="shrink-0" />
              <span className="font-medium text-xs md:text-sm">Reset</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Download size={18} className="shrink-0" />
              <span className="font-medium text-xs md:text-sm">Export</span>
            </button>
            <button 
              onClick={() => {
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
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
            >
              <Plus size={18} className="shrink-0" />
              <span className="font-medium text-xs md:text-sm">Add User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table / Grid Container */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex-1">
        {/* Toolbar */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">All Users</h2>
                <span className="text-sm text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 rounded-full">
                  {filteredUsers.length}
                </span>
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  <Grid3x3 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  <List className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {/* Role Filter */}
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Subscription Filter */}
              <div className="relative">
                <select
                  value={selectedSubscription}
                  onChange={(e) => setSelectedSubscription(e.target.value)}
                  className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  {subscriptions.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="most_reviews">Most Reviews</option>
                  <option value="most_active">Most Active</option>
                  <option value="most_favorites">Most Favorites</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedRole !== 'All' || selectedStatus !== 'All' || selectedSubscription !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedRole('All');
                    setSelectedStatus('All');
                    setSelectedSubscription('All');
                    setSortBy('newest');
                  }}
                  className="col-span-2 sm:col-span-1 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user) => (
                <div
                  key={user.id}
                  className="group relative bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-200 sm:hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center shrink-0">
                      <user.avatar className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{user.name}</h3>
                        {user.verified && (
                          <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      <div className="flex items-center gap-1 mt-1 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Reviews</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.reviews}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Favorites</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.favorites}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Places</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.places}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getSubscriptionColor(user.subscription)}`}>
                        {user.subscription}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        {user.activity}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {user.joinDate}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No users found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        ) : (
          /* List View */
          <>
            <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <div key={user.id} className="p-4 flex gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center shrink-0">
                      <user.avatar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                          {user.verified && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />}
                        </div>
                        <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getSubscriptionColor(user.subscription)}`}>
                          {user.subscription}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{user.reviews} reviews</span>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <button onClick={() => handleViewDetails(user)} className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEdit(user)} className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No users found</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>

            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reviews</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Favorites</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subscription</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                  {sortedUsers.length > 0 ? (
                    sortedUsers.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
                          {String(index + 1).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0">
                              <user.avatar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                                {user.verified && (
                                  <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                )}
                              </div>
                              <p className="text-xs text-gray-400 dark:text-gray-500">{user.email}</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {user.phone}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-xs px-2 py-1 rounded-full border ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(user.status)}`}>
                            {user.status === 'Active' && <Check className="w-3 h-3" />}
                            {user.status === 'Inactive' && <Clock className="w-3 h-3" />}
                            {user.status === 'Suspended' && <X className="w-3 h-3" />}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.reviews}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.favorites}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-xs px-2 py-1 rounded-full border ${getSubscriptionColor(user.subscription)}`}>
                            {user.subscription}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewDetails(user)}
                              className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(user)}
                              className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-12">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No users found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* ADD / EDIT USER MODAL */}
      {isAddUserOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <button
                onClick={() => {
                  setIsAddUserOpen(false);
                  setEditingUser(null);
                }}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddUserSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">User Name</label>
                <input
                  type="text"
                  placeholder="e.g., John Doe"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="e.g., john@email.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Phone</label>
                  <input
                    type="text"
                    placeholder="e.g., +855 12 345 678"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Role</label>
                  <div className="relative">
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="User">User</option>
                      <option value="Moderator">Moderator</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Status</label>
                  <div className="relative">
                    <select
                      value={newUser.status}
                      onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                      className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Subscription</label>
                  <div className="relative">
                    <select
                      value={newUser.subscription}
                      onChange={(e) => setNewUser({ ...newUser, subscription: e.target.value })}
                      className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="Free">Free</option>
                      <option value="Basic">Basic</option>
                      <option value="Premium">Premium</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Siem Reap"
                    value={newUser.location}
                    onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                    className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddUserOpen(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 text-center"
                >
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {isDetailsOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <selectedUser.avatar className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">User Details</h3>
                  <p className="text-xs text-gray-400">ID: #{selectedUser.id}</p>
                </div>
              </div>
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">User Name</span>
                <p className="text-base font-semibold text-white mt-1 flex items-center gap-2">
                  {selectedUser.name}
                  {selectedUser.verified && (
                    <span className="text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded-full border border-blue-800 inline-flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</span>
                  <p className="text-sm font-medium text-white mt-1 truncate">{selectedUser.email}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Phone</span>
                  <p className="text-sm font-medium text-white mt-1 truncate">{selectedUser.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Role & Status</span>
                  <p className="text-sm font-medium text-blue-400 mt-1 flex items-center gap-1.5">
                    {selectedUser.role} · <span className="text-green-400">{selectedUser.status}</span>
                  </p>
                </div>
                <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Subscription</span>
                  <p className="text-sm font-medium text-amber-400 mt-1">{selectedUser.subscription}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
                  <span className="text-xs text-gray-400">Reviews</span>
                  <p className="text-base font-bold text-white mt-0.5">{selectedUser.reviews}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
                  <span className="text-xs text-gray-400">Favorites</span>
                  <p className="text-base font-bold text-white mt-0.5">{selectedUser.favorites}</p>
                </div>
                <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
                  <span className="text-xs text-gray-400">Places</span>
                  <p className="text-base font-bold text-white mt-0.5">{selectedUser.places}</p>
                </div>
              </div>

              <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Location & Activity</span>
                <p className="text-sm text-gray-300 mt-1 flex items-center justify-between">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {selectedUser.location}</span>
                  <span className="text-xs text-gray-400">Last active: {selectedUser.lastActive}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
              <button
                type="button"
                onClick={() => {
                  const usr = selectedUser;
                  setIsDetailsOpen(false);
                  handleEdit(usr);
                }}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}