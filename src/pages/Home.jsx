import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Award,
  Briefcase,
  CheckCircle,
  User,
  Sparkles,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import Reveal from '../components/animations/Reveal';
import Counter from '../components/animations/Counter';
import WorkerCard from '../components/ui/WorkerCard';
import ServiceCard from '../components/ui/ServiceCard';
import { LoadingState, ErrorState } from '../components/ui/AsyncState';
import { api } from '../lib/api';
import { stats } from '../data';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t, pick } = useLanguage();
  const [workers, setWorkers] = useState([]);
  const [services, setServices] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([api.getWorkers({ limit: 6 }), api.getServices()])
      .then(([workersRes, servicesRes]) => {
        if (cancelled) return;
        setWorkers(workersRes.workers);
        setServices(servicesRes.services);
      })
      .catch(() => {
        if (!cancelled) setLoadError(t('common.loadError'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [t]);

  const featuredWorkers = workers.slice(0, 6);
  const heroWorkers = workers.filter((worker) => worker.verified).slice(0, 3);
  const heroStats = stats.slice(0, 3);
  const jobsStat = stats.find((stat) => stat.label === 'Jobs Completed') ?? stats[0];

  const heroSteps = [
    { title: t('home.step1Title'), description: t('home.step1Desc'), icon: User, tone: 'bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100' },
    { title: t('home.step2Title'), description: t('home.step2Desc'), icon: Shield, tone: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-700/60 dark:text-secondary-200' },
    { title: t('home.step3Title'), description: t('home.step3Desc'), icon: Briefcase, tone: 'bg-accent-100 text-accent-700 dark:bg-accent-700/60 dark:text-accent-200' },
  ];

  const trustPoints = [t('home.trust1'), t('home.trust2'), t('home.trust3')];

  return (
    <>
      <Helmet>
        <title>KaziLink - Connect with Verified Workers & Trusted Employers</title>
      </Helmet>

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 pb-24 pt-32 md:min-h-[680px] md:pt-40">
        {/* Hero background photo — visible from md up, where there's room for it to sit behind the copy */}
        <div
          className="absolute inset-0 -z-20 hidden bg-cover bg-right-top md:block"
          style={{ backgroundImage: "url('/Herro1.png')" }}
          aria-hidden="true"
        />
        {/* Dark green wash: solid where the text sits, fading to a tinted glaze over the photo so it recedes behind the content */}
        <div
          className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-primary-900 via-primary-900/85 to-primary-900/35 md:block"
          aria-hidden="true"
        />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-700">
              <Sparkles size={14} /> {t('home.heroBadge')}
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[3.4rem]">
              {t('home.heroTitlePre')}<span className="text-primary-200">{t('home.heroTitleHighlight')}</span>{t('home.heroTitlePost')}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-100/85">
              {t('home.heroParagraph')}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/find-workers"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary-800 shadow-lg shadow-primary-900/30 transition-all hover:bg-primary-50"
              >
                {t('home.ctaFindWorkers')} <ArrowRight size={18} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
              >
                {t('home.ctaJoinWorker')}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm font-medium text-primary-100/85">
                  <CheckCircle size={16} className="text-primary-300" /> {point}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {heroWorkers.map((worker) => {
                const initials = worker.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
                return (
                  <Link
                    key={worker.id}
                    to={`/workers/${worker.id}`}
                    className="flex items-center gap-2 rounded-full border border-primary-100 bg-white/95 py-1.5 pl-1.5 pr-3 shadow-soft backdrop-blur-sm transition hover:bg-primary-50"
                  >
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-xs font-semibold text-white">
                      {initials}
                      {worker.verified && (
                        <ShieldCheck size={12} className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white text-primary-600" />
                      )}
                    </span>
                    <span className="text-xs font-medium text-primary-800">{worker.name.split(' ')[0]} · {pick(worker.trade, worker.tradeRw)}</span>
                  </Link>
                );
              })}
              <Link to="/find-workers" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-100 hover:text-white hover:underline">
                {t('common.viewAll')} <ArrowRight size={12} />
              </Link>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-xs text-primary-100/70">{t(`statLabels.${stat.label}`)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating stat pinned over the photo, clear of the workers' faces */}
        <div className="absolute inset-x-0 bottom-10 z-10 hidden md:block">
          <div className="container-custom flex justify-end">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-3 rounded-2xl border border-primary-100 bg-white/90 p-4 shadow-strong backdrop-blur-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-700 text-white">
                <Award size={18} />
              </span>
              <div>
                <p className="text-lg font-bold text-primary-800">
                  <Counter end={jobsStat.value} suffix={jobsStat.suffix} />
                </p>
                <p className="text-xs text-primary-700/70">{t('home.jobsCompleted')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-primary-900">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700 dark:bg-primary-800 dark:text-primary-200">
                {t('home.offerBadge')}
              </span>
              <h2 className="mt-3 text-3xl font-bold text-primary-800 md:text-4xl dark:text-white">{t('home.offerHeading')}</h2>
              <p className="mt-4 text-base leading-relaxed text-primary-700/75 dark:text-primary-100/70">
                {t('home.offerParagraph')}
              </p>
            </div>
          </Reveal>

          {loading && <LoadingState label={t('common.loading')} />}
          {!loading && loadError && <ErrorState message={loadError} />}
          {!loading && !loadError && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Reveal key={service.id} delay={index * 0.1}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-primary-50/50 dark:bg-primary-800/40">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                  {t('home.processBadge')}
                </span>
                <h2 className="mt-3 text-3xl font-bold text-primary-800 md:text-4xl dark:text-white">{t('home.processHeading')}</h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-700/75 dark:text-primary-100/70">
                  {t('home.processParagraph')}
                </p>

                <div className="mt-8 space-y-4">
                  {heroSteps.map((step, index) => (
                    <div key={step.title} className="flex gap-4 rounded-[26px] border border-primary-100 bg-white p-4 shadow-soft dark:border-primary-700/50 dark:bg-primary-800">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${step.tone}`}>
                        <step.icon size={22} />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-medium text-primary-400 dark:text-primary-300">0{index + 1}</span>
                          <h4 className="text-lg font-semibold text-primary-800 dark:text-white">{step.title}</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-primary-700/75 dark:text-primary-100/70">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to="/how-it-works" className="btn-outline mt-8 inline-flex items-center gap-2">
                  {t('common.learnMore')} <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="card p-6">
                    <div className="text-3xl font-bold text-primary-700 dark:text-primary-200">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="mt-2 text-sm text-primary-700/75 dark:text-primary-100/70">{t(`statLabels.${stat.label}`)}</p>
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-primary-50 dark:bg-primary-900/60">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600" style={{ width: `${Math.max(42, Math.min(96, stat.value))}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-primary-900">
        <div className="container-custom">
          <Reveal>
            <div className="mb-10 flex items-center justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700 dark:bg-primary-800 dark:text-primary-200">
                  {t('home.talentBadge')}
                </span>
                <h2 className="mt-3 text-3xl font-bold text-primary-800 md:text-4xl dark:text-white">{t('home.talentHeading')}</h2>
              </div>
              <Link to="/find-workers" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-200">
                {t('common.viewAll')} <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          {!loading && !loadError && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredWorkers.map((worker) => (
                <Reveal key={worker.id}>
                  <WorkerCard worker={worker} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

        <div className="container-custom relative z-10 text-center text-white">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                <Sparkles size={16} />
                {t('home.ctaPill')}
              </div>
              <h2 className="text-3xl font-bold md:text-5xl">{t('home.ctaHeading')}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg">
                {t('home.ctaParagraph')}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-primary-800 shadow-lg shadow-primary-900/25 transition-all hover:bg-primary-50">
                  <Zap size={18} />
                  {t('home.ctaJoinToday')}
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-3.5 font-semibold text-white transition-all hover:bg-white/10">
                  {t('common.contactUs')}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
