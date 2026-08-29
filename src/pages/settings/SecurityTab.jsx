import { useState } from 'react';
import {
  Shield,
  Key,
  Eye,
  EyeOff,
  Smartphone,
  Clock,
  AlertTriangle,
  CheckCircle2,
  X
} from 'lucide-react';

export default function SecurityTab({ settings, setSettings }) {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passStatus, setPassStatus] = useState(null);
  const [show2FAModal, setShow2FAModal] = useState(false);

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setPassStatus({ type: 'error', message: 'Please fill in all password fields.' });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPassStatus({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }
    if (passwords.newPassword.length < 8) {
      setPassStatus({ type: 'error', message: 'New password must be at least 8 characters long.' });
      return;
    }

    setPassStatus({ type: 'success', message: 'Password changed successfully!' });
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPassStatus(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
          Security Settings
        </h2>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
          Manage password credentials, two-factor authentication, session lifecycle, active devices, and security policies.
        </p>
      </div>

      {/* Card 1: Change Password */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Key className="w-4 h-4 text-[var(--color-primary)]" />
          Change Password
        </h3>

        {passStatus && (
          <div
            className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              passStatus.type === 'success'
                ? 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] border border-[var(--color-success-border)] dark:border-[var(--color-success-dark-border)]'
                : 'bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)] text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] border border-[var(--color-danger-border)] dark:border-[var(--color-danger-dark-border)]'
            }`}
          >
            {passStatus.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{passStatus.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPass ? 'text' : 'password'}
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-3 pr-9 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
              >
                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPass ? 'text' : 'password'}
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                placeholder="Min 8 characters"
                className="w-full pl-3 pr-9 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
              >
                {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? 'text' : 'password'}
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                placeholder="Re-enter new password"
                className="w-full pl-3 pr-9 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
              >
                {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handlePasswordChange}
            className="flex items-center justify-center gap-1.5 md:gap-2 px-4 py-2 bg-[#003E83] hover:bg-[#002e62] text-white text-xs md:text-sm font-medium rounded-md border border-transparent transition-colors cursor-pointer"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Card 2: Two-Factor Authentication (2FA) */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Smartphone className="w-4 h-4 text-[var(--color-primary)]" />
          Two-Factor Authentication (2FA)
        </h3>

        <div className="flex items-center justify-between p-3.5 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                  Authenticator App (TOTP)
                </span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    settings.twoFactorAuth
                      ? 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]'
                      : 'bg-[var(--color-neutral-badge-bg)] dark:bg-[var(--color-neutral-badge-dark-bg)] text-[var(--color-neutral-badge-text)] dark:text-[var(--color-neutral-badge-dark-text)]'
                  }`}
                >
                  {settings.twoFactorAuth ? 'Active & Protected' : 'Disabled'}
                </span>
              </div>
              <span className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                Add an extra layer of security requiring a one-time verification code from Google Authenticator or Authy.
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {settings.twoFactorAuth && (
              <button
                type="button"
                onClick={() => setShow2FAModal(true)}
                className="text-xs font-medium text-[var(--color-primary)] hover:underline"
              >
                View QR Code
              </button>
            )}
            <button
              type="button"
              onClick={() => handleChange('twoFactorAuth', !settings.twoFactorAuth)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.twoFactorAuth ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-subtle-light)] dark:bg-[var(--color-surface-hover-dark)]'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-white)] transition-transform ${
                  settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Session & Password Policies */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Clock className="w-4 h-4 text-[var(--color-primary)]" />
          Session & Password Policies
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Session Timeout
            </label>
            <select
              value={settings.sessionTimeout || '30'}
              onChange={(e) => handleChange('sessionTimeout', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            >
              <option value="15">15 Minutes of inactivity</option>
              <option value="30">30 Minutes of inactivity</option>
              <option value="60">1 Hour of inactivity</option>
              <option value="240">4 Hours of inactivity</option>
              <option value="480">8 Hours (Full Shift)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Password Policy Level
            </label>
            <select
              value={settings.passwordPolicy || 'strong'}
              onChange={(e) => handleChange('passwordPolicy', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            >
              <option value="standard">Standard (8+ characters)</option>
              <option value="strong">Strong (8+ chars, numbers & symbols)</option>
              <option value="strict">Strict (12+ chars, mixed case, symbols)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Login Attempt Limit (Brute Force Protection)
            </label>
            <select
              value={settings.loginAttempts || '5'}
              onChange={(e) => handleChange('loginAttempts', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            >
              <option value="3">3 Attempts (Strict lockout)</option>
              <option value="5">5 Attempts (Recommended)</option>
              <option value="10">10 Attempts (Relaxed)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Card 4: Active Login Sessions */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Shield className="w-4 h-4 text-[var(--color-primary)]" />
          Active Login Sessions
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 p-3 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Current Session (Chrome)</p>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Chrome • Phnom Penh, Cambodia</p>
              <p className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">Last active: 2 minutes ago</p>
            </div>
            <span className="text-xs px-2 py-0.5 bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] rounded-full flex-shrink-0 font-medium">Active Now</span>
          </div>

          <div className="flex items-center justify-between gap-4 p-3 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Mobile Session (Safari)</p>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Safari • Siem Reap, Cambodia</p>
              <p className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">Last active: 2 days ago</p>
            </div>
            <button className="text-xs text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:underline font-medium flex-shrink-0">Revoke</button>
          </div>
        </div>
      </div>

      {/* 2FA QR Code Setup Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-150">
          <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] rounded-lg p-6 max-w-sm w-full border border-gray-200 dark:border-zinc-800 shadow-lg space-y-4 text-center">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-zinc-800">
              <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#003E83] dark:text-blue-400" /> Two-Factor Authentication
              </h4>
              <button
                onClick={() => setShow2FAModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-zinc-400 text-left">
              To pair an authenticator app (Google Authenticator, Microsoft Authenticator), verify your email and follow the on-screen setup.
            </p>

            <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded border border-gray-200 dark:border-zinc-700 text-xs text-gray-700 dark:text-zinc-300 text-left space-y-2">
              <p className="font-medium text-gray-900 dark:text-zinc-100">Status: Enforced by Administrator</p>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                When enabled, secondary OTP verification is requested upon sign in. Ensure your mobile authenticator is kept up to date.
              </p>
            </div>

            <button
              onClick={() => setShow2FAModal(false)}
              className="w-full py-2 bg-[#003E83] hover:bg-[#002e62] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
