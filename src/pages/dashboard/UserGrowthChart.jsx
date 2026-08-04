import { ArrowUpRight } from 'lucide-react';

export default function UserGrowthChart() {
  const userGrowth = [
    { month: 'Jan', users: 320 },
    { month: 'Feb', users: 480 },
    { month: 'Mar', users: 710 },
    { month: 'Apr', users: 980 },
    { month: 'May', users: 1360 },
    { month: 'Jun', users: 1820 },
    { month: 'Jul', users: 2410 },
    { month: 'Aug', users: 3150 },
    { month: 'Sep', users: 3890 },
    { month: 'Oct', users: 4620 },
    { month: 'Nov', users: 5380 },
    { month: 'Dec', users: 6210 }
  ];

  return (
    <div className="lg:col-span-2 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-2xl shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">User Growth</h3>
          <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Monthly active users</p>
        </div>
        <button className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium flex items-center gap-1">
          <span>View Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      <div className="h-48 flex items-end gap-2">
        {userGrowth.map((item, index) => {
          const maxValue = Math.max(...userGrowth.map(d => d.users));
          const height = (item.users / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-lg transition-all duration-500"
                style={{ height: `${height}%`, minHeight: '20px' }}
              >
                <div className="opacity-0 hover:opacity-100 transition-opacity text-center text-[var(--color-white)] text-xs font-medium pt-1">
                  {item.users}
                </div>
              </div>
              <span className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
