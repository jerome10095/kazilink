import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import { Mail, Phone, MapPin, Clock3, Send, Facebook, Twitter, Linkedin, Instagram, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    setSending(true);
    try {
      await api.sendContactMessage(form);
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const contactDetails = [
    { icon: Phone, title: t('contact.phoneLabel'), value: '+250 788 123 456' },
    { icon: Mail, title: t('contact.emailLabel'), value: 'info@kazilink.rw' },
    { icon: MapPin, title: t('contact.locationLabel'), value: 'Kigali, Rwanda' },
    { icon: Clock3, title: t('contact.hoursLabel'), value: t('contact.hoursValue') },
  ];

  return (
    <>
      <Helmet>
        <title>Contact KaziLink - Get in Touch</title>
      </Helmet>

      <section className="section-padding bg-primary-50/40 dark:bg-primary-800/40">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                {t('contact.badge')}
              </span>
              <h1 className="mt-3 text-4xl font-bold text-primary-800 md:text-5xl dark:text-white">{t('contact.heading')}</h1>
              <p className="mt-4 text-lg text-primary-700/75 dark:text-primary-100/75">
                {t('contact.paragraph')}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.35fr]">
            <div className="space-y-5">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.06}>
                    <div className="card p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                          <Icon size={22} />
                        </div>
                        <div>
                          <p className="text-sm text-primary-700/65 dark:text-primary-100/65">{item.title}</p>
                          <p className="mt-1 text-base font-semibold text-primary-800 dark:text-white">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}

              <Reveal delay={0.2}>
                <div className="card p-6">
                  <p className="mb-3 text-sm text-primary-700/70 dark:text-primary-100/70">{t('contact.social')}</p>
                  <div className="flex items-center gap-3">
                    {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                      <a
                        key={index}
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 transition-all duration-300 hover:bg-primary-700 hover:text-white dark:bg-primary-700 dark:text-primary-100 dark:hover:bg-primary-400 dark:hover:text-primary-900"
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="card p-8">
                <h2 className="mb-6 text-3xl font-semibold text-primary-800 dark:text-white">{t('contact.formHeading')}</h2>

                {error && (
                  <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="mb-6 flex items-start gap-2 rounded-xl border border-secondary-200 bg-secondary-50 p-3 text-sm text-secondary-700 dark:border-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                    <span>{t('contact.sendSuccess')}</span>
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-100">{t('contact.fullName')}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={updateField('name')}
                        placeholder={t('contact.fullNamePlaceholder')}
                        className="w-full rounded-2xl border border-primary-100 bg-primary-50/30 px-4 py-3 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white dark:placeholder:text-primary-100/50"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-100">{t('contact.emailAddress')}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={updateField('email')}
                        placeholder="your@email.com"
                        className="w-full rounded-2xl border border-primary-100 bg-primary-50/30 px-4 py-3 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white dark:placeholder:text-primary-100/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-100">{t('contact.subject')}</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={updateField('subject')}
                      placeholder={t('contact.subjectPlaceholder')}
                      className="w-full rounded-2xl border border-primary-100 bg-primary-50/30 px-4 py-3 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white dark:placeholder:text-primary-100/50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-100">{t('contact.message')}</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={updateField('message')}
                      placeholder={t('contact.messagePlaceholder')}
                      className="w-full resize-none rounded-2xl border border-primary-100 bg-primary-50/30 px-4 py-3 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white dark:placeholder:text-primary-100/50"
                    />
                  </div>

                  <button type="submit" disabled={sending} className="btn-primary w-full gap-2 disabled:opacity-60">
                    {sending ? t('contact.sending') : t('contact.sendMessage')} {!sending && <Send size={18} />}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
