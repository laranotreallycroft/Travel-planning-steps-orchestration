import AppConfigService from 'service/common/AppConfigService';
import { CookieManager } from 'service/util/CookieManager';

export const toLocalDateFormat = (dateString: string) => {
  const cookieLocaleName = AppConfigService.getValue('cookies.locale.name');
  const cookieLocaleValue = CookieManager.getCookie(cookieLocaleName);
  const date = new Date(dateString);
  return date.toLocaleDateString(cookieLocaleValue);
};
