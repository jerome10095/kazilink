import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import Counter from '../components/animations/Counter';
import { stats } from '../data';
import { Shield, Target, Eye, Heart, Users, Briefcase } from 'lucide-react';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About KaziLink - Our Mission & Vision</title>
      </Helmet>

      {/* Hero */}
      <section className="section-padding gradient-hero">
        <div className="container-custom text-center">
          <Reveal>
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="heading-xl mt-2">Who We Are</h1>
            <p className="text-lg text-ink/70 max-w-3xl mx-auto mt-4">
              KaziLink was created to solve one simple problem: talented people struggle to find 
              opportunities because trust is difficult to build.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Reveal>
              <div className="card p-8 text-center card-hover">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-500 mx-auto">
                  <Target size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-4">Our Mission</h3>
                <p className="text-ink/60 mt-2">
                  To connect skilled workers with trusted employers, creating opportunities 
                  that transform lives and communities.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card p-8 text-center card-hover">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100 text-secondary-500 mx-auto">
                  <Eye size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-4">Our Vision</h3>
                <p className="text-ink/60 mt-2">
                  A world where every skilled worker is recognized, and every employer 
                  can hire with confidence.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card p-8 text-center card-hover">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 text-accent-500 mx-auto">
                  <Heart size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-4">Our Values</h3>
                <p className="text-ink/60 mt-2">
                  Trust, transparency, and empowerment. We believe in creating 
                  opportunities that uplift everyone.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat) => (
              <Reveal key={stat.label}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-500">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-ink/60 mt-1">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}