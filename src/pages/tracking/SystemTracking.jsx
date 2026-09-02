import React, { useState, useEffect } from 'react';
import { Users, RefreshCw, Search, Clock, UserCheck, ShieldCheck } from 'lucide-react';
import trackingService from '../../services/trackingService';
import { getRoleColor, formatRoleLabel } from '../../utils/StatusUtils';

export default function SystemTracking() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchTracking = async () => {
    setLoading(true);
    try {
      const params = {};
      if (roleFilter) params.role = roleFilter;
      if (search) params.search = search;

      const res = await trackingService.getTelemetry(params);
      setData(res.data?.data || res.data || res || null);
    } catch (err) {
      console.error('Failed to fetch system tracking telemetry', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracking();
  }, [roleFilter]);

  const defaultRoleBreakdown = {
    business_owner: { role: 'Business Owner', total_users: 0, online_users: 0 },
    guide_editor: { role: 'Guide / Editor', total_users: 0, online_users: 0 },
    user: { role: 'Tourist (User)', total_users: 0, online_users: 0 },
    admin: { role: 'Admin & Super Admin', total_users: 0, online_users: 0 }
  };

  const roleBreakdown = data?.role_breakdown || defaultRoleBreakdown;
  const usersList = data?.users || [];
  const activitiesList = data?.activities || [];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
              System Live Tracking & Telemetry
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1 flex items-center gap-2 flex-wrap">
              <span>Real-time user status, online presence, and operational telemetry directly from the database</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full font-medium border border-emerald-200 dark:border-emerald-800 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Stream
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={fetchTracking}
              className="p-2.5 sm:px-3 sm:py-2 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh tracking stream"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Stream</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role Breakdown Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {Object.entries(roleBreakdown).map(([key, rb]) => (
          <div
            key={key}
            className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg p-4 shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium truncate uppercase">
                  {rb.role || key}
                </p>
                <p className="text-lg md:text-xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1 tracking-tight">
                  {rb.total_users || 0} Registered
                </p>
              </div>
              <div className="p-2 rounded-md shrink-0 bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[#003E83] dark:text-blue-400">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {rb.online_users || 0} Active Now
            </p>
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="space-y-6">
        {/* Real Registered DB Accounts Table Section */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden">
          {/* Toolbar */}
          <div className="px-4 sm:px-6 py-4 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Role Filters */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { label: 'All Roles', value: '' },
                  { label: 'Business Owner', value: 'business_owner' },
                  { label: 'Guide / Editor', value: 'guide_editor' },
                  { label: 'Tourist', value: 'user' },
                  { label: 'Admin', value: 'admin' },
                ].map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setRoleFilter(r.value)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      roleFilter === r.value
                        ? 'bg-[#003E83] text-white'
                        : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]" />
                <input
                  type="text"
                  placeholder="Search user name, email or IP..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchTracking()}
                  className="pl-9 pr-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent w-full text-xs bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
                />
              </div>
            </div>
          </div>

          {/* Section Sub-Header */}
          <div className="px-4 sm:px-6 py-3 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-surface-hover-dark)]/50 flex justify-between items-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#003E83] dark:text-blue-400" />
              Real Registered DB Accounts & Live Status
            </h2>
            <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
              Showing {usersList.length} registered DB users
            </span>
          </div>

          {/* Table View */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--color-border-light)] dark:divide-[var(--color-border-dark)]">
              <thead className="bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-surface-hover-dark)]/50">
                <tr>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider whitespace-nowrap">
                    USER NAME
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider whitespace-nowrap">
                    ROLE
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider whitespace-nowrap">
                    EMAIL & LOCATION
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider whitespace-nowrap">
                    LIVE STATUS
                  </th>
                  <th className="px-4 py-3.5 text-right text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider whitespace-nowrap">
                    LAST ACTIVE
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] divide-y divide-[var(--color-border-light)] dark:divide-[var(--color-border-dark)]">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-[var(--color-text-muted-light)]">
                      <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#003E83]" />
                      Fetching registered DB accounts...
                    </td>
                  </tr>
                ) : usersList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
                      No registered users found.
                    </td>
                  </tr>
                ) : (
                  usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors">
                      <td className="px-4 py-3.5 text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] border border-slate-200 dark:border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden text-[#003E83] dark:text-blue-400 font-bold">
                            {u.avatar ? (
                              <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                            ) : (
                              u.name.charAt(0)
                            )}
                          </div>
                          <div>
                            <div>{u.name}</div>
                            <div className="text-[11px] font-normal text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">ID #{u.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getRoleColor(u.role)}`}>
                          {formatRoleLabel(u.role)}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        <div className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{u.email}</div>
                        <div className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">{u.location || 'Cambodia'} • {u.phone || 'No phone'}</div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {u.is_online ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Online Now
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400">
                            Offline
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right font-medium text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] whitespace-nowrap">
                        {u.last_active}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-Time Audit Trail Events Table */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden">
          <div className="px-4 sm:px-6 py-3 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-surface-hover-dark)]/50 flex justify-between items-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#003E83] dark:text-blue-400" />
              Real-Time Audit Trail Events
            </h2>
            <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
              Showing operational logs
            </span>
          </div>

          <div className="divide-y divide-[var(--color-border-light)] dark:divide-[var(--color-border-dark)] text-xs">
            {loading ? (
              <div className="p-8 text-center text-[var(--color-text-muted-light)]">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#003E83]" />
                Loading real-time operational events...
              </div>
            ) : activitiesList.length === 0 ? (
              <div className="p-8 text-center text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
                No activity records found matching filters.
              </div>
            ) : (
              activitiesList.map((log) => (
                <div key={log.id} className="p-4 flex items-center justify-between hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[#003E83] dark:text-blue-400 flex items-center justify-center shrink-0 font-bold uppercase">
                      {log.user_name ? log.user_name.charAt(0) : 'S'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{log.user_name || 'System User'}</span>
                        <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] capitalize border border-[var(--color-neutral-badge-border)]">
                          {log.user_role}
                        </span>
                      </div>
                      <p className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] text-xs mt-0.5 truncate">{log.description}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] text-xs font-mono">
                    <div>{log.ip_address}</div>
                    <div className="text-[10px]">{new Date(log.created_at).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
