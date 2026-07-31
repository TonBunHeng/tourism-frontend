export default function SettingsTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-bg-dark-modal)]/50 flex-shrink-0">
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible p-3 md:p-4 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3.5 md:px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] shadow-sm'
                  : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-neutral-badge-bg)] dark:hover:bg-[var(--color-surface-hover-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)]'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
