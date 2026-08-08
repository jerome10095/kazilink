import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact KaziLink - Get in Touch</title>
      </Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
              <h1 className="heading-xl mt-2">Get in Touch</h1>
              <p className="text-lg text-ink/60 mt-4">
                Have questions? We're here to help. Reach out to us through any of these channels.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Reveal>
                <div className="card p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-500">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-ink/60">Phone</p>
                      <p className="font-semibold">+250 788 123 456</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="card p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 text-secondary-500">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-ink/60">Email</p>
                      <p className="font-semibold">hello@kazilink.com</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="card p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-accent-500">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-ink/60">Location</p>
                      <p className="font-semibold">Kigali, Rwanda</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="card p-6">
                  <p className="text-sm text-ink/60 mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    <a href="#" className="p-2 rounded-full bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors">
                      <Youtube size={20} />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="card p-8">
                  <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-ink/70 mb-1">Full Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink/70 mb-1">Email Address</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink/70 mb-1">Subject</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink/70 mb-1">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      Send Message
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}