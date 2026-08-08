import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const quickLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/find-workers', label: 'Find Workers' },
  { to: '/employers', label: 'For Employers' },
  { to: '/training', label: 'Training' },
  { to: '/success-stories', label: 'Success Stories' },
];

const resources = [
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/impact', label: 'Our Impact' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80">
      <div className="flag-strip">
        <div className="black" />
        <div className="yellow" />
        <div className="green" />
      </div>

      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-white">
                <Briefcase size={18} />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Kazi<span className="text-primary-400">Link</span>
              </span>
            </Link>
            <p className="text-sm text-paper/60 leading-relaxed">
              Connecting skilled workers with trusted employers through verification, 
              professional development, and ongoing support.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-paper/40 hover:text-paper transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-paper/40 hover:text-paper transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-paper/40 hover:text-paper transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-paper/40 hover:text-paper transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              {resources.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-400 shrink-0 mt-0.5" />
                <span>Kigali, Rwanda</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary-400 shrink-0 mt-0.5" />
                <span>hello@kazilink.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary-400 shrink-0 mt-0.5" />
                <span>+250 788 123 456</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-paper/40">
          <span>© {new Date().getFullYear()} KaziLink. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}