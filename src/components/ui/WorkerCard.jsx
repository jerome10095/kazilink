import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, Clock, MessageCircle, ThumbsUp, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../hooks/useFavorites';
import { useToast } from './Toast';

export default function WorkerCard({ worker, compact = false }) {
  const { t, pick } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToast } = useToast();
  const favorited = isFavorite(worker.id);

  const handleToggleFavorite = (event) => {
    event.preventDefault();
    toggleFavorite(worker.id);
    addToast(
      favorited ? t('workerCard.removedFavorite') : t('workerCard.addedFavorite'),
      'success'
    );
  };
  const trade = pick(worker.trade, worker.tradeRw);
  const bio = pick(worker.bio, worker.bioRw);
  const initials = worker.name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (compact) {
    return (
      <Link to={`/workers/${worker.id}`} className="block group">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl hover:shadow-md transition-shadow border border-paper-dim dark:border-primary-700/50 dark:bg-primary-800">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white font-bold text-sm ${worker.verified ? 'verified-ring' : ''}`}>
            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-500">
              {initials}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm truncate dark:text-white">{worker.name}</span>
              {worker.verified && <ShieldCheck size={12} className="text-secondary-500 shrink-0" />}
            </div>
            <p className="text-xs text-ink/60 truncate dark:text-primary-100/60">{trade}</p>
          </div>
          <div className="flex items-center gap-0.5 text-xs bg-accent-50 px-2 py-0.5 rounded-full dark:bg-primary-700/60">
            <Star size={12} className="fill-accent-500 text-accent-500" />
            <span className="font-medium dark:text-white">{worker.rating}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/workers/${worker.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-paper-dim hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden dark:border-primary-700/50 dark:bg-primary-800">
        {/* Header with gradient */}
        <div className="relative h-24 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <pattern id={`pattern-${worker.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="white" />
              </pattern>
              <rect width="100%" height="100%" fill={`url(#pattern-${worker.id})`} />
            </svg>
          </div>

          {/* Favorite toggle */}
          <button
            onClick={handleToggleFavorite}
            aria-label={favorited ? t('workerCard.removeFavorite') : t('workerCard.addFavorite')}
            className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-soft transition hover:scale-110 dark:bg-primary-800/90"
          >
            <Heart size={16} className={favorited ? 'fill-red-500 text-red-500' : 'text-primary-400'} />
          </button>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {worker.available ? (
              <span className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {t('workerCard.available')}
              </span>
            ) : (
              <span className="flex items-center gap-1 bg-gray-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                <Clock size={10} />
                {t('workerCard.busy')}
              </span>
            )}
          </div>
        </div>

        <div className="px-5 pb-5">
          {/* Avatar overlapping header */}
          <div className={`-mt-10 mb-3 inline-block ${worker.verified ? 'verified-ring' : ''}`}>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary-500 text-white font-display text-lg font-semibold shadow-lg dark:border-primary-800">
              {initials}
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display text-lg font-semibold leading-tight text-ink dark:text-white">
                  {worker.name}
                </h3>
                {worker.verified && <ShieldCheck size={16} className="shrink-0 text-secondary-500" />}
              </div>
              <p className="font-mono text-xs uppercase tracking-wide text-primary-500 dark:text-primary-300">{trade}</p>
            </div>
            <div className="flex items-center gap-1 bg-accent-50 px-3 py-1.5 rounded-full dark:bg-primary-700/60">
              <Star size={14} className="fill-accent-500 text-accent-500" />
              <span className="font-mono text-sm font-semibold text-ink dark:text-white">{worker.rating}</span>
              <span className="text-xs text-ink/40 dark:text-primary-100/50">({worker.reviewCount})</span>
            </div>
          </div>

          <p className="mt-3 text-sm text-ink/65 line-clamp-2 dark:text-primary-100/70">{bio}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink/50 dark:text-primary-100/60">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {worker.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {worker.experience} {t('common.years')}
            </span>
            {worker.verified && (
              <span className="flex items-center gap-1 text-secondary-600 dark:text-secondary-400">
                <ShieldCheck size={14} />
                {t('workerCard.verified')}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between pt-4 border-t border-paper-dim dark:border-primary-700/50">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-ink/60 hover:text-primary-500 transition-colors dark:text-primary-100/60 dark:hover:text-primary-300">
                <ThumbsUp size={16} />
                <span className="text-xs font-medium">{t('workerCard.helpful')}</span>
              </button>
              <button className="flex items-center gap-1.5 text-ink/60 hover:text-primary-500 transition-colors dark:text-primary-100/60 dark:hover:text-primary-300">
                <MessageCircle size={16} />
                <span className="text-xs font-medium">{t('workerCard.contact')}</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-primary-600 dark:text-primary-300">
                {worker.rate.toLocaleString()} RWF
                <span className="text-xs font-normal text-ink/40 dark:text-primary-100/50"> {t('common.perDay')}</span>
              </span>
              <span className="text-sm font-medium text-primary-500 group-hover:text-primary-600 transition-colors dark:text-primary-300 dark:group-hover:text-primary-200">
                {t('workerCard.viewProfile')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
