import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Reveal from '../components/animations/Reveal';
import { CheckCircle2, AlertCircle, LogOut, ShieldCheck, Camera, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import useServices from '../hooks/useServices';

export default function Profile() {
  const { t, pick } = useLanguage();
  const services = useServices();
  const { user, updateProfile, uploadAvatar, logout } = useAuth();
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);

  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState('');

  useEffect(() => {
    if (!user) return;
    setForm({
      fullName: user.fullName ?? '',
      phone: user.phone ?? '',
      serviceId: user.worker?.serviceId ?? '',
      trade: user.worker?.trade ?? '',
      bio: user.worker?.bio ?? '',
      location: user.worker?.location ?? user.employer?.location ?? '',
      experienceYears: user.worker?.experienceYears ?? 0,
      rate: user.worker?.rate ?? 0,
      available: user.worker?.available ?? true,
      companyName: user.employer?.companyName ?? '',
      companyDescription: user.employer?.companyDescription ?? '',
      industry: user.employer?.industry ?? '',
      website: user.employer?.website ?? '',
    });
  }, [user]);

  if (!user || !form) return null;

  const updateField = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    setSaving(true);
    try {
      const payload = { fullName: form.fullName, phone: form.phone };
      if (user.role === 'worker') {
        Object.assign(payload, {
          trade: form.trade,
          ...(form.serviceId ? { serviceId: form.serviceId } : {}),
          bio: form.bio,
          location: form.location,
          experienceYears: Number(form.experienceYears),
          rate: Number(form.rate),
          available: form.available,
        });
      } else if (user.role === 'employer') {
        Object.assign(payload, {
          companyName: form.companyName,
          companyDescription: form.companyDescription,
          industry: form.industry,
          location: form.location,
          website: form.website,
        });
      }
      await updateProfile(payload);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setAvatarError('');
    setAvatarUploading(true);
    try {
      await uploadAvatar(file);
    } catch (err) {
      setAvatarError(err.message);
    } finally {
      setAvatarUploading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Your Profile - KaziLink</title>
      </Helmet>

      <section className="section-padding dark:bg-primary-900">
        <div className="container-custom max-w-2xl mx-auto">
          <Reveal>
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h1 className="heading-md dark:text-white">{t('profile.heading')}</h1>
                <p className="text-ink/60 mt-1 dark:text-primary-100/70">{t('profile.subheading')}</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary-100 px-4 py-2 text-sm font-medium text-primary-700 transition hover:bg-primary-50 dark:border-primary-700/50 dark:text-primary-100 dark:hover:bg-primary-800"
              >
                <LogOut size={16} /> {t('profile.logout')}
              </button>
            </div>

            <div className="card p-8">
              <div className="mb-2 flex flex-wrap items-center gap-3 border-b border-paper-dim pb-6 dark:border-primary-700/50">
                <div className="relative h-14 w-14 shrink-0">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-lg font-semibold text-white">
                      {user.fullName.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={avatarUploading}
                    aria-label={t('profile.changePhoto')}
                    className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-700 text-white shadow-soft transition hover:bg-primary-800 disabled:opacity-60 dark:bg-primary-400 dark:text-primary-900"
                  >
                    {avatarUploading ? <Loader2 size={12} className="animate-spin" /> : <Camera size={12} />}
                  </button>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <p className="font-semibold text-ink dark:text-white">{user.email}</p>
                  <p className="text-sm text-ink/60 dark:text-primary-100/70">
                    {t('profile.accountType')}: {user.role === 'worker' ? t('register.worker') : t('register.employer')}
                    {(user.worker?.verified || user.employer?.verified) && (
                      <span className="ml-2 inline-flex items-center gap-1 text-secondary-600 dark:text-secondary-400">
                        <ShieldCheck size={14} /> {t('workerCard.verified')}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {avatarError && (
                <p className="mb-6 text-sm text-red-600 dark:text-red-400">{avatarError}</p>
              )}

              {error && (
                <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="mb-6 flex items-start gap-2 rounded-xl border border-secondary-200 bg-secondary-50 p-3 text-sm text-secondary-700 dark:border-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                  <span>{t('profile.saveSuccess')}</span>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('register.fullName')}</label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={updateField('fullName')}
                      className="w-full rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('profile.phone')}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={updateField('phone')}
                      placeholder={t('profile.phonePlaceholder')}
                      className="w-full rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                    />
                  </div>
                </div>

                {user.role === 'worker' && (
                  <>
                    {services.length > 0 && (
                      <div>
                        <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('register.serviceCategory')}</label>
                        <select
                          value={form.serviceId}
                          onChange={updateField('serviceId')}
                          className="w-full rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                        >
                          <option value="">{t('register.selectService')}</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {pick(service.title, service.titleRw)}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('register.trade')}</label>
                        <input
                          type="text"
                          required
                          value={form.trade}
                          onChange={updateField('trade')}
                          className="w-full rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('profile.location')}</label>
                        <input
                          type="text"
                          value={form.location}
                          onChange={updateField('location')}
                          className="w-full rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('profile.bio')}</label>
                      <textarea
                        rows={4}
                        value={form.bio}
                        onChange={updateField('bio')}
                        placeholder={t('profile.bioPlaceholder')}
                        className="w-full resize-none rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('profile.experience')}</label>
                        <input
                          type="number"
                          min="0"
                          value={form.experienceYears}
                          onChange={updateField('experienceYears')}
                          className="w-full rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('profile.rate')}</label>
                        <input
                          type="number"
                          min="0"
                          value={form.rate}
                          onChange={updateField('rate')}
                          className="w-full rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 text-sm text-ink/70 dark:text-primary-100">
                      <input type="checkbox" checked={form.available} onChange={updateField('available')} className="rounded border-paper-dim" />
                      {t('profile.available')}
                    </label>
                  </>
                )}

                {user.role === 'employer' && (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('profile.companyName')}</label>
                        <input
                          type="text"
                          required
                          value={form.companyName}
                          onChange={updateField('companyName')}
                          className="w-full rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('profile.industry')}</label>
                        <input
                          type="text"
                          value={form.industry}
                          onChange={updateField('industry')}
                          placeholder={t('profile.industryPlaceholder')}
                          className="w-full rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('profile.companyDescription')}</label>
                      <textarea
                        rows={4}
                        value={form.companyDescription}
                        onChange={updateField('companyDescription')}
                        placeholder={t('profile.companyDescriptionPlaceholder')}
                        className="w-full resize-none rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('profile.location')}</label>
                        <input
                          type="text"
                          value={form.location}
                          onChange={updateField('location')}
                          className="w-full rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-ink/70 dark:text-primary-100">{t('profile.website')}</label>
                        <input
                          type="url"
                          value={form.website}
                          onChange={updateField('website')}
                          placeholder={t('profile.websitePlaceholder')}
                          className="w-full rounded-xl border border-paper-dim px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-800 dark:text-white"
                        />
                      </div>
                    </div>
                  </>
                )}

                <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
                  {saving ? t('profile.saving') : t('profile.save')}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
