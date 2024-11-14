import { Globals } from "service/util/Globals";

export interface IBrowserCookie {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
}

/**
 * Class for setting, getting and deleting cookies.
 */
export class CookieManager {
  /**
   * Get cookie value for a given cookie name (or empty string if the cookie doesn't exist).
   *
   * @param {string} name Cookie name.
   *
   * @returns {string} Cookie value or empty string if the cookie doesn't exist.
   */
  static getCookie(name: string): string {
    const namePrefix: string = name + "=";
    const ca: any = Globals.document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(namePrefix) === 0) {
        return c.substring(namePrefix.length, c.length);
      }
    }
    return "";
  }

  /**
   * Set cookie with given data.
   *
   * @param {IBrowserCookie} cookie Object containing cookie data.
   */
  static setCookie(cookie: IBrowserCookie): void {
    Globals.document.cookie = CookieManager.serialize(cookie);
  }

  /**
   * Delete cookie with a given name.
   *
   * @param {string} cookieName Cookie name.
   */
  static deleteCookie(cookie: {
    name: string;
    path?: string;
    domain?: string;
  }): void {
    const deleteCookie: any = Object.assign({}, cookie, {
      expires: new Date(0), // cookies are deleted by setting their expiration time to 0-time (beginning of UNIX time epoch)
    });

    Globals.document.cookie = CookieManager.serialize(deleteCookie);
  }

  /**
   * Checks if a cookie if available.
   *
   * @param {string} name Cookie name.
   *
   * @returns {boolean} True if a cookie is available.
   */
  static cookieAvailable(name: string): boolean {
    return CookieManager.getCookie(name) !== "";
  }

  private static serialize(cookie: IBrowserCookie): string {
    // tslint:disable-next-line:prefer-template
    return (
      "" +
      cookie.name +
      "=" +
      cookie.value +
      ";" +
      (cookie.path ? "path=" + cookie.path + ";" : "") +
      (cookie.domain ? "domain=" + cookie.domain + ";" : "") +
      (cookie.maxAge ? "max-age=" + cookie.maxAge + ";" : "") +
      (cookie.expires ? "expires=" + cookie.expires.toUTCString() + ";" : "")
    );
  }
}
