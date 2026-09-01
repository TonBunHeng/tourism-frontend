import { useState, useEffect } from 'react';
import SimplePagination from '../../components/common/SimplePagination';
import UsersHeader from './UsersHeader';
import UsersStats from './UsersStats';
import UsersToolbar from './UsersToolbar';
import UsersList from './UsersList';
import UserDetailsModal from './UserDetailsModal';
import UserModal from './UserModal';
import userService from '../../services/userService';
import deletionRequestService from '../../services/deletionRequestService';
import { useAlert } from '../../context/AlertContext';

export default function Users() {
  const { showConfirm, showSuccess, showError } = useAlert();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const roles = ["All", "Super Admin", "Admin", "Business Owner", "Guide / Editor", "User"];
  const statuses = ["All", "Active", "Inactive", "Suspended", "Online", "Offline"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "User",
    status: "Active",
    location: "",
    subscription: "Free",
    avatar: ""
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadUsers = async (showLoadingState = true) => {
    if (showLoadingState) setIsLoading(true);
    setIsRefreshing(true);
    try {
      const params = {
        page: currentPage,
        per_page: itemsPerPage,
      };
      if (searchTerm) params.search = searchTerm;
      if (selectedRole !== "All") params.role = selectedRole;
      if (selectedStatus !== "All" && selectedStatus !== "Online" && selectedStatus !== "Offline") {
        params.status = selectedStatus;
      }

      const res = await userService.getUsers(params);
      if (res && (res.success || Array.isArray(res.data) || res.data)) {
        const rawList = Array.isArray(res.data)
          ? res.data
          : (Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res) ? res : []));

        let formatted = rawList.map(u => {
          const isOnline = Boolean(u.is_online);
          const rawStatus = u.status || 'Active';
          const capitalizedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

          return {
            ...u,
            status: capitalizedStatus,
            onlineStatus: isOnline ? "Online" : "Offline",
            joinDate: u.created_at ? u.created_at.split("T")[0] : "2024-01-01",
            lastActive: u.last_active_human || (u.last_active_at ? u.last_active_at.replace("T", " ").substring(0, 16) : (isOnline ? "Online Now" : "Offline")),
            reviews: u.reviews_count || u.reviews || 0,
            favorites: u.favorites_count || u.favorites || 0,
            places: 0,
            reports: 0,
            twoFactorAuth: Boolean(u.two_factor_auth),
            activity: u.activity_level || (isOnline ? "High" : "Medium"),
          };
        });

        if (selectedStatus === "Online") {
          formatted = formatted.filter(u => u.onlineStatus === "Online");
        } else if (selectedStatus === "Offline") {
          formatted = formatted.filter(u => u.onlineStatus === "Offline");
        }

        setUsers(formatted);
        const meta = res.meta || res.data?.meta;
        if (meta) {
          setTotalRecords(meta.total || formatted.length);
          setTotalPages(meta.last_page || Math.ceil((meta.total || formatted.length) / itemsPerPage) || 1);
        } else {
          setTotalRecords(formatted.length);
          setTotalPages(1);
        }
      }
    } catch (e) {
      console.error("Failed to load users from API", e);
    } finally {
      if (showLoadingState) setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers(true);

    const interval = setInterval(() => {
      loadUsers(false);
    }, 20000);

    return () => clearInterval(interval);
  }, [currentPage, searchTerm, selectedRole, selectedStatus]);

  const handleManualRefresh = () => {
    loadUsers(false);
  };

  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleRoleChange = (val) => { setSelectedRole(val); setCurrentPage(1); };
  const handleStatusChange = (val) => { setSelectedStatus(val); setCurrentPage(1); };

  const handleView = (userOrId) => {
    const userToView = typeof userOrId === "object" ? userOrId : users.find(u => u.id === userOrId);
    if (userToView) {
      setViewingUser(userToView);
    }
  };

  const handleDelete = async (id) => {
    const user = users.find(u => u.id === id);
    const userName = user?.name || `User #${id}`;
    const confirmed = await showConfirm({
      title: 'Submit Deletion Request',
      message: `Are you sure you want to submit a deletion request for user account "${userName}"?\n\nThis will be sent to Deletion Requests for review and approval.`,
      confirmText: 'Submit Deletion',
      type: 'danger'
    });

    if (!confirmed) return;

    try {
      await deletionRequestService.createRequest({
        request_type: 'account',
        reason: `Request to delete user account: ${userName}`,
        urgency: 'high',
        items: [{
          item_type: 'user',
          item_id: id,
          item_name: userName,
          category: user?.role || 'User'
        }]
      });
      showSuccess(`Deletion request for user "${userName}" has been submitted to Deletion Requests.`, 'Request Submitted');
    } catch (e) {
      showError(e.message || "Failed to submit deletion request.", 'Submission Failed');
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "User",
      status: "Active",
      location: "",
      subscription: "Free",
      avatar: ""
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      password: "",
      role: user.role,
      status: user.status || "Active",
      location: user.location || "",
      subscription: user.subscription || "Free",
      avatar: user.avatar || ""
    });
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingUser(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, formData);
        showSuccess(`User account "${formData.name}" has been updated successfully.`, 'User Updated');
      } else {
        await userService.createUser(formData);
        showSuccess(`User account "${formData.name}" has been created successfully.`, 'User Created');
      }
      closeModal();
      loadUsers();
    } catch (e) {
      showError(e.message || "Failed to save user.", 'Save Failed');
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + users.length, totalRecords);

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <UsersHeader
        onOpenAddModal={openAddModal}
        onRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Stats Cards */}
      <UsersStats users={users} />

      {/* Main Users Table Section */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        <UsersToolbar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedRole={selectedRole}
          onRoleChange={handleRoleChange}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          roles={roles}
          statuses={statuses}
        />

        {isLoading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
            Loading users from database...
          </div>
        ) : (
          <UsersList
            users={users}
            onViewUser={handleView}
            onEditUser={openEditModal}
            onDeleteUser={handleDelete}
            startIndex={startIndex}
          />
        )}

        {/* Simple Pagination Footer */}
        <SimplePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalRecords={totalRecords}
          label="users"
        />
      </div>

      {/* View User Details Modal */}
      <UserDetailsModal
        user={viewingUser}
        onClose={() => setViewingUser(null)}
        onEditUser={openEditModal}
      />

      {/* Add / Edit User Modal */}
      <UserModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        editingUser={editingUser}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
