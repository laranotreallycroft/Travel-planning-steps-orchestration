import { Button, Col, Menu, MenuProps, Row } from 'antd';
import logo from 'asset/img/logo.png';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import LocalePickerContainer from 'components/locale/LocalePickerContainer';
import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, className?: string, icon?: React.ReactNode): MenuItem {
  return {
    key,
    icon,
    label,
    className,
  } as MenuItem;
}

export interface IAppLayoutViewHeaderOwnProps {
  isUserLoggedIn: boolean;
  logout: () => void;
}

type IAppLayoutViewHeaderProps = IAppLayoutViewHeaderOwnProps & IWithLocalizeOwnProps;

const AppLayoutViewHeader: React.FC<IAppLayoutViewHeaderProps> = (props: IAppLayoutViewHeaderProps) => {
  const navigator = useNavigate();
  const location = useLocation();

  const currentTab = useMemo(() => location.pathname.substring(location.pathname.indexOf('/')), [location.pathname]);

  const handleMenuSelect: MenuProps['onClick'] = (e) => {
    navigator(e.key);
  };

  const handleLogin = useCallback(() => {
    navigator('/login');
  }, []);

  const handleUserCreate = useCallback(() => {
    navigator('/create');
  }, []);

  const items: MenuProps['items'] = useMemo(() => {
    if (props.isUserLoggedIn) {
      return [getItem(props.translate('NAVIGATION.UPCOMING_TRIPS'), '/trips/upcoming'), getItem(props.translate('NAVIGATION.PAST_TRIPS'), '/trips/past')];
    } else {
      return [getItem(props.translate('NAVIGATION.INFO'), '/')];
    }
  }, [props.isUserLoggedIn]);

  return (
    <Row justify={'space-between'} className="fullWidth">
      <Col span={6} className="appLayoutViewHeader__imgContainer">
        <img src={logo} className="appLayoutViewHeader__img" alt="" />
      </Col>

      <Col span={8}>
        <Menu className="appLayoutViewHeader__menuContainer" onClick={handleMenuSelect} selectedKeys={[currentTab]} items={items} mode="horizontal" disabledOverflow={true} />
      </Col>
      <Col span={5}>
        <Row gutter={[8, 8]} justify={'end'}>
          {props.isUserLoggedIn ? (
            <Col>
              <Button onClick={props.logout}>{props.translate('NAVIGATION.LOGOUT')}</Button>
            </Col>
          ) : (
            <React.Fragment>
              <Col>
                <Button onClick={handleLogin}>{props.translate('NAVIGATION.LOGIN')}</Button>
              </Col>
              <Col>
                <Button onClick={handleUserCreate} type="primary">
                  {props.translate('NAVIGATION.CREATE')}
                </Button>
              </Col>
            </React.Fragment>
          )}
          <Col flex={'auto'}>
            <LocalePickerContainer />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default withLocalize<IAppLayoutViewHeaderOwnProps>(AppLayoutViewHeader as any);
