import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle, ShieldAlert, Check } from 'lucide-react';

export default function BusinessReasonModal({
  isOpen,
  onClose,
  onSubmit,
  title = 'Provide Reason',
  subtitle = '',
  actionType = 'reject', // 'reject' | 'suspend'
  businessName = ''
}) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setReason(
        actionType === 'reject'
          ? 'Documentation requirements incomplete or invalid license verification details provided.'
          : 'Profile flagged for review due to policy non-compliance.'
      );
      setError('');
    }
  }, [isOpen, actionType]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError('Please enter a valid explanation reason before continuing.');
      return;
    }
    onSubmit(reason.trim());
    onClose();
  };

  const isReject = actionType === 'reject';

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-alert-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-gray-200 dark:border-zinc-800 animate-alert-popup overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            isReject
              ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
          }`}>
            {isReject ? <AlertTriangle className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              {subtitle || `Action targeting "${businessName}"`}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
              {isReject ? 'Rejection Reason' : 'Suspension Justification'} <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter explanation details for the business owner..."
              className="w-full p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            />
            {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
          </div>

          <div className="bg-gray-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-gray-100 dark:border-zinc-800 text-[11px] text-gray-500 dark:text-zinc-400">
            <span className="font-semibold text-gray-700 dark:text-zinc-300">Note: </span>
            This message will be sent to the business owner&apos;s registered email address and updated in administrative audit logs.
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2.5 text-white font-semibold rounded-xl shadow-sm transition-all text-xs cursor-pointer flex items-center justify-center gap-1.5 ${
                isReject
                  ? 'bg-red-600 hover:bg-red-700 active:scale-[0.98]'
                  : 'bg-amber-600 hover:bg-amber-700 active:scale-[0.98]'
              }`}
            >
              <Check size={16} />
              Confirm {isReject ? 'Rejection' : 'Suspension'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
