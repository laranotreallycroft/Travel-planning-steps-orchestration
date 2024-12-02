import { Layout, MenuProps } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import AppLayoutViewHeader from 'components/layout/AppLayoutViewHeader';
import AppLayoutViewSider from 'components/layout/AppLayoutViewSider';
import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, className?: string, icon?: React.ReactNode): MenuItem {
  return {
    key,
    icon,
    label,
    className,
  } as MenuItem;
}

export interface IAppLayoutViewOwnProps {
  children?: React.ReactNode;
  isUserLoggedIn: boolean;
  logout: () => void;
}

type IAppLayoutViewProps = IAppLayoutViewOwnProps & IWithLocalizeOwnProps;

const AppLayoutView: React.FC<IAppLayoutViewProps> = (props: IAppLayoutViewProps) => {
  const navigator = useNavigate();
  const location = useLocation();
  const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(true);
  const toggleSiderCollapsed = useCallback(() => {
    setIsSiderCollapsed((value) => !value);
  }, []);

  const handleScreenResize = useCallback(() => {
    if (window.screen.width > 758) {
      setIsSiderCollapsed(true);
    }
  }, [window.screen.width]);
  window.addEventListener('resize', handleScreenResize);

  const currentTab = useMemo(() => location.pathname.substring(location.pathname.indexOf('/')), [location.pathname]);

  const handleMenuItemSelect: MenuProps['onClick'] = (e) => {
    navigator(e.key);
  };

  const handleLogin = useCallback(() => {
    navigator('/login');
  }, []);

  const handleUserCreate = useCallback(() => {
    navigator('/create');
  }, []);

  const menuItems: MenuProps['items'] = useMemo(() => {
    if (props.isUserLoggedIn) {
      return [getItem(props.translate('NAVIGATION.UPCOMING_TRIPS'), '/trips/upcoming'), getItem(props.translate('NAVIGATION.PAST_TRIPS'), '/trips/past')];
    } else {
      return [getItem(props.translate('NAVIGATION.INFO'), '/')];
    }
  }, [props.isUserLoggedIn]);

  return (
    <Layout className="fullHeight">
      <Layout>
        <Header className="appLayoutView__header">
          <AppLayoutViewHeader collapsed={isSiderCollapsed} currentTab={currentTab} isUserLoggedIn={props.isUserLoggedIn} menuItems={menuItems} onMenuItemSelect={handleMenuItemSelect} onLogin={handleLogin} onUserCreate={handleUserCreate} onLogout={props.logout} onToggleSiderCollapsed={toggleSiderCollapsed} />
        </Header>
        <Content className="appLayoutView__content">{props.children}</Content>
      </Layout>
      <AppLayoutViewSider collapsed={isSiderCollapsed} currentTab={currentTab} isUserLoggedIn={props.isUserLoggedIn} menuItems={menuItems} onMenuItemSelect={handleMenuItemSelect} onLogin={handleLogin} onUserCreate={handleUserCreate} onLogout={props.logout} />
    </Layout>
  );
};

export default withLocalize<IAppLayoutViewOwnProps>(AppLayoutView as any);
