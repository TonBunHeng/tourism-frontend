import { X, Send } from 'lucide-react';

export default function ReviewReplyModal({
  isOpen,
  review,
  onClose,
  replyText = '',
  setReplyText,
  onReplyTextChange,
  onSubmit,
  onSendReply
}) {
  if (!isOpen || !review) return null;

  const userName = typeof review.user === 'object' ? (review.user?.name || review.user_name || 'Traveler') : (review.user_name || review.user || 'Traveler');
  const reviewComment = review.comment || '';

  const handleTextChange = (val) => {
    if (onReplyTextChange) onReplyTextChange(val);
    if (setReplyText) setReplyText(val);
  };

  const handleFormSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    } else if (onSendReply) {
      onSendReply(review.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-xl max-w-lg w-full shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-wide">Reply to Review</h3>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Direct response to traveler</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="p-3.5 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <p className="text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                Review by <span className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] font-bold">{userName}</span>
              </p>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] line-clamp-3 leading-relaxed">
                "{reviewComment}"
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">
                Your Official Reply
              </label>
              <textarea
                value={replyText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Write your response as Admin..."
                rows="4"
                required
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-surface-hover-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent resize-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] font-medium text-xs sm:text-sm transition-colors text-center cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="flex-1 py-2.5 px-4 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-[var(--color-white)] font-semibold text-xs sm:text-sm transition-colors shadow-lg shadow-[var(--color-primary)]/25 text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Send Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
