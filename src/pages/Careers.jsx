import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Reveal from '../components/animations/Reveal';
import { Users, BookOpen, Briefcase, Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Careers() {
  const { t } = useLanguage();

  const opportunities = [
    { icon: Users, title: t('careers.opp1Title'), desc: t('careers.opp1Desc') },
    { icon: BookOpen, title: t('careers.opp2Title'), desc: t('careers.opp2Desc') },
    { icon: Briefcase, title: t('careers.opp3Title'), desc: t('careers.opp3Desc') },
    { icon: Heart, title: t('careers.opp4Title'), desc: t('careers.opp4Desc') },
  ];

  return (
    <>
      <Helmet>
        <title>Careers - Join the KaziLink Team</title>
      </Helmet>

      <section className="section-padding bg-primary-50/40 dark:bg-primary-800/40">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                {t('careers.badge')}
              </span>
              <h1 className="mt-3 text-4xl font-bold text-primary-800 md:text-5xl dark:text-white">{t('careers.heading')}</h1>
              <p className="mt-4 text-lg text-primary-700/75 dark:text-primary-100/75">
                {t('careers.paragraph')}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {opportunities.map((opp, index) => {
              const Icon = opp.icon;
              return (
                <Reveal key={opp.title} delay={index * 0.08}>
                  <div className="card p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-2xl font-semibold text-primary-800 dark:text-white">{opp.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-primary-700/75 dark:text-primary-100/70">{opp.desc}</p>
                    <Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-200">
                      {t('common.learnMore')} <ArrowRight size={16} />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-16 rounded-[30px] border border-primary-100 bg-white p-8 text-center shadow-soft dark:border-primary-700/50 dark:bg-primary-800">
              <h2 className="text-3xl font-bold text-primary-800 dark:text-white">{t('careers.ctaHeading')}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-primary-700/75 dark:text-primary-100/75">
                {t('careers.ctaParagraph')}
              </p>
              <Link to="/contact" className="btn-primary mt-6">
                {t('common.contactUs')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
