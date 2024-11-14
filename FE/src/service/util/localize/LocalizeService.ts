import Polyglot from "node-polyglot";

import LocaleNotInitializedException from "service/util/localize/LocaleNotInitialized";
import MissingLocaleException from "service/util/localize/MissingLocaleException";

// global polyglot instance
let polyglot: Polyglot;

/** Service for initializing and accessing localization support. */
export default class LocalizeService {
  /** Initialize localization support with locale and message bundle. */
  static initLocalize(
    defaultLocale: string,
    messages: Record<string, Record<string, string>>
  ) {
    const localeMessages =
      defaultLocale && messages[defaultLocale] ? messages[defaultLocale] : {};
    if (localeMessages == null) {
      throw new MissingLocaleException(defaultLocale);
    }

    polyglot = new Polyglot({ locale: defaultLocale, phrases: localeMessages });
  }

  /** Find and return message with given name from message bundle. If message is not found, returns fallback message. */
  static translateOrFallback(
    name: string,
    fallbackName: string,
    params?: Record<string, any>
  ) {
    let translation = LocalizeService.translate(name, params || {});
    if (translation === name) {
      translation = LocalizeService.translate(fallbackName, params || {});
    }

    return translation;
  }

  /** Find and return message with given name from message bundle. */
  static translate(name: string, params?: Record<string, any>) {
    if (polyglot == null) {
      throw new LocaleNotInitializedException();
    }

    return polyglot.t(name, params || {});
  }

  /** Check if translation message exists. Convenience method for boolean expressions. */
  static hasTranslation(name: string): boolean {
    if (polyglot == null) {
      throw new LocaleNotInitializedException();
    }

    return polyglot.has(name);
  }
}
