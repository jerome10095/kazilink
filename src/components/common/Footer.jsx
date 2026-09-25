import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { socialUrls } from '../../lib/siteConfig';

const socialLinks = [
  { href: socialUrls.facebook, icon: Facebook, label: 'Facebook' },
  { href: socialUrls.twitter, icon: Twitter, label: 'Twitter/X' },
  { href: socialUrls.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: socialUrls.instagram, icon: Instagram, label: 'Instagram' },
].filter((link) => link.href);

export default function Footer() {
  const { t } = useLanguage();

  const platformLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/find-workers', label: t('nav.workers') },
    { to: '/about', label: t('nav.about') },
  ];

  const companyLinks = [
    { to: '/about', label: t('footer.aboutUs') },
    { to: '/impact', label: t('nav.impact') },
    { to: '/blog', label: t('footer.blog') },
    { to: '/careers', label: t('nav.careers') },
  ];

  const supportLinks = [
    { to: '/contact', label: t('footer.contactUs') },
    { to: '/help', label: t('footer.helpCenter') },
    { to: '/privacy', label: t('footer.privacyPolicy') },
    { to: '/terms', label: t('footer.termsOfService') },
  ];

  return (
    <footer className="bg-primary-800 text-primary-50">
      <div className="flag-strip">
        <div className="black" />
        <div className="yellow" />
        <div className="green" />
      </div>

      <div className="container-custom py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="mb-5 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-500 text-white shadow-soft">
                <Briefcase size={18} />
              </div>
              <span className="text-2xl font-bold text-white">
                Kazi<span className="text-primary-200">Link</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-primary-100/80">
              {t('footer.tagline')}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-500 bg-white/5 text-primary-100 transition-all duration-300 hover:border-primary-200 hover:bg-primary-500"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-base font-semibold text-white">{t('footer.platform')}</h3>
            <ul className="space-y-3 text-sm text-primary-100/80">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                    <ArrowRight size={14} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-base font-semibold text-white">{t('footer.company')}</h3>
            <ul className="space-y-3 text-sm text-primary-100/80">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                    <ArrowRight size={14} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-base font-semibold text-white">{t('footer.support')}</h3>
            <ul className="space-y-3 text-sm text-primary-100/80">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                    <ArrowRight size={14} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-primary-500/40 pt-6 text-sm text-primary-100/80 md:flex-row md:items-center md:justify-between">
          <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
