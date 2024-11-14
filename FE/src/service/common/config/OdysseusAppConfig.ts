// @ts-nocheck
const ODYSSEUS_APP_CONFIG = {
  app: {
    defaultLocale: "hr",
  },
  // ---------- Cookie config
  cookies: {
    locale: {
      name: "locale",
      duration: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
  },
};
export default ODYSSEUS_APP_CONFIG;
