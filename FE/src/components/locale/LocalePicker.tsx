import React, { useMemo } from 'react';

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
  const items = useMemo(
    () => [
      {
        key: 'locale',
        icon: <LanguageOutlined />,
        label: props.locale.toUpperCase(),
        children: Object.keys(MESSAGES).map((locale) => ({
          key: locale,
          label: LABELS[locale],
        })),
      },
    ],
    [props.locale]
  );

  return <Menu className="localePicker__menu" mode="horizontal" expandIcon={<ArrowDropDown />} triggerSubMenuAction="click" onClick={props.onLocaleChange} defaultSelectedKeys={[props.locale]} items={items} disabledOverflow={true}></Menu>;
};

// -- HOCs and exports
// ----------

export default withLocalize<ILocalePickerOwnProps>(LocalePicker as any);
