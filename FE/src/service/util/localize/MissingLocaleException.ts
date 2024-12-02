import LemonError from 'service/common/CustomError';

export default class MissingLocaleException extends LemonError {
  constructor(locale: string) {
    super(`Locale is missing "${locale}"`);
  }
}
