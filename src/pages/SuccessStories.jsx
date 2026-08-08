import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import { Star, Quote, Award, Users, Briefcase } from 'lucide-react';

const stories = [
  {
    id: 1,
    type: 'worker',
    name: 'Jean Claude',
    role: 'Electrician',
    quote: 'KaziLink helped me find work that values my skills. The verification process gave me credibility and opened doors to better opportunities.',
    icon: Award,
    color: 'primary'
  },
  {
    id: 2,
    type: 'employer',
    name: 'ABC Construction',
    role: 'Construction Company',
    quote: 'We found reliable workers in days instead of weeks. KaziLink\'s verification system gave us the confidence to hire quickly.',
    icon: Briefcase,
    color: 'secondary'
  },
  {
    id: 3,
    type: 'community',
    name: 'Kigali Community',
    role: 'Community Impact',
    quote: 'KaziLink has transformed our community by connecting skilled workers with local employers, creating sustainable livelihoods.',
    icon: Users,
    color: 'accent'
  },
  {
    id: 4,
    type: 'worker',
    name: 'Sarah Mukamana',
    role: 'Cleaner',
    quote: 'The training I received through KaziLink gave me the confidence to start my own cleaning business. I now employ 5 people!',
    icon: Award,
    color: 'primary'
  },
  {
    id: 5,
    type: 'employer',
    name: 'XYZ Hotel',
    role: 'Hotel Chain',
    quote: 'KaziLink\'s workers are professional, reliable, and always on time. It\'s been a game-changer for our operations.',
    icon: Briefcase,
    color: 'secondary'
  },
];

export default function SuccessStories() {
  return (
    <>
      <Helmet>
        <title>Success Stories - Real Impact | KaziLink</title>
      </Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Real Impact</span>
              <h1 className="heading-xl mt-2">Success Stories</h1>
              <p className="text-lg text-ink/60 mt-4">
                Hear from workers, employers, and communities whose lives and businesses 
                have been transformed by KaziLink.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <Reveal key={story.id} delay={index * 0.1}>
                <div className="card p-6 card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-${story.color}-100 text-${story.color}-500`}>
                      <story.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold capitalize">{story.type} Story</h4>
                      <p className="text-sm text-ink/60">{story.name} - {story.role}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote size={20} className="text-primary-200 absolute -top-1 -left-1" />
                    <p className="text-ink/70 leading-relaxed pl-6">
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