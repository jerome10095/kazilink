import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Reveal from '../components/animations/Reveal';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Login - KaziLink</title>
      </Helmet>

      <section className="min-h-[calc(100vh-5rem)] flex items-center section-padding dark:bg-primary-900">
        <div className="container-custom max-w-md mx-auto">
          <Reveal>
            <div className="card p-8">
              <div className="text-center mb-8">
                <h1 className="heading-md dark:text-white">{t('login.heading')}</h1>
                <p className="text-ink/60 mt-2 dark:text-primary-100/70">{t('login.subheading')}</p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('login.emailAddress')}</label>
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
                  <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('login.password')}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-primary-100/50" size={18} />
                    <input
                      type="password"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                      placeholder={t('login.passwordPlaceholder')}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 dark:text-primary-100/80">
                    <input type="checkbox" className="rounded border-paper-dim" />
                    {t('login.rememberMe')}
                  </label>
                  <Link to="/forgot-password" className="text-primary-500 hover:underline dark:text-primary-300">
                    {t('login.forgotPassword')}
                  </Link>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  {t('login.submit')}
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-ink/60 dark:text-primary-100/70">{t('login.noAccount')}</span>
                <Link to="/register" className="text-primary-500 font-medium hover:underline ml-1 dark:text-primary-300">
                  {t('login.signUpNow')}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
