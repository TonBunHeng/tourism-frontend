import { useState } from 'react';
import { X, TrendingUp, FileText, Clock, BarChart2, Calendar, Award, ShieldCheck, UserX } from 'lucide-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DeletionAnalyticsModal({ isOpen, onClose, requests = [] }) {
  const [timeframe, setTimeframe] = useState('2024');

  if (!isOpen) return null;

  // Monthly deletion requests received versus resolved requests trend
  const monthlyDeletionData = [
    { month: 'Jan', requestsReceived: 24, requestsResolved: 22 },
    { month: 'Feb', requestsReceived: 35, requestsResolved: 31 },
    { month: 'Mar', requestsReceived: 48, requestsResolved: 45 },
    { month: 'Apr', requestsReceived: 56, requestsResolved: 52 },
    { month: 'May', requestsReceived: 68, requestsResolved: 63 },
    { month: 'Jun', requestsReceived: 82, requestsResolved: 79 },
    { month: 'Jul', requestsReceived: 95, requestsResolved: 90 },
    { month: 'Aug', requestsReceived: 110, requestsResolved: 104 },
    { month: 'Sep', requestsReceived: 102, requestsResolved: 98 },
    { month: 'Oct', requestsReceived: 125, requestsResolved: 118 },
    { month: 'Nov', requestsReceived: 140, requestsResolved: 135 },
    { month: 'Dec', requestsReceived: 165, requestsResolved: 158 },
  ];

  // Distribution by request type
  const typeDistribution = [
    { name: 'Account Deletions', count: 265, percentage: 62, color: 'bg-rose-500' },
    { name: 'Item / Listing Removals', count: 108, percentage: 25, color: 'bg-amber-500' },
    { name: 'Media & Photo Deletions', count: 34, percentage: 8, color: 'bg-purple-500' },
    { name: 'Review & Comment Removals', count: 21, percentage: 5, color: 'bg-blue-500' },
  ];

  // Request Status Breakdown
  const totalCount = requests.length || 428;
  const approvedCount = requests.filter(r => r.status === 'approved').length || 316;
  const pendingCount = requests.filter(r => r.status === 'pending').length || 78;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length || 34;

  const statusBreakdown = [
    {
      label: 'Approved & Permanently Deleted',
      count: approvedCount,
      percentage: Math.round((approvedCount / totalCount) * 100),
      color: 'bg-emerald-500'
    },
    {
      label: 'Pending Admin Review',
      count: pendingCount,
      percentage: Math.round((pendingCount / totalCount) * 100),
      color: 'bg-amber-500'
    },
    {
      label: 'Rejected or Cancelled Requests',
      count: rejectedCount,
      percentage: Math.round((rejectedCount / totalCount) * 100),
      color: 'bg-rose-500'
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex items-center justify-between bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-input-dark-bg)]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
                Deletion Requests Analytics Overview
              </h2>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                Deletion volume trends, request categories, SLA response times, and compliance metrics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg p-1 text-xs font-medium">
              <Calendar className="w-3.5 h-3.5 ml-2 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-transparent px-2 py-1 outline-none cursor-pointer text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              >
                <option value="2024">Year 2024</option>
                <option value="6M">Last 6 Months</option>
                <option value="30D">Last 30 Days</option>
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-hide">

          {/* Key Metric Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                <span>Total Requests Received</span>
                <FileText className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                {totalCount}
              </p>
              <div className="flex items-center gap-1 text-xs text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] mt-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+14.2% volume growth</span>
              </div>
            </div>

            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                <span>Account Deletions</span>
                <UserX className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                265
              </p>
              <div className="flex items-center gap-1 text-xs text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] mt-1 font-medium">
                <span>62% of total requests</span>
              </div>
            </div>

            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                <span>Avg. Resolution Time</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                1.8 Days
              </p>
              <div className="flex items-center gap-1 text-xs text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] mt-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>-24% faster resolution</span>
              </div>
            </div>

            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                <span>Privacy SLA Compliance</span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                99.4%
              </p>
              <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                <Award className="w-3.5 h-3.5 inline mr-0.5" />
                <span>Full GDPR / CCPA standard</span>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-base">
                  Deletion Requests & Resolution Activity Trend
                </h3>
                <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">
                  Monthly incoming deletion requests versus resolved/processed requests over time
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-xs bg-[#E11D48]"></div>
                  <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">Requests Received</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-[#10B981]"></div>
                  <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">Requests Resolved</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyDeletionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#D1D5DB' }} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} domain={[0, 200]} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#10B981' }} axisLine={false} tickLine={false} domain={[0, 200]} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 12 }}
                  />
                  <Bar yAxisId="left" dataKey="requestsReceived" name="Requests Received" fill="#E11D48" barSize={18} radius={[4, 4, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="requestsResolved"
                    name="Requests Resolved"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#10B981' }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown Section: Type Distribution & Status Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Type Distribution */}
            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5">
              <h3 className="font-semibold text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">
                Deletion Request Type Distribution
              </h3>
              <div className="space-y-3.5">
                {typeDistribution.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs mb-1 font-medium">
                      <span className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{item.name}</span>
                      <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                        {item.count} requests ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5">
              <h3 className="font-semibold text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">
                Deletion Fulfillment & Status Breakdown
              </h3>
              <div className="space-y-4">
                {statusBreakdown.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                      <span className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{item.label}</span>
                      <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-bold">
                        {item.count} items ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
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
        <div className="px-6 py-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)]/30 dark:bg-[var(--color-input-dark-bg)]/30 flex justify-end">
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
