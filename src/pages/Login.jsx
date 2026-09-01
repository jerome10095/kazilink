import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Reveal from '../components/animations/Reveal';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import GoogleButton, { GOOGLE_SIGN_IN_ENABLED } from '../components/auth/GoogleButton';

export default function Login() {
  const { t } = useLanguage();
  const { login, isAuthenticated, needsProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (needsProfile) {
      navigate('/register', { replace: true });
    } else if (isAuthenticated) {
      navigate(location.state?.from ?? '/profile', { replace: true });
    }
  }, [loading, isAuthenticated, needsProfile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

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

              {error && (
                <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('login.emailAddress')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-primary-100/50" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
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
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
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

                <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
                  {submitting ? t('login.submitting') : t('login.submit')}
                  {!submitting && <ArrowRight size={18} />}
                </button>
              </form>

              {GOOGLE_SIGN_IN_ENABLED && (
                <>
                  <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wide text-ink/40 dark:text-primary-100/40">
                    <span className="h-px flex-1 bg-paper-dim dark:bg-primary-700/50" />
                    {t('login.orDivider')}
                    <span className="h-px flex-1 bg-paper-dim dark:bg-primary-700/50" />
                  </div>
                  <GoogleButton />
                </>
              )}

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
