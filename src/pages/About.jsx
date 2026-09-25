import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import Counter from '../components/animations/Counter';
import useStats from '../hooks/useStats';
import { ShieldCheck, Target, Eye, Heart, Users, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const values = [
    { icon: ShieldCheck, title: t('about.valueTrustTitle'), description: t('about.valueTrustDesc') },
    { icon: Target, title: t('about.valueIntegrityTitle'), description: t('about.valueIntegrityDesc') },
    { icon: Heart, title: t('about.valueExcellenceTitle'), description: t('about.valueExcellenceDesc') },
    { icon: Users, title: t('about.valueImpactTitle'), description: t('about.valueImpactDesc') },
  ];

  const { raw } = useStats();
  const stats = [
    { value: raw.workers, suffix: '', label: t('about.statWorkers') },
    { value: raw.employers, suffix: '', label: t('about.statEmployers') },
    { value: raw.hires, suffix: '', label: t('about.statJobsCompleted') },
    ...(raw.satisfaction === null ? [] : [{ value: raw.satisfaction, suffix: '%', label: t('about.statSatisfaction') }]),
  ];

  return (
    <>
      <Helmet>
        <title>About KaziLink - Our Mission & Vision</title>
      </Helmet>

      <section className="section-padding bg-primary-50/60 dark:bg-primary-800/40">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                {t('about.badge')}
              </span>
              <h1 className="mt-4 text-4xl font-bold text-primary-800 md:text-5xl dark:text-white">{t('about.heading')}</h1>
              <p className="mt-4 text-lg text-primary-700/75 dark:text-primary-100/75">
                {t('about.paragraph')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-primary-900">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Reveal>
              <div className="card p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                  <Target size={30} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-primary-800 dark:text-white">{t('about.missionTitle')}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-700/75 dark:text-primary-100/70">
                  {t('about.missionDesc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                  <Eye size={30} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-primary-800 dark:text-white">{t('about.visionTitle')}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-700/75 dark:text-primary-100/70">
                  {t('about.visionDesc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="card p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                  <Briefcase size={30} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-primary-800 dark:text-white">{t('about.valuesTitle')}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-700/75 dark:text-primary-100/70">
                  {t('about.valuesDesc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="card p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                  <Heart size={30} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-primary-800 dark:text-white">{t('about.impactTitle')}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-700/75 dark:text-primary-100/70">
                  {t('about.impactDesc')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50/60 dark:bg-primary-800/40">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-primary-800 md:text-4xl dark:text-white">{t('about.coreValuesHeading')}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={index * 0.06}>
                  <div className="card p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-semibold text-primary-800 dark:text-white">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-primary-700/75 dark:text-primary-100/70">{value.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-primary-900">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.06}>
                <div className="card p-6 text-center">
                  <div className="text-4xl font-bold text-primary-700 dark:text-primary-200">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm font-medium text-primary-700/80 dark:text-primary-100/75">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
