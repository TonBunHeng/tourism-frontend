import { useState, useMemo } from 'react';
import {
  X,
  TrendingUp,
  Star,
  ThumbsUp,
  MessageSquare,
  BarChart2,
  Calendar,
  Award,
  Filter,
  RotateCcw,
  Layers,
  Activity
} from 'lucide-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RatingsAnalyticsModal({ isOpen, onClose, reviews = [] }) {
  const [timeframe, setTimeframe] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [ratingFilter, setRatingFilter] = useState('ALL');

  // Compute analytics dynamically based on all selected filter options
  const analyticsData = useMemo(() => {
    // Multipliers for category filter selection
    const categoryMultipliers = {
      ALL: 1.0,
      temples: 0.38,
      palaces: 0.23,
      beaches: 0.18,
      nature: 0.14,
      nightlife: 0.07
    };

    // Multipliers for rating score selection
    const ratingMultipliers = {
      ALL: 1.0,
      '5': 0.58,
      '4': 0.30,
      '3': 0.08,
      '2': 0.03,
      '1': 0.01,
      positive: 0.88,
      critical: 0.12
    };

    const catMult = categoryMultipliers[selectedCategory] || 1.0;
    const rateMult = ratingMultipliers[ratingFilter] || 1.0;
    const combinedMult = catMult * rateMult;

    let baseMonthly = [];
    let baseTotal = 2264;
    let baseAvg = 4.72;
    let baseGrowth = '+20.1% volume growth';
    let baseScoreChange = '+0.18 score increase';
    let baseVerification = 96.8;

    if (timeframe === '2026') {
      baseTotal = 4850;
      baseAvg = 4.86;
      baseGrowth = '+26.4% volume growth';
      baseScoreChange = '+0.24 score increase';
      baseVerification = 98.2;
      baseMonthly = [
        { month: 'Jan', totalRatings: 210, avgRating: 4.65 },
        { month: 'Feb', totalRatings: 260, avgRating: 4.72 },
        { month: 'Mar', totalRatings: 310, avgRating: 4.78 },
        { month: 'Apr', totalRatings: 350, avgRating: 4.80 },
        { month: 'May', totalRatings: 410, avgRating: 4.85 },
        { month: 'Jun', totalRatings: 460, avgRating: 4.88 },
        { month: 'Jul', totalRatings: 520, avgRating: 4.86 },
        { month: 'Aug', totalRatings: 580, avgRating: 4.91 },
        { month: 'Sep', totalRatings: 490, avgRating: 4.85 },
        { month: 'Oct', totalRatings: 540, avgRating: 4.89 },
        { month: 'Nov', totalRatings: 610, avgRating: 4.93 },
        { month: 'Dec', totalRatings: 680, avgRating: 4.95 }
      ];
    } else if (timeframe === '2025') {
      baseTotal = 3420;
      baseAvg = 4.78;
      baseGrowth = '+22.8% volume growth';
      baseScoreChange = '+0.21 score increase';
      baseVerification = 97.4;
      baseMonthly = [
        { month: 'Jan', totalRatings: 110, avgRating: 4.45 },
        { month: 'Feb', totalRatings: 145, avgRating: 4.52 },
        { month: 'Mar', totalRatings: 180, avgRating: 4.60 },
        { month: 'Apr', totalRatings: 220, avgRating: 4.65 },
        { month: 'May', totalRatings: 270, avgRating: 4.71 },
        { month: 'Jun', totalRatings: 310, avgRating: 4.75 },
        { month: 'Jul', totalRatings: 360, avgRating: 4.73 },
        { month: 'Aug', totalRatings: 410, avgRating: 4.82 },
        { month: 'Sep', totalRatings: 350, avgRating: 4.76 },
        { month: 'Oct', totalRatings: 390, avgRating: 4.80 },
        { month: 'Nov', totalRatings: 440, avgRating: 4.85 },
        { month: 'Dec', totalRatings: 495, avgRating: 4.90 }
      ];
    } else if (timeframe === '6M') {
      baseTotal = 1780;
      baseAvg = 4.82;
      baseGrowth = '+18.2% volume growth';
      baseScoreChange = '+0.15 score increase';
      baseVerification = 97.8;
      baseMonthly = [
        { month: 'Feb', totalRatings: 210, avgRating: 4.68 },
        { month: 'Mar', totalRatings: 260, avgRating: 4.75 },
        { month: 'Apr', totalRatings: 295, avgRating: 4.78 },
        { month: 'May', totalRatings: 340, avgRating: 4.82 },
        { month: 'Jun', totalRatings: 385, avgRating: 4.86 },
        { month: 'Jul', totalRatings: 420, avgRating: 4.89 }
      ];
    } else if (timeframe === '30D') {
      baseTotal = 385;
      baseAvg = 4.88;
      baseGrowth = '+14.1% volume growth';
      baseScoreChange = '+0.12 score increase';
      baseVerification = 98.6;
      baseMonthly = [
        { month: 'Wk 1', totalRatings: 75, avgRating: 4.82 },
        { month: 'Wk 2', totalRatings: 92, avgRating: 4.85 },
        { month: 'Wk 3', totalRatings: 104, avgRating: 4.89 },
        { month: 'Wk 4', totalRatings: 114, avgRating: 4.92 }
      ];
    } else if (timeframe === '7D') {
      baseTotal = 96;
      baseAvg = 4.92;
      baseGrowth = '+9.5% volume growth';
      baseScoreChange = '+0.08 score increase';
      baseVerification = 99.1;
      baseMonthly = [
        { month: 'Mon', totalRatings: 12, avgRating: 4.88 },
        { month: 'Tue', totalRatings: 15, avgRating: 4.90 },
        { month: 'Wed', totalRatings: 18, avgRating: 4.92 },
        { month: 'Thu', totalRatings: 14, avgRating: 4.89 },
        { month: 'Fri', totalRatings: 21, avgRating: 4.95 },
        { month: 'Sat', totalRatings: 16, avgRating: 4.91 },
        { month: 'Sun', totalRatings: 10, avgRating: 4.94 }
      ];
    } else if (timeframe === 'ALL') {
      baseTotal = 11450;
      baseAvg = 4.80;
      baseGrowth = '+24.5% all-time volume';
      baseScoreChange = '+0.32 overall growth';
      baseVerification = 97.2;
      baseMonthly = [
        { month: 'Q1 24', totalRatings: 224, avgRating: 4.46 },
        { month: 'Q2 24', totalRatings: 490, avgRating: 4.63 },
        { month: 'Q3 24', totalRatings: 690, avgRating: 4.70 },
        { month: 'Q4 24', totalRatings: 850, avgRating: 4.78 },
        { month: 'Q1 25', totalRatings: 1150, avgRating: 4.80 },
        { month: 'Q2 25', totalRatings: 1520, avgRating: 4.84 },
        { month: 'Q3 25', totalRatings: 1980, avgRating: 4.88 },
        { month: 'Q4 25', totalRatings: 2450, avgRating: 4.92 }
      ];
    } else {
      // 2024 Default
      baseMonthly = [
        { month: 'Jan', totalRatings: 52, avgRating: 4.3 },
        { month: 'Feb', totalRatings: 74, avgRating: 4.5 },
        { month: 'Mar', totalRatings: 98, avgRating: 4.6 },
        { month: 'Apr', totalRatings: 135, avgRating: 4.4 },
        { month: 'May', totalRatings: 160, avgRating: 4.7 },
        { month: 'Jun', totalRatings: 195, avgRating: 4.8 },
        { month: 'Jul', totalRatings: 225, avgRating: 4.6 },
        { month: 'Aug', totalRatings: 255, avgRating: 4.9 },
        { month: 'Sep', totalRatings: 210, avgRating: 4.6 },
        { month: 'Oct', totalRatings: 240, avgRating: 4.8 },
        { month: 'Nov', totalRatings: 280, avgRating: 4.9 },
        { month: 'Dec', totalRatings: 330, avgRating: 4.95 }
      ];
    }

    // Override score if specific rating filter selected
    let effectiveAvg = baseAvg;
    if (ratingFilter === '5') effectiveAvg = 5.0;
    else if (ratingFilter === '4') effectiveAvg = 4.0;
    else if (ratingFilter === '3') effectiveAvg = 3.0;
    else if (ratingFilter === '2') effectiveAvg = 2.0;
    else if (ratingFilter === '1') effectiveAvg = 1.0;
    else if (ratingFilter === 'positive') effectiveAvg = 4.88;
    else if (ratingFilter === 'critical') effectiveAvg = 2.45;

    const filteredMonthly = baseMonthly.map(item => ({
      ...item,
      totalRatings: Math.max(1, Math.round(item.totalRatings * combinedMult)),
      avgRating: ratingFilter !== 'ALL' ? effectiveAvg : item.avgRating
    }));

    const finalTotal = Math.round(baseTotal * combinedMult);

    // Distribution by Category
    let categoryData = [];
    if (selectedCategory === 'ALL') {
      categoryData = [
        { name: 'Temples & Heritage', count: Math.round(finalTotal * 0.38), percentage: 38, color: 'bg-blue-500' },
        { name: 'Palaces & Culture', count: Math.round(finalTotal * 0.23), percentage: 23, color: 'bg-purple-500' },
        { name: 'Beaches & Islands', count: Math.round(finalTotal * 0.18), percentage: 18, color: 'bg-cyan-500' },
        { name: 'Nature & Parks', count: Math.round(finalTotal * 0.14), percentage: 14, color: 'bg-emerald-500' },
        { name: 'Markets & Nightlife', count: Math.round(finalTotal * 0.07), percentage: 7, color: 'bg-amber-500' }
      ];
    } else if (selectedCategory === 'temples') {
      categoryData = [
        { name: 'Angkor Wat Complex', count: Math.round(finalTotal * 0.52), percentage: 52, color: 'bg-blue-500' },
        { name: 'Koh Ker Temple', count: Math.round(finalTotal * 0.28), percentage: 28, color: 'bg-cyan-500' },
        { name: 'Preah Vihear Temple', count: Math.round(finalTotal * 0.20), percentage: 20, color: 'bg-purple-500' }
      ];
    } else if (selectedCategory === 'palaces') {
      categoryData = [
        { name: 'Royal Palace Phnom Penh', count: Math.round(finalTotal * 0.58), percentage: 58, color: 'bg-purple-500' },
        { name: 'National Museum', count: Math.round(finalTotal * 0.42), percentage: 42, color: 'bg-blue-500' }
      ];
    } else if (selectedCategory === 'beaches') {
      categoryData = [
        { name: 'Koh Rong Sanloem', count: Math.round(finalTotal * 0.48), percentage: 48, color: 'bg-cyan-500' },
        { name: 'Otres & Ochheuteal', count: Math.round(finalTotal * 0.32), percentage: 32, color: 'bg-blue-500' },
        { name: 'Kep Beach & Crab Market', count: Math.round(finalTotal * 0.20), percentage: 20, color: 'bg-emerald-500' }
      ];
    } else if (selectedCategory === 'nature') {
      categoryData = [
        { name: 'Bokor National Park', count: Math.round(finalTotal * 0.44), percentage: 44, color: 'bg-emerald-500' },
        { name: 'Kulên Mountain Waterfall', count: Math.round(finalTotal * 0.36), percentage: 36, color: 'bg-cyan-500' },
        { name: 'Cardamom Mountains', count: Math.round(finalTotal * 0.20), percentage: 20, color: 'bg-purple-500' }
      ];
    } else {
      categoryData = [
        { name: 'Phnom Penh Night Market', count: Math.round(finalTotal * 0.60), percentage: 60, color: 'bg-amber-500' },
        { name: 'Pub Street Siem Reap', count: Math.round(finalTotal * 0.40), percentage: 40, color: 'bg-purple-500' }
      ];
    }

    // Rating Score Breakdown calculation
    let ratingDistribution = [];
    if (ratingFilter === '5') {
      ratingDistribution = [
        { stars: 5, count: finalTotal, percentage: 100 },
        { stars: 4, count: 0, percentage: 0 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 }
      ];
    } else if (ratingFilter === '4') {
      ratingDistribution = [
        { stars: 5, count: 0, percentage: 0 },
        { stars: 4, count: finalTotal, percentage: 100 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 }
      ];
    } else if (ratingFilter === 'positive') {
      ratingDistribution = [
        { stars: 5, count: Math.round(finalTotal * 0.66), percentage: 66 },
        { stars: 4, count: Math.round(finalTotal * 0.34), percentage: 34 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 }
      ];
    } else if (ratingFilter === 'critical') {
      ratingDistribution = [
        { stars: 5, count: 0, percentage: 0 },
        { stars: 4, count: 0, percentage: 0 },
        { stars: 3, count: Math.round(finalTotal * 0.60), percentage: 60 },
        { stars: 2, count: Math.round(finalTotal * 0.25), percentage: 25 },
        { stars: 1, count: Math.round(finalTotal * 0.15), percentage: 15 }
      ];
    } else {
      ratingDistribution = [
        { stars: 5, count: Math.round(finalTotal * 0.58), percentage: 58 },
        { stars: 4, count: Math.round(finalTotal * 0.30), percentage: 30 },
        { stars: 3, count: Math.round(finalTotal * 0.08), percentage: 8 },
        { stars: 2, count: Math.round(finalTotal * 0.03), percentage: 3 },
        { stars: 1, count: Math.round(finalTotal * 0.01), percentage: 1 }
      ];
    }

    const positiveCount = ratingDistribution
      .filter(r => r.stars >= 4)
      .reduce((sum, r) => sum + r.count, 0);

    const calculatedPositivePct = finalTotal > 0 ? Math.round((positiveCount / finalTotal) * 100) : 0;

    return {
      monthlyData: filteredMonthly,
      totalRatings: finalTotal,
      avgScore: effectiveAvg,
      growthText: baseGrowth,
      scoreChangeText: baseScoreChange,
      verificationPct: baseVerification,
      positivePct: calculatedPositivePct,
      categoryData,
      ratingDistribution
    };
  }, [timeframe, selectedCategory, ratingFilter]);

  if (!isOpen) return null;

  const isFilterActive = timeframe !== '2024' || selectedCategory !== 'ALL' || ratingFilter !== 'ALL';

  const handleResetSelections = () => {
    setTimeframe('2024');
    setSelectedCategory('ALL');
    setRatingFilter('ALL');
  };

  const getCategoryLabel = (val) => {
    switch (val) {
      case 'temples': return 'Temples & Heritage';
      case 'palaces': return 'Palaces & Culture';
      case 'beaches': return 'Beaches & Islands';
      case 'nature': return 'Nature & Parks';
      case 'nightlife': return 'Markets & Nightlife';
      default: return 'All Destination Categories';
    }
  };

  const getRatingFilterLabel = (val) => {
    switch (val) {
      case '5': return '5 Stars Only';
      case '4': return '4 Stars Only';
      case '3': return '3 Stars Only';
      case '2': return '2 Stars Only';
      case '1': return '1 Star Only';
      case 'positive': return 'Positive (4★ & 5★)';
      case 'critical': return 'Needs Review (1★ - 3★)';
      default: return 'All Ratings (1★ - 5★)';
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
                Ratings Analytics Overview
              </h2>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                Rating trends, score breakdown, and interactive tourist sentiment insights
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

            {/* Destination Category Select Option */}
            <div className="flex items-center bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-2 py-1 text-xs font-medium">
              <Layers className="w-3.5 h-3.5 mr-1.5 text-blue-500 shrink-0" />
              <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mr-1 hidden sm:inline">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] font-semibold"
              >
                <option value="ALL">All Categories</option>
                <option value="temples">Temples & Heritage</option>
                <option value="palaces">Palaces & Culture</option>
                <option value="beaches">Beaches & Islands</option>
                <option value="nature">Nature & Parks</option>
                <option value="nightlife">Markets & Nightlife</option>
              </select>
            </div>

            {/* Rating Star Score Filter Select Option */}
            <div className="flex items-center bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-2 py-1 text-xs font-medium">
              <Star className="w-3.5 h-3.5 mr-1.5 text-amber-500 fill-amber-500 shrink-0" />
              <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mr-1 hidden sm:inline">Score:</span>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] font-semibold"
              >
                <option value="ALL">All Star Ratings</option>
                <option value="5">5 Stars Only</option>
                <option value="4">4 Stars Only</option>
                <option value="3">3 Stars Only</option>
                <option value="2">2 Stars Only</option>
                <option value="1">1 Star Only</option>
                <option value="positive">Positive (4★ & 5★)</option>
                <option value="critical">Needs Review (1★ - 3★)</option>
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
                <span>Total Ratings Recorded</span>
                <MessageSquare className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                {analyticsData.totalRatings.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 text-xs text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] mt-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{analyticsData.growthText}</span>
              </div>
            </div>

            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                <span>Overall Rating Average</span>
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                {Number(analyticsData.avgScore).toFixed(2)} <span className="text-xs font-normal text-gray-500">/ 5.0</span>
              </p>
              <div className="flex items-center gap-1 text-xs text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] mt-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{analyticsData.scoreChangeText}</span>
              </div>
            </div>

            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                <span>Satisfaction Score</span>
                <ThumbsUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                {analyticsData.positivePct}%
              </p>
              <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                <span>4★ & 5★ ratings ratio</span>
              </div>
            </div>

            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                <span>Verification Index</span>
                <Award className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                {analyticsData.verificationPct}%
              </p>
              <div className="flex items-center gap-1 text-xs text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] mt-1 font-medium">
                <span>Verified visitor reviews</span>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-base">
                  Ratings Growth & Score Trajectory
                </h3>
                <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">
                  Showing data focus for <span className="font-semibold text-[var(--color-primary)]">{getCategoryLabel(selectedCategory)}</span> | <span className="font-semibold">{getRatingFilterLabel(ratingFilter)}</span> ({timeframe})
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-xs bg-[#4472C4]"></div>
                  <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">Ratings Count</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-[#ED7D31]"></div>
                  <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">Avg Score Trend</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={analyticsData.monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#D1D5DB' }} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#ED7D31' }} axisLine={false} tickLine={false} domain={[1, 5]} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 12 }} />
                  <Bar yAxisId="left" dataKey="totalRatings" name="Total Ratings" fill="#4472C4" barSize={18} radius={[4, 4, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgRating"
                    name="Avg Rating Score"
                    stroke="#ED7D31"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#ED7D31' }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Category Breakdown */}
            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5">
              <h3 className="font-semibold text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">
                Ratings Distribution ({getCategoryLabel(selectedCategory)})
              </h3>
              <div className="space-y-3.5">
                {analyticsData.categoryData.map((cat, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs mb-1 font-medium">
                      <span className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{cat.name}</span>
                      <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                        {cat.count.toLocaleString()} ratings ({cat.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Stars Distribution */}
            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5">
              <h3 className="font-semibold text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">
                Rating Score Breakdown ({getRatingFilterLabel(ratingFilter)})
              </h3>
              <div className="space-y-2.5">
                {analyticsData.ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12 shrink-0 text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                      <span>{item.stars}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] w-14 text-right shrink-0">
                      {item.count.toLocaleString()} ({item.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)]/30 dark:bg-[var(--color-input-dark-bg)]/30 flex items-center justify-between">
          <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
            Viewing: <span className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{getCategoryLabel(selectedCategory)}</span> | <span className="font-semibold">{timeframe}</span> | <span className="font-semibold">{getRatingFilterLabel(ratingFilter)}</span>
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
