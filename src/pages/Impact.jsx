import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import Counter from '../components/animations/Counter';
import {
  TrendingUp,
  Users,
  Briefcase,
  Award,
  Heart,
  Globe,
  Shield,
  BookOpen,
} from 'lucide-react';

const impactStats = [
  {
    icon: Users,
    label: 'Workers Registered',
    value: 5000,
    suffix: '+',
  },
  {
    icon: Shield,
    label: 'Verified Workers',
    value: 3500,
    suffix: '+',
  },
  {
    icon: Briefcase,
    label: 'Jobs Completed',
    value: 12000,
    suffix: '+',
  },
  {
    icon: Award,
    label: 'Employers Served',
    value: 800,
    suffix: '+',
  },
  {
    icon: BookOpen,
    label: 'Training Sessions',
    value: 250,
    suffix: '+',
  },
  {
    icon: Heart,
    label: 'Customer Satisfaction',
    value: 96,
    suffix: '%',
  },
];

export default function Impact() {
  return (
    <>
      <Helmet>
        <title>Our Impact - Transforming Communities | KaziLink</title>
      </Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
                Our Impact
              </span>

              <h1 className="heading-xl mt-2">
                Making a Difference
              </h1>

              <p className="text-lg text-ink/60 mt-4">
                KaziLink is committed to creating sustainable impact for
                workers, employers, and communities across Rwanda.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {impactStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Reveal key={stat.label}>
                  <div className="card p-6 text-center card-hover">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-500 mx-auto">
                      <Icon size={24} />
                    </div>

                    <div className="text-2xl font-bold text-primary-500 mt-3">
                      <Counter
                        end={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>

                    <p className="text-sm text-ink/60 mt-1">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <div className="card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Globe size={28} className="text-primary-500" />
                  <h3 className="text-xl font-semibold">
                    Community Impact
                  </h3>
                </div>

                <p className="text-ink/60 leading-relaxed">
                  KaziLink has created sustainable livelihoods for thousands
                  of workers while helping businesses grow with reliable
                  talent.
                </p>
              </div>

              <div className="card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp
                    size={28}
                    className="text-primary-500"
                  />

                  <h3 className="text-xl font-semibold">
                    Economic Growth
                  </h3>
                </div>

                <p className="text-ink/60 leading-relaxed">
                  By connecting talent with opportunity, KaziLink is driving
                  economic growth and building a stronger workforce ecosystem.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}