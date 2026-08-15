import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, Clock, CheckCircle, MessageCircle, ThumbsUp } from 'lucide-react';

export default function WorkerCard({ worker, compact = false }) {
  const initials = worker.name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (compact) {
    return (
      <Link to={`/workers/${worker.id}`} className="block group">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl hover:shadow-md transition-shadow border border-paper-dim">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white font-bold text-sm ${worker.verified ? 'verified-ring' : ''}`}>
            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-500">
              {initials}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm truncate">{worker.name}</span>
              {worker.verified && <ShieldCheck size={12} className="text-secondary-500 shrink-0" />}
            </div>
            <p className="text-xs text-ink/60 truncate">{worker.trade}</p>
          </div>
          <div className="flex items-center gap-0.5 text-xs bg-accent-50 px-2 py-0.5 rounded-full">
            <Star size={12} className="fill-accent-500 text-accent-500" />
            <span className="font-medium">{worker.rating}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/workers/${worker.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-paper-dim hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
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
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {worker.available ? (
              <span className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Available
              </span>
            ) : (
              <span className="flex items-center gap-1 bg-gray-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                <Clock size={10} />
                Busy
              </span>
            )}
          </div>
        </div>

        <div className="px-5 pb-5">
          {/* Avatar overlapping header */}
          <div className={`-mt-10 mb-3 inline-block ${worker.verified ? 'verified-ring' : ''}`}>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary-500 text-white font-display text-lg font-semibold shadow-lg">
              {initials}
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display text-lg font-semibold leading-tight text-ink">
                  {worker.name}
                </h3>
                {worker.verified && <ShieldCheck size={16} className="shrink-0 text-secondary-500" />}
              </div>
              <p className="font-mono text-xs uppercase tracking-wide text-primary-500">{worker.trade}</p>
            </div>
            <div className="flex items-center gap-1 bg-accent-50 px-3 py-1.5 rounded-full">
              <Star size={14} className="fill-accent-500 text-accent-500" />
              <span className="font-mono text-sm font-semibold text-ink">{worker.rating}</span>
              <span className="text-xs text-ink/40">({worker.reviewCount})</span>
            </div>
          </div>

          <p className="mt-3 text-sm text-ink/65 line-clamp-2">{worker.bio}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink/50">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {worker.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {worker.experience} years
            </span>
            {worker.verified && (
              <span className="flex items-center gap-1 text-secondary-600">
                <ShieldCheck size={14} />
                Verified
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between pt-4 border-t border-paper-dim">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-ink/60 hover:text-primary-500 transition-colors">
                <ThumbsUp size={16} />
                <span className="text-xs font-medium">Helpful</span>
              </button>
              <button className="flex items-center gap-1.5 text-ink/60 hover:text-primary-500 transition-colors">
                <MessageCircle size={16} />
                <span className="text-xs font-medium">Contact</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-primary-600">
                {worker.rate.toLocaleString()} RWF
                <span className="text-xs font-normal text-ink/40"> / day</span>
              </span>
              <span className="text-sm font-medium text-primary-500 group-hover:text-primary-600 transition-colors">
                View Profile →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}