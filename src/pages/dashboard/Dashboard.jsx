import { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import UserGrowthChart from './UserGrowthChart';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import TopPlaces from './TopPlaces';
import CategoryDistribution from './CategoryDistribution';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('weekly');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <DashboardHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        isLoading={isLoading}
        onRefresh={handleRefresh}
      />

      {/* Stats Cards Rows 1 and 2 */}
      <DashboardStats />

      {/* Charts and Quick Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Growth Chart */}
        <UserGrowthChart />

        {/* Quick Actions Grid */}
        <QuickActions />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <RecentActivity />

        {/* Top Places */}
        <TopPlaces />

        {/* Category Distribution & User Status Summary */}
        <CategoryDistribution />
      </div>
    </div>
  );
}