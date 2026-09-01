import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../context/AuthContext';

export const GOOGLE_SIGN_IN_ENABLED = true;

export default function GoogleButton({ redirectTo, label = 'Continue with Google' }) {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState('');

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
