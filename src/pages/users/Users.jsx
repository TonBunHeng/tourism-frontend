import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UsersHeader from "./UsersHeader";
import UsersStats from "./UsersStats";
import UsersToolbar from "./UsersToolbar";
import UsersList from "./UsersList";
import UserModal from "./UserModal";
import UserDetailsModal from "./UserDetailsModal";
import userService from "../../services/userService";
import deletionRequestService from "../../services/deletionRequestService";

export default function Users() {
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

  const roles = ["All", "Super Admin", "Admin", "Guide / Editor", "User"];
  const statuses = ["All", "Active", "Inactive", "Online", "Offline"];

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

  const loadUsers = async () => {
    setIsLoading(true);
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
      if (res.success && res.data) {
        let formatted = res.data.map(u => {
          const isOnline = u.status === "Active" || u.is_online;
          return {
            ...u,
            onlineStatus: isOnline ? "Online" : "Offline",
            joinDate: u.created_at ? u.created_at.split("T")[0] : "2024-01-01",
            lastActive: u.last_active_at ? u.last_active_at.replace("T", " ").substring(0, 16) : "Just now",
            reviews: u.reviews_count || 0,
            favorites: u.favorites_count || 0,
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
        if (res.meta) {
          setTotalRecords(res.meta.total || formatted.length);
          setTotalPages(res.meta.last_page || Math.ceil((res.meta.total || formatted.length) / itemsPerPage) || 1);
        }
      }
    } catch (e) {
      console.error("Failed to load users from API", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage, searchTerm, selectedRole, selectedStatus]);

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
    if (window.confirm(`Submit deletion request for user account "${userName}"?\n(This will be sent to Deletion Requests for review and approval)`)) {
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
        alert(`Deletion request for user "${userName}" has been submitted to Deletion Requests.`);
      } catch (e) {
        alert(e.message || "Failed to submit deletion request.");
      }
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
      status: user.status,
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
      } else {
        await userService.createUser(formData);
      }
      closeModal();
      loadUsers();
    } catch (e) {
      alert(e.message || "Failed to save user.");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + users.length, totalRecords);

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <UsersHeader onOpenAddModal={openAddModal} />

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

        {/* Pagination Footer */}
        {totalRecords > 0 && (
          <div className="p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-input-dark-bg)]/40">
            <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{" "}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{" "}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{totalRecords}</span> users
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                        ? "bg-[var(--color-primary)] text-white shadow-sm font-bold"
                        : "border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
