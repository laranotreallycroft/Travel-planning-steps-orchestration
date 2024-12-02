import { ConfigProvider } from 'antd';
import en_US from 'antd/lib/locale/en_US';
import hr_HR from 'antd/lib/locale/hr_HR';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import UserSettingsBusinessStore, { IUserSettings } from 'service/business/usersettings/userSettingsBusinessStore';
import AppConfigService from 'service/common/AppConfigService';
import { MESSAGES } from 'service/locale/message';
import { CookieManager } from 'service/util/CookieManager';
import LocalizeService from 'service/util/localize/LocalizeService';

const ANTDLOCALES = {
  hr: hr_HR,
  en: en_US,
} as any;

const defaultLocaleValue = AppConfigService.getValue('app.defaultLocale');
const cookieLocaleName = AppConfigService.getValue('cookies.locale.name');
const cookieLocalDuration = new Date(Date.now() + AppConfigService.getValue('cookies.locale.duration'));

const cookieLocaleValue = CookieManager.getCookie(cookieLocaleName);

const setLocalization = (localeValue: string) => {
  if (MESSAGES[localeValue]) {
    if (localeValue !== cookieLocaleValue) {
      CookieManager.setCookie({
        name: cookieLocaleName,
        value: localeValue,
        path: '/',
        expires: cookieLocalDuration,
      });
    }
    const messagesOverride = {
      ...MESSAGES,
      [localeValue]: { ...MESSAGES[localeValue] },
    };
    LocalizeService.initLocalize(localeValue, messagesOverride);
    moment.locale(localeValue);
  } else {
    console.warn('Unsupported locale, loading default ', defaultLocaleValue);
    CookieManager.setCookie({
      name: cookieLocaleName,
      value: defaultLocaleValue,
      path: '/',
      expires: cookieLocalDuration,
    });
    LocalizeService.initLocalize(defaultLocaleValue, MESSAGES);
    moment.locale(defaultLocaleValue);
  }
};

// -- Prop types
// ----------

export interface ILocaleProviderOwnProps {
  children: React.ReactNode;
}

export interface ILocaleProviderStateProps {
  userSettings: IUserSettings;
}

export interface ILocaleProviderDispatchProps {
  storeLocale: (locale: string) => void;
}

type ILocaleProviderProps = ILocaleProviderDispatchProps & ILocaleProviderOwnProps & ILocaleProviderStateProps;

// -- Component
// ----------

/** Component that handles app locale */
const LocaleProvider: React.FC<ILocaleProviderProps> = (props: ILocaleProviderProps) => {
  useEffect(() => {
    if (props.userSettings?.locale) {
      handleLocalizationInit(props.userSettings.locale);
    } else if (cookieLocaleValue) {
      handleLocalizationInit(cookieLocaleValue);
    } else {
      handleLocalizationInit(defaultLocaleValue);
    }
  }, [props.userSettings?.locale, cookieLocaleValue, defaultLocaleValue]);

  const handleLocalizationInit = useCallback((localeValue: string) => {
    setLocalization(localeValue);
    props.storeLocale(localeValue);
  }, []);

  const getLocale = useCallback(() => {
    if (props.userSettings && ANTDLOCALES[props.userSettings.locale]) {
      return ANTDLOCALES[props.userSettings.locale];
    } else {
      return ANTDLOCALES[defaultLocaleValue];
    }
  }, [props.userSettings?.locale]);

  return (
    <ConfigProvider
      key={Math.random()}
      locale={getLocale()}
      theme={{
        token: {
          colorPrimary: '#41689d',
          colorText: '#2B3E58',
          colorInfo: '#2B3E58',
          colorWarning: '#f8d410',
          colorError: '#f4ca96',
          colorBgBase: '#fff',
          colorBgContainer: '#fff',
          fontFamily: 'Verdana',
          fontSize: 16,
          colorLink: '#41689d',
        },
      }}
    >
      {props.children}
    </ConfigProvider>
  );
};

// -- HOCs and exports
// ----------

// `state` parameter needs a type annotation to type-check the correct shape of a state object but also it'll be used by "type inference" to infer the type of returned props
const mapStateToProps = (state: any, ownProps: ILocaleProviderOwnProps): ILocaleProviderStateProps => ({
  userSettings: UserSettingsBusinessStore.selectors.getUserSettings(state),
});

// `dispatch` parameter needs a type annotation to type-check the correct shape of an action object when using dispatch function
const mapDispatchToProps = (dispatch: any): ILocaleProviderDispatchProps => ({
  storeLocale: (locale: string) => dispatch(UserSettingsBusinessStore.actions.storeUserSettings({ locale })),
});

export default connect<ILocaleProviderStateProps, ILocaleProviderDispatchProps, ILocaleProviderOwnProps>(mapStateToProps, mapDispatchToProps)(LocaleProvider as any);
