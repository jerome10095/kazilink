import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { api } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function syncProfile(activeSession) {
      if (!activeSession) {
        if (!cancelled) {
          setUser(null);
          setNeedsProfile(false);
        }
        return;
      }
      try {
        const { user: account } = await api.getMe(activeSession.access_token);
        if (!cancelled) {
          setUser(account);
          setNeedsProfile(false);
        }
      } catch (err) {
        if (!cancelled) {
          setUser(null);
          setNeedsProfile(err.status === 404);
        }
      }
    }

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (cancelled) return;
      setSession(initialSession);
      syncProfile(initialSession).finally(() => {
        if (!cancelled) setLoading(false);
      });
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (cancelled) return;
      setSession(newSession);
      setLoading(true);
      syncProfile(newSession).finally(() => {
        if (!cancelled) setLoading(false);
      });
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => {
    const login = async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
    };

    const register = async (payload) => {
      const { fullName, email, password, ...profileFields } = payload;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) throw new Error(error.message);

      const accessToken = data.session?.access_token;
      if (!accessToken) {
        throw new Error('Check your inbox to confirm your email, then log in.');
      }

      const { user: account } = await api.completeProfile({ fullName, ...profileFields }, accessToken);
      setUser(account);
      setNeedsProfile(false);
      return account;
    };

    const loginWithGoogle = async (redirectTo) => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: redirectTo ?? `${window.location.origin}/register` },
      });
      if (error) throw new Error(error.message);
    };

    const completeProfile = async (payload) => {
      if (!session) throw new Error('You must be signed in to finish setting up your account');
      const { user: account } = await api.completeProfile(payload, session.access_token);
      setUser(account);
      setNeedsProfile(false);
      return account;
    };

    const updateProfile = async (payload) => {
      const { user: account } = await api.updateMe(payload, session.access_token);
      setUser(account);
      return account;
    };

    const uploadAvatar = async (file) => {
      const { avatarUrl } = await api.uploadAvatar(file, session.access_token);
      setUser((prev) => (prev ? { ...prev, avatarUrl } : prev));
      return avatarUrl;
    };

    const logout = async () => {
      await supabase.auth.signOut();
      setUser(null);
      setNeedsProfile(false);
    };

    return {
      user,
      authUser: session?.user ?? null,
      accessToken: session?.access_token ?? null,
      loading,
      needsProfile,
      isAuthenticated: Boolean(user),
      login,
      register,
      loginWithGoogle,
      completeProfile,
      updateProfile,
      uploadAvatar,
      logout,
    };
  }, [user, session, loading, needsProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
