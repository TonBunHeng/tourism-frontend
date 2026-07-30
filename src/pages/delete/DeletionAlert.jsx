import { AlertTriangle } from 'lucide-react';

export default function DeletionAlert({ requests }) {
  const criticalCount = requests.filter(r => r.urgency === 'critical' && r.status === 'pending').length;

  if (criticalCount === 0) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6 md:mb-8 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-red-700 dark:text-red-400">
          {criticalCount} Critical Request(s) Need Immediate Attention
        </p>
        <p className="text-xs text-red-600 dark:text-red-300 mt-0.5">
          These requests require urgent action due to security or privacy concerns
        </p>
      </div>
    </div>
  );
}
