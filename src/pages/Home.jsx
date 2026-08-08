import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Users, TrendingUp, Award, Briefcase, CheckCircle, Star, User } from 'lucide-react';
import Reveal from '../components/animations/Reveal';
import Counter from '../components/animations/Counter';
import WorkerCard from '../components/ui/WorkerCard';
import ServiceCard from '../components/ui/ServiceCard';
import { workers, services, stats } from '../data';

export default function Home() {
  const featuredWorkers = workers.slice(0, 6);

  return (
    <>
      <Helmet>
        <title>KaziLink - Connect with Verified Workers & Trusted Employers</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 pattern-dots opacity-30" />
        
        <div className="container-custom relative z-10 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield size={16} />
                Trusted Workforce Platform
              </span>
              <h1 className="heading-xl text-balance mb-6">
                Connecting Skills. <br />
                <span className="text-primary-500">Building Trust.</span>
              </h1>
              <p className="text-lg text-ink/70 max-w-lg leading-relaxed mb-8">
                We connect skilled workers with trusted employers through verification, 
                professional development, and ongoing support—creating opportunities 
                that transform lives.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/find-workers" className="btn-primary flex items-center gap-2">
                  Find a Worker
                  <ArrowRight size={18} />
                </Link>
                <Link to="/register" className="btn-secondary">
                  Join as a Worker
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8">
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-primary-500">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm text-ink/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {featuredWorkers.slice(0, 3).map((worker, i) => (
                    <WorkerCard key={worker.id} worker={worker} compact />
                  ))}
                </div>
                <div className="space-y-4 mt-8">
                  {featuredWorkers.slice(3, 6).map((worker, i) => (
                    <WorkerCard key={worker.id} worker={worker} compact />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
              <h2 className="heading-lg mt-2">Our Services</h2>
              <p className="text-ink/60 mt-4">
                From verification to training and dispute resolution, we support both workers and employers 
                throughout the entire employment journey.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.1}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
              <h2 className="heading-lg mt-2">How It Works</h2>
              <p className="text-ink/60 mt-4 mb-8">
                Whether you're a worker looking for opportunities or an employer seeking trusted talent, 
                KaziLink makes the process simple and transparent.
              </p>
              <div className="space-y-4">
                {[
                  { icon: User, title: 'Create Your Profile', desc: 'Sign up and complete your profile with skills and experience.' },
                  { icon: Shield, title: 'Get Verified', desc: 'Pass identity verification, skills assessment, and reference checks.' },
                  { icon: Briefcase, title: 'Get Matched', desc: 'Receive personalized job matches based on your qualifications.' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 bg-white p-4 rounded-xl">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <step.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-sm text-ink/60">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/how-it-works" className="btn-outline mt-6 inline-flex items-center gap-2">
                Learn More
                <ArrowRight size={18} />
              </Link>
            </Reveal>

            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="card p-6 text-center">
                    <div className="text-3xl font-bold text-primary-500">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm text-ink/60 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Real Impact</span>
              <h2 className="heading-lg mt-2">Success Stories</h2>
              <p className="text-ink/60 mt-4">
                Hear from workers and employers who have transformed their lives and businesses through KaziLink.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {['worker', 'employer', 'community'].map((type, index) => (
              <Reveal key={type} delay={index * 0.1}>
                <div className="card p-6 card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-500">
                      <Star size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold capitalize">{type} Story</h4>
                      <p className="text-sm text-ink/60">Inspiring transformation</p>
                    </div>
                  </div>
                  <p className="text-ink/70 leading-relaxed">
                    "KaziLink helped me find work that values my skills. The verification process 
                    gave me credibility and opened doors to better opportunities."
                  </p>
                  <Link to="/success-stories" className="text-primary-500 font-medium text-sm mt-4 inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Read more
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="container-custom relative z-10 text-center text-white">
          <Reveal>
            <h2 className="heading-lg mb-4">Ready to Get Started?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of workers and employers who trust KaziLink to build careers 
              and grow businesses.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-all shadow-lg">
                Join KaziLink Today
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}