export default function ProfileStats({ userStats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {userStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-3 md:p-4 shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium truncate">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-0.5">{stat.value}</p>
              </div>
              <div className={`p-2 md:p-2.5 rounded-lg flex-shrink-0 ${stat.bg}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
