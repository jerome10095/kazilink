import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import { BookOpen, Users, Shield, TrendingUp, MessageCircle, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Training() {
  const { t } = useLanguage();

  const courses = [
    { icon: MessageCircle, title: t('training.c1Title'), desc: t('training.c1Desc') },
    { icon: Shield, title: t('training.c2Title'), desc: t('training.c2Desc') },
    { icon: TrendingUp, title: t('training.c3Title'), desc: t('training.c3Desc') },
    { icon: BookOpen, title: t('training.c4Title'), desc: t('training.c4Desc') },
    { icon: Award, title: t('training.c5Title'), desc: t('training.c5Desc') },
    { icon: Users, title: t('training.c6Title'), desc: t('training.c6Desc') },
  ];

  return (
    <>
      <Helmet>
        <title>Training Academy - Professional Development | KaziLink</title>
      </Helmet>

      <section className="section-padding dark:bg-primary-900">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider dark:text-primary-300">{t('training.badge')}</span>
              <h1 className="heading-xl mt-2 dark:text-white">{t('training.heading')}</h1>
              <p className="text-lg text-ink/60 mt-4 dark:text-primary-100/70">
                {t('training.paragraph')}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="card p-6 card-hover">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-500 dark:bg-primary-700/60 dark:text-primary-200">
                    <course.icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mt-4 mb-2 dark:text-white">{course.title}</h3>
                  <p className="text-ink/60 leading-relaxed dark:text-primary-100/70">{course.desc}</p>
                  <button className="mt-4 text-primary-500 font-medium hover:text-primary-600 transition-colors dark:text-primary-300 dark:hover:text-primary-200">
                    {t('common.learnMore')} →
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 card p-8 bg-primary-50 border-primary-200 dark:bg-primary-800 dark:border-primary-700/50">
              <div className="text-center">
                <h2 className="heading-md mb-4 dark:text-white">{t('training.ctaHeading')}</h2>
                <p className="text-ink/60 max-w-2xl mx-auto mb-6 dark:text-primary-100/70">
                  {t('training.ctaParagraph')}
                </p>
                <button className="btn-primary">
                  {t('training.ctaButton')}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
