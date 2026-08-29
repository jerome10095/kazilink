import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import { Star, Quote, Award, Users, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SuccessStories() {
  const { t } = useLanguage();

  const stories = [
    { id: 1, type: 'worker', name: 'Jean Claude', role: 'Electrician', quote: t('successStories.s1Quote'), icon: Award, color: 'primary' },
    { id: 2, type: 'employer', name: 'ABC Construction', role: 'Construction Company', quote: t('successStories.s2Quote'), icon: Briefcase, color: 'secondary' },
    { id: 3, type: 'community', name: t('successStories.s3Name'), role: t('successStories.s3Role'), quote: t('successStories.s3Quote'), icon: Users, color: 'accent' },
    { id: 4, type: 'worker', name: 'Sarah Mukamana', role: 'Cleaner', quote: t('successStories.s4Quote'), icon: Award, color: 'primary' },
    { id: 5, type: 'employer', name: 'XYZ Hotel', role: 'Hotel Chain', quote: t('successStories.s5Quote'), icon: Briefcase, color: 'secondary' },
  ];

  const typeLabel = {
    worker: t('successStories.typeWorker'),
    employer: t('successStories.typeEmployer'),
    community: t('successStories.typeCommunity'),
  };

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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <Reveal key={story.id} delay={index * 0.1}>
                <div className="card p-6 card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-${story.color}-100 text-${story.color}-500 dark:bg-${story.color}-700/60 dark:text-${story.color}-200`}>
                      <story.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold dark:text-white">{typeLabel[story.type]}</h4>
                      <p className="text-sm text-ink/60 dark:text-primary-100/70">{story.name} - {story.role}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote size={20} className="text-primary-200 absolute -top-1 -left-1 dark:text-primary-600" />
                    <p className="text-ink/70 leading-relaxed pl-6 dark:text-primary-100/80">
                      "{story.quote}"
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-accent-500">
                    <Star size={16} className="fill-accent-500" />
                    <Star size={16} className="fill-accent-500" />
                    <Star size={16} className="fill-accent-500" />
                    <Star size={16} className="fill-accent-500" />
                    <Star size={16} className="fill-accent-500" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
