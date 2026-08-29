import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Reveal from '../components/animations/Reveal';
import { User, Mail, Lock, Briefcase, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Register() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Register - Join KaziLink</title>
      </Helmet>

      <section className="min-h-[calc(100vh-5rem)] flex items-center section-padding dark:bg-primary-900">
        <div className="container-custom max-w-md mx-auto">
          <Reveal>
            <div className="card p-8">
              <div className="text-center mb-8">
                <h1 className="heading-md dark:text-white">{t('register.heading')}</h1>
                <p className="text-ink/60 mt-2 dark:text-primary-100/70">{t('register.subheading')}</p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('register.fullName')}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-primary-100/50" size={18} />
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('register.emailAddress')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-primary-100/50" size={18} />
                    <input
                      type="email"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('register.password')}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-primary-100/50" size={18} />
                    <input
                      type="password"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                      placeholder={t('register.passwordPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('register.iAmA')}</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-primary-100/50" size={18} />
                    <select className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 appearance-none dark:border-primary-700/50 dark:bg-primary-800 dark:text-white">
                      <option value="">{t('register.selectOne')}</option>
                      <option value="worker">{t('register.worker')}</option>
                      <option value="employer">{t('register.employer')}</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  {t('register.submit')}
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-ink/60 dark:text-primary-100/70">{t('register.haveAccount')}</span>
                <Link to="/login" className="text-primary-500 font-medium hover:underline ml-1 dark:text-primary-300">
                  {t('register.logIn')}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
