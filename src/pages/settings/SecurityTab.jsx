import { useState } from 'react';
import {
  Shield,
  Clock,
  Smartphone,
  X,
  ShieldCheck,
  Monitor
} from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

export default function SecurityTab({ settings, setSettings }) {
  const { showSuccess, showConfirm } = useAlert();
  const [show2FAModal, setShow2FAModal] = useState(false);

  // Active Sessions State
  const [sessions, setSessions] = useState([
    {
      id: 'sess_1',
      device: 'MacBook Pro (Chrome 128.0)',
      location: 'Phnom Penh, Cambodia',
      ip: '103.24.58.12',
      isCurrent: true,
      lastActive: 'Active Now'
    },
    {
      id: 'sess_2',
      device: 'iPad Air (Safari iOS 18)',
      location: 'Siem Reap, Cambodia',
      ip: '119.82.251.44',
      isCurrent: false,
      lastActive: '2 hours ago'
    }
  ]);

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRevokeSession = async (sessionId) => {
    const confirmed = await showConfirm({
      title: 'Revoke Administrator Session',
      message: 'Are you sure you want to terminate this remote session? The user will be immediately logged out.',
      confirmText: 'Revoke Session',
      type: 'danger'
    });

    if (confirmed) {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      showSuccess('Remote session revoked successfully.', 'Session Terminated');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
          Security & Access Policies
        </h2>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
          Enforce authentication standards, session expiration timers, brute force protection, and monitor active sessions.
        </p>
      </div>

      {/* Card 1: Two-Factor Authentication (2FA) */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-primary)] rounded-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                Two-Factor Authentication (2FA) Enforcement
              </h3>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">
                Mandate one-time TOTP security codes for all administrative accounts upon login.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={Boolean(settings.twoFactorAuth)}
              onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
            Policy status: <strong className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{settings.twoFactorAuth ? 'Required for all Admins' : 'Optional'}</strong>
          </span>
          <button
            type="button"
            onClick={() => setShow2FAModal(true)}
            className="text-xs font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
          >
            View 2FA Setup Guidelines
          </button>
        </div>
      </div>

      {/* Card 2: Session & Password Policies */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Clock className="w-4 h-4 text-[var(--color-primary)]" />
          Session & Password Policies
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Admin Session Timeout
            </label>
            <select
              value={settings.sessionTimeout || '30'}
              onChange={(e) => handleChange('sessionTimeout', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            >
              <option value="15">15 Minutes (High Security)</option>
              <option value="30">30 Minutes (Recommended)</option>
              <option value="60">1 Hour</option>
              <option value="240">4 Hours</option>
              <option value="480">8 Hours (Full Shift)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Password Complexity Level
            </label>
            <select
              value={settings.passwordPolicy || 'strong'}
              onChange={(e) => handleChange('passwordPolicy', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            >
              <option value="standard">Standard (8+ characters)</option>
              <option value="strong">Strong (8+ chars, numbers & symbols)</option>
              <option value="strict">Strict (12+ chars, mixed cases, special chars)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Max Failed Logins (Lockout)
            </label>
            <select
              value={settings.loginAttempts || '5'}
              onChange={(e) => handleChange('loginAttempts', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            >
              <option value="3">3 Attempts (Strict Protection)</option>
              <option value="5">5 Attempts (Standard)</option>
              <option value="10">10 Attempts (Relaxed)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Card 3: Active Administrator Sessions */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Shield className="w-4 h-4 text-[var(--color-primary)]" />
          Active Administrator Sessions
        </h3>

        <div className="space-y-3">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="flex items-center justify-between gap-4 p-3.5 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
                  <Monitor className="w-4 h-4 text-[var(--color-primary)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2">
                    {sess.device}
                    {sess.isCurrent && (
                      <span className="text-[10px] px-2 py-0.5 bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] rounded-full font-bold">
                        Current Session
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">
                    {sess.location} • <span className="font-mono">{sess.ip}</span> • Last active: {sess.lastActive}
                  </p>
                </div>
              </div>

              {!sess.isCurrent && (
                <button
                  type="button"
                  onClick={() => handleRevokeSession(sess.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-md transition-colors cursor-pointer shrink-0"
                >
                  Revoke Access
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2FA Guide Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-150">
          <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] rounded-lg p-6 max-w-md w-full border border-gray-200 dark:border-zinc-800 shadow-lg space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-zinc-800">
              <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#003E83]" /> Two-Factor Authentication Setup
              </h4>
              <button
                onClick={() => setShow2FAModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">
              When 2FA Enforcement is turned on, administrators must scan a QR code using standard authenticator apps (Google Authenticator, Microsoft Authenticator, or 1Password) upon logging in.
            </p>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 space-y-1">
              <p className="font-semibold">Security Tip:</p>
              <p className="text-[11px] leading-relaxed">
                Ensure emergency backup codes are stored securely in case an administrator device is lost or replaced.
              </p>
            </div>

            <button
              onClick={() => setShow2FAModal(false)}
              className="w-full py-2 bg-[#003E83] hover:bg-[#002e62] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
