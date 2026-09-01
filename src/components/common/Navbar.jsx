import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase, LogIn, Sun, Moon, Languages, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/find-workers', label: t('nav.workers') },
    { to: '/about', label: t('nav.about') },
    { to: '/impact', label: t('nav.impact') },
    { to: '/careers', label: t('nav.careers') },
    { to: '/contact', label: t('nav.contact') },
  ];

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
        scrolled
          ? 'bg-white/90 shadow-soft backdrop-blur-md dark:bg-primary-900/90'
          : 'bg-white/80 backdrop-blur-sm dark:bg-primary-900/80'
      }`}
    >
      <div className="flag-strip">
        <div className="black" />
        <div className="yellow" />
        <div className="green" />
      </div>

      <div className="container-custom">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-700 text-white shadow-soft transition-transform duration-300 group-hover:scale-105 dark:bg-primary-400 dark:text-primary-900">
              <Briefcase size={18} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary-800 dark:text-white">
              Kazi<span className="text-primary-500 dark:text-primary-300">Link</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-primary-100 bg-white/80 px-2 py-2 shadow-soft lg:flex dark:border-primary-700/50 dark:bg-primary-800/60">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-700 text-white shadow-soft dark:bg-primary-400 dark:text-primary-900'
                      : 'text-primary-700 hover:bg-primary-50 hover:text-primary-800 dark:text-primary-100 dark:hover:bg-primary-700/60 dark:hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={toggleLanguage}
              className="flex h-11 items-center gap-1.5 rounded-full border border-primary-100 bg-white px-3 text-sm font-semibold text-primary-700 shadow-soft transition-colors hover:bg-primary-50 dark:border-primary-700/50 dark:bg-primary-800 dark:text-primary-100 dark:hover:bg-primary-700"
              aria-label={lang === 'en' ? t('nav.switchToKinyarwanda') : t('nav.switchToEnglish')}
            >
              <Languages size={16} />
              {lang === 'en' ? 'EN' : 'RW'}
            </button>

            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 bg-white text-primary-700 shadow-soft transition-colors hover:bg-primary-50 dark:border-primary-700/50 dark:bg-primary-800 dark:text-primary-100 dark:hover:bg-primary-700"
              aria-label={theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800"
                >
                  <User size={16} />
                  {user?.fullName?.split(' ')[0] ?? t('nav.profile')}
                </Link>
                <button onClick={handleLogout} className="btn-primary text-sm gap-2">
                  <LogOut size={16} />
                  {t('profile.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800"
                >
                  <LogIn size={16} />
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="flex h-11 items-center gap-1 rounded-full border border-primary-100 bg-white px-3 text-sm font-semibold text-primary-700 shadow-soft transition-colors hover:bg-primary-50 dark:border-primary-700/50 dark:bg-primary-800 dark:text-primary-100"
              aria-label={lang === 'en' ? t('nav.switchToKinyarwanda') : t('nav.switchToEnglish')}
            >
              {lang === 'en' ? 'EN' : 'RW'}
            </button>
            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 bg-white text-primary-700 shadow-soft transition-colors hover:bg-primary-50 dark:border-primary-700/50 dark:bg-primary-800 dark:text-primary-100"
              aria-label={theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 bg-white text-primary-800 shadow-soft transition-colors hover:bg-primary-50 dark:border-primary-700/50 dark:bg-primary-800 dark:text-primary-100"
              aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-primary-100 bg-white/95 lg:hidden dark:border-primary-700/50 dark:bg-primary-900/95"
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 text-base font-medium transition-all ${
                        isActive
                          ? 'bg-primary-700 text-white dark:bg-primary-400 dark:text-primary-900'
                          : 'text-primary-700 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="mt-4 flex flex-col gap-3 border-t border-primary-100 pt-4 dark:border-primary-700/50">
                  {isAuthenticated ? (
                    <>
                      <Link to="/profile" className="text-center text-sm font-medium text-primary-700 dark:text-primary-100">
                        {user?.fullName?.split(' ')[0] ?? t('nav.profile')}
                      </Link>
                      <button onClick={handleLogout} className="btn-primary text-sm justify-center gap-2">
                        <LogOut size={16} />
                        {t('profile.logout')}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="text-center text-sm font-medium text-primary-700 dark:text-primary-100">
                        {t('nav.login')}
                      </Link>
                      <Link to="/register" className="btn-primary text-sm">
                        {t('nav.signup')}
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
