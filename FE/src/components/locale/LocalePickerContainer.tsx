import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { MenuInfo } from 'rc-menu/lib/interface';
import React from 'react';
import { connect } from 'react-redux';

import LocalePicker from 'components/locale/LocalePicker';
import UserSettingsBusinessStore, { IUserSettings } from 'service/business/usersettings/userSettingsBusinessStore';
import AppConfigService from 'service/common/AppConfigService';
import { CookieManager } from 'service/util/CookieManager';

const localeCookieName = AppConfigService.getValue('cookies.locale.name');

const localeCookie = CookieManager.getCookie(localeCookieName);

// -- Prop types
// ----------
export interface ILocalePickerContainerOwnProps {}

export interface ILocalePickerContainerStateProps {
  userSettings: IUserSettings;
}

export interface ILocalePickerContainerDispatchProps {
  storeLocale: (locale: string) => void;
}
type ILocalePickerContainerProps = ILocalePickerContainerOwnProps & ILocalePickerContainerStateProps & ILocalePickerContainerDispatchProps & IWithLocalizeOwnProps;

// -- Component
// ----------

const LocalePickerContainer: React.FC<ILocalePickerContainerProps> = (props: ILocalePickerContainerProps) => {
  const handleLocaleChange = (e: MenuInfo) => {
    props.storeLocale(e.key);
  };

  return <LocalePicker onLocaleChange={handleLocaleChange} locale={props.userSettings ? props.userSettings.locale : localeCookie} />;
};

// -- HOCs and exports
// ----------

// `state` parameter needs a type annotation to type-check the correct shape of a state object but also it'll be used by "type inference" to infer the type of returned props
const mapStateToProps = (state: any, ownProps: ILocalePickerContainerOwnProps): ILocalePickerContainerStateProps => ({
  userSettings: UserSettingsBusinessStore.selectors.getUserSettings(state),
});

// `dispatch` parameter needs a type annotation to type-check the correct shape of an action object when using dispatch function
const mapDispatchToProps = (dispatch: any): ILocalePickerContainerDispatchProps => ({
  storeLocale: (locale: string) => dispatch(UserSettingsBusinessStore.actions.storeUserSettings({ locale })),
});

export default connect<ILocalePickerContainerStateProps, ILocalePickerContainerDispatchProps, ILocalePickerContainerOwnProps>(mapStateToProps, mapDispatchToProps)(withLocalize(LocalePickerContainer as any));
