import { Button, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import LocalePickerContainer from 'components/locale/LocalePickerContainer';
import React from 'react';

export interface IAppLayoutViewSiderOwnProps {
  collapsed: boolean;
  isUserLoggedIn: boolean;
  currentTab: string;
  menuItems: ItemType[];
  onMenuItemSelect: MenuProps['onClick'];
  onLogin: () => void;
  onUserCreate: () => void;
  onLogout: () => void;
}

type IAppLayoutViewSiderProps = IAppLayoutViewSiderOwnProps & IWithLocalizeOwnProps;

const AppLayoutViewSider: React.FC<IAppLayoutViewSiderProps> = (props: IAppLayoutViewSiderProps) => {
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed} collapsedWidth={0} className="appLayoutViewSider__sider appLayoutView__screen-md">
      <Menu onClick={props.onMenuItemSelect} selectedKeys={[props.currentTab]} items={props.menuItems} className="appLayoutViewSider__menu" />
      {props.isUserLoggedIn ? (
        <Button onClick={props.onLogout} className="fullWidth margin-bottom-lg">
          {props.translate('NAVIGATION.LOGOUT')}
        </Button>
      ) : (
        <React.Fragment>
          <Button onClick={props.onLogin} className="fullWidth margin-bottom-lg">
            {props.translate('NAVIGATION.LOGIN')}
          </Button>
          <Button onClick={props.onUserCreate} type="primary" className="fullWidth margin-bottom-lg">
            {props.translate('NAVIGATION.CREATE')}
          </Button>
        </React.Fragment>
      )}
      <LocalePickerContainer />
    </Sider>
  );
};

export default withLocalize<IAppLayoutViewSiderOwnProps>(AppLayoutViewSider as any);
