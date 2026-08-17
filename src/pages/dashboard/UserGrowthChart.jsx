import { User } from 'lucide-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SalesChart() {
  const salesData = [
    { month: 'Jan', unitsSold: 0, totalTransaction: 0 },
    { month: 'Feb', unitsSold: 0, totalTransaction: 0 },
    { month: 'Mar', unitsSold: 0, totalTransaction: 0 },
    { month: 'Apr', unitsSold: 0, totalTransaction: 0 },
    { month: 'May', unitsSold: 0, totalTransaction: 0 },
    { month: 'Jun', unitsSold: 0, totalTransaction: 0 },
    { month: 'Jul', unitsSold: 0, totalTransaction: 0 },
    { month: 'Aug', unitsSold: 0, totalTransaction: 0 },
    { month: 'Sep', unitsSold: 0, totalTransaction: 0 },
    { month: 'Oct', unitsSold: 0, totalTransaction: 0 },
    { month: 'Nov', unitsSold: 0, totalTransaction: 0 },
    { month: 'Dec', unitsSold: 0, totalTransaction: 0 },
  ];

  return (
    <div className="lg:col-span-2 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">User Growth Overview</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="View profile"
            className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex items-center justify-center hover:bg-[var(--color-primary)]/20 transition-colors"
          >
            <User className="w-4 h-4 text-[var(--color-primary)]" />
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={salesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#D1D5DB' }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} domain={[0, 8000]} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 12 }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="plainline"
              wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            />
            <Bar dataKey="unitsSold" name="Units Sold" fill="#4472C4" barSize={16} radius={[2, 2, 0, 0]} />
            <Line
              type="linear"
              dataKey="totalTransaction"
              name="Total Transaction"
              stroke="#ED7D31"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}