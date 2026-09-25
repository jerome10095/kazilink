import { useEffect, useState } from 'react';
import { api } from '../lib/api';

// The real service categories from the database (used for sign-up and profile pickers).
export default function useServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    let cancelled = false;
    api.getServices()
      .then(({ services: rows }) => {
        if (!cancelled) setServices(rows);
      })
      .catch(() => {
        // Without categories the forms fall back to a free-text trade.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return services;
}
