import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Mail, Phone, Loader2, Star } from 'lucide-react';
import Reveal from '../components/animations/Reveal';
import { LoadingState, ErrorState } from '../components/ui/AsyncState';
import { api } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  accepted: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
  declined: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
  cancelled: 'bg-gray-100 text-gray-700 dark:bg-primary-700/60 dark:text-primary-100',
};

const STATUS_KEYS = {
  pending: 'requests.statusPending',
  accepted: 'requests.statusAccepted',
  declined: 'requests.statusDeclined',
  cancelled: 'requests.statusCancelled',
};

function ReviewForm({ workerId, token }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ kind: '', text: '' });

  const submit = async (event) => {
    event.preventDefault();
    if (!rating) return;
    setSaving(true);
    try {
      await api.createReview({ workerId, rating, comment }, token);
      setMessage({ kind: 'ok', text: t('requests.reviewSaved') });
      setOpen(false);
    } catch (err) {
      setMessage({ kind: 'error', text: err.status === 409 ? err.message : t('requests.reviewError') });
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  if (message.text) {
    const tone = message.kind === 'ok' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300';
    return <p className={`mt-3 text-sm ${tone}`}>{message.text}</p>;
  }
  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-secondary mt-3">
        {t('requests.leaveReview')}
      </button>
    );
  }
  return (
    <form onSubmit={submit} className="mt-3 space-y-3">
      <div className="flex items-center gap-1" role="radiogroup" aria-label={t('requests.ratingLabel')}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} / 5`} aria-checked={rating === n} role="radio">
            <Star size={22} className={n <= rating ? 'fill-accent-500 text-accent-500' : 'text-primary-300'} />
          </button>
        ))}
      </div>
      <textarea
        rows={3}
        maxLength={1000}
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder={t('requests.commentPlaceholder')}
        className="w-full rounded-xl border border-primary-100 bg-primary-50/30 px-4 py-3 text-sm text-primary-800 outline-none transition focus:border-primary-500 dark:border-primary-700/50 dark:bg-primary-900/50 dark:text-white"
      />
      <button type="submit" disabled={saving || !rating} className="btn-primary gap-2 disabled:opacity-60">
        {saving && <Loader2 size={16} className="animate-spin" />}
        {t('requests.submitReview')}
      </button>
    </form>
  );
}

function RequestCard({ request, role, busy, onRespond, token }) {
  const { t, pick } = useLanguage();
  const { counterpart } = request;
  const isWorker = role === 'worker';
  const subtitle = isWorker ? counterpart.title : pick(counterpart.title, counterpart.titleRw);

  return (
    <article className="rounded-2xl border border-primary-100 bg-white p-5 shadow-soft dark:border-primary-700/50 dark:bg-primary-800">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {counterpart.avatarUrl ? (
            <img src={counterpart.avatarUrl} alt="" className="h-11 w-11 rounded-full object-cover" />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700 dark:bg-primary-700/60 dark:text-primary-100">
              {counterpart.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold text-primary-800 dark:text-white">{counterpart.name}</p>
            {subtitle && <p className="text-sm text-primary-600 dark:text-primary-300">{subtitle}</p>}
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[request.status]}`}>
          {t(STATUS_KEYS[request.status])}
        </span>
      </div>

      <h2 className="mt-4 font-medium text-primary-800 dark:text-white">{request.jobTitle || t('requests.untitled')}</h2>
      <p className="mt-1 whitespace-pre-line text-sm text-primary-700/80 dark:text-primary-100/80">{request.message}</p>

      {request.proposedRate !== null && (
        <p className="mt-3 text-sm text-primary-600 dark:text-primary-300">
          {t('requests.offeredRate')}:{' '}
          <span className="font-medium text-primary-800 dark:text-white">
            {request.proposedRate.toLocaleString()} {t('requests.perDay')}
          </span>
        </p>
      )}

      {request.status === 'accepted' && (counterpart.email || counterpart.phone) && (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm dark:border-green-900/50 dark:bg-green-950/30">
          <p className="mb-1 font-medium text-green-800 dark:text-green-200">{t('requests.contactDetails')}</p>
          {counterpart.email && (
            <a href={`mailto:${counterpart.email}`} className="flex items-center gap-2 text-green-800 hover:underline dark:text-green-200">
              <Mail size={14} /> {counterpart.email}
            </a>
          )}
          {counterpart.phone && (
            <a href={`tel:${counterpart.phone}`} className="mt-1 flex items-center gap-2 text-green-800 hover:underline dark:text-green-200">
              <Phone size={14} /> {counterpart.phone}
            </a>
          )}
        </div>
      )}

      {request.status === 'accepted' && !isWorker && counterpart.id && (
        <ReviewForm workerId={counterpart.id} token={token} />
      )}

      {request.status === 'pending' && (
        <div className="mt-4 flex flex-wrap gap-2">
          {isWorker ? (
            <>
              <button disabled={busy} onClick={() => onRespond(request.id, 'accepted')} className="btn-primary gap-2 disabled:opacity-60">
                {busy && <Loader2 size={16} className="animate-spin" />}
                {t('requests.accept')}
              </button>
              <button disabled={busy} onClick={() => onRespond(request.id, 'declined')} className="btn-secondary disabled:opacity-60">
                {t('requests.decline')}
              </button>
            </>
          ) : (
            <button disabled={busy} onClick={() => onRespond(request.id, 'cancelled')} className="btn-secondary disabled:opacity-60">
              {t('requests.cancel')}
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default function Requests() {
  const { t } = useLanguage();
  const { user, accessToken } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    try {
      const { requests: rows } = await api.getHireRequests(accessToken);
      setRequests(rows);
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

  const handleRespond = async (id, status) => {
    setActionError('');
    setBusyId(id);
    try {
      await api.respondToHireRequest(id, status, accessToken);
      await load(); // also picks up contact details revealed by an acceptance
    } catch (err) {
      // 409 means the other side already changed it; reload to show the truth.
      setActionError(err.status === 409 ? err.message : t('requests.actionError'));
      await load();
    } finally {
      setBusyId(null);
    }
  };

  const isWorker = user.role === 'worker';

  return (
    <>
      <Helmet>
        <title>{t('requests.heading')} | KaziLink</title>
      </Helmet>

      <section className="section-padding dark:bg-primary-900">
        <div className="container-custom max-w-3xl">
          <Reveal>
            <h1 className="text-3xl font-bold text-primary-800 dark:text-white">{t('requests.heading')}</h1>
            <p className="mt-2 text-primary-700/75 dark:text-primary-100/75">
              {isWorker ? t('requests.subheadingWorker') : t('requests.subheadingEmployer')}
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {loading && <LoadingState label={t('common.loading')} />}
            {!loading && error && <ErrorState message={error} />}
            {actionError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                {actionError}
              </div>
            )}

            {!loading && !error && requests.length === 0 && (
              <div className="rounded-[28px] border border-dashed border-primary-200 bg-primary-50/40 p-10 text-center dark:border-primary-700 dark:bg-primary-800/40">
                <p className="font-medium text-primary-800 dark:text-white">{t('requests.empty')}</p>
                {isWorker ? (
                  <p className="mt-2 text-sm text-primary-700/75 dark:text-primary-100/75">{t('requests.emptyWorkerHint')}</p>
                ) : (
                  <Link to="/find-workers" className="btn-primary mt-4 inline-flex">
                    {t('requests.emptyCtaEmployer')}
                  </Link>
                )}
              </div>
            )}

            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                role={user.role}
                busy={busyId === request.id}
                onRespond={handleRespond}
                token={accessToken}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
