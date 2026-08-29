import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '../i18n/en';
import rw from '../i18n/rw';

const dictionaries = { en, rw };

const LanguageContext = createContext(null);

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem('kazilink-lang');
  return stored === 'rw' ? 'rw' : 'en';
}

function resolveKey(dictionary, key) {
  return key.split('.').reduce((value, part) => (value && typeof value === 'object' ? value[part] : undefined), dictionary);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem('kazilink-lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const value = useMemo(() => {
    const toggleLanguage = () => setLang((current) => (current === 'en' ? 'rw' : 'en'));

    const t = (key, vars) => {
      const template = resolveKey(dictionaries[lang], key) ?? resolveKey(dictionaries.en, key) ?? key;
      if (!vars) return template;
      return Object.keys(vars).reduce((str, varKey) => str.replaceAll(`{${varKey}}`, vars[varKey]), template);
    };

    const pick = (enValue, rwValue) => (lang === 'rw' ? (rwValue ?? enValue) : enValue);

    return { lang, setLang, toggleLanguage, t, pick };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
