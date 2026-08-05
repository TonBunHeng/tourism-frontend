// src/pages/reports/Reports.jsx
import { useState } from 'react';
import ReportsHeader from './ReportsHeader';
import ReportsStats from './ReportsStats';
import ReportsTable from './ReportsTable';
import ExportAlertModal from './ExportAlertModal';
import {
  placesReportData,
  eventsReportData,
  usersReportData,
  reviewsReportData,
  categoriesReportData
} from './reportsData';
import { exportToPDF, exportToExcel } from '../../utils/exportReports';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('places');
  const [dateRange, setDateRange] = useState('all');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [totalExports, setTotalExports] = useState(14);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const getRawDataByTab = () => {
    switch (activeTab) {
      case 'places': return placesReportData;
      case 'events': return eventsReportData;
      case 'users': return usersReportData;
      case 'reviews': return reviewsReportData;
      case 'categories': return categoriesReportData;
      default: return placesReportData;
    }
  };

  const currentDataset = getRawDataByTab();

  const filteredData = currentDataset.filter(item => {
    const itemDate = item.createdAt || item.startDate || item.joinedDate || item.date;

    let matchesDate = true;
    if (dateRange === 'day' && selectedDay && itemDate) {
      matchesDate = itemDate === selectedDay;
    } else if (dateRange === 'month' && selectedMonth && itemDate) {
      const monthPart = itemDate.slice(5, 7);
      matchesDate = monthPart === selectedMonth;
    } else if (dateRange === 'year' && selectedYear && itemDate) {
      const yearPart = itemDate.slice(0, 4);
      matchesDate = yearPart === selectedYear;
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
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const handleRefresh = () => {
    setDateRange('all');
    setSelectedDay('');
    setSelectedMonth('');
    setSelectedYear('');
    setSearchTerm('');
    setStatusFilter('All');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
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

  const avgRating = filteredData.reduce((acc, curr) => acc + (curr.rating || 0), 0) / (filteredData.filter(i => i.rating).length || 1);

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
        activeTab={activeTab}
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        onExportPDF={handleOpenExportPDF}
        onExportExcel={handleOpenExportExcel}
        onRefresh={handleRefresh}
        isLoading={isLoading}
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
    </div>
  );
}
