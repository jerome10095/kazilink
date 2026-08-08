import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import { Users, GraduationCap, Handshake, Briefcase, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const opportunities = [
  { icon: Users, title: 'Join Our Team', desc: 'Work with us to transform the workforce landscape.' },
  { icon: GraduationCap, title: 'Become a Trainer', desc: 'Share your expertise and help others grow.' },
  { icon: Handshake, title: 'Partner With Us', desc: 'Collaborate with KaziLink to create more opportunities.' },
  { icon: Heart, title: 'Volunteer', desc: 'Contribute your skills to our mission.' },
];

export default function Careers() {
  return (
    <>
      <Helmet>
        <title>Careers - Join the KaziLink Team</title>
      </Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Careers</span>
              <h1 className="heading-xl mt-2">Join KaziLink</h1>
              <p className="text-lg text-ink/60 mt-4">
                Be part of a team that's transforming how people connect with opportunity.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {opportunities.map((opp, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="card p-6 card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-500">
                      <opp.icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold">{opp.title}</h3>
                  </div>
                  <p className="text-ink/60 leading-relaxed">{opp.desc}</p>
                  <Link to="/contact" className="mt-4 text-primary-500 font-medium hover:text-primary-600 transition-colors inline-flex items-center gap-1">
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 card p-8 bg-primary-50 border-primary-200 text-center">
              <h2 className="heading-md mb-4">Ready to Make an Impact?</h2>
              <p className="text-ink/60 max-w-2xl mx-auto mb-6">
                Join our mission to connect skills with opportunity. Let's build the future together.
              </p>
              <Link to="/contact" className="btn-primary">
                Get in Touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}