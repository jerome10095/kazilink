import { Loader2, AlertTriangle } from 'lucide-react';

export function LoadingState({ label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-primary-600 dark:text-primary-300">
      <Loader2 className="animate-spin" size={28} />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[26px] border border-dashed border-red-200 bg-red-50 p-8 text-center text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
      <AlertTriangle size={24} />
      <p className="text-sm">{message}</p>
    </div>
  );
}
