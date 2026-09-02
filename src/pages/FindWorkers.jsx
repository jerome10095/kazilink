import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import WorkerCard from '../components/ui/WorkerCard';
import { ErrorState } from '../components/ui/AsyncState';
import { WorkerCardSkeleton } from '../components/ui/Skeleton';
import { api } from '../lib/api';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FindWorkers() {
  const { t, pick } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ trade: '', location: '', rating: '' });
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    api.getWorkers()
      .then(({ workers: rows }) => {
        if (!cancelled) setWorkers(rows);
      })
      .catch(() => {
        if (!cancelled) setError(t('common.loadError'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [t]);

  const trades = [...new Set(workers.map((worker) => worker.trade))];
  const locations = [...new Set(workers.map((worker) => worker.location))];
  const tradeLabel = (trade) => {
    const worker = workers.find((item) => item.trade === trade);
    return worker ? pick(worker.trade, worker.tradeRw) : trade;
  };

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.trade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (worker.tradeRw ?? '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrade = !filters.trade || worker.trade === filters.trade;
    const matchesLocation = !filters.location || worker.location === filters.location;
    const matchesRating = !filters.rating || worker.rating >= parseFloat(filters.rating);
    return matchesSearch && matchesTrade && matchesLocation && matchesRating;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ trade: '', location: '', rating: '' });
  };

  return (
    <>
      <Helmet>
        <title>Verified Workers - KaziLink</title>
      </Helmet>

      <section className="section-padding bg-paper dark:bg-primary-900">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                {t('findWorkers.badge')}
              </span>
              <h1 className="mt-3 text-4xl font-bold text-primary-800 md:text-5xl dark:text-white">{t('findWorkers.heading')}</h1>
              <p className="mt-4 text-lg text-primary-700/75 dark:text-primary-100/75">
                {t('findWorkers.paragraph')}
              </p>
            </div>
          </Reveal>

          <div className="mb-10 rounded-[28px] border border-primary-100 bg-white p-4 shadow-soft dark:border-primary-700/50 dark:bg-primary-800">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary-600 dark:text-primary-300" size={18} />
                <input
                  type="text"
                  placeholder={t('findWorkers.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full rounded-full border border-primary-100 bg-primary-50/40 py-3 pl-12 pr-4 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white dark:placeholder:text-primary-100/50"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-3 xl:w-auto xl:min-w-[540px]">
                <select
                  value={filters.trade}
                  onChange={(event) => setFilters({ ...filters, trade: event.target.value })}
                  className="rounded-full border border-primary-100 bg-primary-50/40 px-4 py-3 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white"
                >
                  <option value="">{t('findWorkers.serviceDefault')}</option>
                  {trades.map((trade) => (
                    <option key={trade} value={trade}>{tradeLabel(trade)}</option>
                  ))}
                </select>

                <select
                  value={filters.location}
                  onChange={(event) => setFilters({ ...filters, location: event.target.value })}
                  className="rounded-full border border-primary-100 bg-primary-50/40 px-4 py-3 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white"
                >
                  <option value="">{t('findWorkers.locationDefault')}</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>

                <select
                  value={filters.rating}
                  onChange={(event) => setFilters({ ...filters, rating: event.target.value })}
                  className="rounded-full border border-primary-100 bg-primary-50/40 px-4 py-3 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white"
                >
                  <option value="">{t('findWorkers.ratingDefault')}</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.0">4.0+</option>
                  <option value="3.5">3.5+</option>
                </select>
              </div>

              {(searchTerm || filters.trade || filters.location || filters.rating) && (
                <button onClick={clearFilters} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-3 text-sm font-medium text-primary-700 transition hover:bg-primary-100 dark:border-primary-700/50 dark:bg-primary-700/50 dark:text-primary-100 dark:hover:bg-primary-700">
                  <X size={16} /> {t('findWorkers.clear')}
                </button>
              )}
            </div>
          </div>

          {loading && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <WorkerCardSkeleton key={index} />
              ))}
            </div>
          )}
          {!loading && error && <ErrorState message={error} />}

          {!loading && !error && (
            <div>
              <p className="mb-6 text-sm text-primary-700/75 dark:text-primary-100/75">
                {filteredWorkers.length === 1 ? t('findWorkers.showingOne') : t('findWorkers.showingMany', { count: filteredWorkers.length })}
              </p>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredWorkers.map((worker) => (
                  <Reveal key={worker.id}>
                    <WorkerCard worker={worker} />
                  </Reveal>
                ))}
              </div>

              {filteredWorkers.length === 0 && (
                <div className="mt-8 rounded-[28px] border border-dashed border-primary-200 bg-primary-50/40 p-10 text-center text-primary-700 dark:border-primary-700 dark:bg-primary-800/40 dark:text-primary-100">
                  {t('findWorkers.noResults')}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
