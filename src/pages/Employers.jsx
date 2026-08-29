import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Reveal from '../components/animations/Reveal';
import { Clock, Users, Award, Shield, Briefcase, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Employers() {
  const { t } = useLanguage();

  const benefits = [
    { icon: Shield, title: t('employers.b1Title'), desc: t('employers.b1Desc') },
    { icon: Clock, title: t('employers.b2Title'), desc: t('employers.b2Desc') },
    { icon: Users, title: t('employers.b3Title'), desc: t('employers.b3Desc') },
    { icon: Award, title: t('employers.b4Title'), desc: t('employers.b4Desc') },
    { icon: Briefcase, title: t('employers.b5Title'), desc: t('employers.b5Desc') },
  ];

  return (
    <>
      <Helmet>
        <title>For Employers - Hire Trusted Workers | KaziLink</title>
      </Helmet>

      <section className="section-padding dark:bg-primary-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider dark:text-primary-300">{t('employers.badge')}</span>
              <h1 className="heading-xl mt-2 dark:text-white">{t('employers.heading')}</h1>
              <p className="text-lg text-ink/60 mt-4 mb-8 dark:text-primary-100/70">
                {t('employers.paragraph')}
              </p>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                {t('employers.cta')}
                <ArrowRight size={18} />
              </Link>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card p-8">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">{t('employers.whyHeading')}</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-500 dark:bg-primary-700/60 dark:text-primary-200">
                        <benefit.icon size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm dark:text-white">{benefit.title}</h4>
                        <p className="text-sm text-ink/60 dark:text-primary-100/70">{benefit.desc}</p>
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
