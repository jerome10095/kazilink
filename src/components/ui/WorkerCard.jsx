import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function WorkerCard({ worker, compact = false }) {
  const initials = worker.name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (compact) {
    return (
      <Link to={`/workers/${worker.id}`} className="block">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl hover:shadow-md transition-shadow">
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
          <div className="flex items-center gap-0.5 text-xs">
            <Star size={12} className="fill-accent-500 text-accent-500" />
            <span className="font-medium">{worker.rating}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/workers/${worker.id}`} className="block card card-hover">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white font-bold text-lg ${worker.verified ? 'verified-ring' : ''}`}>
              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-500">
                {initials}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold">{worker.name}</h3>
                {worker.verified && <ShieldCheck size={16} className="text-secondary-500" />}
              </div>
              <p className="text-sm text-ink/60">{worker.trade}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-accent-50 px-3 py-1 rounded-full">
            <Star size={14} className="fill-accent-500 text-accent-500" />
            <span className="font-semibold text-sm">{worker.rating}</span>
            <span className="text-xs text-ink/40">({worker.reviewCount})</span>
          </div>
        </div>

        <p className="text-sm text-ink/70 line-clamp-2 mb-3">{worker.bio}</p>

        <div className="flex items-center gap-4 text-xs text-ink/50 mb-3">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {worker.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {worker.experience} years
          </span>
          {worker.available && (
            <span className="flex items-center gap-1 text-secondary-600">
              <CheckCircle size={14} />
              Available
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-paper-dim">
          <span className="text-sm font-semibold text-primary-600">
            {worker.rate.toLocaleString()} RWF
            <span className="text-xs font-normal text-ink/40"> / day</span>
          </span>
          <span className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
            View Profile →
          </span>
        </div>
      </div>
    </Link>
  );
}