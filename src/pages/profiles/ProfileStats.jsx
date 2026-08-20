export default function ProfileStats({ userStats = [] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {userStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium truncate">
                  {stat.label}
                </p>
                <p className="text-xl md:text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1 tracking-tight">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2.5 md:p-3 rounded-lg shrink-0 ${stat.bg}`}>
                <Icon className={`w-5 h-5 md:w-5 md:h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] mt-2">
              {stat.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
