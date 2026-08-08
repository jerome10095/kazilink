import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import { User, Briefcase, Shield, CheckCircle, Users, Star } from 'lucide-react';

export default function HowItWorks() {
  return (
    <>
      <Helmet>
        <title>How KaziLink Works - Simple Process for Workers & Employers</title>
      </Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
              <h1 className="heading-xl mt-2">How It Works</h1>
              <p className="text-lg text-ink/60 mt-4">
                Whether you're a worker or an employer, KaziLink makes it easy to connect 
                and build trusted relationships.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Workers */}
            <Reveal>
              <div className="card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-500">
                    <User size={24} />
                  </div>
                  <h2 className="text-2xl font-semibold">For Workers</h2>
                </div>
                <div className="space-y-6">
                  {[
                    { icon: User, title: 'Register', desc: 'Sign up online or visit a KaziLink office near you.' },
                    { icon: Shield, title: 'Complete Profile', desc: 'Add your skills, experience, and qualifications.' },
                    { icon: CheckCircle, title: 'Get Verified', desc: 'Pass identity verification, skills assessment, and reference checks.' },
                    { icon: Star, title: 'Training', desc: 'Access soft-skills training and career coaching.' },
                    { icon: Briefcase, title: 'Get Matched', desc: 'Receive personalized job matches and build your reputation.' },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-500">
                        <step.icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-sm text-ink/60">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* For Employers */}
            <Reveal delay={0.2}>
              <div className="card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 text-secondary-500">
                    <Briefcase size={24} />
                  </div>
                  <h2 className="text-2xl font-semibold">For Employers</h2>
                </div>
                <div className="space-y-6">
                  {[
                    { icon: User, title: 'Create Account', desc: 'Sign up and describe your workforce needs.' },
                    { icon: Briefcase, title: 'Post Job', desc: 'List your position and requirements.' },
                    { icon: Users, title: 'Get Matched', desc: 'Receive verified worker recommendations.' },
                    { icon: Shield, title: 'Hire Confidently', desc: 'Onboard workers with our support.' },
                    { icon: Star, title: 'Give Feedback', desc: 'Rate workers and help build trust.' },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-secondary-500">
                        <step.icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-sm text-ink/60">{step.desc}</p>
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