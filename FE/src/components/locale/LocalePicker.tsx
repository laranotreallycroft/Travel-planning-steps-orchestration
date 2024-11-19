import React from 'react';

import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';

import { ArrowDropDown, LanguageOutlined } from '@mui/icons-material';
import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { LABELS, MESSAGES } from 'service/locale/message';

// -- Prop types
// ----------

export interface ILocalePickerOwnProps {
  onLocaleChange: (menuInfo: MenuInfo) => void;
  locale: string;
}

export interface ILocalePickerStateProps {}

export interface ILocalePickerDispatchProps {}
type ILocalePickerProps = ILocalePickerOwnProps & ILocalePickerStateProps & ILocalePickerDispatchProps & IWithLocalizeOwnProps;

// -- Component
// ----------

/** Menu component for picking app locale */
const LocalePicker: React.FC<ILocalePickerProps> = (props) => {
  return (
    <Menu mode="horizontal" expandIcon={<ArrowDropDown />} triggerSubMenuAction="click" onClick={props.onLocaleChange} defaultSelectedKeys={[props.locale]}>
      <Menu.SubMenu icon={<LanguageOutlined />} title={props.locale.toLocaleUpperCase()}>
        {Object.keys(MESSAGES).map((locale) => {
          return <Menu.Item key={locale}>{LABELS[locale]}</Menu.Item>;
        })}
      </Menu.SubMenu>
    </Menu>
  );
};

// -- HOCs and exports
// ----------

export default withLocalize<ILocalePickerOwnProps>(LocalePicker as any);
