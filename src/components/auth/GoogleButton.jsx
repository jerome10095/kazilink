import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../context/AuthContext';

export const GOOGLE_SIGN_IN_ENABLED = true;

export default function GoogleButton({ redirectTo, label = 'Continue with Google' }) {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState('');

  // When Google/Supabase sign-in fails, Supabase sends the browser back here
  // with the reason in the URL. Show it instead of silently landing on a form.
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (!params.has(key)) params.set(key, value);
    });
    const reason = params.get('error_description') || params.get('error');
    if (!reason) return;
    setError(reason);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const handleClick = async () => {
    setError('');
    try {
      await loginWithGoogle(redirectTo);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleClick} className="btn-secondary w-full gap-2">
        <FcGoogle size={20} /> {label}
      </button>
      {error && <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
