// Public organisation details. Nothing here is hard-coded: set the VITE_* values
// in .env (or the Netlify dashboard) and the site shows them; leave one unset
// and that item is simply not displayed.
const env = import.meta.env;

const clean = (value) => (typeof value === 'string' && value.trim() ? value.trim() : null);

export const contactInfo = {
  phone: clean(env.VITE_CONTACT_PHONE),
  email: clean(env.VITE_CONTACT_EMAIL),
  location: clean(env.VITE_CONTACT_LOCATION),
  hours: clean(env.VITE_CONTACT_HOURS),
};

export const socialUrls = {
  facebook: clean(env.VITE_SOCIAL_FACEBOOK),
  twitter: clean(env.VITE_SOCIAL_TWITTER),
  linkedin: clean(env.VITE_SOCIAL_LINKEDIN),
  instagram: clean(env.VITE_SOCIAL_INSTAGRAM),
};
