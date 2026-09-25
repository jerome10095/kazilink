import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Reveal from '../components/animations/Reveal';
import { User, Mail, Lock, Briefcase, ArrowRight, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import useServices from '../hooks/useServices';
import GoogleButton, { GOOGLE_SIGN_IN_ENABLED } from '../components/auth/GoogleButton';

const initialForm = { fullName: '', email: '', password: '', role: '', serviceId: '', trade: '', companyName: '' };

export default function Register() {
  const { t, pick } = useLanguage();
  const { register, completeProfile, isAuthenticated, needsProfile, loading, authUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const services = useServices();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated && !needsProfile) {
      navigate(location.state?.from ?? '/profile', { replace: true });
    }
  }, [loading, isAuthenticated, needsProfile, navigate, location.state?.from]);

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.role) {
      setError(t('register.iAmA'));
      return;
    }

    setSubmitting(true);
    try {
      if (needsProfile) {
        await completeProfile({
          role: form.role,
          serviceId: form.role === 'worker' && form.serviceId ? form.serviceId : undefined,
          trade: form.role === 'worker' && form.trade ? form.trade : undefined,
          companyName: form.role === 'employer' ? form.companyName : undefined,
        });
      } else {
        await register({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          role: form.role,
          serviceId: form.role === 'worker' && form.serviceId ? form.serviceId : undefined,
          trade: form.role === 'worker' && form.trade ? form.trade : undefined,
          companyName: form.role === 'employer' ? form.companyName : undefined,
        });
      }
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

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
                <h1 className="heading-md dark:text-white">{needsProfile ? t('register.finishHeading') : t('register.heading')}</h1>
                <p className="text-ink/60 mt-2 dark:text-primary-100/70">{needsProfile ? t('register.finishSubheading') : t('register.subheading')}</p>
              </div>

              {error && (
                <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {needsProfile ? (
                  <div className="rounded-xl border border-primary-100 bg-primary-50/60 p-4 text-sm text-primary-800 dark:border-primary-700/50 dark:bg-primary-800/40 dark:text-primary-100">
                    {t('register.continuingAs')} <strong>{authUser?.user_metadata?.full_name}</strong> ({authUser?.email})
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('register.fullName')}</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-primary-100/50" size={18} />
                        <input
                          type="text"
                          required
                          value={form.fullName}
                          onChange={updateField('fullName')}
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
                          required
                          value={form.email}
                          onChange={updateField('email')}
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
                          required
                          minLength={8}
                          value={form.password}
                          onChange={updateField('password')}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                          placeholder={t('register.passwordPlaceholder')}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('register.iAmA')}</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-primary-100/50" size={18} />
                    <select
                      required
                      value={form.role}
                      onChange={updateField('role')}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 appearance-none dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                    >
                      <option value="">{t('register.selectOne')}</option>
                      <option value="worker">{t('register.worker')}</option>
                      <option value="employer">{t('register.employer')}</option>
                    </select>
                  </div>
                </div>

                {form.role === 'worker' && services.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('register.serviceCategory')}</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-primary-100/50" size={18} />
                      <select
                        required
                        value={form.serviceId}
                        onChange={updateField('serviceId')}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 appearance-none dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                      >
                        <option value="">{t('register.selectService')}</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {pick(service.title, service.titleRw)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {form.role === 'worker' && (
                  <div>
                    <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('register.trade')}</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-primary-100/50" size={18} />
                      <input
                        type="text"
                        required={services.length === 0}
                        value={form.trade}
                        onChange={updateField('trade')}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                        placeholder={t('register.tradePlaceholder')}
                      />
                    </div>
                  </div>
                )}

                {form.role === 'employer' && (
                  <div>
                    <label className="block text-sm font-medium text-ink/70 mb-1 dark:text-primary-100">{t('register.companyName')}</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-primary-100/50" size={18} />
                      <input
                        type="text"
                        required
                        value={form.companyName}
                        onChange={updateField('companyName')}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                        placeholder={t('register.companyNamePlaceholder')}
                      />
                    </div>
                  </div>
                )}

                <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
                  {submitting ? t('register.submitting') : needsProfile ? t('register.finishSubmit') : t('register.submit')}
                  {!submitting && <ArrowRight size={18} />}
                </button>
              </form>

              {!needsProfile && GOOGLE_SIGN_IN_ENABLED && (
                <>
                  <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wide text-ink/40 dark:text-primary-100/40">
                    <span className="h-px flex-1 bg-paper-dim dark:bg-primary-700/50" />
                    {t('register.orDivider')}
                    <span className="h-px flex-1 bg-paper-dim dark:bg-primary-700/50" />
                  </div>
                  <GoogleButton />
                </>
              )}

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
