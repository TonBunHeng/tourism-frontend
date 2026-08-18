import { useState, useEffect } from 'react';
import ReportsHeader from './ReportsHeader';
import ReportsStats from './ReportsStats';
import ReportsTable from './ReportsTable';
import ReportsAnalyticsModal from './ReportsAnalyticsModal';
import ExportAlertModal from './ExportAlertModal';
import placeService from '../../services/placeService';
import eventService from '../../services/eventService';
import userService from '../../services/userService';
import reviewService from '../../services/reviewService';
import categoryService from '../../services/categoryService';
import { exportToPDF, exportToExcel } from '../../utils/exportReports';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('places');
  const [selectedDay, setSelectedDay] = useState('');
  const [appliedDay, setAppliedDay] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [totalExports, setTotalExports] = useState(14);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  // Live Datasets State
  const [datasets, setDatasets] = useState({
    places: [],
    events: [],
    users: [],
    reviews: [],
    categories: []
  });

  const loadAllReportsData = async () => {
    setIsLoading(true);
    try {
      const [placesRes, eventsRes, usersRes, reviewsRes, categoriesRes] = await Promise.allSettled([
        placeService.getPlaces({ per_page: 100 }),
        eventService.getEvents({ per_page: 100 }),
        userService.getUsers({ per_page: 100 }),
        reviewService.getReviews({ per_page: 100 }),
        categoryService.getCategories({ per_page: 100 })
      ]);

      const formattedPlaces = (placesRes.status === 'fulfilled' && placesRes.value?.data)
        ? placesRes.value.data.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category || p.category_detail?.name || 'Attraction',
            province: p.province || p.province_detail?.name || 'Siem Reap',
            rating: Number(p.rating || 5.0),
            reviews: Number(p.reviews_count || 0),
            status: p.status || 'Active',
            createdAt: p.created_at ? p.created_at.split('T')[0] : '2026-08-18',
            location: p.address || 'Cambodia'
          }))
        : [];

      const formattedEvents = (eventsRes.status === 'fulfilled' && eventsRes.value?.data)
        ? eventsRes.value.data.map(e => ({
            id: e.id,
            title: e.title,
            location: e.location || 'Phnom Penh',
            startDate: e.start_date || '2026-08-18',
            endDate: e.end_date || '2026-08-20',
            attendees: Number(e.attendees_count || 500),
            status: e.status || 'Upcoming'
          }))
        : [];

      const formattedUsers = (usersRes.status === 'fulfilled' && usersRes.value?.data)
        ? usersRes.value.data.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role || 'User',
            joinedDate: u.created_at ? u.created_at.split('T')[0] : '2026-08-18',
            reviewsCount: Number(u.reviews_count || 0),
            status: u.status || 'Active'
          }))
        : [];

      const formattedReviews = (reviewsRes.status === 'fulfilled' && reviewsRes.value?.data)
        ? reviewsRes.value.data.map(r => ({
            id: r.id,
            userName: r.user_name || (typeof r.user === 'object' ? r.user?.name : r.user) || 'Traveler',
            placeName: r.place_name || (typeof r.place === 'object' ? r.place?.name : r.place) || 'Attraction',
            rating: Number(r.rating || 5),
            comment: r.comment || '',
            date: r.created_at ? r.created_at.split('T')[0] : '2026-08-18',
            status: r.status || 'Approved'
          }))
        : [];

      const formattedCategories = (categoriesRes.status === 'fulfilled' && categoriesRes.value?.data)
        ? categoriesRes.value.data.map(c => ({
            id: c.id,
            name: c.name,
            description: c.description || 'Category description',
            totalPlaces: Number(c.places_count || 0),
            status: c.status || 'Active'
          }))
        : [];

      setDatasets({
        places: formattedPlaces,
        events: formattedEvents,
        users: formattedUsers,
        reviews: formattedReviews,
        categories: formattedCategories
      });
    } catch (e) {
      console.error('Failed to load reports datasets from API:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllReportsData();
  }, []);

  const currentDataset = datasets[activeTab] || [];

  const filteredData = currentDataset.filter(item => {
    const itemDate = item.createdAt || item.startDate || item.joinedDate || item.date;

    let matchesDate = true;
    if (itemDate && appliedDay) {
      if (item.startDate && item.endDate) {
        matchesDate = appliedDay >= item.startDate && appliedDay <= item.endDate;
      } else {
        matchesDate = itemDate === appliedDay || itemDate.startsWith(appliedDay);
      }
    }

    const matchesSearch = Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus =
      statusFilter === 'All' ||
      (item.status && item.status.toLowerCase().includes(statusFilter.toLowerCase()));

    return matchesDate && matchesSearch && matchesStatus;
  });

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSubmitFilter = () => {
    setAppliedDay(selectedDay);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 250);
  };

  const handleResetFilter = () => {
    setSelectedDay('');
    setAppliedDay('');
    setSearchTerm('');
    setStatusFilter('All');
    setIsResetting(true);
    setTimeout(() => {
      setIsResetting(false);
    }, 250);
    loadAllReportsData();
  };

  const handleOpenExportPDF = () => {
    setExportFormat('pdf');
    setIsExportModalOpen(true);
  };

  const handleOpenExportExcel = () => {
    setExportFormat('excel');
    setIsExportModalOpen(true);
  };

  const handleConfirmExport = () => {
    const todayStr = new Date().toISOString().slice(0, 10);

    if (exportFormat === 'pdf') {
      let headers = [];
      let rows = [];

      if (activeTab === 'places') {
        headers = ['ID', 'Place Name', 'Category', 'Province', 'Rating', 'Reviews', 'Status', 'Created Date'];
        rows = filteredData.map(r => [r.id, r.name, r.category, r.province, r.rating, r.reviews, r.status, r.createdAt]);
      } else if (activeTab === 'events') {
        headers = ['ID', 'Event Title', 'Location', 'Start Date', 'End Date', 'Attendees', 'Status'];
        rows = filteredData.map(r => [r.id, r.title, r.location, r.startDate, r.endDate, r.attendees, r.status]);
      } else if (activeTab === 'users') {
        headers = ['User ID', 'Full Name', 'Email', 'Role', 'Joined Date', 'Reviews Written', 'Status'];
        rows = filteredData.map(r => [r.id, r.name, r.email, r.role, r.joinedDate, r.reviewsCount, r.status]);
      } else if (activeTab === 'reviews') {
        headers = ['ID', 'User Name', 'Target Place', 'Rating', 'Comment', 'Date', 'Status'];
        rows = filteredData.map(r => [r.id, r.userName, r.placeName, r.rating, r.comment, r.date, r.status]);
      } else if (activeTab === 'categories') {
        headers = ['Category ID', 'Category Name', 'Description', 'Total Places', 'Status'];
        rows = filteredData.map(r => [r.id, r.name, r.description, r.totalPlaces, r.status]);
      }

      const result = exportToPDF({
        title: `${activeTab.toUpperCase()} DATASET REPORT`,
        subtitle: `Exported on ${new Date().toLocaleString()} | Applied Filter: ${statusFilter}`,
        headers,
        rows,
        filename: `Tourism_${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}_Report_${todayStr}.pdf`
      });

      if (result.success) {
        setTotalExports(prev => prev + 1);
      }
    } else {
      const result = exportToExcel({
        data: filteredData,
        sheetName: `${activeTab.toUpperCase()} Report`,
        filename: `Tourism_${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}_Report_${todayStr}.xlsx`
      });

      if (result.success) {
        setTotalExports(prev => prev + 1);
      }
    }
  };

  const totalCount = filteredData.length;
  const activeCount = filteredData.filter(i =>
    ['active', 'approved', 'completed'].includes(i.status?.toLowerCase())
  ).length;

  const avgRating = filteredData.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0) / (filteredData.filter(i => i.rating).length || 1);

  return (
    <div className="flex flex-col space-y-6">
      <ExportAlertModal
        isOpen={isExportModalOpen}
        format={exportFormat}
        activeTab={activeTab}
        recordCount={filteredData.length}
        onClose={() => setIsExportModalOpen(false)}
        onConfirm={handleConfirmExport}
      />

      <ReportsHeader
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        onSubmitFilter={handleSubmitFilter}
        onResetFilter={handleResetFilter}
        onExportPDF={handleOpenExportPDF}
        onExportExcel={handleOpenExportExcel}
        onOpenAnalytics={() => setIsAnalyticsModalOpen(true)}
        isSubmitting={isSubmitting}
        isResetting={isResetting}
      />

      <ReportsStats
        totalCount={totalCount}
        activeCount={activeCount}
        avgRating={avgRating ? avgRating.toFixed(1) : null}
        totalExports={totalExports}
      />

      <ReportsTable
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        data={filteredData}
        isLoading={isLoading}
      />

      {/* Reports Analytics Modal */}
      <ReportsAnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
        activeTab={activeTab}
        datasets={datasets}
        totalExports={totalExports}
      />
    </div>
  );
}
