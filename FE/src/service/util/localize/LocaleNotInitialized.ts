import CustomError from "service/common/CustomError";

export default class LocaleNotInitializedException extends CustomError {
  constructor() {
    super(`'Localization library not initialize!`);
  }
}
