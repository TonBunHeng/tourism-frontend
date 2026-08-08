import { useState, useMemo } from 'react';
import {
  X,
  TrendingUp,
  Database,
  Download,
  BarChart2,
  Calendar,
  Award,
  CheckCircle2,
  Filter,
  RotateCcw,
  Layers,
  Activity
} from 'lucide-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ReportsAnalyticsModal({ isOpen, onClose }) {
  const [timeframe, setTimeframe] = useState('2024');
  const [selectedDataset, setSelectedDataset] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Compute analytics dynamically based on all selected filter options
  const analyticsData = useMemo(() => {
    // Multipliers for dataset selection
    const datasetMultipliers = {
      ALL: 1.0,
      places: 0.38,
      events: 0.24,
      users: 0.18,
      reviews: 0.12,
      categories: 0.08
    };

    // Multipliers for status selection
    const statusMultipliers = {
      ALL: 1.0,
      Active: 0.83,
      Pending: 0.12,
      Archived: 0.05
    };

    const dsMult = datasetMultipliers[selectedDataset] || 1.0;
    const stMult = statusMultipliers[statusFilter] || 1.0;
    const combinedMult = dsMult * stMult;

    let baseMonthly;
    let ingestedTotal = 14580;
    let exportsTotal = 2270;
    let activePct = 98.4;
    let qualityIdx = 4.88;
    let growthText = '+22.5% volume growth';
    let exportRateText = '+15.2% export rate';

    if (timeframe === '2026') {
      ingestedTotal = 34570;
      exportsTotal = 5470;
      activePct = 99.1;
      qualityIdx = 4.92;
      growthText = '+28.4% volume growth';
      exportRateText = '+19.8% export rate';
      baseMonthly = [
        { month: 'Jan', recordsIngested: 1450, exportActivity: 220 },
        { month: 'Feb', recordsIngested: 1620, exportActivity: 250 },
        { month: 'Mar', recordsIngested: 1850, exportActivity: 290 },
        { month: 'Apr', recordsIngested: 2100, exportActivity: 340 },
        { month: 'May', recordsIngested: 2400, exportActivity: 380 },
        { month: 'Jun', recordsIngested: 2750, exportActivity: 430 },
        { month: 'Jul', recordsIngested: 3100, exportActivity: 490 },
        { month: 'Aug', recordsIngested: 3450, exportActivity: 540 },
        { month: 'Sep', recordsIngested: 3200, exportActivity: 510 },
        { month: 'Oct', recordsIngested: 3800, exportActivity: 600 },
        { month: 'Nov', recordsIngested: 4150, exportActivity: 670 },
        { month: 'Dec', recordsIngested: 4600, exportActivity: 750 }
      ];
    } else if (timeframe === '2025') {
      ingestedTotal = 23300;
      exportsTotal = 3515;
      activePct = 98.7;
      qualityIdx = 4.89;
      growthText = '+24.1% volume growth';
      exportRateText = '+17.2% export rate';
      baseMonthly = [
        { month: 'Jan', recordsIngested: 650, exportActivity: 95 },
        { month: 'Feb', recordsIngested: 820, exportActivity: 120 },
        { month: 'Mar', recordsIngested: 1050, exportActivity: 160 },
        { month: 'Apr', recordsIngested: 1280, exportActivity: 190 },
        { month: 'May', recordsIngested: 1500, exportActivity: 230 },
        { month: 'Jun', recordsIngested: 1780, exportActivity: 280 },
        { month: 'Jul', recordsIngested: 2050, exportActivity: 330 },
        { month: 'Aug', recordsIngested: 2300, exportActivity: 370 },
        { month: 'Sep', recordsIngested: 2150, exportActivity: 350 },
        { month: 'Oct', recordsIngested: 2580, exportActivity: 410 },
        { month: 'Nov', recordsIngested: 2890, exportActivity: 460 },
        { month: 'Dec', recordsIngested: 3250, exportActivity: 520 }
      ];
    } else if (timeframe === '6M') {
      ingestedTotal = 11940;
      exportsTotal = 1840;
      activePct = 98.9;
      qualityIdx = 4.90;
      growthText = '+18.6% volume growth';
      exportRateText = '+14.8% export rate';
      baseMonthly = [
        { month: 'Feb', recordsIngested: 1250, exportActivity: 190 },
        { month: 'Mar', recordsIngested: 1580, exportActivity: 240 },
        { month: 'Apr', recordsIngested: 1890, exportActivity: 290 },
        { month: 'May', recordsIngested: 2150, exportActivity: 340 },
        { month: 'Jun', recordsIngested: 2420, exportActivity: 380 },
        { month: 'Jul', recordsIngested: 2650, exportActivity: 400 }
      ];
    } else if (timeframe === '30D') {
      ingestedTotal = 2150;
      exportsTotal = 342;
      activePct = 99.3;
      qualityIdx = 4.94;
      growthText = '+12.4% volume growth';
      exportRateText = '+11.5% export rate';
      baseMonthly = [
        { month: 'Wk 1', recordsIngested: 420, exportActivity: 65 },
        { month: 'Wk 2', recordsIngested: 510, exportActivity: 80 },
        { month: 'Wk 3', recordsIngested: 580, exportActivity: 92 },
        { month: 'Wk 4', recordsIngested: 640, exportActivity: 105 }
      ];
    } else if (timeframe === '7D') {
      ingestedTotal = 580;
      exportsTotal = 94;
      activePct = 99.6;
      qualityIdx = 4.96;
      growthText = '+8.2% volume growth';
      exportRateText = '+9.1% export rate';
      baseMonthly = [
        { month: 'Mon', recordsIngested: 72, exportActivity: 12 },
        { month: 'Tue', recordsIngested: 85, exportActivity: 14 },
        { month: 'Wed', recordsIngested: 94, exportActivity: 15 },
        { month: 'Thu', recordsIngested: 88, exportActivity: 13 },
        { month: 'Fri', recordsIngested: 105, exportActivity: 18 },
        { month: 'Sat', recordsIngested: 74, exportActivity: 11 },
        { month: 'Sun', recordsIngested: 62, exportActivity: 11 }
      ];
    } else if (timeframe === 'ALL') {
      ingestedTotal = 72450;
      exportsTotal = 11255;
      activePct = 98.8;
      qualityIdx = 4.91;
      growthText = '+26.8% all-time growth';
      exportRateText = '+18.4% export rate';
      baseMonthly = [
        { month: 'Q1 24', recordsIngested: 1350, exportActivity: 205 },
        { month: 'Q2 24', recordsIngested: 2650, exportActivity: 435 },
        { month: 'Q3 24', recordsIngested: 4010, exportActivity: 680 },
        { month: 'Q4 24', recordsIngested: 5470, exportActivity: 945 },
        { month: 'Q1 25', recordsIngested: 7500, exportActivity: 1250 },
        { month: 'Q2 25', recordsIngested: 9800, exportActivity: 1650 },
        { month: 'Q3 25', recordsIngested: 12400, exportActivity: 2100 },
        { month: 'Q4 25', recordsIngested: 15200, exportActivity: 2600 }
      ];
    } else {
      // 2024 Default
      baseMonthly = [
        { month: 'Jan', recordsIngested: 320, exportActivity: 45 },
        { month: 'Feb', recordsIngested: 450, exportActivity: 68 },
        { month: 'Mar', recordsIngested: 580, exportActivity: 92 },
        { month: 'Apr', recordsIngested: 710, exportActivity: 110 },
        { month: 'May', recordsIngested: 890, exportActivity: 145 },
        { month: 'Jun', recordsIngested: 1050, exportActivity: 180 },
        { month: 'Jul', recordsIngested: 1240, exportActivity: 210 },
        { month: 'Aug', recordsIngested: 1420, exportActivity: 250 },
        { month: 'Sep', recordsIngested: 1350, exportActivity: 220 },
        { month: 'Oct', recordsIngested: 1580, exportActivity: 275 },
        { month: 'Nov', recordsIngested: 1790, exportActivity: 310 },
        { month: 'Dec', recordsIngested: 2100, exportActivity: 360 }
      ];
    }

    const filteredMonthly = baseMonthly.map(item => ({
      ...item,
      recordsIngested: Math.max(1, Math.round(item.recordsIngested * combinedMult)),
      exportActivity: Math.max(1, Math.round(item.exportActivity * combinedMult))
    }));

    const finalIngested = Math.round(ingestedTotal * combinedMult);
    const finalExports = Math.round(exportsTotal * combinedMult);

    let distribution;
    if (selectedDataset === 'ALL') {
      distribution = [
        { name: 'Places Dataset', count: Math.round(finalIngested * 0.38), percentage: 38, color: 'bg-blue-500' },
        { name: 'Events Dataset', count: Math.round(finalIngested * 0.24), percentage: 24, color: 'bg-purple-500' },
        { name: 'Users Dataset', count: Math.round(finalIngested * 0.18), percentage: 18, color: 'bg-emerald-500' },
        { name: 'Reviews Dataset', count: Math.round(finalIngested * 0.12), percentage: 12, color: 'bg-amber-500' },
        { name: 'Categories Dataset', count: Math.round(finalIngested * 0.08), percentage: 8, color: 'bg-cyan-500' }
      ];
    } else if (selectedDataset === 'places') {
      distribution = [
        { name: 'Temples & Heritage', count: Math.round(finalIngested * 0.42), percentage: 42, color: 'bg-blue-500' },
        { name: 'Nature & Wildlife', count: Math.round(finalIngested * 0.28), percentage: 28, color: 'bg-emerald-500' },
        { name: 'Palaces & Museums', count: Math.round(finalIngested * 0.18), percentage: 18, color: 'bg-purple-500' },
        { name: 'Beaches & Resorts', count: Math.round(finalIngested * 0.12), percentage: 12, color: 'bg-amber-500' }
      ];
    } else if (selectedDataset === 'events') {
      distribution = [
        { name: 'Cultural Festivals', count: Math.round(finalIngested * 0.45), percentage: 45, color: 'bg-purple-500' },
        { name: 'Sports & Marathons', count: Math.round(finalIngested * 0.30), percentage: 30, color: 'bg-blue-500' },
        { name: 'Food & Trade Expos', count: Math.round(finalIngested * 0.25), percentage: 25, color: 'bg-amber-500' }
      ];
    } else if (selectedDataset === 'users') {
      distribution = [
        { name: 'Standard Users', count: Math.round(finalIngested * 0.65), percentage: 65, color: 'bg-emerald-500' },
        { name: 'Guides & Editors', count: Math.round(finalIngested * 0.20), percentage: 20, color: 'bg-cyan-500' },
        { name: 'Admins & Staff', count: Math.round(finalIngested * 0.15), percentage: 15, color: 'bg-purple-500' }
      ];
    } else if (selectedDataset === 'reviews') {
      distribution = [
        { name: '5-Star Reviews', count: Math.round(finalIngested * 0.58), percentage: 58, color: 'bg-emerald-500' },
        { name: '4-Star Reviews', count: Math.round(finalIngested * 0.26), percentage: 26, color: 'bg-blue-500' },
        { name: '3-Star & Below', count: Math.round(finalIngested * 0.16), percentage: 16, color: 'bg-amber-500' }
      ];
    } else {
      distribution = [
        { name: 'Primary Categories', count: Math.round(finalIngested * 0.60), percentage: 60, color: 'bg-cyan-500' },
        { name: 'Sub-Categories', count: Math.round(finalIngested * 0.40), percentage: 40, color: 'bg-purple-500' }
      ];
    }

    let statusBreakdownData;
    if (statusFilter === 'Active') {
      statusBreakdownData = [
        { label: 'Active / Published Data', count: finalIngested, percentage: 100, color: 'from-emerald-400 to-emerald-600' },
        { label: 'Pending Review Data', count: 0, percentage: 0, color: 'from-amber-400 to-amber-600' },
        { label: 'Archived / Inactive Data', count: 0, percentage: 0, color: 'from-rose-400 to-rose-600' }
      ];
    } else if (statusFilter === 'Pending') {
      statusBreakdownData = [
        { label: 'Active / Published Data', count: 0, percentage: 0, color: 'from-emerald-400 to-emerald-600' },
        { label: 'Pending Review Data', count: finalIngested, percentage: 100, color: 'from-amber-400 to-amber-600' },
        { label: 'Archived / Inactive Data', count: 0, percentage: 0, color: 'from-rose-400 to-rose-600' }
      ];
    } else if (statusFilter === 'Archived') {
      statusBreakdownData = [
        { label: 'Active / Published Data', count: 0, percentage: 0, color: 'from-emerald-400 to-emerald-600' },
        { label: 'Pending Review Data', count: 0, percentage: 0, color: 'from-amber-400 to-amber-600' },
        { label: 'Archived / Inactive Data', count: finalIngested, percentage: 100, color: 'from-rose-400 to-rose-600' }
      ];
    } else {
      statusBreakdownData = [
        { label: 'Active / Published Data', count: Math.round(finalIngested * 0.83), percentage: 83, color: 'from-emerald-400 to-emerald-600' },
        { label: 'Pending Review Data', count: Math.round(finalIngested * 0.12), percentage: 12, color: 'from-amber-400 to-amber-600' },
        { label: 'Archived / Inactive Data', count: Math.round(finalIngested * 0.05), percentage: 5, color: 'from-rose-400 to-rose-600' }
      ];
    }

    return {
      monthlyData: filteredMonthly,
      ingestedTotal: finalIngested,
      exportsTotal: finalExports,
      activePct,
      qualityIdx,
      growthText,
      exportRateText,
      distribution,
      statusBreakdownData
    };
  }, [timeframe, selectedDataset, statusFilter]);

  if (!isOpen) return null;

  const isFilterActive = timeframe !== '2024' || selectedDataset !== 'ALL' || statusFilter !== 'ALL';

  const handleResetSelections = () => {
    setTimeframe('2024');
    setSelectedDataset('ALL');
    setStatusFilter('ALL');
  };

  const getDatasetLabel = (val) => {
    switch (val) {
      case 'places': return 'Places Dataset';
      case 'events': return 'Events Dataset';
      case 'users': return 'Users Dataset';
      case 'reviews': return 'Reviews Dataset';
      case 'categories': return 'Categories Dataset';
      default: return 'All Datasets';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex items-center justify-between bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-input-dark-bg)]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
                Reports Analytics Overview
              </h2>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                Performance trends, export activity, and interactive dataset insights
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Selection Controls Toolbar */}
        <div className="px-6 py-3 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)]/30 dark:bg-[var(--color-input-dark-bg)]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
            <Filter className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Select Options & Data Focus:</span>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Timeframe Select Option */}
            <div className="flex items-center bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-2 py-1 text-xs font-medium">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-[var(--color-primary)] shrink-0" />
              <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mr-1 hidden sm:inline">Timeframe:</span>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] font-semibold"
              >
                <option value="2026">Year 2026</option>
                <option value="2025">Year 2025</option>
                <option value="2024">Year 2024</option>
                <option value="6M">Last 6 Months</option>
                <option value="30D">Last 30 Days</option>
                <option value="7D">Last 7 Days</option>
                <option value="ALL">All Time</option>
              </select>
            </div>

            {/* Dataset Category Select Option */}
            <div className="flex items-center bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-2 py-1 text-xs font-medium">
              <Layers className="w-3.5 h-3.5 mr-1.5 text-blue-500 shrink-0" />
              <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mr-1 hidden sm:inline">Dataset:</span>
              <select
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] font-semibold"
              >
                <option value="ALL">All Datasets</option>
                <option value="places">Places Dataset</option>
                <option value="events">Events Dataset</option>
                <option value="users">Users Dataset</option>
                <option value="reviews">Reviews Dataset</option>
                <option value="categories">Categories Dataset</option>
              </select>
            </div>

            {/* Status Health Select Option */}
            <div className="flex items-center bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-2 py-1 text-xs font-medium">
              <Activity className="w-3.5 h-3.5 mr-1.5 text-emerald-500 shrink-0" />
              <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mr-1 hidden sm:inline">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] font-semibold"
              >
                <option value="ALL">All Statuses</option>
                <option value="Active">Active / Published</option>
                <option value="Pending">Pending Review</option>
                <option value="Archived">Archived / Inactive</option>
              </select>
            </div>

            {/* Reset Selections Button */}
            {isFilterActive && (
              <button
                onClick={handleResetSelections}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-gray-100 dark:bg-gray-800 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] transition-colors cursor-pointer"
                title="Reset select options to default"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-hide">
          
          {/* Key Metric Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                <span>Total Dataset Ingested</span>
                <Database className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                {analyticsData.ingestedTotal.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 text-xs text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] mt-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{analyticsData.growthText}</span>
              </div>
            </div>

            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                <span>Total Exports Generated</span>
                <Download className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                {analyticsData.exportsTotal.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 text-xs text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] mt-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{analyticsData.exportRateText}</span>
              </div>
            </div>

            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                <span>Active Data Rate</span>
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                {analyticsData.activePct}%
              </p>
              <div className="flex items-center gap-1 text-xs text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] mt-1 font-medium">
                <span>High data accuracy</span>
              </div>
            </div>

            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                <span>Report Quality Index</span>
                <Award className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                {analyticsData.qualityIdx} <span className="text-xs font-normal text-gray-500">/ 5.0</span>
              </p>
              <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">
                <span>Verified schema standard</span>
              </div>
            </div>
          </div>

          {/* User Growth Overview Style Chart */}
          <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-base">
                  Data Ingestion & Export Activity Trend
                </h3>
                <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">
                  Showing focus data for <span className="font-semibold text-[var(--color-primary)]">{getDatasetLabel(selectedDataset)}</span> ({timeframe})
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-xs bg-[#4472C4]"></div>
                  <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">Records Ingested</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-[#ED7D31]"></div>
                  <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">Export Downloads</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={analyticsData.monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#D1D5DB' }} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#ED7D31' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 12 }}
                  />
                  <Bar yAxisId="left" dataKey="recordsIngested" name="Records Ingested" fill="#4472C4" barSize={18} radius={[4, 4, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="exportActivity"
                    name="Export Downloads"
                    stroke="#ED7D31"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#ED7D31' }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown Section: Category & Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Category Breakdown */}
            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5">
              <h3 className="font-semibold text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">
                Dataset Records Distribution ({getDatasetLabel(selectedDataset)})
              </h3>
              <div className="space-y-3.5">
                {analyticsData.distribution.map((ds, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs mb-1 font-medium">
                      <span className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{ds.name}</span>
                      <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                        {ds.count.toLocaleString()} records ({ds.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${ds.color} rounded-full transition-all duration-500`}
                        style={{ width: `${ds.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5">
              <h3 className="font-semibold text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">
                Report Data Status Health ({statusFilter === 'ALL' ? 'All Statuses' : statusFilter})
              </h3>
              <div className="space-y-4">
                {analyticsData.statusBreakdownData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                      <span className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{item.label}</span>
                      <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-bold">
                        {item.count.toLocaleString()} items ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)]/30 dark:bg-[var(--color-input-dark-bg)]/30 flex items-center justify-between">
          <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
            Viewing: <span className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{getDatasetLabel(selectedDataset)}</span> | <span className="font-semibold">{timeframe}</span> | <span className="font-semibold">{statusFilter} Status</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer shadow-xs"
          >
            Close Analytics
          </button>
        </div>

      </div>
    </div>
  );
}
