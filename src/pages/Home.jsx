import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Shield, 
  Users, 
  TrendingUp, 
  Award, 
  Briefcase, 
  CheckCircle, 
  Star, 
  User,
  BarChart3,
  Clock,
  MapPin,
  MessageCircle,
  ThumbsUp,
  Sparkles,
  Zap
} from 'lucide-react';
import Reveal from '../components/animations/Reveal';
import Counter from '../components/animations/Counter';
import WorkerCard from '../components/ui/WorkerCard';
import ServiceCard from '../components/ui/ServiceCard';
import { workers, services, stats } from '../data';

export default function Home() {
  const featuredWorkers = workers.slice(0, 6);
  const topRated = workers.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>KaziLink - Connect with Verified Workers & Trusted Employers</title>
      </Helmet>

      {/* Hero Section - Modern Dashboard Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary-100/30 to-secondary-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-accent-100/20 to-primary-100/20 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-100 px-4 py-2 rounded-full text-sm font-medium text-primary-700 shadow-sm mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Active Platform</span>
                <span className="w-px h-4 bg-primary-200" />
                <span className="text-primary-500">12,000+ Jobs Completed</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Connecting Skills.
                <br />
                <span className="text-primary-500 relative">
                  Building Trust.
                  <svg className="absolute bottom-0 left-0 w-full h-3 text-primary-200/50 -z-10" viewBox="0 0 100 10">
                    <path d="M0 5 Q25 10 50 5 Q75 0 100 5" stroke="currentColor" fill="none" strokeWidth="2" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg text-ink/70 max-w-lg leading-relaxed mb-8">
                We connect skilled workers with trusted employers through verification, 
                professional development, and ongoing support—creating opportunities 
                that transform lives.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/find-workers" className="group relative inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50">
                  Find a Worker
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link to="/register" className="inline-flex items-center gap-2 bg-white text-ink px-8 py-3.5 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-md border border-paper-dim">
                  <User size={18} />
                  Join as a Worker
                </Link>
              </div>

              {/* Stats - Modern Card Style */}
              <div className="grid grid-cols-3 gap-4">
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-paper-dim shadow-sm">
                    <div className="text-2xl font-bold text-primary-500">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs text-ink/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Modern Card Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Top Rated Workers */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-paper-dim shadow-xl mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-ink">Top Rated Workers</h3>
                  <span className="text-xs text-primary-500 font-medium">View All →</span>
                </div>
                <div className="space-y-3">
                  {topRated.map((worker, i) => (
                    <div key={worker.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary-50 transition-colors">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white font-bold text-sm ${worker.verified ? 'verified-ring' : ''}`}>
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-500">
                          {worker.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-sm truncate">{worker.name}</span>
                          {worker.verified && <Shield size={12} className="text-secondary-500" />}
                        </div>
                        <p className="text-xs text-ink/60">{worker.trade}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-accent-50 px-2 py-1 rounded-full">
                        <Star size={12} className="fill-accent-500 text-accent-500" />
                        <span className="text-xs font-semibold">{worker.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-5 text-white shadow-lg shadow-primary-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Briefcase size={20} />
                    </div>
                    <span className="text-sm font-medium">Post a Job</span>
                  </div>
                  <p className="text-xs text-white/80">Find the right talent</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-paper-dim shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-secondary-50 p-2 rounded-lg text-secondary-500">
                      <MessageCircle size={20} />
                    </div>
                    <span className="text-sm font-medium">Get Support</span>
                  </div>
                  <p className="text-xs text-ink/60">We're here to help</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Modern Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-wider bg-primary-50 px-4 py-1.5 rounded-full mb-3">What We Offer</span>
              <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
              <p className="text-ink/60 mt-4">
                From verification to training and dispute resolution, we support both workers and employers 
                throughout the entire employment journey.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.1}>
                <div className="group relative bg-white rounded-2xl p-6 border border-paper-dim hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 mb-4">
                      <ServiceIcon icon={service.icon} size={28} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-ink/60 leading-relaxed">{service.description}</p>
                    <div className="mt-4 flex items-center text-primary-500 font-medium text-sm group-hover:gap-2 transition-all">
                      Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Modern Cards */}
      <section className="section-padding bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-wider bg-primary-100 px-4 py-1.5 rounded-full mb-3">Simple Process</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-ink/60 mb-8">
                Whether you're a worker looking for opportunities or an employer seeking trusted talent, 
                KaziLink makes the process simple and transparent.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: User, color: 'primary', title: 'Create Your Profile', desc: 'Sign up and complete your profile with skills and experience.' },
                  { icon: Shield, color: 'secondary', title: 'Get Verified', desc: 'Pass identity verification, skills assessment, and reference checks.' },
                  { icon: Briefcase, color: 'accent', title: 'Get Matched', desc: 'Receive personalized job matches based on your qualifications.' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 bg-white p-5 rounded-2xl shadow-sm border border-paper-dim hover:shadow-md transition-shadow">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-${step.color}-100 text-${step.color}-500`}>
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

            {/* Stats Dashboard */}
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 text-center border border-paper-dim hover:shadow-lg transition-shadow">
                    <div className="text-3xl font-bold text-primary-500">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm text-ink/60 mt-1">{stat.label}</p>
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Workers - Modern Showcase */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-wider bg-primary-50 px-4 py-1.5 rounded-full mb-3">Top Talent</span>
                <h2 className="text-3xl md:text-4xl font-bold">Featured Workers</h2>
              </div>
              <Link to="/find-workers" className="text-primary-500 font-medium hover:gap-2 transition-all inline-flex items-center gap-1">
                View All <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorkers.map((worker) => (
              <Reveal key={worker.id}>
                <WorkerCard worker={worker} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Design */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="container-custom relative z-10 text-center text-white">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles size={16} />
                Join 5,000+ verified workers
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                Join thousands of workers and employers who trust KaziLink to build careers 
                and grow businesses.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register" className="bg-white text-primary-600 px-8 py-3.5 rounded-full font-semibold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                  <Zap size={18} />
                  Join KaziLink Today
                </Link>
                <Link to="/contact" className="border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2">
                  Contact Us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

// Helper component for service icons
function ServiceIcon({ icon, size = 24 }) {
  const icons = {
    Shield,
    Users,
    TrendingUp,
    Award,
    CheckCircle,
    BookOpen: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
  };
  const IconComponent = icons[icon] || Shield;
  return <IconComponent size={size} />;
}