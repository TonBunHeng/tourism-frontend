import { useState, useEffect } from "react";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import DeletionHeader from "./DeletionHeader";
import DeletionStats from "./DeletionStats";
import DeletionAlert from "./DeletionAlert";
import DeletionToolbar from "./DeletionToolbar";
import DeletionList from "./DeletionList";
import DeletionDetailsModal from "./DeletionDetailsModal";
import DeletionConfirmModal from "./DeletionConfirmModal";
import DeletionAnalyticsModal from "./DeletionAnalyticsModal";
import deletionRequestService from "../../services/deletionRequestService";

export default function DeleteAccount() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedUrgency, setSelectedUrgency] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  // Modal states
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmType, setConfirmType] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  const types = ["All", "account", "item"];
  const statuses = ["All", "pending", "approved", "rejected", "archived"];
  const urgencies = ["All", "critical", "high", "medium", "low"];

  const loadRequests = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: itemsPerPage,
      };
      if (searchTerm) params.search = searchTerm;
      if (selectedStatus !== "All") params.status = selectedStatus;

      const res = await deletionRequestService.getRequests(params);
      if (res.success && res.data) {
        const formatted = res.data.map(req => {
          const userObj = req.user || {};
          return {
            id: req.id,
            user: {
              name: userObj.name || "App User",
              email: userObj.email || "user@example.com",
              avatar: userObj.avatar || null,
              role: userObj.role || "User"
            },
            type: req.request_type || "account",
            targetName: req.target_name || userObj.name || "Account",
            reason: req.reason || "No reason provided",
            additionalInfo: req.additional_info || "",
            status: req.status || "pending",
            urgency: req.urgency || "medium",
            requestedDate: req.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
            processedDate: req.processed_at?.split("T")[0] || null,
            processedBy: req.processed_by || null,
            adminNotes: req.admin_notes || ""
          };
        });
        setRequests(formatted);
        setTotalRecords(res.meta?.total || formatted.length);
        setTotalPages(res.meta?.last_page || Math.ceil((res.meta?.total || formatted.length) / itemsPerPage) || 1);
      }
    } catch (e) {
      console.error("Failed to load deletion requests:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [currentPage, searchTerm, selectedStatus, selectedType, selectedUrgency, sortBy]);

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.additionalInfo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "All" || req.type === selectedType;
    const matchesStatus = selectedStatus === "All" || req.status === selectedStatus;
    const matchesUrgency = selectedUrgency === "All" || req.urgency === selectedUrgency;

    return matchesSearch && matchesType && matchesStatus && matchesUrgency;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.requestedDate) - new Date(a.requestedDate);
    }
    if (sortBy === "oldest") {
      return new Date(a.requestedDate) - new Date(b.requestedDate);
    }
    if (sortBy === "urgency") {
      const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return (urgencyOrder[a.urgency] || 4) - (urgencyOrder[b.urgency] || 4);
    }
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + sortedRequests.length, totalRecords);
  const paginatedRequests = sortedRequests.slice(0, itemsPerPage);

  const handleSearchChange = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleTypeChange = (val) => { setSelectedType(val); setCurrentPage(1); };
  const handleStatusChange = (val) => { setSelectedStatus(val); setCurrentPage(1); };
  const handleUrgencyChange = (val) => { setSelectedUrgency(val); setCurrentPage(1); };
  const handleSortChange = (val) => { setSortBy(val); setCurrentPage(1); };

  const handleReset = () => {
    loadRequests();
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setAdminNotes(request.adminNotes || "");
    setIsDetailsOpen(true);
  };

  const handleApprove = (request) => {
    setConfirmAction("approve");
    setConfirmType(request.type === "account" ? "Account Deletion" : "Item Deletion");
    setSelectedRequest(request);
    setIsConfirmOpen(true);
  };

  const handleReject = (request) => {
    setConfirmAction("reject");
    setConfirmType(request.type === "account" ? "Account Deletion" : "Item Deletion");
    setSelectedRequest(request);
    setIsConfirmOpen(true);
  };

  const confirmDecision = async () => {
    if (!selectedRequest || !confirmAction) return;

    const newStatus = confirmAction === "approve" ? "approved" : "rejected";
    try {
      await deletionRequestService.updateStatus(selectedRequest.id, {
        status: newStatus,
        admin_notes: adminNotes
      });
      setIsConfirmOpen(false);
      setConfirmAction(null);
      setAdminNotes("");
      setSelectedRequest(null);
      loadRequests();
    } catch (e) {
      alert(e.message || "Failed to update request status.");
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setSelectedStatus("All");
    setSelectedUrgency("All");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || selectedType !== "All" || selectedStatus !== "All" || selectedUrgency !== "All";

  return (
    <div className="flex flex-col">
      {/* Header */}
      <DeletionHeader onReset={handleReset} onOpenAnalytics={() => setIsAnalyticsOpen(true)} />

      {/* Stats Cards */}
      <DeletionStats requests={requests} />

      {/* Urgency Alert */}
      <DeletionAlert requests={requests} />

      {/* Main Content */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex-1">
        {/* Toolbar */}
        <DeletionToolbar
          totalCount={filteredRequests.length}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          types={types}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          statuses={statuses}
          selectedUrgency={selectedUrgency}
          onUrgencyChange={handleUrgencyChange}
          urgencies={urgencies}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />

        {/* Requests List */}
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
            Loading deletion requests from API...
          </div>
        ) : (
          <DeletionList
            requests={paginatedRequests}
            onViewDetails={handleViewDetails}
            onApprove={handleApprove}
            onReject={handleReject}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        )}

        {/* Pagination Footer */}
        {totalRecords > 0 && (
          <div className="p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-input-dark-bg)]/40">
            <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">
              Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{" "}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{" "}
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{totalRecords}</span> requests
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

      {/* Analytics Overview Modal */}
      <DeletionAnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        requests={requests}
      />
    </div>
  );
}
