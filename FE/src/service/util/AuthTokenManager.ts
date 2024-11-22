import AppConfigService from 'service/common/AppConfigService';
import { CookieManager } from 'service/util/CookieManager';

/** Exposes static methods for authentication token management. */
export default class AuthTokenManager {
  /** Save authentication token. */
  static saveToken(token: string, sessionOnly?: boolean) {
    if (sessionOnly) {
      CookieManager.setCookie({
        name: AppConfigService.getValue('authentication.token.name'),
        value: token,
        path: '/',
      });
    } else {
      CookieManager.setCookie({
        name: AppConfigService.getValue('authentication.token.name'),
        value: token,
        expires: AppConfigService.getValue('authentication.token.duration') ? new Date(Date.now() + AppConfigService.getValue('authentication.token.duration')) : undefined,
        path: '/',
      });
    }
  }

  /** Delete authentication token (eg. on logout). */
  static deleteToken() {
    CookieManager.deleteCookie({
      name: AppConfigService.getValue('authentication.token.name'),
      path: '/',
    });
  }

  /** Returns authentication token. */
  static getToken(): string {
    return CookieManager.getCookie(AppConfigService.getValue('authentication.token.name'));
  }
}
