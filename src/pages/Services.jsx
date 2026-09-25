import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, SlidersHorizontal } from 'lucide-react';
import Reveal from '../components/animations/Reveal';
import ServiceCard from '../components/ui/ServiceCard';
import { ErrorState } from '../components/ui/AsyncState';
import { ServiceCardSkeleton } from '../components/ui/Skeleton';
import { api } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t, pick } = useLanguage();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    api.getServices()
      .then(({ services: rows }) => {
        if (!cancelled) setServices(rows);
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

  const categories = ['All', ...services.map((service) => service.title)];
  const categoryLabel = (value) => {
    if (value === 'All') return t('services.categoryAll');
    const service = services.find((item) => item.title === value);
    return service ? pick(service.title, service.titleRw) : value;
  };

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory = category === 'All' || service.title === category;
      const matchesQuery =
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase()) ||
        (service.titleRw ?? '').toLowerCase().includes(query.toLowerCase()) ||
        (service.descriptionRw ?? '').toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [services, category, query]);

  return (
    <>
      <Helmet>
        <title>Our Services - KaziLink</title>
      </Helmet>

      <section className="section-padding bg-paper dark:bg-primary-900">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700 dark:bg-primary-800 dark:text-primary-200">
                {t('services.badge')}
              </span>
              <h1 className="mt-3 text-4xl font-bold text-primary-800 md:text-5xl dark:text-white">{t('services.heading')}</h1>
              <p className="mt-4 text-lg text-primary-700/75 dark:text-primary-100/75">
                {t('services.paragraph')}
              </p>
            </div>
          </Reveal>

          <div className="mb-10 rounded-[28px] border border-primary-100 bg-white p-4 shadow-soft dark:border-primary-700/50 dark:bg-primary-800 md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary-500 dark:text-primary-300" size={18} />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t('services.searchPlaceholder')}
                  className="w-full rounded-full border border-primary-100 bg-primary-50/40 py-3 pl-12 pr-4 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white dark:placeholder:text-primary-100/50"
                />
              </div>

              <div className="relative lg:w-64">
                <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary-500 dark:text-primary-300" size={16} />
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full appearance-none rounded-full border border-primary-100 bg-primary-50/40 py-3 pl-11 pr-4 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {categoryLabel(item)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            </div>
          )}
          {!loading && error && <ErrorState message={error} />}

          {!loading && !error && (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredServices.map((service, index) => (
                  <Reveal key={service.id} delay={index * 0.08}>
                    <ServiceCard service={service} />
                  </Reveal>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <div className="mt-8 rounded-[26px] border border-dashed border-primary-200 bg-primary-50/40 p-8 text-center text-primary-700 dark:border-primary-700 dark:bg-primary-800/40 dark:text-primary-100">
                  {t('services.noResults')}
                </div>
              )}
            </>
          )}

          <div className="mt-16 rounded-[30px] bg-primary-800 p-8 text-center text-white shadow-strong dark:bg-primary-700 md:p-12">
            <h2 className="text-3xl font-bold">{t('services.ctaHeading')}</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-100/85">
              {t('services.ctaParagraph')}
            </p>
            <a href="/contact" className="btn-primary mt-6 rounded-full bg-white px-7 py-3 text-primary-800 hover:bg-primary-50 dark:bg-white dark:text-primary-800 dark:hover:bg-primary-50">
              {t('services.ctaButton')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
