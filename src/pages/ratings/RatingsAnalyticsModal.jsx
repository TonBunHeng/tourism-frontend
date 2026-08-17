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
  Layers
} from 'lucide-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RatingsAnalyticsModal({ isOpen, onClose, reviews = [] }) {
  const [timeframe, setTimeframe] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [ratingFilter, setRatingFilter] = useState('ALL');

  // Compute analytics dynamically based on real reviews prop
  const analyticsData = useMemo(() => {
    const safeReviews = reviews || [];
    const total = safeReviews.length;

    if (total === 0) {
      return {
        monthlyData: [],
        totalRatings: 0,
        avgScore: 0.0,
        growthText: '0.0% volume growth',
        scoreChangeText: '0.00 score increase',
        verificationPct: 0.0,
        positivePct: 0,
        categoryData: [],
        ratingDistribution: [
          { stars: 5, count: 0, percentage: 0 },
          { stars: 4, count: 0, percentage: 0 },
          { stars: 3, count: 0, percentage: 0 },
          { stars: 2, count: 0, percentage: 0 },
          { stars: 1, count: 0, percentage: 0 }
        ]
      };
    }

    const avg = (safeReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / total);
    const count5 = safeReviews.filter(r => r.rating === 5).length;
    const count4 = safeReviews.filter(r => r.rating === 4).length;
    const count3 = safeReviews.filter(r => r.rating === 3).length;
    const count2 = safeReviews.filter(r => r.rating === 2).length;
    const count1 = safeReviews.filter(r => r.rating === 1).length;

    const positiveCount = count5 + count4;
    const posPct = Math.round((positiveCount / total) * 100);

    return {
      monthlyData: [
        { month: 'Jan', totalRatings: total, avgRating: avg.toFixed(1) }
      ],
      totalRatings: total,
      avgScore: avg.toFixed(1),
      growthText: '+0.0% volume growth',
      scoreChangeText: '+0.00 score increase',
      verificationPct: 100.0,
      positivePct: posPct,
      categoryData: [],
      ratingDistribution: [
        { stars: 5, count: count5, percentage: Math.round((count5 / total) * 100) },
        { stars: 4, count: count4, percentage: Math.round((count4 / total) * 100) },
        { stars: 3, count: count3, percentage: Math.round((count3 / total) * 100) },
        { stars: 2, count: count2, percentage: Math.round((count2 / total) * 100) },
        { stars: 1, count: count1, percentage: Math.round((count1 / total) * 100) }
      ]
    };
  }, [reviews, timeframe, selectedCategory, ratingFilter]);

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
                        className="h-full bg-[var(--color-warning-text)] rounded-full transition-all duration-500"
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
