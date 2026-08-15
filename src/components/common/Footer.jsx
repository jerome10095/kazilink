import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight, Heart } from 'lucide-react';

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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white">
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
              <a href="#" className="p-2 rounded-full bg-white/5 text-paper/40 hover:bg-primary-500/20 hover:text-primary-400 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 text-paper/40 hover:bg-primary-500/20 hover:text-primary-400 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 text-paper/40 hover:bg-primary-500/20 hover:text-primary-400 transition-colors">
                <Linkedin size={18} />