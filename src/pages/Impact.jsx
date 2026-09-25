import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import Counter from '../components/animations/Counter';
import { Users, ShieldCheck, Briefcase, BookOpen, TrendingUp, Heart } from 'lucide-react';
import useStats from '../hooks/useStats';
import { useLanguage } from '../context/LanguageContext';

const iconByLabel = {
  'Workers Registered': Users,
  'Verified Workers': ShieldCheck,
  'Hires Confirmed': Briefcase,
  'Employers Registered': Users,
  'Training Sessions': BookOpen,
  'Customer Satisfaction': Heart,
};

export default function Impact() {
  const { t } = useLanguage();
  const { items: stats } = useStats();
  const impactStats = stats.map((stat) => ({ ...stat, icon: iconByLabel[stat.label] ?? Users }));

  return (
    <>
      <Helmet>
        <title>Our Impact - KaziLink</title>
      </Helmet>

      <section className="section-padding bg-primary-50/60 dark:bg-primary-800/40">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                {t('impact.badge')}
              </span>
              <h1 className="mt-3 text-4xl font-bold text-primary-800 md:text-5xl dark:text-white">{t('impact.heading')}</h1>
              <p className="mt-4 text-lg text-primary-700/75 dark:text-primary-100/75">
                {t('impact.paragraph')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-primary-900">
        <div className="container-custom">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Reveal key={stat.label} delay={index * 0.05}>
                  <div className="card p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                      <Icon size={22} />
                    </div>
                    <div className="mt-4 text-3xl font-bold text-primary-700 dark:text-primary-200">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="mt-2 text-sm text-primary-700/75 dark:text-primary-100/70">{t(`statLabels.${stat.label}`)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="card p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                    <Users size={22} />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary-800 dark:text-white">{t('impact.communityTitle')}</h3>
                </div>
                <p className="text-sm leading-relaxed text-primary-700/75 dark:text-primary-100/70">
                  {t('impact.communityDesc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                    <TrendingUp size={22} />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary-800 dark:text-white">{t('impact.economicTitle')}</h3>
                </div>
                <p className="text-sm leading-relaxed text-primary-700/75 dark:text-primary-100/70">
                  {t('impact.economicDesc')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
