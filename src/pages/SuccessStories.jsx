import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import ReviewCard from '../components/ui/ReviewCard';
import { LoadingState, ErrorState } from '../components/ui/AsyncState';
import { api } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';

export default function SuccessStories() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    api.getReviews({ limit: 12 })
      .then(({ reviews: rows }) => {
        if (!cancelled) setReviews(rows);
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

  return (
    <>
      <Helmet>
        <title>Success Stories - Real Impact | KaziLink</title>
      </Helmet>

      <section className="section-padding dark:bg-primary-900">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider dark:text-primary-300">{t('successStories.badge')}</span>
              <h1 className="heading-xl mt-2 dark:text-white">{t('successStories.heading')}</h1>
              <p className="text-lg text-ink/60 mt-4 dark:text-primary-100/70">
                {t('successStories.paragraph')}
              </p>
            </div>
          </Reveal>

          {loading && <LoadingState label={t('common.loading')} />}
          {!loading && error && <ErrorState message={error} />}

          {!loading && !error && reviews.length === 0 && (
            <div className="mx-auto max-w-xl rounded-[28px] border border-dashed border-primary-200 bg-primary-50/40 p-10 text-center dark:border-primary-700 dark:bg-primary-800/40">
              <p className="font-medium text-primary-800 dark:text-white">{t('successStories.empty')}</p>
              <p className="mt-2 text-sm text-primary-700/75 dark:text-primary-100/75">{t('successStories.emptyHint')}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Reveal key={review.id} delay={index * 0.05}>
                <ReviewCard review={review} showWorker />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
