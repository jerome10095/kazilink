import { Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function StarRating({ value, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5 text-accent-500" role="img" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} className={n <= value ? 'fill-accent-500' : 'text-primary-200 dark:text-primary-600'} />
      ))}
    </div>
  );
}

export default function ReviewCard({ review, showWorker = false }) {
  const { t, pick } = useLanguage();
  const { reviewer, worker } = review;
  const byline = reviewer.company ? `${reviewer.name} · ${reviewer.company}` : reviewer.name;

  return (
    <article className="card p-6">
      <div className="flex items-center gap-3">
        {reviewer.avatarUrl ? (
          <img src={reviewer.avatarUrl} alt="" className="h-11 w-11 rounded-full object-cover" />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700 dark:bg-primary-700/60 dark:text-primary-100">
            {reviewer.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate font-semibold text-primary-800 dark:text-white">{byline}</p>
          <p className="text-xs text-ink/60 dark:text-primary-100/60">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-4">
        <StarRating value={review.rating} />
      </div>

      {review.comment && <p className="mt-3 leading-relaxed text-ink/70 dark:text-primary-100/80">{review.comment}</p>}

      {showWorker && worker && (
        <p className="mt-4 text-sm text-ink/60 dark:text-primary-100/70">
          {t('successStories.reviewOf', { name: worker.name })}
          {worker.trade ? ` · ${pick(worker.trade, worker.tradeRw)}` : ''}
        </p>
      )}
    </article>
  );
}
