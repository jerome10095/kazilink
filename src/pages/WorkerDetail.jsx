import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  Star,
  StarHalf,
  ShieldCheck,
  MapPin,
  Clock,
  MessageCircle,
  Briefcase,
  Award,
  Calendar,
  CheckCircle,
  X,
} from 'lucide-react';
import Reveal from '../components/animations/Reveal';
import WorkerCard from '../components/ui/WorkerCard';
import { LoadingState, ErrorState } from '../components/ui/AsyncState';
import { api } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function WorkerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, pick } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [worker, setWorker] = useState(null);
  const [relatedWorkers, setRelatedWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [sendError, setSendError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    setNotFound(false);

    api.getWorker(id)
      .then(async ({ worker: row }) => {
        if (cancelled) return;
        setWorker(row);

        try {
          const { workers: related } = await api.getWorkers({
            trade: row.trade,
            limit: 4,
            exclude: id,
          });
          if (!cancelled) setRelatedWorkers(related || []);
        } catch {
          if (!cancelled) setRelatedWorkers([]);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 404) setNotFound(true);
        else setError(t('common.loadError'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, t]);

  const handleContact = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/workers/${id}` } });
      return;
    }

    setSendError('');
    setSendingMessage(true);
    try {
      await api.sendContactMessage({
        name: user.fullName,
        email: user.email,
        subject: `Inquiry about ${worker.name}`,
        message: contactMessage || `I'm interested in hiring ${worker.name} for a job.`,
      });
      setMessageSent(true);
      setContactMessage('');
      setTimeout(() => {
        setShowContactModal(false);
        setMessageSent(false);
      }, 3000);
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSendingMessage(false);
    }
  };

  if (loading) {
    return (
      <section className="section-padding dark:bg-primary-900">
        <div className="container-custom">
          <LoadingState label={t('common.loading')} />
        </div>
      </section>
    );
  }

  if (error || notFound || !worker) {
    return (
      <section className="section-padding dark:bg-primary-900">
        <div className="container-custom">
          {error ? (
            <ErrorState message={error} />
          ) : (
            <div className="rounded-[28px] border border-dashed border-primary-200 bg-primary-50/40 p-10 text-center dark:border-primary-700 dark:bg-primary-800/40">
              <h1 className="text-xl font-semibold text-primary-800 dark:text-white">{t('workerDetail.notFoundTitle')}</h1>
              <p className="mt-2 text-sm text-primary-700/75 dark:text-primary-100/75">{t('workerDetail.notFoundBody')}</p>
            </div>
          )}
          <div className="mt-6 text-center">
            <Link to="/find-workers" className="btn-primary">
              <ArrowLeft size={18} className="mr-2" />
              {t('workerDetail.backToWorkers')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const trade = pick(worker.trade, worker.tradeRw);
  const bio = pick(worker.bio, worker.bioRw);
  const initials = worker.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={18} className="fill-accent-500 text-accent-500" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={18} className="fill-accent-500 text-accent-500" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={18} className="text-primary-200 dark:text-primary-700" />);
    }
    return stars;
  };

  return (
    <>
      <Helmet>
        <title>{`${worker.name} - ${trade} | KaziLink`}</title>
        <meta name="description" content={bio} />
      </Helmet>

      <section className="section-padding bg-paper dark:bg-primary-900">
        <div className="container-custom">
          <Reveal>
            <Link
              to="/find-workers"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-100"
            >
              <ArrowLeft size={16} />
              {t('workerDetail.backToWorkers')}
            </Link>
          </Reveal>

          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal>
                <div className="card p-6 md:p-8">
                  <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                    <div className={`relative ${worker.verified ? 'verified-ring' : ''}`}>
                      {worker.avatarUrl ? (
                        <img
                          src={worker.avatarUrl}
                          alt={worker.name}
                          className="h-24 w-24 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-500 text-3xl font-bold text-white">
                          {initials}
                        </div>
                      )}
                      {worker.verified && (
                        <ShieldCheck
                          size={24}
                          className="absolute -bottom-1 -right-1 rounded-full bg-white text-secondary-500 dark:bg-primary-800"
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-3xl font-bold text-primary-800 dark:text-white">{worker.name}</h1>
                        {worker.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300">
                            <ShieldCheck size={14} />
                            {t('workerCard.verified')}
                          </span>
                        )}
                      </div>
                      <p className="text-lg font-medium text-primary-600 dark:text-primary-300">{trade}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-primary-600 dark:text-primary-300">
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {worker.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {worker.experience} {t('common.years')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase size={16} />
                          {worker.available ? (
                            <span className="text-green-600 dark:text-green-400">{t('workerCard.available')}</span>
                          ) : (
                            <span className="text-red-600 dark:text-red-400">{t('workerCard.busy')}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-primary-100 pt-6 dark:border-primary-700/50">
                    <div className="flex items-center gap-0.5">{renderStars(worker.rating)}</div>
                    <span className="font-bold text-primary-800 dark:text-white">{worker.rating}</span>
                    <span className="text-sm text-primary-500 dark:text-primary-300">
                      ({worker.reviewCount} {worker.reviewCount === 1 ? t('workerDetail.review') : t('workerDetail.reviews')})
                    </span>
                  </div>

                  {bio && (
                    <div className="mt-6">
                      <h2 className="text-xl font-semibold text-primary-800 dark:text-white">{t('workerDetail.about')}</h2>
                      <p className="mt-3 leading-relaxed text-primary-700/75 dark:text-primary-100/70">{bio}</p>
                    </div>
                  )}

                  {worker.skills.length > 0 && (
                    <div className="mt-6">
                      <h2 className="text-xl font-semibold text-primary-800 dark:text-white">{t('workerDetail.skills')}</h2>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {worker.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 dark:bg-primary-700/60 dark:text-primary-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-6 card p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-primary-800 dark:text-white">{t('workerDetail.reviewsTitle')}</h2>
                  <div className="mt-4 rounded-2xl border border-dashed border-primary-200 bg-primary-50/40 p-8 text-center text-primary-600 dark:border-primary-700 dark:bg-primary-800/40 dark:text-primary-300">
                    <p>{t('workerDetail.reviewsEmpty')}</p>
                    <p className="mt-2 text-sm">{t('workerDetail.reviewsEmptyCta')}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <div className="card p-6">
                  <h2 className="text-xl font-semibold text-primary-800 dark:text-white">{t('workerDetail.rate')}</h2>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary-700 dark:text-primary-200">
                      {worker.rate.toLocaleString()}
                    </span>
                    <span className="text-sm text-primary-500 dark:text-primary-300">
                      RWF {t('common.perDay')}
                    </span>
                  </div>

                  <hr className="my-4 border-primary-100 dark:border-primary-700/50" />

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-700/60 dark:text-primary-200">
                        <Award size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-primary-500 dark:text-primary-300">{t('workerDetail.experience')}</p>
                        <p className="font-medium text-primary-800 dark:text-white">
                          {worker.experience} {t('common.years')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-700/60 dark:text-primary-200">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-primary-500 dark:text-primary-300">{t('workerDetail.location')}</p>
                        <p className="font-medium text-primary-800 dark:text-white">{worker.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-700/60 dark:text-primary-200">
                        <Calendar size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-primary-500 dark:text-primary-300">{t('workerCard.available')}</p>
                        <p className={`font-medium ${worker.available ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {worker.available ? t('workerCard.available') : t('workerCard.busy')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4 border-primary-100 dark:border-primary-700/50" />

                  <button onClick={() => setShowContactModal(true)} className="btn-primary w-full gap-2">
                    <MessageCircle size={18} />
                    {t('workerDetail.contactCta')}
                  </button>

                  {!isAuthenticated && (
                    <p className="mt-3 text-center text-xs text-primary-500 dark:text-primary-300">
                      {t('workerDetail.loginRequired')}
                    </p>
                  )}
                </div>
              </Reveal>

              {relatedWorkers.length > 0 && (
                <Reveal delay={0.15}>
                  <div className="mt-6">
                    <h3 className="mb-4 text-lg font-semibold text-primary-800 dark:text-white">
                      {t('workerDetail.similarWorkers')}
                    </h3>
                    <div className="space-y-3">
                      {relatedWorkers.slice(0, 3).map((related) => (
                        <WorkerCard key={related.id} worker={related} compact />
                      ))}
                    </div>
                    <Link
                      to="/find-workers"
                      className="mt-4 inline-block text-sm font-medium text-primary-600 hover:underline dark:text-primary-300"
                    >
                      {t('common.viewAll')} →
                    </Link>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-strong dark:bg-primary-800">
            <button
              onClick={() => setShowContactModal(false)}
              aria-label={t('workerDetail.close')}
              className="absolute right-4 top-4 text-primary-400 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-100"
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-800 dark:text-white">
                {t('workerDetail.contactModalTitle', { name: worker.name })}
              </h3>
              <p className="mt-1 text-sm text-primary-600 dark:text-primary-300">
                {t('workerDetail.contactModalBody')}
              </p>

              {messageSent ? (
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-secondary-200 bg-secondary-50 p-4 text-secondary-700 dark:border-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300">
                  <CheckCircle size={20} />
                  {t('workerDetail.messageSentConfirmation')}
                </div>
              ) : (
                <form onSubmit={handleContact} className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-primary-700 dark:text-primary-100">
                      {t('workerDetail.messageLabel')}
                    </label>
                    <textarea
                      rows={4}
                      value={contactMessage}
                      onChange={(event) => setContactMessage(event.target.value)}
                      placeholder={t('workerDetail.messagePlaceholder', { name: worker.name })}
                      className="w-full rounded-xl border border-primary-100 bg-primary-50/30 px-4 py-3 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white dark:placeholder:text-primary-100/50"
                      required
                    />
                  </div>

                  {sendError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                      {sendError}
                    </div>
                  )}

                  <button type="submit" disabled={sendingMessage} className="btn-primary w-full gap-2 disabled:opacity-60">
                    {sendingMessage ? t('workerDetail.sending') : t('workerDetail.sendMessage')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
