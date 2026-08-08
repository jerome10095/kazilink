import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Reveal from '../components/animations/Reveal';
import { CheckCircle, Users, Clock, Award, Shield, Briefcase, ArrowRight } from 'lucide-react';

const benefits = [
  { icon: Shield, title: 'Verified Workforce', desc: 'Access pre-vetted, qualified workers you can trust.' },
  { icon: Clock, title: 'Faster Hiring', desc: 'Skip the lengthy recruitment process.' },
  { icon: Users, title: 'Lower Costs', desc: 'Reduce recruitment and onboarding expenses.' },
  { icon: Award, title: 'Accountability', desc: 'Worker performance tracking and quality assurance.' },
  { icon: Briefcase, title: 'Ongoing Support', desc: 'Dedicated support throughout the employment lifecycle.' },
];

export default function Employers() {
  return (
    <>
      <Helmet>
        <title>For Employers - Hire Trusted Workers | KaziLink</title>
      </Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">For Employers</span>
              <h1 className="heading-xl mt-2">Hire With Confidence</h1>
              <p className="text-lg text-ink/60 mt-4 mb-8">
                Access a verified workforce that meets your standards. KaziLink makes hiring 
                faster, easier, and more reliable.
              </p>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                Partner With Us
                <ArrowRight size={18} />
              </Link>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card p-8">
                <h3 className="text-xl font-semibold mb-4">Why Choose KaziLink?</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-500">
                        <benefit.icon size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{benefit.title}</h4>
                        <p className="text-sm text-ink/60">{benefit.desc}</p>
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