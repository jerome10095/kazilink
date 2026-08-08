import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Briefcase, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/find-workers', label: 'Find Workers' },
  { to: '/employers', label: 'Employers' },
  { to: '/training', label: 'Training' },
  { to: '/impact', label: 'Impact' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="flag-strip">
        <div className="black" />
        <div className="yellow" />
        <div className="green" />
      </div>

      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-white shadow-lg shadow-primary-500/30">
              <Briefcase size={20} strokeWidth={2.5} />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-ink">
              Kazi<span className="text-primary-500">Link</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    isActive 
                      ? 'bg-primary-500 text-white' 
                      : 'text-ink/70 hover:bg-primary-50 hover:text-primary-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="btn-primary text-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-paper-dim"
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-3 text-base font-medium rounded-lg transition-all ${
                        isActive 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-ink/70 hover:bg-primary-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="mt-4 flex flex-col gap-3 border-t border-paper-dim pt-4">
                  <Link
                    to="/login"
                    className="text-center text-sm font-medium text-ink/70 hover:text-ink transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-center text-sm"
                  >
                    Get Started
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}