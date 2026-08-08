import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import ServiceCard from '../components/ui/ServiceCard';
import { services } from '../data';

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Our Services - Worker Verification, Recruitment & Training</title>
      </Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
              <h1 className="heading-xl mt-2">Our Services</h1>
              <p className="text-lg text-ink/60 mt-4">
                Comprehensive workforce solutions designed to build trust, develop skills, 
                and create opportunities.
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
    </>
  );
}