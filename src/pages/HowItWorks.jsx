import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import { User, Briefcase, Shield, CheckCircle, Users, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const workerSteps = [
    { icon: User, title: t('howItWorks.w1Title'), desc: t('howItWorks.w1Desc') },
    { icon: Shield, title: t('howItWorks.w2Title'), desc: t('howItWorks.w2Desc') },
    { icon: CheckCircle, title: t('howItWorks.w3Title'), desc: t('howItWorks.w3Desc') },
    { icon: Star, title: t('howItWorks.w4Title'), desc: t('howItWorks.w4Desc') },
    { icon: Briefcase, title: t('howItWorks.w5Title'), desc: t('howItWorks.w5Desc') },
  ];

  const employerSteps = [
    { icon: User, title: t('howItWorks.e1Title'), desc: t('howItWorks.e1Desc') },
    { icon: Briefcase, title: t('howItWorks.e2Title'), desc: t('howItWorks.e2Desc') },
    { icon: Users, title: t('howItWorks.e3Title'), desc: t('howItWorks.e3Desc') },
    { icon: Shield, title: t('howItWorks.e4Title'), desc: t('howItWorks.e4Desc') },
    { icon: Star, title: t('howItWorks.e5Title'), desc: t('howItWorks.e5Desc') },
  ];

  return (
    <>
      <Helmet>
        <title>How KaziLink Works - Simple Process for Workers & Employers</title>
      </Helmet>

      <section className="section-padding dark:bg-primary-900">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider dark:text-primary-300">{t('howItWorks.badge')}</span>
              <h1 className="heading-xl mt-2 dark:text-white">{t('howItWorks.heading')}</h1>
              <p className="text-lg text-ink/60 mt-4 dark:text-primary-100/70">
                {t('howItWorks.paragraph')}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12">
            <Reveal>
              <div className="card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-500 dark:bg-primary-700 dark:text-primary-100">
                    <User size={24} />
                  </div>
                  <h2 className="text-2xl font-semibold dark:text-white">{t('howItWorks.forWorkers')}</h2>
                </div>
                <div className="space-y-6">
                  {workerSteps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-500 dark:bg-primary-700/60 dark:text-primary-200">
                        <step.icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold dark:text-white">{step.title}</h4>
                        <p className="text-sm text-ink/60 dark:text-primary-100/70">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 text-secondary-500 dark:bg-secondary-700/60 dark:text-secondary-200">
                    <Briefcase size={24} />
                  </div>
                  <h2 className="text-2xl font-semibold dark:text-white">{t('howItWorks.forEmployers')}</h2>
                </div>
                <div className="space-y-6">
                  {employerSteps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-secondary-500 dark:bg-secondary-700/60 dark:text-secondary-200">
                        <step.icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold dark:text-white">{step.title}</h4>
                        <p className="text-sm text-ink/60 dark:text-primary-100/70">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
