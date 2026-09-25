import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, MapPin, Users, Loader2 } from 'lucide-react';
import Reveal from '../components/animations/Reveal';
import { LoadingState, ErrorState } from '../components/ui/AsyncState';
import { api } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

function TrainingCard({ session, isAuthenticated, busy, onEnroll }) {
  const { t, pick } = useLanguage();
  const isFull = session.capacity !== null && session.enrolledCount >= session.capacity;
  const isEnded = session.status === 'completed';
  const description = pick(session.description, session.descriptionRw);

  let action;
  if (session.enrolled) {
    action = <span className="font-medium text-green-700 dark:text-green-300">{t('training.enrolled')}</span>;
  } else if (isEnded) {
    action = <span className="text-ink/60 dark:text-primary-100/60">{t('training.ended')}</span>;
  } else if (isFull) {
    action = <span className="text-ink/60 dark:text-primary-100/60">{t('training.full')}</span>;
  } else if (!isAuthenticated) {
    action = (
      <Link to="/login" state={{ from: '/training' }} className="btn-outline">
        {t('training.loginToEnroll')}
      </Link>
    );
  } else {
    action = (
      <button disabled={busy} onClick={() => onEnroll(session.id)} className="btn-primary gap-2 disabled:opacity-60">
        {busy && <Loader2 size={16} className="animate-spin" />}
        {busy ? t('training.enrolling') : t('training.enroll')}
      </button>
    );
  }

  return (
    <div className="card p-6 card-hover flex flex-col">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-500 dark:bg-primary-700/60 dark:text-primary-200">
        <BookOpen size={28} />
      </div>
      <h3 className="text-xl font-semibold mt-4 mb-2 dark:text-white">{pick(session.title, session.titleRw)}</h3>
      {description && <p className="text-ink/60 leading-relaxed dark:text-primary-100/70">{description}</p>}

      <ul className="mt-4 space-y-1.5 text-sm text-ink/70 dark:text-primary-100/70">
        {session.instructor && (
          <li className="flex items-center gap-2">
            <Users size={14} /> {t('training.instructor', { name: session.instructor })}
          </li>
        )}
        {session.durationHours !== null && (
          <li className="flex items-center gap-2">
            <Clock size={14} /> {t('training.durationHours', { hours: session.durationHours })}
          </li>
        )}
        {session.startDate && (
          <li className="flex items-center gap-2">
            <Calendar size={14} /> {new Date(session.startDate).toLocaleDateString()}
          </li>
        )}
        {(session.online || session.location) && (
          <li className="flex items-center gap-2">
            <MapPin size={14} /> {session.online ? t('training.online') : session.location}
          </li>
        )}
        <li className="flex items-center gap-2">
          <Users size={14} />
          {session.capacity !== null
            ? t('training.spotsOf', { count: session.enrolledCount, capacity: session.capacity })
            : t('training.spots', { count: session.enrolledCount })}
        </li>
      </ul>

      <div className="mt-auto pt-5 text-sm">{action}</div>
    </div>
  );
}

export default function Training() {
  const { t } = useLanguage();
  const { isAuthenticated, accessToken } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    try {
      const { training } = await api.getTraining(accessToken);
      setSessions(training);
      setError('');
    } catch {
      setError(t('common.loadError'));
    } finally {
      setLoading(false);
    }
  }, [accessToken, t]);

  useEffect(() => {
    load();
  }, [load]);

  const handleEnroll = async (id) => {
    setActionError('');
    setBusyId(id);
    try {
      await api.enrollInTraining(id, accessToken);
    } catch (err) {
      setActionError(err.status === 409 ? err.message : t('training.enrollError'));
    } finally {
      await load();
      setBusyId(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Training Academy - Professional Development | KaziLink</title>
      </Helmet>

      <section className="section-padding dark:bg-primary-900">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider dark:text-primary-300">{t('training.badge')}</span>
              <h1 className="heading-xl mt-2 dark:text-white">{t('training.heading')}</h1>
              <p className="text-lg text-ink/60 mt-4 dark:text-primary-100/70">
                {t('training.paragraph')}
              </p>
            </div>
          </Reveal>

          {loading && <LoadingState label={t('common.loading')} />}
          {!loading && error && <ErrorState message={error} />}
          {actionError && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
              {actionError}
            </div>
          )}

          {!loading && !error && sessions.length === 0 && (
            <div className="mx-auto max-w-xl rounded-[28px] border border-dashed border-primary-200 bg-primary-50/40 p-10 text-center dark:border-primary-700 dark:bg-primary-800/40">
              <p className="font-medium text-primary-800 dark:text-white">{t('training.empty')}</p>
              <p className="mt-2 text-sm text-primary-700/75 dark:text-primary-100/75">{t('training.emptyHint')}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessions.map((session, index) => (
              <Reveal key={session.id} delay={index * 0.05}>
                <TrainingCard
                  session={session}
                  isAuthenticated={isAuthenticated}
                  busy={busyId === session.id}
                  onEnroll={handleEnroll}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
