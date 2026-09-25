import { useEffect, useState } from 'react';
import { api } from '../lib/api';

const EMPTY = {
  workers: 0,
  verifiedWorkers: 0,
  employers: 0,
  hires: 0,
  trainingSessions: 0,
  satisfaction: null,
};

// Turns the /api/stats payload into display rows. `label` doubles as the
// i18n key under `statLabels`. Satisfaction is left out until real reviews exist.
export function buildStatItems(raw) {
  const items = [
    { label: 'Workers Registered', value: raw.workers, suffix: '' },
    { label: 'Verified Workers', value: raw.verifiedWorkers, suffix: '' },
    { label: 'Hires Confirmed', value: raw.hires, suffix: '' },
    { label: 'Employers Registered', value: raw.employers, suffix: '' },
    { label: 'Training Sessions', value: raw.trainingSessions, suffix: '' },
  ];
  if (raw.satisfaction !== null && raw.satisfaction !== undefined) {
    items.push({ label: 'Customer Satisfaction', value: raw.satisfaction, suffix: '%' });
  }
  return items;
}

export default function useStats() {
  const [raw, setRaw] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api.getStats()
      .then(({ stats }) => {
        if (!cancelled) setRaw(stats);
      })
      .catch(() => {
        // Stats are decorative; on failure the counters stay at zero.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const source = raw ?? EMPTY;
  return { raw: source, loaded: raw !== null, items: buildStatItems(source) };
}
