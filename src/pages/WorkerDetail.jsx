import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, X, Star, ShieldCheck, MapPin, Clock, Banknote, MessageCircle } from 'lucide-react';
import Reveal from '../components/animations/Reveal';
import { LoadingState, ErrorState } from '../components/ui/AsyncState';
import { api } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';

export default function WorkerDetail() {
  const { id } = useParams();
  const { t, pick } = useLanguage();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    setNotFound(false);
    api.getWorker(id)
      .then(({ worker: row }) => {
        if (!cancelled) setWorker(row);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 404) setNotFound(true);
        else setError(t('common.loadError'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id, t]);

  return (
    <>
      <Helmet>
        <title>{worker ? `${worker.name} - KaziLink` : 'Worker Profile - KaziLink'}</title>
      </Helmet>

      <section className="section-padding bg-paper dark:bg-primary-900">
        <div className="container-custom max-w-3xl">
          <Link
            to="/find-workers"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-100"
          >
            <ArrowLeft size={16} /> {t('workerDetail.backToWorkers')}
          </Link>

          {loading && <LoadingState label={t('common.loading')} />}
          {!loading && error && <ErrorState message={error} />}

          {!loading && !error && notFound && (
            <div className="rounded-[28px] border border-dashed border-primary-200 bg-primary-50/40 p-10 text-center dark:border-primary-700 dark:bg-primary-800/40">
              <h1 className="text-xl font-semibold text-primary-800 dark:text-white">{t('workerDetail.notFoundTitle')}</h1>
              <p className="mt-2 text-sm text-primary-700/75 dark:text-primary-100/75">{t('workerDetail.notFoundBody')}</p>
              <Link
                to="/find-workers"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-700"
              >
                <ArrowLeft size={16} /> {t('workerDetail.backToWorkers')}
              </Link>
            </div>
          )}

          {!loading && !error && !notFound && worker && (
            <Reveal>
              <div className="relative overflow-hidden rounded-[28px] border border-primary-100 bg-white shadow-soft dark:border-primary-700/50 dark:bg-primary-800">
                <Link
                  to="/find-workers"
                  aria-label={t('workerDetail.close')}
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30"
                >
                  <X size={18} />
                </Link>

                <div className="relative h-28 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600">
                  <div className="absolute top-4 left-4">
                    {worker.available ? (
                      <span className="flex items-center gap-1 rounded-full bg-green-500/90 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        {t('workerCard.available')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-gray-500/90 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                        <Clock size={10} />
                        {t('workerCard.busy')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                  <div className={`-mt-12 mb-4 inline-block ${worker.verified ? 'verified-ring' : ''}`}>
                    {worker.avatarUrl ? (
                      <img
                        src={worker.avatarUrl}
                        alt={worker.name}
                        className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg dark:border-primary-800"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-primary-500 font-display text-xl font-semibold text-white shadow-lg dark:border-primary-800">
                        {worker.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">{worker.name}</h1>
                        {worker.verified && <ShieldCheck size={18} className="shrink-0 text-secondary-500" />}
                      </div>
                      <p className="font-mono text-sm uppercase tracking-wide text-primary-500 dark:text-primary-300">
                        {pick(worker.trade, worker.tradeRw)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-accent-50 px-3 py-1.5 dark:bg-primary-700/60">
                      <Star size={16} className="fill-accent-500 text-accent-500" />
                      <span className="font-mono text-sm font-semibold text-ink dark:text-white">{worker.rating}</span>
                      <span className="text-xs text-ink/40 dark:text-primary-100/50">
                        ({worker.reviewCount} {worker.reviewCount === 1 ? t('workerDetail.review') : t('workerDetail.reviews')})
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="flex items-center gap-2 rounded-2xl border border-paper-dim bg-primary-50/40 px-4 py-3 text-sm text-ink/70 dark:border-primary-700/50 dark:bg-primary-900/40 dark:text-primary-100/70">
                      <MapPin size={16} className="shrink-0 text-primary-500 dark:text-primary-300" />
                      <div>
                        <p className="text-xs text-ink/40 dark:text-primary-100/50">{t('workerDetail.location')}</p>
                        <p className="font-medium">{worker.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-paper-dim bg-primary-50/40 px-4 py-3 text-sm text-ink/70 dark:border-primary-700/50 dark:bg-primary-900/40 dark:text-primary-100/70">
                      <Clock size={16} className="shrink-0 text-primary-500 dark:text-primary-300" />
                      <div>
                        <p className="text-xs text-ink/40 dark:text-primary-100/50">{t('workerDetail.experience')}</p>
                        <p className="font-medium">{worker.experience} {t('common.years')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-paper-dim bg-primary-50/40 px-4 py-3 text-sm text-ink/70 dark:border-primary-700/50 dark:bg-primary-900/40 dark:text-primary-100/70">
                      <Banknote size={16} className="shrink-0 text-primary-500 dark:text-primary-300" />
                      <div>
                        <p className="text-xs text-ink/40 dark:text-primary-100/50">{t('workerDetail.rate')}</p>
                        <p className="font-medium">{worker.rate.toLocaleString()} RWF <span className="text-xs font-normal text-ink/40 dark:text-primary-100/50">{t('common.perDay')}</span></p>
                      </div>
                    </div>
                  </div>

                  {pick(worker.bio, worker.bioRw) && (
                    <div className="mt-6">
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-700 dark:text-primary-200">
                        {t('workerDetail.about')}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-primary-100/70">
                        {pick(worker.bio, worker.bioRw)}
                      </p>
                    </div>
                  )}

                  {worker.skills.length > 0 && (
                    <div className="mt-6">
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-700 dark:text-primary-200">
                        {t('workerDetail.skills')}
                      </h2>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {worker.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-700/50 dark:text-primary-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    to="/contact"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
                  >
                    <MessageCircle size={16} /> {t('workerDetail.contactCta')}
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
