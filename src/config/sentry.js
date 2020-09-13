export const DSN = process.env.REACT_APP_SENTRY_DSN;
export const environment = process.env.REACT_APP_SENTRY_ENV || process.env.NODE_ENV;

export const isAnon = process.env.REACT_APP_SENTRY_ANON === 'true';
export const isEnabled = !!DSN;
