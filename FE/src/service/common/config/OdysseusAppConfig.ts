const ODYSSEUS_APP_CONFIG = {
  app: {
    defaultLocale: 'hr',
  },
  // ---------- Cookie config
  authentication: {
    token: {
      name: 'token',
      duration: 24 * 60 * 60 * 1000, // 1 day
    },
  },
  weather: {
    apiId: 'e767a44febd8dff85969c3726d040132',
  },
  cookies: {
    locale: {
      name: 'locale',
      duration: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
  },
  common: {
    debounceTimeout: 500,
    minSearchStringLength: 2,
    location: {
      coordinates: [51.505, -0.09],
      zoom: 13,
      tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
  },
};
export default ODYSSEUS_APP_CONFIG;
