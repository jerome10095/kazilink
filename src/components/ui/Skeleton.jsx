export function WorkerCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-primary-100 bg-white p-5 dark:border-primary-700/50 dark:bg-primary-800">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-primary-200 dark:bg-primary-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-primary-200 dark:bg-primary-700" />
          <div className="h-3 w-1/2 rounded bg-primary-200 dark:bg-primary-700" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-primary-200 dark:bg-primary-700" />
        <div className="h-3 w-2/3 rounded bg-primary-200 dark:bg-primary-700" />
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[28px] border border-primary-100 bg-white p-6 dark:border-primary-700/50 dark:bg-primary-800">
      <div className="h-14 w-14 rounded-2xl bg-primary-200 dark:bg-primary-700" />
      <div className="mt-4 h-5 w-3/4 rounded bg-primary-200 dark:bg-primary-700" />
      <div className="mt-2 h-4 w-full rounded bg-primary-200 dark:bg-primary-700" />
      <div className="mt-2 h-4 w-2/3 rounded bg-primary-200 dark:bg-primary-700" />
    </div>
  );
}
