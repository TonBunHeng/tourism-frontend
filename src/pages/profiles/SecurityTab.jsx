import { Eye, EyeOff } from 'lucide-react';

export default function SecurityTab({
  userData,
  setUserData,
  showPassword,
  setShowPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) {
  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md p-4 md:p-5 shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
        <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">Password Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-[var(--color-primary)] text-[var(--color-white)] rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors text-sm">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md p-4 md:p-5 shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
        <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between gap-4 p-4 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
          <div className="min-w-0">
            <p className="font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">2FA Status</p>
            <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Add an extra layer of security to your account</p>
          </div>
          <button
            type="button"
            onClick={() => setUserData({ ...userData, twoFactorAuth: !userData.twoFactorAuth })}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
              userData.twoFactorAuth ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-subtle-light)] dark:bg-[var(--color-surface-hover-dark)]'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-white)] transition-transform ${
                userData.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md p-4 md:p-5 shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
        <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 p-3 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Current Session</p>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Chrome • Phnom Penh, Cambodia</p>
              <p className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">Last active: 2 minutes ago</p>
            </div>
            <span className="text-xs px-2 py-0.5 bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] rounded-full flex-shrink-0">Active</span>
          </div>
          <div className="flex items-center justify-between gap-4 p-3 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Mobile Session</p>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Safari • Siem Reap, Cambodia</p>
              <p className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">Last active: 2 days ago</p>
            </div>
            <button className="text-xs text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:text-[var(--color-danger-text)]/80 font-medium flex-shrink-0">Revoke</button>
          </div>
        </div>
      </div>
    </div>
  );
}
